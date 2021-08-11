const express = require('express');

const parkingController = require('./controllers/parkingController');

const router = express.Router();

// Routes
router.get('/parkings', parkingController.getParkings);
router.get('/parkings/:id', parkingController.getParking);
router.post('/parkings', parkingController.addParking);
router.delete('/parkings/:id', parkingController.deleteParking);
router.put('/parkings/:id', parkingController.replaceParking);

module.exports = router;