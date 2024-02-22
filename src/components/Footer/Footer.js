import React from 'react';
import './Footer.css';

function Footer() {
    let dateObj = new Date();

    return (
        <div className='Footer'>
            <p>Laurel McLean - Webpage Design - Copyright {dateObj.getFullYear()}</p>
            <p>Cocktails and Images from <a href='https://www.thecocktaildb.com/' target='blank'>The Cocktail DB</a></p>
        </div>
    )
};

export default Footer;