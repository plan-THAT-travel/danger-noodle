/**
 * ************************************
 *
 * @module  Login.jsx
 * @author  Plan It Travel
 * @date    9-2-23
 * @description renders Login Page
 *
 * ************************************
 */

import React, { useState } from 'react';

// If we have no user: sign in button
// if we have a user: show the log out button

function handleSignOut(event) {
  setUser({});
  document.getElementById('signInDiv').hidden = false;
}

const Login = props => {
  return (
    <div id='Login'>
      <h1>I am the App</h1>
      <div id='signInDiv'></div>
      <button onClick={e => handleSignOut(e)}>Sign Out</button>
      {props.user && (
        <div>
          <img src={props.user.picture}></img>
          <h3>{props.user.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
