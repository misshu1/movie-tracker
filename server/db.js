const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${encodeURIComponent(
  process.env.MONGO_DB_USER
)}:${encodeURIComponent(process.env.MONGO_DB_PASS)}@${
  process.env.MONGO_DB_URL
}/`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
module.exports = { client };

client
  .connect()
  .then(() => console.log('MongoDB Connected'))
  .catch((error) =>
    console.error('Error on connecting to MongoDB server', error)
  )
  .then(() => {
    const movies = client.db(process.env.MONGO_DB).collection('movies');
    module.exports.movies = movies;
  });
