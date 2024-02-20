// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by ingredient"
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <button onClick={searchByDrinkName}>Search</button>
                <button onClick={fetchRandomDrink}>Random Drink</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                    <button key={letter} onClick={() => fetchDataByLetter(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
