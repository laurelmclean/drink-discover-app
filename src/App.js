// src/components/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktailsSuccess, pinFavorite } from './redux/actions';
import CocktailList from './components/CocktailList/CocktailList';
import Favorites from './components/Favorites/Favorites';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        dispatch(fetchCocktailsSuccess(response.data.drinks));
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSearch = (data) => {
    dispatch(fetchCocktailsSuccess(data));
  };

  return (
    <div>
      <Header />
      <SearchBar fetchData={handleSearch} />
      <CocktailList cocktails={cocktails} pinFavorite={(cocktail) => dispatch(pinFavorite(cocktail))} />
      <Favorites favorites={favorites} />
      <Footer />
    </div>
  );
};

export default App;
