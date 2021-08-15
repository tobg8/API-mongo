const database = {};

database.connect = async () => {
  /**
 * Import MongoClient & connexion à la DB
 */
  const { MongoClient } = require('mongodb');
  const url = 'mongodb://localhost:27017';
  const dbName = 'blog';
  let db;
  MongoClient.connect(url, (err, client) => {
    console.log('Connected successfully to MongoDB Server');
    db = client.db(dbName);
    database.db = db;
  });
};

module.exports = database;
