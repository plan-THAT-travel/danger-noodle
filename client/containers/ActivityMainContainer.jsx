/**
 * ************************************
 *
 * @module  ActivityMainContainer.jsx
 * @author  Plan It Travel
 * @date    9-4-23
 * @description stateful component that renders ActivityCreatorContainer and ActivityDisplayContainer
 *
 * ************************************
 */

import React from 'react';
import ActivityCreatorContainer from './ActivityCreatorContainer';
import ActivityDisplayContainer from './ActivityDisplayContainer';

const ActivityMainContainer = () => {
  return (
    <div className='container'>
      <div className='outerbox'>
        {/* Need to grab destination from store in state and use in H1 below */}
        <h1> Activities Feed for Trip to Destination </h1>
        <ActivityCreatorContainer />
        <ActivityDisplayContainer />
      </div>
    </div>
  );
};

export default ActivityMainContainer;
