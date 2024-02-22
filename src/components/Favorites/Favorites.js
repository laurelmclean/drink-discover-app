import React from 'react';
import './Favorites.css';
import { useDispatch, useSelector } from 'react-redux';
import { pinFavorite, removeFavorite } from '../../redux/reducers';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    const noFavoritesMarkup = <div className="favorites-container">
        <h2>No Favorites</h2>
    </div>

    const favoritesMarkup = (
        <div className="favorites-container">
            <h2>Favorites</h2>
            <div className="favorites-grid">
                {favorites.map((cocktail) => {
                    // Check if the current cocktail is in favorites
                    const isInFavorites = favorites.some((favCocktail) => favCocktail.idDrink === cocktail.idDrink);

                    return (
                        <div className="favorite-item" key={cocktail.idDrink}>
                            <Link to={`/details/${cocktail.idDrink}`}>
                                <h3>{cocktail.strDrink}</h3>
                            </Link>
                            <p>Category: {cocktail.strCategory}</p>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="favorite-image" />
                            {/* Conditionally render based on whether it's in favorites */}
                            <button onClick={() => { isInFavorites ? dispatch(removeFavorite(cocktail)) : dispatch(pinFavorite(cocktail)) }}>
                                {isInFavorites ? 'Unfavorite' : 'Favorite'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div>
            {favorites.length > 0 ? favoritesMarkup : noFavoritesMarkup}
        </div>
    );
};

export default Favorites;
