const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
let _client;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb://127.0.0.1:27017/'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db('audioLibrary');
      callback(client);
    })
    .catch(err => {
      console.log('errorrrrrr:', err);
      throw err;
    });
};

const getDb = () => {
  if (_db){
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
