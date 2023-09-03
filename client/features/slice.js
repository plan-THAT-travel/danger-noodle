import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // stuff to add to state
    itineraries: [],

}

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
        setItineraryItems: (state, action) => {
            state.itineraries = action.payload;
        }
    }
})

export const {/* */} = featureSlice.actions;

export default featureSlice.reducer;