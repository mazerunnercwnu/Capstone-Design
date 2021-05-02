import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
function Header() {
    return (
        <a href = '../' style = {{textDecoration : 'none'}}>
            <div className="head">
                <h1>CWNU Runner</h1>
            </div>
        </a>
    )
}

export default Header