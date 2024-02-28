import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';
import { useDispatch } from 'react-redux';
import { fetchCocktailsSuccess } from '../../redux/reducers';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [displaySearchTerm, setDisplaySearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
                dispatch(fetchCocktailsSuccess(response.data.drinks));
                setDisplaySearchTerm('');
            } catch (error) {
                console.error('Error fetching cocktails:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleSearch = (data, term) => {
        dispatch(fetchCocktailsSuccess(data));
    };

    const fetchDataByLetter = async (letter) => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
            handleSearch(response.data.drinks, `letter ${letter}`);
            setDisplaySearchTerm('');
        } catch (error) {
            console.error(`Error fetching cocktails for letter ${letter}:`, error);
        }
    };

    const searchByDrinkName = async () => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
            handleSearch(response.data.drinks, `drink "${searchValue}"`);
            setSearchValue('');
            setDisplaySearchTerm(searchValue);
        } catch (error) {
            console.error(`Error searching by drink ${searchValue}:`, error);
        }
    };

    const fetchRandomDrink = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            handleSearch([response.data.drinks[0]], 'random drink');
            setDisplaySearchTerm('');
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
            <div className="result-message">
                {displaySearchTerm && `Displaying search results for ${displaySearchTerm}`}
            </div>
        </div>
    );
};

export default SearchBar;
