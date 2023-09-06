const pool = require("../db/postgresModel");
const groupsController = {};

/**
 * Gets all groups from travel_group table OR for specific userId
 *
 * @param {Int} res.locals.userId - Optional
 *
 * @returns res.locals.allGroups
 */
groupsController.getAllGroups = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    // if user_id query string is included, query db by userId
    if (user_id) {
      const values = [user_id];
      const text = `SELECT tg._id, tg.owner_id, tg.group_name, tg.travel_destination FROM travel_group as tg
      JOIN group_members as gm ON tg._id = gm.group_id
      JOIN users ON gm.user_id = users._id
      WHERE users._id = $1;`;
      const allGroups = await pool.query(text, values);
      res.locals.allGroups = allGroups.rows;
    } else {
      const text =
        "SELECT _id, owner_id, group_name, travel_destination FROM travel_group;";
      const allGroups = await pool.query(text);
      res.locals.allGroups = allGroups.rows;
    }

    return next();
  } catch (err) {
    const errObj = {
      log: `groupsController.getAllGroups Error: ${err}`,
      status: 404,
      message: { err: "Error: groupsController.getAllGroups" },
    };
    return next({ ...errObj });
  }
};

/**
 * Creates group in travel_group table
 *
 * @param {string} groupName
 * @param {string} destination
 * @param {Int} user_id
 *
 * @returns res.locals.group_id
 */
groupsController.createGroup = async (req, res, next) => {
  try {
    const { groupName, destination } = req.body;
    const { user_id } = req.params;

    const query = `INSERT INTO travel_group (owner_id, group_name, travel_destination)
    VALUES ($1, $2, $3)
    RETURNING _id;`;
    const values = [user_id, groupName, destination];
    const result = await pool.query(query, values);

    res.locals.group_id = result.rows[0];

    return next();
  } catch (err) {
    const errObj = {
      log: `groupsController.createGroup Error: ${err}`,
      status: 404,
      message: { err: "An error occurred" },
    };
    return next({ ...errObj });
  }
};

/**
 * Updates groupName or destination in travel_group table
 *
 * @param {Int} group_id
 * @param {string} newGroupName
 * @param {string} destination
 *
 */
groupsController.updateGroup = async (req, res, next) => {
  try {
    const { group_id } = req.params;
    const { newGroupName, newDestination } = req.body;

    //Checks which arguments have been passed into the req.body to decide which columns need to be updated
    if (newGroupName && newDestination) {
      const query = `UPDATE travel_group
      SET group_name = $2, travel_destination = $3
      WHERE _id = $1;`;
      const values = [group_id, newGroupName, newDestination];
      await pool.query(query, values);

      return next();
    } else if (newGroupName) {
      const query = `UPDATE travel_group
      SET group_name = $2
      WHERE _id = $1;`;
      const values = [group_id, newGroupName];
      await pool.query(query, values);

      return next();
    } else if (newDestination) {
      const query = `UPDATE travel_group
      SET travel_destination = $2
      WHERE _id = $1;`;
      const values = [group_id, newDestination];
      await pool.query(query, values);

      return next();
    }
  } catch (err) {
    const errObj = {
      log: `groupsController.updateGroup Error: ${err}`,
      status: 404,
      message: { err: "Error: groupsController.updateGroup" },
    };
    return next({ ...errObj });
  }
  //WILL NEED TO SEND A CONFIRMATION OF A SUCCESSFUL UPDATE UPON RETURN TO FINAL MIDDLEWARE, THIS FUNCTION RETURNS NOTHING
};

/**
 * Gets all users by group_id
 *
 * @param {Int} group_id
 *
 * @returns res.locals.allUsersByGroup
 */
groupsController.getAllUsersByGroupId = async (req, res, next) => {
  try {
    const { group_id } = req.params;

    const text = `SELECT users.firstname, users.lastname FROM group_members RIGHT JOIN users ON group_members.user_id = users._id
                  WHERE group_id = $1;`;
    const values = [group_id];

    const allUsersByGroup = await pool.query(text, values);

    // Error: If group_id does not exist in group table
    if (allUsersByGroup.rows.length === 0)
      throw `group_id: ${group_id} returns no rows`;

    res.locals.allUsersByGroup = allUsersByGroup.rows;

    return next();
  } catch (err) {
    const errObj = {
      log: `groupsController.getAllUsersByGroupID Error: ${err}`,
      status: 404,
      message: { err: "Error: groupsController.getAllUsersByGroupId" },
    };
    return next({ ...errObj });
  }
};

groupsController.addUserToGroupId = async (req, res, next) => {
  try {
    let group_id;

    if (res.locals.group_id) {
      group_id = res.locals.group_id._id;
    } else {
      group_id = req.params.group_id;
    }

    const { user_id } = req.params;

    const query = `INSERT INTO group_members (user_id, group_id) 
    VALUES ($1, $2);`;
    const values = [user_id, group_id];

    await pool.query(query, values);
    return next();
  } catch (err) {
    const errObj = {
      log: "groupsController.addUserToGroupId Error",
      status: 404,
      message: { err: "Error: groupsController.addUserToGroupId" },
    };
    return next({ ...errObj });
  }
  //WILL NEED TO SEND A CONFIRMATION OF A SUCCESSFUL INSERT UPON RETURN TO FINAL MIDDLEWARE, THIS FUNCTION RETURNS NOTHING
};

groupsController.removeGroup = async (req, res, next) => {
  try {
    const { group_id } = req.params;

    const query = `DELETE FROM travel_group
    WHERE _id = $1;`;
    const values = [group_id];

    await pool.query(query, values);
    return next();
  } catch (err) {
    const errObj = {
      log: `groupsController.removeGroup Error: ${err}`,
      status: 404,
      message: { err: "Error: groupsController.removeGroup" },
    };
    return next({ ...errObj });
  }
  //WILL NEED TO SEND A CONFIRMATION OF A SUCCESSFUL DELETE UPON RETURN TO FINAL MIDDLEWARE, THIS FUNCTION RETURNS NOTHING
};

groupsController.removeUserByGroupId = async (req, res, next) => {
  try {
    const { group_id, user_id } = req.params;

    const query = `DELETE FROM group_members
    WHERE group_id = $1 AND user_id = $2;`;
    const values = [group_id, user_id];

    await pool.query(query, values);
    return next();
  } catch (err) {
    const errObj = {
      log: `groupsController.removeUserByGroupId Error: ${err}`,
      status: 404,
      message: { err: "Error: groupsController.removeUserByGroupId" },
    };
    return next({ ...errObj });
  }
  //WILL NEED TO SEND A CONFIRMATION OF A SUCCESSFUL DELETE UPON RETURN TO FINAL MIDDLEWARE, THIS FUNCTION RETURNS NOTHING
};

module.exports = groupsController;
