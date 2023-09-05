const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/loginController');
const groupsController = require('./../controllers/groupsController');

// get request for all users
router.get('/', loginController.verifyUser, groupsController.getGroups, 
  (req, res) => {
    res.status(200).json(res.locals.allUsers); 
}); 
// Verify user middleware checks if user is logged in, if so ->
// grab id, first, and last name and return in an array


router.post('/:user_id/group/:_id', groupsController.addUserToGroup, 
  (req, res) => {
 



})

module.exports = router;