const API_URL = 'http://localhost:3000/';

const groupList = async (user_id) => {
    const params = {
        user_id : state.user_id,
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }, 
    }
    const response = await fetch (API_URL + 'api/groups/', params, options);
    const data = await response.json();
    return data;
}




const sliceService = {
    groupList,
};

export default sliceService;