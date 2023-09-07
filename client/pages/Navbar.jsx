/**
 * ************************************
 *
 * @module  Navbar.jsx
 * @author  Plan It Travel
 * @date    9-2-23
 * @description renders navigation bar
 *
 * ************************************
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Trip from './Trip';

function Navbar() {
  return (
    <nav className ="navbar container">
      <ul className="nav-list">
        <li className="nav-item" id='nav-bar'>
          <Link to='/'>Login</Link>
          </li>
          <li className="nav-item">
          <Link to='/home'>Home</Link>
          </li>
          <li className="nav-item">
          <Link to='/trip'>Trips</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
