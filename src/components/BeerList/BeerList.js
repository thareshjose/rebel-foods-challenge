import React, { useEffect, useCallback } from "react";
import "./BeerList.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBeerList,
  selectProducts,
  getBeersInPage,
} from "./../../redux/productSlice";
import BeerListItem from "./../BeerListItem/BeerListItem";
import Pagination from "./../Pagination/Pagination";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import Loader from "../Loader/Loader";

function BeerList() {
  const { beerListInPage, isLoading, totalPages } = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeerList());
  }, [dispatch]);

  const onPageChange = useCallback((newPage) => {
    dispatch(getBeersInPage(newPage));
  });

  return (
    <>
      <h3 className="title">
        <LocalBarIcon className="title__icon" />
        Beer Brands
      </h3>
      {isLoading ? (
        <Loader />
      ) : totalPages === 0 ? (
        <div className="zeroResults">No Brands Found..!</div>
      ) : (
        <>
          <Pagination changePage={onPageChange} totalPages={totalPages} />
          <div className="beerList">
            <>
              {beerListInPage.map((beer) => (
                <BeerListItem key={beer.id} beer={beer} />
              ))}
            </>
          </div>
          <Pagination changePage={onPageChange} totalPages={totalPages} />
        </>
      )}
    </>
  );
}

export default BeerList;
