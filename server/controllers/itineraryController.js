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
    SELECT _id, group_id, title, category, hyperlink, cost,  
    to_char(date_of_event, 'DD Mon YYYY hh:mm') as date_of_event
    FROM itinerary_item
    WHERE group_id=($1)
    ORDER BY itinerary_item.date_of_event ASC;`;
    const value = [groupId];
    const result = await pool.query(text, value);

    res.locals.itineraries = result.rows;

    return next();
  } catch (err) {
    const errObj = {
      log: `itineraryController.getAllItineraries Error: ${err}`,
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
    const { groupId } = req.params;
    const { title, category, hyperlink, cost, date_of_event } = req.body;

    // Write statement to insert
    const text = `
    INSERT INTO itinerary_item (group_id, title, category, hyperlink, cost, date_of_event)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING title, category, hyperlink, cost, date_of_event;
    `;

    const values = [groupId, title, category, hyperlink, cost, date_of_event];
    const result = await pool.query(text, values);

    res.locals.newEvent = result.rows[0];
    return next();
  } catch (err) {
    const errObj = {
      log: `itineraryController.addItinerary Error: ${err}`,
      message: { error: 'itineraryController.addItinerary Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

itineraryController.updateItinerary = async (req, res, next) => {
  try {
    // Destructure
    const { groupId, id } = req.params;
    //const { title, category, hyperlink, cost, date_of_event } = req.body;

    const query = {
      text:
        'UPDATE itinerary_item SET ' +
        Object.keys(req.body)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(', ') +
        ` WHERE _id = $1 RETURNING title, category, hyperlink, cost, date_of_event;`,
      values: [groupId, ...Object.values(req.body)],
    };

    const result = await pool.query(query.text, query.values);

    res.locals.updateItinerary = result.rows[0];
    return next();
  } catch (err) {
    const errObj = {
      log: `itineraryController.updateItinerary Error: ${err}`,
      message: { error: 'itineraryController.updateItinerary Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

itineraryController.deleteItinerary = async (req, res, next) => {
  try {
    const { groupId, id } = req.params;
    const text = `
    DELETE FROM itinerary_item
    WHERE _id = $1 AND group_id = $2;
  `;

    const value = [id, groupId];
    await pool.query(text, value);

    res.locals.deleteItinerary = `Deleted Itinerary Event ${id} from Group ${groupId}`;
    return next();
  } catch (err) {
    const errObj = {
      log: `itineraryController.deleteItinerary Error: ${err}`,
      message: { error: 'itineraryController.deleteItinerary Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

module.exports = itineraryController;
