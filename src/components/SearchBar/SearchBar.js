import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ fetchData }) => {
    const [searchValue, setSearchValue] = useState('');

    const fetchDataByLetter = async (letter) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
            fetchData(response.data.drinks);
        } catch (error) {
            console.error(`Error fetching cocktails for letter ${letter}:`, error);
        }
    };

    const searchByDrinkName = async () => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
            fetchData(response.data.drinks);
        } catch (error) {
            console.error(`Error searching by drink ${searchValue}:`, error);
        }
    };

    const fetchRandomDrink = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            fetchData([response.data.drinks[0]]);
        } catch (error) {
            console.error('Error fetching random drink:', error);
        }
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchValue}
                    onChange={handleInputChange}
                    className="input"
                />
                <button onClick={searchByDrinkName} className="button">Search</button>
                <button onClick={fetchRandomDrink} className="button">Random Drink</button>
            </div>
            <div className="alphabet-buttons">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                    <button key={letter} onClick={() => fetchDataByLetter(letter)} className="alphabet-button">
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
