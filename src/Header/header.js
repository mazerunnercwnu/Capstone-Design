import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
function Header() {
    return (
        <Link style = {{textDecoration : 'none'}} to = '../'>
            <div className="head">
                <h1>The Maze Runner</h1>
            </div>
        </Link>
    )
}

export default Header