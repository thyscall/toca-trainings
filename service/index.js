const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { getUser, getUserByToken, createUser } = require('./database.js');
// const { peerProxy, broadcastMessage } = require('./peerProxy');
const apiConfig = require('./apiConfig.json'); // Import API config
const { WebSocketServer } = require('ws');
// const { broadcastMessage } = require('./peerProxy');


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

// Init API Routes
const apiRouter = express.Router();
app.use('/api', apiRouter);

// User creation
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  if (await getUser(email)) {
    return res.status(409).json({ msg: 'User already exists' });
  }

  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.status(201).json({ id: user._id });
});

// User login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser(email);
  if (user && await bcrypt.compare(password, user.password)) {
    setAuthCookie(res, user.token);
    res.status(200).json({ id: user._id });

    // // WebSocket broadcast
    // broadcastMessage({
    //   type: 'userLogin',
    //   username: email,
    // });
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

// User logout
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Secure middleware
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  let authToken = req.cookies[authCookieName];

  if (!authToken && req.headers.authorization) {
    authToken = req.headers.authorization.split(" ")[1];
  }

  if (!authToken) {
    return res.status(401).json({ msg: 'Unauthorized: No token provided' });
  }

  try {
    const user = await getUserByToken(authToken);
    if (user) {
      req.user = user; 
      next();
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Token validation error:', error.message);
    res.status(500).json({ msg: 'Server error during authentication' });
  }
});


// Save Training Session
secureApiRouter.post('/training-history', async (req, res) => {
  try {
    const user = req.user;
    const { sessionDetails } = req.body;

    if (!sessionDetails) {
      return res.status(400).json({ msg: 'Missing session details' });
    }

    const newSession = await saveTrainingSession(user._id, sessionDetails);
    res.status(201).json(newSession);

    // WebSocket broadcast
    broadcastMessage({
      type: 'training-session-update',
      sessionDetails,
    });
  } catch (error) {
    console.error('Error saving training session:', error.message);
    res.status(500).json({ error: 'Failed to save training session' });
  }
});

// Helper to fetch Premier League standings using dynamic import
async function fetchPremierLeagueStandings() {
  const { default: fetch } = await import('node-fetch'); 
  const url = `https://api.football-data.org/v2/competitions/PL/standings`;

  const response = await fetch(url, {
    headers: { 'X-Auth-Token': apiConfig.premierLeagueApiKey },
  });

  if (!response.ok) {
    throw new Error(`Error fetching standings: ${response.statusText}`);
  }

  return await response.json();
}

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

// Start service
const httpServer = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// === Public WebSocket Setup ===
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log('Message received from client:', message); // Debug log
    ws.send(`Echo from server: ${message}`); // Echo message back to client
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

console.log('Public WebSocket server running');
