import React from 'react';
import './Favorites.css';
import { useDispatch, useSelector } from 'react-redux';
import { pinFavorite, removeFavorite } from '../../redux/reducers';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);

    const noFavoritesMarkup = <div className="favorites-container">
        <h2>You haven't favorited any drinks yet!</h2>
        <Link to={'/'}>
            <h3>Browse</h3>
        </Link>
    </div>

    const favoritesMarkup = (
        <div className="favorites-container">
            <h2>Favorites</h2>
            <div className="favorites-grid">
                {favorites.map((cocktail) => {
                    // Check if the current cocktail is in favorites
                    const isInFavorites = favorites.some((favCocktail) => favCocktail.idDrink === cocktail.idDrink);

                    return (
                        <div className="favorites-item" key={cocktail.idDrink}>
                            <Link to={`/details/${cocktail.idDrink}`}>
                                <h3>{cocktail.strDrink}</h3>
                            
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="favorites-image" />
                            </Link>
                            
                            {/* Conditionally render based on whether it's in favorites */}
                            <button className="favorite-button" onClick={() => { isInFavorites ? dispatch(removeFavorite(cocktail)) : dispatch(pinFavorite(cocktail)) }}>
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
