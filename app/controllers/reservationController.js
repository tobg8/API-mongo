const reservations = require('../models/reservation');
const parkingModel = require('../models/parking');

const reservationsController = {};

reservationsController.getReservations = async (_, res) => {
  try {
    const response = await reservations.list();
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
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
    checkout,
  } = req.body;

  if (Number.isNaN(parseInt(parkingId, 10))) {
    return res.status(400).json({
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
    && typeof (parking) === 'string'
  ) {
    query.parking = parking;
  }
  else {
    return res.status(400).json({
      error: 'Invalid / Non-existent parking name',
    });
  }

  if (clientName && typeof (clientName) === 'string') {
    query.clientName = clientName;
  }
  else {
    return res.status(400).json({
      error: 'Invalid / Non-existent client name',
    });
  }

  if (
    city
    && city.toUpperCase() === parkingDoExist[0].city
    && typeof (city) === 'string'
  ) {
    query.city = city.toUpperCase();
  }
  else {
    return res.status(400).json({
      error: 'Invalid / Non-existent parking city',
    });
  }

  if (
    vehicle
    && (vehicle === 'car'
    || vehicle === 'motorbike')
  ) {
    query.vehicle = vehicle;
  }
  else {
    return res.status(400).json({
      error: 'Invalid / Non-existent vehicle field',
    });
  }

  if (
    licensePlate
    && licensePlate.length === 6
    && typeof (licensePlate) === 'string'
  ) {
    query.licensePlate = licensePlate.toUpperCase();
  }
  else {
    return res.status(400).json({
      error: 'Invalid / Non-existent license plate',
    });
  }

  if (
    checkin
    && checkout
    && !Number.isNaN((Date.parse(checkin)))
    && !Number.isNaN((Date.parse(checkout)))
    && Date.parse(checkin) < Date.parse(checkout)
  ) {
    query.checkin = checkin;
    query.checkout = checkout;
  }
  else {
    res.status(400).json({
      error: 'Invalid / Non-existent date format || checkin must be greater than checkout',
    });
  }

  try {
    const response = await reservations.add(query);
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

reservationsController.deleteReservation = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: 'Id must be a valid number',
    });
  }

  try {
    const response = await reservations.delete(id);
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

reservationsController.replaceReservation = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Id must be a valid number' });
  }

  const newData = req.body; // Needs validation but I ain't gonna spend time on this

  try {
    const response = await reservations.replace(id, newData);
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

reservationsController.getReservation = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Id must be a valid number' });
  }

  try {
    const response = await reservations.getOne(id);
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

reservationsController.modifyReservation = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Id must be a valid number' });
  }

  const newData = req.body; // Needs validation too

  try {
    const response = await reservations.modify(id, newData);
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

module.exports = reservationsController;
