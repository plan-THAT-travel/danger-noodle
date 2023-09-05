const pool = require('./../db/postgresModel');
const itineraryController = {};

/**
 * If the userId and groupId are not found in our user_group table,
 * we should throw an error because this combination was not found.
 *
 * @param {Int} req.params.groupId
 * @param {Int} res.locals.userId
 *
 * @returns res.locals
 */
itineraryController.verifyUserGroup = async (req, res, next) => {
  try {
    // Deconstruct group and user
    const { userId } = res.locals;
    const { groupId } = req.params;

    // Check if userId and groupId exist together if so -> proceed
    // else -> throw error
    const text = `
    SELECT *
    FROM group_members
    WHERE user_id=($1) AND group_id=($2);
    `;
    const values = [userId, groupId];
    const result = await pool.query(text, values);
    if (!result.rows.length) {
      throw new Error(
        `itineraryController.verifyUserGroup Error: No combination for User: ${userId} and Group: ${groupId}`
      );
    }

    // If we have a row we can move on to the next verification
    return next();
  } catch (err) {
    const errObj = {
      log: 'itineraryController.verifyUserGroup Error',
      message: { error: 'itineraryController.verifyUserGroup Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

/**
 * Gets the itinerary for the userId and groupId
 *
 * @param {Int} res.locals.groupId
 *
 * @returns {Array<Object>} res.locals.itineraries
 * @returns All itineraries for the group Id
 */
itineraryController.getAllItineraries = async (req, res, next) => {
  //
  try {
    // Destructure groupId
    const { groupId } = req.params;

    // Write Query to Select itineraries for groupId
    const text = `
    SELECT _id, group_id, title, category, hyperlink, cost,  to_char(date_of_event, 'DD Mon YYYY hh:mm') as date_of_event
    FROM itinerary_item
    WHERE group_id=($1)
    ORDER BY itinerary_item.date_of_event ASC;
    `;
    const value = [groupId];
    const result = await pool.query(text, value);
    console.log(result);
    res.locals.itineraries = result.rows;

    return next();
  } catch (err) {
    const errObj = {
      log: 'itineraryController.getAllItineraries Error',
      message: { error: 'itineraryController.getAllItineraries Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

itineraryController.addItinerary = async (req, res, next) => {
  //
  try {
    // Destructure itinerary items
    console.log(req.body);
    const { group_id, title, category, hyperlink, cost, date_of_event } =
      req.body;

    // Write statement to insert
    const text = `
    INSERT INTO itinerary_item (group_id, title, category, hyperlink, cost, date_of_event)
    VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const values = [group_id, title, category, hyperlink, cost, date_of_event];
    const result = await pool.query(text, values);
    console.log(result);
    res.locals.newItinerary = result.rows[0];

    return next();
  } catch (err) {
    const errObj = {
      log: 'itineraryController.addItinerary Error',
      message: { error: 'itineraryController.addItinerary Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

itineraryController.updateItinerary = async (req, res, next) => {
  try {
    // Destructure
    console.log(req.params);
    // const { groupId } = req.params;
    // const { id } = req.params;
    const { title, category, hyperlink, cost, date_of_event } = req.body;

    // Write statement to update
    const text = `
    UPDATE itinerary_item
    SET
      title = $1,
      category = $2,
      hyperlink = $3,
      cost = $4,
      date_of_event = $5
    WHERE group_Id = _id;
  `;
    const values = [title, category, hyperlink, cost, date_of_event];
    const result = await pool.query(text, values);

    res.locals.updateItinerary = result.rows[0];
    return next();
  } catch (err) {
    const errObj = {
      log: 'itineraryController.updateItinerary Error',
      message: { error: 'itineraryController.updateItinerary Error' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

itineraryController.deleteItinerary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const text = `
    DELETE FROM itinerary_items
    WHERE id = $1;
  `;

    const value = [id];
    const result = await pool.query(text, value);

    res.locals.deleteItinerary = result.rows[0];
    return next();
  } catch (err) {
    const errObj = {
      log: 'itineraryController.deleteItinerary Error',
      message: { error: 'itineraryController.deleteItinerary Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

module.exports = itineraryController;
