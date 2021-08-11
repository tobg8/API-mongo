const parking = require('../models/parking');
const parkingController = {};

parkingController.getParkings = async (_, res) => {
  try {
    const response = await parking.list();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

parkingController.addParking = async (req, res) => {
  try {
    const response = await parking.add(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

parkingController.deleteParking = async (req, res) => {
  try {
    const response = await parking.delete(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

parkingController.replaceParking = async (req, res) => {
  try {
    const response = await parking.replace(req, res);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

parkingController.getParking = async (req, res) => {
  try {
    const response = await parking.getOne(req, res);r
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = parkingController;