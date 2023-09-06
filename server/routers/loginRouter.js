const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// check every incoming request,
// check for a cookie before any request
// create a middleware that handles checking for cookies

router.post('/login', loginController.verifyUser, (req, res) => {
  console.log('saved user to database');
  //send username and a status of 201 if successful
  return res.status(201).json(res.locals.username);
});

module.exports = router;
