const express = require('express');
const router = express.Router();
const itineraryController = require('./../controllers/itineraryController');

/**
 * @todo make a controller for handling verification of userId and groupId
 */

/**
 * Routes requests for itinerary information to the database
 * 
 * @param {Int} res.locals.userId
 * @param {Int} req.params.groupId
 * 
 * @returns {Array<Object>}
 * @returns All itineraries for the group Id
 */
router.get('/:groupId', (req, res) => {
    return res.status(200).json(res.locals.itineraries)
});

/**
 * 
 * @param {Int} res.locals.userId
 * @param {Int} req.params.groupId
 * 
 * @param {Object} req.body
 * @param {Int} req.body.groupId
 * @param {String} req.body.title
 * @param {String} req.body.category
 * @param {String} req.body.hyperlink
 * @param {float} req.body.cost
 * @param {date} req.body.dateOfEvent
 * 
 * @returns response status 201
 */
router.post('/:groupId/');

router.put('/:groupId/itinerary/:id');

/**
 * 
 * @param {Int} res.locals.userId
 * @param {Int} req.params.groupId
 * 
 * @param {Int} req.params.id
 * 
 * @returns successful deletion status
 */
router.delete('/:groupId/itinerary/:id');

module.exports = router;