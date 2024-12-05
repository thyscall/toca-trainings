const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

let users = {};
let trainingHistory = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const newUser = { email: req.body.email, password: req.body.password, token: uuidv4() };
    users[req.body.email] = newUser;

    res.send({ token: newUser.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuidv4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
    res.status(204).end();
  } else {
    res.status(401).send({ msg: 'Invalid token' });
  }
});

// Endpoint to add a training session to the user's history
apiRouter.post('/training-history', (req, res) => {
  const { user, sessionDetails } = req.body;

  if (!user || !sessionDetails) {
    return res.status(400).send({ error: 'Invalid input' });
  }

  // Add the new training session
  trainingHistory.push({ user, sessionDetails });
  res.status(201).send({ message: 'Training session recorded' });
});

// Endpoint retrieve training history
apiRouter.get('/training-history', (req, res) => {
  res.send(trainingHistory);
});

// Endpoint to fetch Premier League standings
apiRouter.get('/premier-league-standings', async (_req, res) => {
    try {
      const apiKey = '4a2bbdeb40ba478e82086223d41fcdff'; // Replace with actual API key
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

// Return default page if path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});