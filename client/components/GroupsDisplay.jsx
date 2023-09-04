/**
 * ************************************
 *
 * @module  GroupsDisplay.jsx
 * @author  Plan It Travel
 * @date 9-4-23
 * @description presentation component that renders the Group components in an array
 *
 * ************************************
 */

import React from 'react';
import Group from './Group.jsx';
import { useSelector } from 'react-redux';

// initialState = { GroupName="", travelDestination = "", startDate="", endDate="", groupId = "", groupList = []};

const GroupsDisplay = () => {
  const groups = useSelector(state => state.groups);
  const displayGroups = [];

  for (let i = 0; i < groups.groupList.length; i++) {
    displayGroups.push(<Group key={groups.groupList.groupId} />);
  }

  return (
    <div className='displayBox'>
      <h4>Your Trips</h4>
      {displayGroups}
    </div>
  );
};

export default GroupsDisplay;
