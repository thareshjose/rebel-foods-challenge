import React, { useState, useEffect } from "react";
import "./Search.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBeerBrands,
  getDefaultBeerBrands,
  selectProducts,
} from "../../redux/productSlice";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { beerList, totalPages } = useSelector(selectProducts);

  useEffect(() => {
    if (searchInput) {
      dispatch(searchBeerBrands(searchInput));
    } else if (beerList !== undefined) {
      dispatch(getDefaultBeerBrands());
    }
  }, [searchInput]);

  const onSearchInput = (searchTerm) => {
    setSearchInput(searchTerm);
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Search"
        onChange={(e) => onSearchInput(e.target.value)}
      />
      <SearchIcon
        className={`${searchInput ? "search__icon--hidden" : ""} search__icon`}
      />

      <span
        className={`${
          totalPages === 0 ? "search__input--results-zero" : ""
        } search__input--border-visible`}
      ></span>
    </div>
  );
}

export default Search;
