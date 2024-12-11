const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

// MongoDB connection setup
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Enable TLS
  tlsInsecure: false, // Use true for testing self-signed certificates only
});

// Connect to the database and collections
let db, userCollection, trainingCollection;

(async function initializeDatabase() {
  try {
    await client.connect(); // Establish connection
    db = client.db('web-startup'); // Name of your database
    userCollection = db.collection('user'); // Users collection
    trainingCollection = db.collection('trainingSessions'); // Training sessions collection
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit the application if the database cannot connect
  }
})();

// Helper function to hash passwords
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// User Management
async function getUser(email) {
  try {
    return await userCollection.findOne({ email });
  } catch (error) {
    console.error('Error fetching user by email:', error.message);
    throw error;
  }
}

async function getUserByToken(token) {
  try {
    return await userCollection.findOne({ token });
  } catch (error) {
    console.error('Error fetching user by token:', error.message);
    throw error;
  }
}

async function createUser(email, password) {
  try {
    const passwordHash = await hashPassword(password);
    const user = {
      email,
      password: passwordHash,
      token: uuid.v4(), // Generate a unique token for authentication
    };
    await userCollection.insertOne(user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
}

async function authenticateUser(email, password) {
  try {
    const user = await getUser(email);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    throw error;
  }
}

// Save user's training sessions
async function saveTrainingSession(userId, sessionDetails) {
  try {
    const session = {
      userId,
      ...sessionDetails,
      createdAt: new Date(),
    };
    const result = await trainingCollection.insertOne(session);
    return result.ops[0];
  } catch (error) {
    console.error('Error saving training session:', error.message);
    throw error;
  }
}

async function getTrainingHistory(userId) {
  try {
    return await trainingCollection.find({ userId }).sort({ createdAt: -1 }).toArray();
  } catch (error) {
    console.error('Error fetching training history:', error.message);
    throw error;
  }
}

async function deleteTrainingSession(sessionId, userId) {
  try {
    const result = await trainingCollection.deleteOne({ _id: sessionId, userId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting training session:', error.message);
    throw error;
  }
}

async function updateTrainingSession(sessionId, userId, updatedDetails) {
  try {
    const result = await trainingCollection.updateOne(
      { _id: sessionId, userId },
      { $set: { ...updatedDetails, updatedAt: new Date() } }
    );
    return result.matchedCount > 0;
  } catch (error) {
    console.error('Error updating training session:', error.message);
    throw error;
  }
}

module.exports = {
  // User management
  getUser,
  getUserByToken,
  createUser,
  authenticateUser,

  // Training session management
  saveTrainingSession,
  getTrainingHistory,
  deleteTrainingSession,
  updateTrainingSession,
};
