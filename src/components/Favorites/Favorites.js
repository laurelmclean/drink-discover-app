import React from 'react';
import './Favorites.css'; 

const Favorites = ({ favorites }) => {
    return (
        <div className="favorites-container">
            <h2>Favorites</h2>
            <div className="favorites-grid">
                {favorites.map((cocktail) => (
                    <div className="favorite-item" key={cocktail.idDrink}>
                        <h3>{cocktail.strDrink}</h3>
                        <p>Category: {cocktail.strCategory}</p>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="favorite-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
