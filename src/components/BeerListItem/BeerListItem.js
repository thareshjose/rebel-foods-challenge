import React from "react";
import "./BeerListItem.scss";

function BeerListItem({ beer }) {
  return (
    <div className="card">
      <img src={beer.image} className="card__image" />
      <div className="card__data">
        <div className="card__title">{beer.name}</div>
        <div className="card__category">{beer.style}</div>
        <div className="card__abv">ABV: {beer.abv}</div>
        <div className="card__ounces">Ounce: {beer.ounces}</div>
      </div>
    </div>
  );
}

export default BeerListItem;
