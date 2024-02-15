// src/components/Favorites.js
import React from 'react';

const Favorites = ({ favorites }) => {
    return (
        <div>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((cocktail) => (
                    <li key={cocktail.idDrink}>
                        <h3>{cocktail.strDrink}</h3>
                        <p>Category: {cocktail.strCategory}</p>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ maxWidth: '100px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
