const database = require('../db');
const parking = {};

parking.list = async () => await database.db.collection('parking').find({}).toArray();

parking.add = async (req, res) => {
  const newData = req.body;

  try {
    const response = await database.db.collection('parking').insertOne(newData);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
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