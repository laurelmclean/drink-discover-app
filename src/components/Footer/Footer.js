import React from 'react';
import './Footer.css';

function Footer() {
    let dateObj = new Date();

    return (
        <div className='Footer'>
            <p>Laurel McLean - Webpage Design - Copyright {dateObj.getFullYear()}</p>
            <p>Images and content sourced from Google</p>
        </div>
    )
};

export default Footer;