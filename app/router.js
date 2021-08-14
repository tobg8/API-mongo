const express = require('express');

const parkingController = require('./controllers/parkingController');
const reservationsController = require('./controllers/reservationController');

const router = express.Router();

router.get('/parkings', parkingController.getParkings);
router.get('/parkings/:id', parkingController.getParking);
router.post('/parkings', parkingController.addParking);
router.delete('/parkings/:id', parkingController.deleteParking);
router.put('/parkings/:id', parkingController.replaceParking);
router.patch('/parkings/:id', parkingController.modifyParking);

router.get('/reservations', reservationsController.getReservations);
router.get('/reservations/:id', reservationsController.getReservation);
router.post('/reservations', reservationsController.addReservation);
router.delete('/reservations/:id', reservationsController.deleteReservation);
router.put('/reservations/:id', reservationsController.replaceReservation);
router.patch('/reservations/:id', reservationsController.modifyReservation);

module.exports = router;