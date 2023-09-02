const express = require('express');
const router = express.Router();
const itineraryController = require('./../controllers/itineraryController');

/**
 * Routes requests for itinerary information to the database
 * 
 * @param res.locals.userId
 * @param res.locals.groupId
 * 
 * @returns All itineraries for the group Id
 */
router.get('/');

router.post('/');

router.put('/:id');

router.delete('/:id');

module.exports = router;