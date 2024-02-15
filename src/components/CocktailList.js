// src/components/CocktailList.js
import React from 'react';

const CocktailList = ({ cocktails, pinFavorite }) => {
    return (
        <div>
            <h2>Cocktail List</h2>
            <ul>
                {cocktails.map((cocktail) => (
                    <li key={cocktail.idDrink}>
                        <h3>{cocktail.strDrink}</h3>
                        <p>Category: {cocktail.strCategory}</p>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ maxWidth: '100px' }} />
                        <button onClick={() => pinFavorite(cocktail)}>Pin</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CocktailList;
