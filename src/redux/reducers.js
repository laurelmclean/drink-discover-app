// src/redux/reducers.js
import { FETCH_COCKTAILS_SUCCESS, PIN_FAVORITE } from './actions';

const initialState = {
    cocktails: [],
    favorites: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COCKTAILS_SUCCESS:
            return {
                ...state,
                cocktails: action.payload,
            };
        case PIN_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        default:
            return state;
    }
};

export default rootReducer;
