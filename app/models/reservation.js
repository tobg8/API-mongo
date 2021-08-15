const database = require('../db');
const reservations = {};

reservations.list = async () => await database.db.collection('reservations').find({}).toArray();

reservations.add = async (req, res) => {
  const newData = req.body;

  try {
    const response = await database.db.collection('reservations').insertOne(newData);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
}

reservations.delete = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await database.db.collection('reservations').deleteOne({id});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
}

reservations.replace = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const response = await database.db.collection('reservations').replaceOne({id}, newData);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

reservations.modify = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const response = await database.db.collection('reservations').findOneAndUpdate({id}, [ { $set: newData }]);
    res.status(200).json(response);
  } catch (error) {
    console.trace(error);
  }
};

reservations.getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const docs = await database.db.collection('reservations').find({id}).toArray();
    res.status(200).json(docs);
  } catch (error) {
    console.log(error)
  }
}

module.exports = reservations;