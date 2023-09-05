const itineraryController = require('./../controllers/itineraryController');
const express = require('express');
const router = express.Router();

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
router.get('/:groupId', (req, res, next) => {res.locals.userId = '3'; return next()}, itineraryController.verifyUserGroup, itineraryController.getAllItineraries, (req, res) => {
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
router.post('/:groupId/', itineraryController.addItinerary, (req, res) => {
    return res.status(201).json(res.locals.newItinerary)
});

router.put('/:groupId/itinerary/:id', itineraryController.updateItinerary, (req, res) => {
    return res.status(201).json(res.locals.updateItinerary)
});

/**
 * 
 * @param {Int} res.locals.userId
 * @param {Int} req.params.groupId
 * 
 * @param {Int} req.params.id
 * 
 * @returns successful deletion status
 */
router.delete('/:groupId/itinerary/:id', itineraryController.deleteItinerary, (req, res => {
    return res.status(200).json(res.locals.deleteItinerary)
}));

module.exports = router;