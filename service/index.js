const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { getUser, getUserByToken, createUser, getPremierLeagueStandings } = require('./database.js');
const apiConfig = require('./apiConfig.json'); 

// App 
const app = express();
const port = process.argv[2] || 4000;
const authCookieName = 'token';

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('public')); // Serve frontend files
app.set('trust proxy', true);

// Router endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Create new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await getUser(email)) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    const user = await createUser(email, password);
    setAuthCookie(res, user.token);
    res.status(201).json({ id: user._id });
  } catch (error) {
    res.status(500).json({ msg: 'Error creating user', error: error.message });
  }
});

// Login existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      setAuthCookie(res, user.token);
      res.status(200).json({ id: user._id });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error logging in', error: error.message });
  }
});

// Logout a user
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to secure routes
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  try {
    const user = await getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error validating user', error: error.message });
  }
});

// Endpoint to get Premier League standings
apiRouter.get('/premier-league-standings', async (req, res) => {
  try {
    const standings = await getPremierLeagueStandings(apiConfig.premLeagueAPI);
    res.status(200).json(standings);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching standings', error: error.message });
  }
});

// Default route for unknown paths
app.use((_req, res) => {
  res.status(404).sendFile('index.html', { root: 'public' });
});

// Set the authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the service
app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});
