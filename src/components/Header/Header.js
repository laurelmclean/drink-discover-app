import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <div className='Title'>
            <header>
                <h1>Drink Discover</h1>
                <div className='Title-Subtitle'>Discover your new favourite cocktail!</div>
                <div className='nav-section'>
                    <NavLink
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='/'>Browse Drinks</NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='/favorites'>My Favorites</NavLink>

                </div>
            </header>
        </div>
    )
};

export default Header;