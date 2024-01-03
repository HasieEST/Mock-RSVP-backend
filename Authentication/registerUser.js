import { query } from '../Utils/db.js';
import generateHashedPassword from './generateHashedPassword.js';

const registerUser = (username, email, password, callback) => {
  const checkDuplicateSQL = 'SELECT COUNT(*) AS usernameCount, (SELECT COUNT(*) FROM users WHERE Email = ?) AS emailCount FROM users WHERE Username = ?';
  query(checkDuplicateSQL, [email, username], (duplicateError, duplicateResults) => {
    if (duplicateError) {
      callback(duplicateError, null);
    } else {
      const usernameCount = duplicateResults[0].usernameCount;
      const emailCount = duplicateResults[0].emailCount;

      if (usernameCount > 0 || emailCount > 0) {
        callback({ message: 'Duplicate username or email found' }, null);
      } else {
        generateHashedPassword(password)
          .then(({ hashedPassword }) => {
            const sql = 'INSERT INTO users (Username, Email, Hashedpassword) VALUES (?, ?, ?)';
            query(sql, [username, email, hashedPassword], (registrationError, results) => {
              if (registrationError) {
                callback(registrationError, null);
              } else {
                callback(null, results);
              }
            });
          })
          .catch((error) => {
            callback(error, null);
          });
      }
    }
  });
};

export default registerUser;
