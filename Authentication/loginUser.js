import getUserData from './getUserData.js';
import verifyPassword from './verifyPassword.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const loginUser = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
          const userData = await getUserData(username);
          if (!userData.success) {
            reject({ success: false, message: userData.message });
          }
          const passwordMatched = await verifyPassword(password, userData.hashedPassword);
          if (!passwordMatched) {
            reject({ success: false, message: 'Invalid password' });
          }
          const jwtToken = jwt.sign({ username: username }, process.env.JWT_KEY, { expiresIn: '1h' });
          resolve({ success: true, token: jwtToken });
        } catch (error) {
          reject({ success: false, message: error.message });
        }
      });
    };

export default loginUser;