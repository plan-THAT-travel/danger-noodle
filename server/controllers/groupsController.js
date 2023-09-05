const pool = require('../db/postgresModel');
const groupsController = {};

/**
 * response.rows
 * 
 * @returns Array of user objects {_id, firstname, lastname}
 */
groupsController.getGroups = async (req, res, next) => {
    try {
      // query database to get all users' id, first, and last name
      const text = 'SELECT _id, firstname, lastname FROM users;';
      const users = await pool.query(text);
      res.locals.allUsers = users.rows;
      console.log(res.locals.allUsers);
      next();
    }
    catch (err) {
        const errObj = {
            log: 'groupsController.getGroups Error',
            status: 404,
            message: { err: 'An error occurred' },
        };
        return next({ ...errObj });
    };
};

groupsController.createGroup = async (req, res, next) => {
  const { groupName, travelDestination } = req.body;
  const { users_id } = req.params;

  res.locals.groupId = 3;

  const text = `INSERT INTO travel_group`

};


groupsController.addUserToGroup = async (req, res, next) => {
    // post request adds users to a group
    // takes in a user id and a group id
    const { user_id, group_id } = req.body;

    console.log('this is user ID', user_id, 'this is groupID', group_id);
    // insert user id and group id values into group members table

    const text = `INSERT INTO group_members (user_id, group_id) 
    VALUES (${user_id}, ${group_id});`

};

module.exports = groupsController;