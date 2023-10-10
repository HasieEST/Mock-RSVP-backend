import { query } from './db.js';
import generateHashedPassword from './generateHashedPassword.js';

const registerUser = (username, email, password, callback) => {
  const checkDuplicateSQL = 'SELECT COUNT(*) AS usernameCount, (SELECT COUNT(*) FROM users WHERE email = ?) AS emailCount FROM users WHERE username = ?';
  query(checkDuplicateSQL, [email, username], (duplicateError, duplicateResults) => {
    if (duplicateError) {
      callback(duplicateError, null);
    } else {
      const usernameCount = duplicateResults[0].usernameCount;
      const emailCount = duplicateResults[0].emailCount;

      if (usernameCount > 0 && emailCount > 0) {
        callback({ message: 'Duplicate username and email found' }, null);
      } else if (usernameCount > 0) {
        callback({ message: 'Duplicate username found' }, null);
      } else if (emailCount > 0) {
        callback({ message: 'Duplicate email found' }, null);
      } else {
        generateHashedPassword(password)
          .then(({ salt, hashedPassword }) => {
            const sql = 'INSERT INTO users (username, email, salt, password_hash) VALUES (?, ?, ?, ?)';
            query(sql, [username, email, salt, hashedPassword], (registrationError, results) => {
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
