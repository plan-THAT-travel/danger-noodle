/**
 * ************************************
 *
 * @module  slice.js
 * @author  Plan It Travel
 * @date    9-4-23
 * @description reducer or slice for user/group/activity data
 *
 * ************************************
 */

import { createSlice } from '@reduxjs/toolkit';
import sliceService from './sliceService';

//this state governs the state of the entire app
const initialState = {
  groupId: 1,
  newGroup: {
    group_name: '',
    travel_destination: '',
    start_date: '',
    end_date: '',
    group_id: '',
  },
  groupList: [],
  newActivity: {
    activityName: '',
    activityDestination: '',
    date: '',
    times: '',
    activityId: '',
    participantList: [],
    link: '',
    description: '',
  },
  activityList: [],
  user: {
    username: '',
    _id: '',
  },
};

/*

response = fetch(/api/itineraries/1)

response is below
[{
    itinerary_id,
    title,
    category
    hyperlink,
    cost,
    date,
    group_id
}]

Use a reducer to update the state -> Look into useDispatch and useSelector
Update state in the itinerary container
*/

/*

{[arrayofComponents]}

*/

/* EXAMPLE REQ.BODY for POST to create group
{
    "groupName": "Cool Kids",
    "destination": "Miami",
    "startDate": "2023-09-10 12:30:00",
    "endDate": "2023-10-01 12:30:00"
}
*/

export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    ADD_GROUP: (state, action) => {
      // post to server with action.payload then create newGroup from response?
      const newGroup = {
        user_id: state.user._id,
        group_name: action.payload.group_name,
        // group_id: action.payload._id,
        travel_destination: action.payload.travel_destination,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date,
      };
      // console.log(action)

      sliceService.addGroup(newGroup)
      // state.groupList.push(newGroup);
      // console.log('after adding', groupList)
      // return {...state, groupList: [...state.groupList, newGroup]};
      return state;
    },
    ADD_GROUP_SUCCESS: (state, action) => {
      state.groupList.push(action.payload);
    },
    GET_GROUP_LIST: (state, action) => {
      // user_id = state.user._id;
      // state.groupList = sliceService.fetchGroups();
      state.groupList = action.payload;
    },
    DELETE_GROUP: (state, action) => {
      // get the group name via action.payload and filter it out from array
      // issue is same names get deleted. will have to figure out by id
      const group_id = action.payload;
      (console.log('This is the group_id', group_id))
      state.groupList = state.groupList.filter((group) => group._id !== group_id)
      console.log(state.groupList)
      sliceService.deleteGroup(group_id)
    },
    SET_USERNAME: (state, action) => {
      state.user.username = action.payload.username;
      state.user._id = action.payload._id;
    },
    UPDATE_USER: (state, action) => {
      state.user.user = action.payload.name;
      return state;
    },
    setItineraryItems: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.groupList = action.payload;
        // console.log(action.payload)
      }
    }
  },
});

export const { ADD_GROUP, SET_USERNAME, UPDATE_USER, setItineraryItems, DELETE_GROUP, GET_GROUP_LIST, ADD_GROUP_SUCCESS } = featureSlice.actions;

export default featureSlice.reducer;
