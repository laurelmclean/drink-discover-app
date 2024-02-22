import React from 'react';
import CocktailList from './CocktailList/CocktailList';
import SearchBar from './SearchBar/SearchBar';

const HomePage = () => {

    return (
        <div>
            <SearchBar />
            <CocktailList />
        </div>
    );
};

export default HomePage;
