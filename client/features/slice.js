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
    groupId: '',
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
  users: {
    userName: '',
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

export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    ADD_GROUP: (state, action) => {
      // post to server with action.payload then create newGroup from response?
      
      const newGroup = {
        groupName: action.payload.groupName,
        // groupId: response with group_id?
        travelDestination: action.payload.travelDestination,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
      console.log(action)
      state.groupList.push(newGroup);
      // console.log('after adding', groupList)
      // return {...state, groupList: [...state.groupList, newGroup]};
      return state;
    },
    GET_GROUP_LIST: (state, action) => {
      // user_id = state.user_id;
      console.log('inside get group list')
      // state.groupList = sliceService.fetchGroups();
      
    },
    DELETE_GROUP: (state, action) => {
      // get the group name via action.payload and filter it out from array
      // issue is same names get deleted. will have to figure out by id
      const groupName = action.payload;
      state.groupList = state.groupList.filter((group) => group.groupName !== groupName)
      console.log(state.groupList)
    },
    UPDATE_USER: (state, action) => {
      state.users.user = action.payload.name;
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

export const { ADD_GROUP, UPDATE_USER, setItineraryItems, DELETE_GROUP, GET_GROUP_LIST } = featureSlice.actions;

export default featureSlice.reducer;
