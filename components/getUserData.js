import { query } from "./db.js";

const getUserData = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT password_hash, salt FROM users WHERE username = ?';
    query(sql, [username], (error, results) => {
      if (error) {
        reject({ success: false, message: 'Database error' });
      } else {
        if (results.length === 1) {
          const userData = {
            success: true,
            hashedPassword: results[0].password_hash,
            salt: results[0].salt,
          };
          resolve(userData);
        } else {
          reject({ success: false, message: 'User not found' });
        }
      }
    });
  });
};

export default getUserData;
