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

reservations.delete = async (id) => {
  try {
    const response = await database.db.collection('reservations').deleteOne({id});
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

reservations.replace = async (id, newData) => {
  try {
    const response = await database.db.collection('reservations').replaceOne({id}, newData);
    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

reservations.modify = async (id, newData) => {
  try {
    const response = await database.db.collection('reservations').findOneAndUpdate({id}, [ { $set: newData }]);
    return response;
  } catch (error) {
    // console.trace(error);
    return error;
  }
};

reservations.getOne = async (id) => {
  try {
    const response = await database.db.collection('reservations').find({id}).toArray();
    return response;
  } catch (error) {
    // console.log(error)
    return error;
  }
}

module.exports = reservations;