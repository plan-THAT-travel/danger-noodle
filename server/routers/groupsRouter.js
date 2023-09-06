const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/loginController');
const groupsController = require('./../controllers/groupsController');

// get request for all users
//PROPOSED REWORK: Make the GET request return all GROUPS, and all USERS in each GROUP, instead of all Users
/**
 * Get all groups
 *
 * @returns res.status(200).json(res.locals.allUsers)
 */
router.get('/', loginController.verifyUser, groupsController.getGroups,
  (req, res) => {
    res.status(200).json(res.locals.allUsers);
  });

/**
 * Get all groups a specific user is in
 *
 * @returns res.status(200).json()
 */
router.get('/:user_id')

//THIS WILL CREATE A GROUP, TAKING IN A USER_ID
router.post('/create/:user_id', groupsController.createGroup,
  (req, res) => {
    res.status(200).json(res.locals.groupId);
  });

//THIS WILL UPDATE GROUP INFORMATION, TAKING IN A GROUP_ID
router.patch('/update/:group_id')

//THIS WILL GET ALL USERS IN A GROUP, TAKING IN A GROUP_ID
router.get('/users/:group_id')

//THIS WILL ADD A USER TO A GROUP, TAKING IN A GROUP_ID AND USER_ID
router.post('/add/:group_id/:user_id')

//THIS WILL REMOVE A USER FROM A GROUP, TAKING IN A GROUP_ID AND USER_ID
router.patch('/remove/:group_id/:user_id')

//THIS WILL DELETE A GROUP, TAKING IN A GROUP_ID
router.delete('delete/:group_id')

module.exports = router;