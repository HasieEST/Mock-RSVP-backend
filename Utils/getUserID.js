import { query } from './db.js';

const getUserID = async (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT idUsers from users where Username = ?';
        query(sql, [user], (error, results) => {
            if (error) {
                reject({ success: false, message: 'Database error: UserID' })
            } else {
                if (results.length === 1) {
                    const payload = {
                        success: true,
                        id: results[0].idUsers
                    };
                    resolve(payload);
                } else {
                    reject({ success: false, message: 'User not found' })
                }
            }
        })
    })
}

export default getUserID;

