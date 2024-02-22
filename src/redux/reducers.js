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
    },
});

export const { fetchCocktailsSuccess, pinFavorite } = cocktailsSlice.actions;
export default cocktailsSlice.reducer;
