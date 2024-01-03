import { query } from "../Utils/db.js";

const getUserData = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Hashedpassword FROM users WHERE Username = ?';
    query(sql, [username], (error, results) => {
      if (error) {
        reject({ success: false, message: 'Database error' });
      } else {
        if (results.length === 1) {
          const userData = {
            success: true,
            hashedPassword: results[0].Hashedpassword
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
