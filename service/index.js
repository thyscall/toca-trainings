// const express = require('express');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const { getUser, getUserByToken, createUser, authenticateUser, saveTrainingSession } = require('./database.js');
// const apiConfig = require('./apiConfig.json'); 
// // const { trainingCollection } = require('./database.js');
// const { peerProxy, broadcastMessage } = require('./peerProxy.js');



// const app = express();
// const port = process.argv[2] || 4000;
// const authCookieName = 'token'; // Matches Simon example

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static('public'));
// app.set('trust proxy', true);


// // Helper to set authentication cookie
// function setAuthCookie(res, authToken) {
//   res.cookie(authCookieName, authToken, {
//     secure: true,
//     httpOnly: true,
//     sameSite: 'strict',
//   });
// }


// // routers
// const apiRouter = express.Router();
// app.use('/api', apiRouter);

// // User login endpoint
// apiRouter.post('/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await authenticateUser(email, password);
//     const token = user.token;

//     // Set the authentication cookie
//     setAuthCookie(res, token);

//     broadcastMessage({ type: 'userLogin', username: user.email });

//     res.status(200).json({ token, email: user.email });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(401).json({ error: 'Invalid email or password' });
//   }
// });


// // Verify Authentication
// apiRouter.get('/auth/verify', async (req, res) => {
//   const authToken = req.cookies[authCookieName];
//   try {
//     const user = await getUserByToken(authToken);
//     if (user) {
//       res.status(200).json({ authenticated: true, email: user.email });
//     } else {
//       res.status(401).json({ authenticated: false });
//     }
//   } catch (error) {
//     console.error('Verification error:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // User creation endpoint
// apiRouter.post('/auth/create', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (await getUser(email)) {
//       return res.status(409).json({ msg: 'User already exists' });
//     }

//     const user = await createUser(email, password);
//     setAuthCookie(res, user.token); // Set a cookie for immediate login
//     res.status(201).json({ id: user._id, token: user.token }); // Include the token
//   } catch (error) {
//     console.error('Error creating user:', error.message);
//     res.status(500).json({ msg: 'Error creating user' });
//   }
// });


// // User logout endpoint
// apiRouter.delete('/auth/logout', (_req, res) => {
//   res.clearCookie(authCookieName);
//   res.status(204).end();
// });

// // Secure middleware
// const secureApiRouter = express.Router();
// apiRouter.use(secureApiRouter);

// secureApiRouter.use(async (req, res, next) => {
//   const authToken = req.cookies['token'];
//   try {
//     const user = await getUserByToken(authToken);
//     if (user) {
//       req.user = user; // Attach user to request
//       next();
//     } else {
//       res.status(401).json({ msg: 'Unauthorized' });
//     }
//   } catch (error) {
//     console.error('Token validation error:', error.message);
//     res.status(500).json({ msg: 'Server error during authentication' });
//   }
// });


// // Save Training Session
// secureApiRouter.post('/training-history', async (req, res) => {
//   try {
//     const user = req.user; 
//     const { sessionDetails } = req.body; 

//     if (!sessionDetails) {
//       return res.status(400).json({ msg: 'Missing session details' });
//     }

//     const newSession = await saveTrainingSession(user._id, sessionDetails);

//     res.status(201).json(newSession); 
//   } catch (error) {
//     console.error('Error saving training session:', error.message);
//     res.status(500).json({ error: 'Failed to save training session' });
//   }
// });
  

// // WORKING DO NOT TOUCH
// apiRouter.get('/premier-league-standings', async (_req, res) => {
//     try {
//       const apiKey = apiConfig.premLeagueAPI; 
//       const response = await fetch('https://api.football-data.org/v4/competitions/PL/standings', {
//         headers: {
//           'X-Auth-Token': apiKey,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error fetching standings: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       res.send(data);
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });

// // Example secure route
// secureApiRouter.get('/user-info', (req, res) => {
//   res.json({ email: req.user.email, id: req.user._id });
// });

// // Start HTTP server
// const httpServer = app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // Attach WebSocket proxy
// peerProxy(httpServer);


const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { getUser, getUserByToken, createUser } = require('./database.js');
const apiConfig = require('./apiConfig.json'); // Import API config

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

// API Routes
const apiRouter = express.Router();
app.use('/api', apiRouter);

// User creation
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await getUser(email)) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    const user = await createUser(email, password);
    res.status(201).json({ id: user._id, token: user.token }); // Return token for frontend use if needed
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ msg: 'Error creating user' });
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

// Secure middleware
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  let authToken = req.cookies[authCookieName];

  if (!authToken && req.headers.authorization) { //**** Check Authorization header ****//
    authToken = req.headers.authorization.split(" ")[1];
  }

  if (!authToken) {
    return res.status(401).json({ msg: 'Unauthorized: No token provided' });
  }

  try {
    const user = await getUserByToken(authToken);
    if (user) {
      req.user = user; // Attach user to request
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
  } catch (error) {
    console.error('Error saving training session:', error.message);
    res.status(500).json({ error: 'Failed to save training session' });
  }
});

// Helper to fetch Premier League standings using dynamic import
async function fetchPremierLeagueStandings() {
  const { default: fetch } = await import('node-fetch'); // Dynamically import node-fetch
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});