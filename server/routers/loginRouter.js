const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// check every incoming request, 
// check for a cookie before any request
// create a middleware that handles checking for cookies

router.post('/login', loginController.verifyUser, (req, res) => { 
    console.log('saved user to database');
    return res.status(201);
});


module.exports = router;