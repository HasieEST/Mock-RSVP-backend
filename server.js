import { config } from 'dotenv';
config();
import express from 'express';

import registerUser from './components/registerUser.js';
import loginUser from './components/loginUser.js';

const server = express();

server.use(express.json());

server.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  registerUser(username, email, password, (error, results) => {
    if (error) {
      let statusCode = 500;
      let message = 'Registration failed.';

      if (error.message === 'Duplicate username and email found') {
        statusCode = 400;
        message = 'Duplicate username and email found';
      } else if (error.message === 'Duplicate username found') {
        statusCode = 400;
        message = 'Duplicate username found';
      } else if (error.message === 'Duplicate email found') {
        statusCode = 400;
        message = 'Duplicate email found';
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




const app = server.listen(3006, () => {
  console.log('Server started on port 3006')
})

export default app;
