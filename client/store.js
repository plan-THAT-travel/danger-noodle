// import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

const store = configureStore(
  {
    reducer: {
    },
  },
  composeWithDevTools(/* applyMiddleware(thunk) */),
);

// store.dispatch(loadMarkets());

export default store;
