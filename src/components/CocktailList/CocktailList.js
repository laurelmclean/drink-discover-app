import React from 'react';
import './CocktailList.css';

const CocktailList = ({ cocktails, pinFavorite }) => {
    return (
        <div className="cocktail-list-container">
            <h2>Cocktail List</h2>
            <div className="cocktail-grid">
                {cocktails.map((cocktail) => (
                    <div className="cocktail-item" key={cocktail.idDrink}>
                        <h3>{cocktail.strDrink}</h3>
                        <p>Category: {cocktail.strCategory}</p>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
                        <button onClick={() => pinFavorite(cocktail)}>Pin</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CocktailList;
