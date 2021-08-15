const parking = require('../models/parking');
const parkingController = {};

parkingController.getParkings = async (_, res) => {
  try {
    const response = await parking.list();
    res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

parkingController.addParking = async (req, res) => {
  const {
    city,
    name,
    type
  } = req.body;

  const query = {};

  if (city && typeof(city) === 'string') {
    query.city = city.toUpperCase();
  }
  if (name && typeof(name) === 'string') {
    query.name = name;
  }
  if (type && typeof(type) === 'string') {
    query.type = type.toUpperCase();
  }

  // You can add parking with a name a city but no type, only name if u want .. 1 minimum property
  if (Object.entries(query).length === 0) {
    const error = {
      error: 'Insert data about the parking you\'d like to save',
    }
    return res.status(400).json(error);
  }

  try {
    const response = await parking.add(query);
    res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

parkingController.deleteParking = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Id must be a valid number',
    })
  }

  try {
    const response = await parking.delete(id);
    res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

parkingController.replaceParking = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({error: 'Id must be a valid number'});
  }

  const {
    name,
    type,
    city,
  } = req.body;

  if (!name || !type || !city) {
    return res.status(400).json({error: 'Please provide every informations about the parking you\'d like to replace'});
  }

  const query = {};

  if (typeof(name) === 'string') {
    query.name = name;
  }
  if (typeof(type) === 'string') {
    query.type = type;
  }
  if (typeof(city) === 'string') {
    query.city = city;
  }

  // Here we do need every properties of a parking to replace one
  if (Object.entries(query).length !== 3) {
    return res.status(400).json({
      error: 'Please make sure you send every informations needed to replace a parking',
    })
  }

  try {
    const response = await parking.replace(id, query);
    res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

parkingController.getParking = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Id must be a valid number',
    });
  }

  try {
    const response = await parking.getOne(id);
    res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

parkingController.modifyParking = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Id must be a valid number',
    });
  }

  const {
    name,
    city,
    type,
  } = req.body;

  const query = {};

  if (name && typeof(name) === 'string') {
    query.name = name;
  }
  if (type && typeof(type) === 'string') {
    query.type = type;
  }
  if (city && typeof(city) === 'string') {
    query.city = city;
  }

  // Here we need one value minimum to modify a parking
  if (Object.entries(query).length === 0) {
    return res.status(400).json({
      error: 'Please make sure to provide atleast one property to modify',
    });
  }
  try {
    const response = await parking.modify(id, query);
    res.status(200).json(response);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      error,
    });
  }
}

module.exports = parkingController;