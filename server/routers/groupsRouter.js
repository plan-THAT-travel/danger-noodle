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
router.get('/', groupsController.getAllGroups, (req, res) => {
  res.status(200).json(res.locals.allGroups);
});

/**
 * Get all groups a specific user is in
 *
 * @returns res.status(200).json()
 */

//THIS WILL CREATE A GROUP, TAKING IN A USER_ID
router.post(
  '/create/:user_id',
  groupsController.createGroup,
  groupsController.addUserToGroupId,
  (req, res) => {
    res.status(200).json(res.locals.group_id);
  }
);

//THIS WILL UPDATE GROUP INFORMATION, TAKING IN A GROUP_ID
router.patch('/update/:group_id', groupsController.updateGroup, (req, res) => {
  res.status(200).send('Successfully Updated Group');
});

//THIS WILL GET ALL USERS IN A GROUP, TAKING IN A GROUP_ID
router.get(
  '/users/:group_id',
  groupsController.getAllUsersByGroupId,
  (req, res) => {
    res.status(200).json(res.locals.allUsersByGroup);
  }
);

//THIS WILL ADD A USER TO A GROUP, TAKING IN A GROUP_ID AND USER_ID
router.post(
  '/add/:group_id/:user_id',
  groupsController.addUserToGroupId,
  (req, res) => {
    res.status(200).send('Successfully Added User to Group');
  }
);

//THIS WILL REMOVE A USER FROM A GROUP, TAKING IN A GROUP_ID AND USER_ID
router.delete(
  '/remove/:group_id/:user_id',
  groupsController.removeUserByGroupId,
  (req, res) => {
    res.status(200).send('Successfully Removed User from Group');
  }
);

//THIS WILL DELETE A GROUP, TAKING IN A GROUP_ID
router.delete('/delete/:group_id', groupsController.removeGroup, (req, res) => {
  res.status(200).send('Successfully Removed Group');
});

module.exports = router;
