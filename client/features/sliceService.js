import { ADD_GROUP, GET_GROUP_LIST, DELETE_GROUP, UPDATE_USER, setItineraryItems } from './slice';
import { useSelector } from 'react-redux';
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
      dispatch(GET_GROUP_LIST(data)); // Assuming data is an array of itineraries.
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  //const userId = useSelector(state => state.groups.user._id);

export const addGroup = async (userdata, userId) => {
    try {
    let returnData;
    const data = JSON.stringify(userdata);
    console.log('this is the data being sent, ', data)
    console.log('this is the user_id ', userId, ' it is of type ', typeof userId)
    const response = await fetch(API_URL + `api/groups/create/${userId}`, {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data,
    })
    .then(response => {
      returnData = response.json();
    })
    return returnData;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
}

export const deleteGroup = async (group_id) => {
  try {
    console.log(group_id)
    const response = await fetch(API_URL + `api/groups/delete/${group_id}`, {
      method:'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })

  } catch(error) {
    console.log("Error deleting groups:", error)
  }
}




const sliceService = {
    fetchGroups,
    addGroup,
    deleteGroup
};

export default sliceService;