import React from "react";
import BeerList from "../BeerList/BeerList";
import "./Home.scss";
import Search from "./../Search/Search";
import Pagination from "../Pagination/Pagination";

function Home() {
  return (
    <div className="home">
      <Search />
      <BeerList />
    </div>
  );
}

export default Home;
