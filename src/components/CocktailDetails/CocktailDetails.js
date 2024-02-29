import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCocktailsSuccess,
  pinFavorite,
  removeFavorite,
} from "../../redux/reducers";
import "./CocktailDetails.css";

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
      const cachedCocktail = cocktails.find(
        (cocktail) => cocktail.idDrink === id
      );

      if (cachedCocktail) {
        setCocktailDetails(cachedCocktail);
      } else {
        // If not, fetch from API
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
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
  const isInFavorites = favorites.some(
    (favCocktail) => favCocktail.idDrink === cocktailDetails.idDrink
  );

  return (
    <div className="cocktail-container">
      <div className="text-container">
        <div className="details-name-and-heart">
        <h2>{cocktailDetails.strDrink}</h2>
              <i
                  className={`fa ${isInFavorites ? "fa-heart" : "fa-heart-o"} fa-2x`}
                  aria-hidden="true"
                  style={{
                      color: isInFavorites ? "black" : "black",
                      cursor: "pointer",
                  }}
                  onClick={() => {
                      isInFavorites
                          ? dispatch(removeFavorite(cocktailDetails))
                          : dispatch(pinFavorite(cocktailDetails));
                  }}
              ></i>
              </div>
              <p><strong>Category:</strong> {cocktailDetails.strCategory}</p>
              <p><strong>Glass Type:</strong> {cocktailDetails.strGlass}</p>
        <div>
                  <p><strong>Ingredients:</strong></p>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{`${measures[index]} ${ingredient}`}</li>
            ))}
          </ul>
        </div>
              <p><strong>Instructions:</strong> {cocktailDetails.strInstructions}</p>
      </div>
      <div className="image-container">
        <img
          src={cocktailDetails.strDrinkThumb}
          alt={cocktailDetails.strDrink}
        />
      </div>
    </div>
  );
};

export default CocktailDetails;
