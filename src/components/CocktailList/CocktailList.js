import React from "react";
import { Link } from "react-router-dom";
import "./CocktailList.css";
import { useDispatch, useSelector } from "react-redux";
import { pinFavorite, removeFavorite } from "../../redux/reducers";

const CocktailList = () => {
    const dispatch = useDispatch();
    const cocktails = useSelector((state) => state.cocktails);
    const favorites = useSelector((state) => state.favorites);

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

                                <h3>{cocktail.strDrink}</h3>

                                <img
                                    src={cocktail.strDrinkThumb}
                                    alt={cocktail.strDrink}
                                    className="cocktail-image"
                                />
                            </Link>

                            <button
                                className="favorite-button"
                                onClick={() => {
                                    isInFavorites
                                        ? dispatch(removeFavorite(cocktail))
                                        : dispatch(pinFavorite(cocktail));
                                }}
                            >
                                {isInFavorites ? "Unfavorite" : "Favorite"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default CocktailList;
