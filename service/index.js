const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { getUser, getUserByToken, createUser } = require('./database.js');
const apiConfig = require('./apiConfig.json'); 

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
  const authToken = req.cookies[authCookieName];
  const user = await getUserByToken(authToken);
  if (user) {
    req.user = user; // Attach user data
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
      const { sessionDetails } = req.body;
  
      // Validate session details
      if (
        !sessionDetails ||
        !sessionDetails.date ||
        !sessionDetails.focus ||
        !sessionDetails.type ||
        !sessionDetails.duration ||
        !sessionDetails.feedback
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Create a new training session object associated with the user
      const newSession = {
        userId: req.user._id, // Associate session with the logged-in user
        ...sessionDetails,
      };
  
      // Save to the database (replace in-memory array with your database implementation)
      const savedSession = await trainingCollection.insertOne(newSession); // Replace with DB logic
  
      res.status(201).json(savedSession.ops[0]); // Return the created session
    } catch (error) {
      console.error('Error saving training session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Optional: Add a GET endpoint for training history
secureApiRouter.get('/training-history', async (req, res) => {
    try {
      // Fetch entries for the authenticated user
      const userEntries = await trainingCollection
        .find({ userId: req.user._id })
        .toArray(); // Replace with your database logic
  
      res.status(200).json(userEntries);
    } catch (error) {
      console.error('Error fetching training history:', error);
      res.status(500).json({ error: 'Internal server error' });
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

// User login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser(email);
  if (user && await bcrypt.compare(password, user.password)) {
    setAuthCookie(res, user.token);
    res.status(200).json({ id: user._id });
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

// User logout
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// Get training history
secureApiRouter.get('/training-history', (req, res) => {
    try {
      // Respond with all saved training sessions
      res.status(200).json(trainingHistory);
    } catch (error) {
      console.error('Error fetching training history:', error);
      res.status(500).json({ error: 'Internal server error' });
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

// Start service
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
