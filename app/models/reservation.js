const database = require('../db');
const reservations = {};

reservations.list = async () => {
  try {
    const response = await database.db.collection('reservations').find({}).toArray();
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }

};

reservations.add = async (query) => {
  try {
    const response = await database.db.collection('reservations').insertOne(query);
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

reservations.delete = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const response = await database.db.collection('reservations').deleteOne({id});
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

reservations.replace = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const response = await database.db.collection('reservations').replaceOne({id}, newData);
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

reservations.modify = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  try {
    const response = await database.db.collection('reservations').findOneAndUpdate({id}, [ { $set: newData }]);
    return response;
  } catch (error) {
    // console.trace(error);
    return error;
  }
};

reservations.getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await database.db.collection('reservations').find({id}).toArray();
    return response;
  } catch (error) {
    // console.log(error)
    return error;
  }
}

module.exports = reservations;