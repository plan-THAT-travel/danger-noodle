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
            log: 'groupsController.getAllUsers Error',
            status: 404,
            message: { err: 'An error occurred' },
        };
        return next({ ...errObj });
    };
};

groupsController.createGroup = async (req, res, next) => {



};


groupsController.addUserToGroup = async (req, res, next) => {
    // post request adds users to a group
    // takes in a user id and a group id
    const userID = req.body.user_id;
    const groupID = req.body.group_id;
    console.log('this is user ID', userID, 'this is groupID', groupID);
    // insert user id and group id values into group members table
    const text = `INSERT INTO group_members (user_id, group_id) 
    VALUES (${userID}, ${groupID});`

};

module.exports = groupsController;