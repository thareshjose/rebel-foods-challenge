import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "./../constants/constants";

export const fetchBeerList = createAsyncThunk(
  "products/fetchBeerList",
  async () => {
    const response = await fetch(CONSTANTS.PRODUCTS_URL);
    const imageList = await fetchBeerImages();
    let beerList = await response.json();
    const imageCount = imageList.length;

    beerList.forEach((beer, index) => {
      let i = index % imageCount;
      beer.image = imageList[i].image;
    });
    return beerList;
  }
);

export const fetchBeerImages = async () => {
  const response = await fetch(CONSTANTS.PRODUCTS_IMAGE_URL);
  return response.json();
};

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: true,
    page: 1,
    beerListInPage: [],
    brandsPerPage: 20,
  },
  reducers: {
    getBeersInPage: (state, action) => {
      state.page = action.payload;
      const startIndex = (action.payload - 1) * state.brandsPerPage;
      const endIndex = startIndex + state.brandsPerPage;
      state.beerListInPage = state.beerList.slice(startIndex, endIndex);
    },
    searchBeerBrands: (state, action) => {
      const searchTerm = action.payload;
      const filteredList = state.beerList.filter(
        (beer) => beer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
      );
      state.beerListInPage = filteredList.slice(0, state.brandsPerPage);
      state.page = 1;
      state.totalPages = Math.ceil(filteredList.length / state.brandsPerPage);
    },
    getDefaultBeerBrands: (state, action) => {
      state.page = 1;
      state.beerListInPage = state.beerList.slice(0, state.brandsPerPage);
      state.totalPages = Math.ceil(state.beerList.length / state.brandsPerPage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeerList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBeerList.fulfilled, (state, action) => {
        state.beerList = action.payload;
        state.beerListInPage = state.beerList.slice(0, state.brandsPerPage);
        state.totalPages = Math.ceil(
          state.beerList.length / state.brandsPerPage
        );

        state.isLoading = false;
      });
  },
});

export const {
  getBeersInPage,
  searchBeerBrands,
  getDefaultBeerBrands,
} = productsSlice.actions;

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
