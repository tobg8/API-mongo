const database = require('../db');
const parking = {};

parking.list = async () => await database.db.collection('parking').find({}).toArray();

parking.add = async (req, res) => {
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

  if (Object.entries(query).length === 0) {
    const noDataError = {
      error: 'Insert data about the parking you\'d like to save',
    }
    return res.status(400).json(noDataError);
  }

  try {
    const response = await database.db.collection('parking').insertOne(query);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Something went wrong');
  }
}

parking.delete = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await database.db.collection('parking').deleteOne({id});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
}

parking.replace = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const response = await database.db.collection('parking').replaceOne({id}, newData);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

parking.modify = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const response = await database.db.collection('parking').findOneAndUpdate({id}, [ { $set: newData }]);
    res.status(200).json(response);
  } catch (error) {
    console.trace(error);
  }
};

parking.getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const docs = await database.db.collection('parking').find({id}).toArray()
    res.status(200).json(docs)
  } catch (err) {
    console.log(err)
  }
}

module.exports = parking;