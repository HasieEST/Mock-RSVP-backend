import { config } from 'dotenv';
config();
import express from 'express';

import registerUser from './Authentication/registerUser.js';
import loginUser from './Authentication/loginUser.js';
import authenticateToken from './Authentication/authenticateToken.js';
import getUserID from './Utils/getUserID.js';
import createEvent from './Utils/createEvent.js';
import getEvent from './Utils/getEvent.js';


const server = express();

server.use(express.json());

server.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  registerUser(username, email, password, (error, results) => {
    if (error) {
      console.log(error)
      let statusCode = 500;
      let message = 'Registration failed.';

      if (error.message === 'Duplicate username or email found') {
        statusCode = 400;
        message = 'Duplicate username or email found';
      }
      res.status(statusCode).send(message);
    } else {
      res.status(200).send('Registration successful.');
    }
  });
});


server.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const loginResult = await loginUser(username, password);

    if (loginResult.success) {
      res.status(200).json({ success: true, token: loginResult.token });
    } else {
      res.status(401).json({ success: false, message: loginResult.message });
    }
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(401).json({ success: false, message: error.message });
    } else {
      console.error('An error occurred during login:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
});


/* todo */
server.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    res.status(200).send(username);
  } catch (err) {
    res.status(500).json({ message: 'Error retriving events' });
  }
});

server.post('/create-event', authenticateToken, async (req, res) => {
  try {
    const userID = await getUserID(req.user.username);
    if (!userID.success) {
      res.status(401).json({ message: userID.message });
    } else {
      console.log(req.body)
      createEvent(userID, req.body, (error, results) => {
        if (error) {
          res.status(500).send('Creating event failed');
        } else {
          res.status(200).send('Succesfully created an event.');
        }
      })
    }
  } catch (error) {
    console.log(error)
    if (error.message === 'User not found') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

server.get('/event/:eventID', authenticateToken, async (req, res) => {
  try {
    const eventJSON = await getEvent(req.params.eventID);
    console.log(eventJSON)
    res.status(200).send('Successful retrival')
  } catch (error) {
    res.status(500).json({message: error.message})
  }

});


const app = server.listen(3006, () => {
  console.log('Server started on port 3006')
});

export default app;
