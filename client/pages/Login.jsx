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
// if we have a user: show the sign out button

// function handleSignOut(event) {
//   setUser({});
//   document.getElementById('signInDiv').hidden = false;
// }

const Login = props => {
  return (
    <div id='Login'>
      <h1>Plan It Travel Login Page</h1>
      <div id='signInDiv'></div>
      {/* {Object.keys(props.user).length != 0 && (
        <button onClick={e => handleSignOut(e)}>Sign Out</button>
      )} */}
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
