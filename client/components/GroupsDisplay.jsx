/**
 * ************************************
 *
 * @module  GroupsDisplay.jsx
 * @author  Plan It Travel
 * @date    9-4-23
 * @description presentation component that renders the Group components in an array
 *
 * ************************************
 */

import React, { useEffect } from 'react';
import Group from './Group.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups } from '../features/sliceService.js';

// initialState = { groupName="", travelDestination = "", dates="", groupId = "", groupList = []};

const GroupsDisplay = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const groups = useSelector(state => state.groups.groupList);
  console.log(groups);
  const displayGroups = [];

  for (let i = groups.length - 1; i > 0; i--) {
    displayGroups.push(<Group index={i} key={`group_${i}`} groupId = {groups.groupName} />);
  }

  return (
    <div className='displayBox'>
      {displayGroups}
    </div>
  );
};

export default GroupsDisplay;
