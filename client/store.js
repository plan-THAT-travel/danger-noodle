// import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import slice from '../client/features/slice';
import userSlice from '../client/features/user/userSlice'
// import thunk from 'redux-thunk';

const store = configureStore(
  {
    reducer: { 
      groups: slice,
      users: userSlice, 
    },
  },
  // composeWithDevTools(/* applyMiddleware(thunk) */),
);

// store.dispatch(loadMarkets());

export default store;
