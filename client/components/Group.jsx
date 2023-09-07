/**
 * ************************************
 *
 * @module  Group.jsx
 * @author  Plan It Travel
 * @date    9-4-23
 * @description presentation component that renders a single box for each group
 *
 * ************************************
 */

/* Container for Groups Display to show each Group component the user created and or signed up for with onClick to expand to see user itinerary */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DELETE_GROUP } from '../features/slice';

const Group = (props) => {
  const navigate = useNavigate();
  const groupsList = useSelector(state => state.groups.groupList);
  const dispatch = useDispatch();

  return (
    <div className='groupBox'>
      <p>
        <strong>Group Name: </strong>
        {`${groupsList[props.index].group_name}`}
      </p>
      <p>
        <strong>Travel Destination: </strong>
        {`${groupsList[props.index].travel_destination}`}
      </p>
      <p>
        <strong>Start Date: </strong>
        {`${groupsList[props.index].start_date}`}
      </p>
      <p>
        <strong>End Date: </strong>
        {`${groupsList[props.index].end_date}`}
      </p>
      <button style={{ marginTop: '10px'}} onClick={() => navigate('/trip')}>Itinerary</button>
      <button style={{ marginTop: '10px' }}onClick={() => dispatch(DELETE_GROUP(groupsList[props.index].groupName))}>Delete Group</button>
    </div>
  );
};

export default Group;
