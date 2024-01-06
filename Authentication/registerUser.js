import { query } from '../Utils/db.js';
import generateHashedPassword from './generateHashedPassword.js';

const registerUser = async (username, email, password) => {
  return new Promise((resolve, reject) => {
    const checkDuplicateSQL = 'SELECT COUNT(*) AS usernameCount, (SELECT COUNT(*) FROM users WHERE Email = ?) AS emailCount FROM users WHERE Username = ?';
    query(checkDuplicateSQL, [email, username], (error, result) => {
      if (error) {
        reject({ success: false, message: error });
      }
      if (result[0].usernameCount > 0 || result[0].emailCount > 0) {
        reject({ success: false, message: 'Duplicate username or email found' });
      }
      generateHashedPassword(password)
        .then(({ hashedPassword }) => {
          const sql = 'INSERT INTO users (Username, Email, Hashedpassword) VALUES (?, ?, ?)';
          query(sql, [username, email, hashedPassword], (error) => {
            if (error) {
              reject({ success: false, message: error })
            }
            resolve({ success: true, message: 'Successfully created an account.' })
          })
        })
    })
  })
}
export default registerUser;