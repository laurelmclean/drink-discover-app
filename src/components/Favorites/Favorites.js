import React from "react";
import "./Favorites.css";
import { useDispatch, useSelector } from "react-redux";
import { pinFavorite, removeFavorite } from "../../redux/reducers";
import { Link } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const noFavoritesMarkup = (
    <div className="favorites-container">
      <h2>Looks like your cocktail cabinet is feeling a bit lonely!</h2>
      <p>Why not explore some amazing drinks and find your new favorite?</p>
      <Link to={"/"}>
        <h3 className="favourite-browse">Let's Browse!</h3>
      </Link>
    </div>
  );

  const favoritesMarkup = (
    <div className="favorites-container">
      <h1>Favorites</h1>
      <div className="favorites-grid">
        {favorites.map((cocktail) => {
          // Check if the current cocktail is in favorites
          const isInFavorites = favorites.some(
            (favCocktail) => favCocktail.idDrink === cocktail.idDrink
          );

          return (
            <div className="favorites-item" key={cocktail.idDrink}>
              <Link to={`/details/${cocktail.idDrink}`}>
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="favorites-image"
                />
              </Link>
              <div className="name-and-heart">
                <Link to={`/details/${cocktail.idDrink}`}>
                  <h3>{cocktail.strDrink}</h3>
                </Link>

                {/* Conditionally render based on whether it's in favorites */}
                <i
                  className={`fa ${
                    isInFavorites ? "fa-heart" : "fa-heart-o"
                  } fa-2x`}
                  aria-hidden="true"
                  style={{
                    color: isInFavorites ? "black" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    isInFavorites
                      ? dispatch(removeFavorite(cocktail))
                      : dispatch(pinFavorite(cocktail));
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>{favorites.length > 0 ? favoritesMarkup : noFavoritesMarkup}</div>
  );
};

export default Favorites;
