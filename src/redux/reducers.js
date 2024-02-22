import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cocktails: [],
    favorites: [],
};

const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {
        fetchCocktailsSuccess: (state, action) => {
            state.cocktails = action.payload;
        },
        pinFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(cocktail => cocktail.idDrink !== action.payload.idDrink);
        },
    },
});

export const { fetchCocktailsSuccess, pinFavorite, removeFavorite } = cocktailsSlice.actions;
export default cocktailsSlice.reducer;
