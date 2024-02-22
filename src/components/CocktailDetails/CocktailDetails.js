import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktailsSuccess, pinFavorite, removeFavorite } from '../../redux/reducers';

const CocktailDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const [cocktailDetails, setCocktailDetails] = useState(null);

    const cocktails = useSelector((state) => state.cocktails);
    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            // Check if the cocktail details are already in the Redux state
            const cachedCocktail = cocktails.find((cocktail) => cocktail.idDrink === id);

            if (cachedCocktail) {
                setCocktailDetails(cachedCocktail);
            } else {
                // If not, fetch from API
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                const fetchedCocktail = data.drinks[0];
                setCocktailDetails(fetchedCocktail);

                dispatch(fetchCocktailsSuccess([...cocktails, fetchedCocktail]));
            }
        };

        fetchCocktailDetails();
    }, [id, dispatch, cocktails]);

    if (!cocktailDetails) {
        return <div>Loading...</div>;
    }

    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if (cocktailDetails[ingredientKey]) {
            ingredients.push(cocktailDetails[ingredientKey]);
            measures.push(cocktailDetails[measureKey]);
        }
    }

    // Check if the current cocktail is in favorites
    const isInFavorites = favorites.some((favCocktail) => favCocktail.idDrink === cocktailDetails.idDrink);

    return (
        <div>
            <h2>{cocktailDetails.strDrink}</h2>
            <p>Category: {cocktailDetails.strCategory}</p>
            <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} />

            <div>
                <p>Ingredients:</p>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{`${measures[index]} ${ingredient}`}</li>
                    ))}
                </ul>
            </div>

            <p>Glass Type: {cocktailDetails.strGlass}</p>
            <p>Instructions: {cocktailDetails.strInstructions}</p>

            {/* Conditionally render based on whether it's in favorites */}
            <button onClick={() => { isInFavorites ? dispatch(removeFavorite(cocktailDetails)) : dispatch(pinFavorite(cocktailDetails))}}>
                {isInFavorites ? 'Unfavorite' : 'Favorite'}
            </button>
        </div>
    );
};

export default CocktailDetails;
