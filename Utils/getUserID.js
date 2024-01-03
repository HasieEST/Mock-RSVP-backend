import { config } from 'dotenv';
config();
import { query } from './db.js';

const getUserID = async (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT idUsers from users where Username = ?';
        query(sql, [user], (error, results) => {
            if (error) {
                reject({ success: false, message: 'Database error' })
            } else {
                if (results.length === 1) {
                    const id = {
                        success: true,
                        id: results[0].idUsers
                    };
                    resolve(id);
                } else {
                    reject({ success: false, message: 'User not found' })
                }
            }
        })
    })
}

export default getUserID;

