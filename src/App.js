// src/components/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktailsSuccess, pinFavorite } from './redux/actions';
import CocktailList from './components/CocktailList';
import Favorites from './components/Favorites';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t");
        dispatch(fetchCocktailsSuccess(response.data.drinks));
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <CocktailList cocktails={cocktails} pinFavorite={(cocktail) => dispatch(pinFavorite(cocktail))} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
