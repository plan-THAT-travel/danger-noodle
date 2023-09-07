import { ADD_GROUP, DELETE_GROUP, UPDATE_USER, setItineraryItems } from './slice';
const API_URL = 'http://localhost:3000/';

// const groupList = async () => {
//     // const params = {
//     //     user_id : state.user_id,
//     // }
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json'
//         }, 
//     }
//     const response = await fetch (API_URL + 'api/groups/', options);
//     console.log('inside group list')
//     const data = await response.json();
//     return data;
// }
export const fetchGroups = () => async (dispatch) => {
    try {
      const response = await fetch(API_URL + 'api/groups', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('sliceservice', data)
      dispatch(setItineraryItems(data)); // Assuming data is an array of itineraries.
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };



const sliceService = {
    fetchGroups,
};

export default sliceService;