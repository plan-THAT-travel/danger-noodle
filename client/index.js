/**
 * ************************************
 *
 * @module  index.js
 * @author  Plan It Travel
 * @date    9-1-23
 * @description entry point for application. Hangs React app off of #root in index.html
 *
 * ************************************
 */

import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Trip from './pages/Trip';
import store from './store';
import GCID_URI from './pages/clientURLs';
// import styles from './scss/application.scss'; // eslint-disable-line no-unused-vars

export default function App() {
  const [user, setUser] = useState({}); // currently using state, but need to use Redux store instead
  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: GCID_URI,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route index element={<Login user={user} />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Trip' element={<Trip />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
);
