const pool = require('../db/postgresModel');
const groupsController = {};

/**
 * response.rows
 * 
 * @returns Array of user objects {_id, firstname, lastname}
 */
groupsController.getAllUsers = async (req, res, next) => {
    try {
      // query database to get all users' id, first, and last name
      const text = 'SELECT _id, firstname, lastname FROM users;';
      const users = await pool.query(text);
      res.locals.allUsers = users.rows;
      next();
    }
    catch (err) {
        const errObj = {
            log: 'groupsController.getAllUsers Error',
            status: 404,
            message: { err: 'An error occurred' },
        };
        return next({ ...errObj, log: err.message});
    };
};

module.exports = groupsController;