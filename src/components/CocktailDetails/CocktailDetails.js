import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CocktailDetails = () => {
    const params = useParams();
    const { id } = params;
    const [cocktailDetails, setCocktailDetails] = useState(null);

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            setCocktailDetails(data.drinks[0]);
        };

        fetchCocktailDetails();
    }, [id]);

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
        </div>
    );
};

export default CocktailDetails;
