const reservations = require('../models/reservation');
const parkingModel = require('../models/parking');
const reservationsController = {};

reservationsController.getReservations = async (_, res) => {
  try {
    const response = await reservations.list();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

reservationsController.addReservation = async (req, res) => {
  const {
    parking,
    parkingId,
    city,
    clientName,
    vehicle,
    licensePlate,
    checkin,
    checkout
  } = req.body;

  if (isNaN(parseInt(parkingId))) {
    res.status(400).json({
      error: 'Please provide a valid parking id',
    });
  }

  const parkingDoExist = await parkingModel.getOne(parkingId);
  if (parkingDoExist.length === 0) {
    return res.status(400).json({
      error: 'Invalid / Non-existent parking id',
    });
  }

  const query = {};

  // Valid name
  if (
    parking
    && parking === parkingDoExist[0].name
    && typeof(parking) === 'string'
  ) {
      query.parking = parking;
  } else {
    return res.status(400).json({
      error:'Invalid / Non-existent parking name',
    });
  }

  if (clientName && typeof(clientName) === 'string') {
    query.clientName = clientName;
  } else {
    return res.status(400).json({
      error: 'Invalid / Non-existent client name',
    })
  }

  if (
    city
    && city.toUpperCase() === parkingDoExist[0].city
    && typeof(city) === 'string'
  ) {
      query.city = city.toUpperCase();
  } else {
    return res.status(400).json({
      error: 'Invalid / Non-existent parking city',
    });
  }

  if (
    vehicle
    && vehicle === 'car'
    || vehicle === 'motorbike'
  ) {
    console.log(vehicle === 'car');
    console.log(vehicle === 'motorbike');
    query.vehicle = vehicle;
  } else {
    return res.status(400).json({
      error: 'Invalid / Non-existent vehicle field',
    });
  }

  if (
    licensePlate
    && licensePlate.length === 6
    && typeof(licensePlate) === 'string') {
      query.licensePlate = licensePlate.toUpperCase();
  } else {
    return res.status(400).json({
      error: 'Invalid / Non-existent license plate',
    })
  }

  if (
    checkin
    && checkout
    && !isNaN((Date.parse(checkin)))
    && !isNaN((Date.parse(checkout)))
    && Date.parse(checkin) < Date.parse(checkout)
  ) {
    query.checkin = checkin;
    query.checkout = checkout;
  } else {
    res.status(400).json({
      error: 'Invalid / Non-existent date format || checkin must be greater than checkout',
    });
  }

  try {
    const response = await reservations.add(query);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

reservationsController.deleteReservation = async (req, res) => {
  try {
    const response = await reservations.delete(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

reservationsController.replaceReservation = async (req, res) => {
  try {
    const response = await reservations.replace(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

reservationsController.getReservation = async (req, res) => {
  try {
    const response = await reservations.getOne(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

reservationsController.modifyReservation = async (req, res) => {
  try {
    const response = await reservations.modify(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = reservationsController;