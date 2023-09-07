/**
 * ************************************
 *
 * @module  Home.jsx
 * @author  Plan It Travel
 * @date    9-2-23
 * @description renders Home Page
 *
 * ************************************
 */

import React from 'react';
import Navbar from './Navbar';
import GroupMainContainer from '../containers/GroupMainContainer';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="user-container">
        {/* Main container for all User components */}
        <GroupMainContainer />
      </main>
   
    </div>
  );
};

export default Home;
