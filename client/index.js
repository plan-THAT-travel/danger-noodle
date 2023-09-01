import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
// import styles from './scss/application.scss'; // eslint-disable-line no-unused-vars

const root = createRoot(document.getElementById('root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
);
