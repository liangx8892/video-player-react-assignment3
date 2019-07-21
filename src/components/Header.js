
import React from 'react'
import '../styles/header.scss';
import { NavLink } from "react-router-dom";

const Header = () => (
    <nav className="navbar">
        <a className="navbar-brand">
            <i className="fab fa-react fa-2x"></i>
            <span>Video Player</span>
        </a>
 
        <ul className="menu">
            <li>
                <NavLink to="/" exact activeClassName="active">Play</NavLink>
            </li>
            <li>
                <NavLink to="/edit/" exact activeClassName="active">New Video</NavLink>
            </li>
        </ul>
    </nav>
)

export default Header