/**
 * ************************************
 *
 * @module  GroupMainContainer.jsx
 * @author  Plan It Travel
 * @date    9-4-23
 * @description stateful component that renders GroupCreatorContainer and GroupDisplayContainer
 *
 * ************************************
 */

import React from 'react';
import { useSelector } from 'react-redux'
import GroupCreatorContainer from './GroupCreatorContainer';
import GroupDisplayContainer from './GroupDisplayContainer';

const GroupMainContainer = () => {
  const userState = useSelector(state => state.groups.user.username)
  const usernameBeforeAt = userState.split('@')[0];

  return (
    <div className='container'>
      <div className='outerbox'>
        {/* Need to grab user name from Login to store in state and use in H1 below */}
        <main className="content-container">
          <h1 className="main-title"> Plan-it Travel Trips for {usernameBeforeAt} </h1>
          <GroupCreatorContainer />
          <GroupDisplayContainer />
        </main>
      
      </div>
    </div>
  );
};

export default GroupMainContainer;
