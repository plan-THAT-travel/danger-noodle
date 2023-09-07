/**
 * ************************************
 *
 * @module  GroupCreator.jsx
 * @author  Plan It Travel
 * @date    9-4-23
 * @description presentation component that takes user input for new group creation
 *
 * ************************************
 */

/* Container for Group Creator Component with Input field for Name of Group/Trip and Start/End Dates and Submit button to POST */

import React, { useRef, useState } from 'react';
import { ADD_GROUP, ADD_GROUP_SUCCESS } from '../features/slice';
import { useSelector, useDispatch } from 'react-redux';
import { addGroup as addGroupService } from '../features/sliceService'; 


const GroupCreator = props => {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const dispatch = useDispatch();


  const DatePicker = {
    // const dates = useSelector(state => state.groups.dates);
    dateInputRef : useRef(null),
    handleChangeStart : e => {
      setStartDate(e.target.value)
    },
    handleChangeEnd : e => {
      setEndDate(e.target.value)
    },
  };
  
  const userId = useSelector(state => state.groups.user._id);

  const addGroup = async () => {
    const group_name = document.getElementById('groupName').value;
    console.log('this is in groupCreator ', group_name);
    const travel_destination =
    document.getElementById('travelDestination').value;
    if (!group_name || !travel_destination) {
      console.log('Please fill in group name or destination')
      alert('Please fill in the Group Name or Travel Destination')
      return;
    }

    dispatch(ADD_GROUP({ group_name, travel_destination, start_date, end_date }));
    try {
      const newGroupResponse = await addGroupService({ group_name, travel_destination, start_date, end_date }, userId);
      console.log('this is the response from the server ', newGroupResponse)
      dispatch(ADD_GROUP_SUCCESS({ group_name, travel_destination, start_date, end_date, group_id: newGroupResponse }))
    } catch (error) {
      console.error('Failed to add the group: ', error);
    }

    
    // addGroupService({ group_name, travel_destination, start_date, end_date }, userId);
    document.getElementById('groupName').value = '';
    document.getElementById('travelDestination').value = '';
    document.getElementById('start_date').value = '';
    document.getElementById('end_date').value = '';
  };

  

  return (
    <div>
      <h2 id='new-group'>Create New Group</h2>
      <label htmlFor='groupName'>Group Name: </label>
      <input type='text' id='groupName'></input>
      <label htmlFor='travelDestination'>Travel Destination: </label>
      <input type='text' id='travelDestination'></input>
      <p>Start Date: {start_date} </p>
      <input
        type='date'
        id='start_date'
        onChange={DatePicker.handleChangeStart}
        ref={DatePicker.dateInputRef}></input><br></br>
      <p>End Date: {end_date} </p>
      <input
        type='date'
        id='end_date'
        onChange={DatePicker.handleChangeEnd}
        ref={DatePicker.dateInputRef}></input><br></br>
      <button type='button' onClick={() => addGroup()}>
        Add Group
      </button>
    </div>
  );
};

export default GroupCreator;
