import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cocktails: [],
    favorites: [],
    isLoading: false,
};

// Load favorites from local storage if available
const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState: {
        ...initialState,
        favorites: savedFavorites,
    },
    reducers: {
        fetchCocktailsStart: (state) => {
            state.isLoading = true;
        },
        fetchCocktailsSuccess: (state, action) => {
            state.cocktails = action.payload;
            state.isLoading = false;
        },
        pinFavorite: (state, action) => {
            state.favorites.push(action.payload);
            // Save favorites to local storage
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(cocktail => cocktail.idDrink !== action.payload.idDrink);
            // Save favorites to local storage
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
});

export const { fetchCocktailsSuccess, pinFavorite, removeFavorite, fetchCocktailsStart } = cocktailsSlice.actions;
export default cocktailsSlice.reducer;
