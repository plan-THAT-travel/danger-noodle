import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    _id: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USERNAME: (state, action) => {
            state.username = action.payload.username;
            state._id = action.payload._id;
        }
    }
})

export const { SET_USERNAME } = userSlice.actions;

export default userSlice.reducer;

