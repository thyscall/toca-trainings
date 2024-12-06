const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json'); 
const apiConfig = require('./apiConfig.json');

// MongoDB Connection Setup
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/${config.dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const db = client.db('TocaProCluster');
const userCollection = db.collection('user');

(async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    await db.command({ ping: 1 });
  } catch (err) {
    console.error(`Unable to connect to database: ${err.message}`);
    process.exit(1);
  }
})();

// User Functions

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

// Premier League API Function

async function getPremierLeagueStandings() {
  const fetch = (await import('node-fetch')).default;
  const url = `https://api.football-data.org/v2/competitions/PL/standings`;
  const response = await fetch(url, {
    headers: { 'X-Auth-Token': apiConfig.premLeagueAPI },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch standings: ${response.statusText}`);
  }

  const data = await response.json();
  return data.standings;
}

// Export Functions
module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getPremierLeagueStandings,
};
