const database = require('../db');

const parking = {};

parking.list = async () => {
  try {
    const parkingList = await database.db.collection('parking').find({}).toArray();
    return parkingList;
  }
  catch (error) {
    return {
      error,
    };
  }
};

parking.add = async (query) => {
  try {
    const response = await database.db.collection('parking').insertOne(query);
    return response;
  }
  catch (error) {
    // console.log(error);
    return {
      error,
    };
  }
};

parking.delete = async (id) => {
  try {
    const response = await database.db.collection('parking').deleteOne({ id });
    return response;
  }
  catch (error) {
    // console.log(error);
    return error;
  }
};

parking.replace = async (id, query) => {
  try {
    const response = await database.db.collection('parking').replaceOne({ id }, query);
    return response;
  }
  catch (error) {
    // console.log(error);
    return error;
  }
};

parking.modify = async (id, query) => {
  try {
    const response = await database.db.collection('parking').findOneAndUpdate({ id }, [{ $set: query }]);
    return response;
  }
  catch (error) {
    // console.log(error);
    return {
      error,
    };
  }
};

parking.getOne = async (id) => {
  try {
    const response = await database.db.collection('parking').find({ id }).toArray();
    return response;
  }
  catch (error) {
    // console.log(error);
    return {
      error,
    };
  }
};

module.exports = parking;
