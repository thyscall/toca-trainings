const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('web-startup');
const userCollection = db.collection('user');
const trainingCollection = db.collection('trainingSessions');

// Test database connection
(async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    await db.command({ ping: 1 });
  } catch (error) {
    console.error(`Unable to connect to database: ${error.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return await userCollection.findOne({ email });
}

async function getUserByToken(token) {
  return await userCollection.findOne({ token });
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { email, password: passwordHash, token: uuid.v4() };
    await userCollection.insertOne(user);
    return user;
    }

module.exports = { getUser, getUserByToken, createUser };
