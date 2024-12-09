const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { getUser, getUserByToken, createUser } = require('./database.js');
const apiConfig = require('./apiConfig.json'); 
const { trainingCollection } = require('./database.js');
const { peerProxy } = require('./peerProxy');



const app = express();
const port = process.argv[2] || 4000;
const authCookieName = 'token'; // Matches Simon example

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);


// Helper to set authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Initialize routers
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Secure middleware
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies['token'];
  const user = await getUserByToken(authToken);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

// Training history
// Add the training history code here
let trainingHistory = []; // Temporary in-memory storage (replace with a database)

secureApiRouter.post('/training-history', async (req, res) => {
  try {
    const newSession = await saveTrainingSession(req.user._id, req.body.sessionDetails);
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error saving training session:', error.message);
    res.status(500).json({ error: 'Failed to save training session' });
  }
});


// GET endpoint for training history
secureApiRouter.get('/training-history', async (req, res) => {
  try {
    const userEntries = await trainingCollection.find({ userId: req.user._id }).toArray();
    res.status(200).json(userEntries);
  } catch (error) {
    console.error('Error fetching training history:', error);
    res.status(500).json({ error: 'Failed to fetch training history' });
  }
});
  

// User creation
apiRouter.post('/auth/create', async (req, res) => {
    const { email, password } = req.body;
    try {
      if (await getUser(email)) {
        return res.status(409).json({ msg: 'User already exists' });
      }
  
      const user = await createUser(email, password);
      setAuthCookie(res, user.token); // Optional: Set a cookie for immediate login
      res.status(201).json({ id: user._id });
    } catch (error) {
      res.status(500).json({ msg: 'Error creating user', error: error.message });
    }
  });

// Verify authentication
apiRouter.get('/auth/verify', async (req, res) => {
  const authToken = req.cookies['token'];
  const user = await getUserByToken(authToken);
  if (user) {
    res.status(200).json({ authenticated: true, email: user.email });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// User login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    res.cookie('token', user.token, { httpOnly: true, secure: true });
    res.status(200).json({ id: user._id, email: user.email });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(401).json({ error: 'Invalid email or password' });
  }
});


// User logout
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// Get training history
secureApiRouter.get('/training-history', async (req, res) => {
  try {
    const userEntries = await trainingCollection.find({ userId: req.user._id }).toArray();
    res.status(200).json(userEntries);
  } catch (error) {
    console.error('Error fetching training history:', error);
    res.status(500).json({ error: 'Failed to fetch training history' });
  }
});
  

// WORKING DO NOT TOUCH
apiRouter.get('/premier-league-standings', async (_req, res) => {
    try {
      const apiKey = apiConfig.premLeagueAPI; 
      const response = await fetch('https://api.football-data.org/v4/competitions/PL/standings', {
        headers: {
          'X-Auth-Token': apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching standings: ${response.statusText}`);
      }
  
      const data = await response.json();
      res.send(data);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Example secure route
secureApiRouter.get('/user-info', (req, res) => {
  res.json({ email: req.user.email, id: req.user._id });
});

// Start HTTP server
const httpServer = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Attach WebSocket proxy
peerProxy(httpServer);



