import React from "react";
import { Link } from "react-router-dom";
import "./CocktailList.css";
import { useDispatch, useSelector } from "react-redux";
import { pinFavorite, removeFavorite } from "../../redux/reducers";

const CocktailList = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails);
  const favorites = useSelector((state) => state.favorites);
  const isLoading = useSelector((state) => state.isLoading);

  if (isLoading) {
    return (
      <div>
        <img
          width="100px"
          src="https://static.vecteezy.com/system/resources/previews/006/126/912/non_2x/celebrating-cocktail-glass-in-transparent-background-free-vector.jpg"
        />
      </div>
    );
  }

  return (
    <div className="cocktail-list-container">
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => {
          const isInFavorites = favorites.some(
            (favCocktail) => favCocktail.idDrink === cocktail.idDrink
          );

          return (
            <div className="cocktail-item" key={cocktail.idDrink}>
              <Link to={`/details/${cocktail.idDrink}`}>
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="cocktail-image"
                />
              </Link>

              <div className="name-and-heart">
                <Link to={`/details/${cocktail.idDrink}`}>
                  <h3>{cocktail.strDrink}</h3>
                </Link>
                <i
                  className={`fa ${
                    isInFavorites ? "fa-heart" : "fa-heart-o"
                  } fa-2x`}
                  aria-hidden="true"
                  style={{
                    color: isInFavorites ? "black" : "",
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
};

export default CocktailList;
