import { query } from './db.js'

const getUserByEmail = async (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT idUsers FROM users WHERE Email = ?'
        query(sql, [user], (error, results) => {
            if (error) {
                reject({ success: false, message: 'Database error: UserID' })
            } else {
                if (results.length === 1) {
                    const payload = {
                        success: true,
                        id: results[0].idUsers
                    };
                    resolve(payload)
                } else {
                    reject({ success: false, message: 'No user is registered with this email' })
                }
            }
        })
    })
}

export default getUserByEmail