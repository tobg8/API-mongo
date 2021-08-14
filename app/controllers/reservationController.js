const reservations = require('../models/reservation');
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
  try {
    const response = await reservations.add(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
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