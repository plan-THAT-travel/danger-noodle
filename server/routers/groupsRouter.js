const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/loginController');
const groupsController = require('./../controllers/groupsController');

// get request for all users
router.get('/', loginController.verifyUser, groupsController.getAllUsers, 
  (req, res) => {
    return res.status(200).json(res.locals.allUsers); 
}); 

// middleware to check if user is logged in, if so
// grab id, first and last name and return in an array


router.post()
// post request adds users to a group
// takes in a user id and a group id
// insert into group members table values -> user id and group id

module.exports = router;