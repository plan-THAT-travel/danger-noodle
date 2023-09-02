const pool = require('./../db/postgresModel');
const itineraryController = {};

/**
 * If the userId and groupId are not found in our user_group table,
 * we should throw and error because this combination was not found.
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
    WHERE user_id=($1) AND group_id=($2)
    `;
    const values = [userId, groupId];
    const result = await (pool.query(text, values));
    if (!result.rows) {
      throw new Error(`itineraryController.verifyUserGroup Error: No combination for User: ${userId} and Group: ${groupId}`);
    }
    
    // If we have a row we can move on to the next verification
    return next();
} catch (err) {
    return next(err);
}
  
}

/**
 * Gets the itinerary for the userId and groupId
 * 
 * @param {Int} res.locals.groupId
 * 
 * @returns {Array<Object>} res.locals.itineraries
 * @returns All itineraries for the group Id
 */
itineraryController.getAllItineraries = (req, res, next) => {
  //
}

module.exports = itineraryController;