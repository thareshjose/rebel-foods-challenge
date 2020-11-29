import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import pagesReducer from "./pageSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    pages: pagesReducer,
  },
});
