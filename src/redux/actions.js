// src/redux/actions.js
export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const PIN_FAVORITE = 'PIN_FAVORITE';

export const fetchCocktailsSuccess = (cocktails) => ({
    type: FETCH_COCKTAILS_SUCCESS,
    payload: cocktails,
});

export const pinFavorite = (cocktail) => ({
    type: PIN_FAVORITE,
    payload: cocktail,
});
