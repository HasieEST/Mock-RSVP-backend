import { query } from './db.js'


const getUserRole = async (userID, eventID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT CASE WHEN user_events.role in ('host', 'moderator') THEN 1 else 0 END AS role FROM user_events WHERE IdUser = ? AND IdEvent = ?`
        query(sql, [userID, eventID], (error, result) => {
            if (error) {
                reject({ success: false, message: error })
            } else {
                if (result.length === 1) {
                    resolve({ success: true, role: result[0].role })
                } else {
                    reject({ success: false, message: 'Unauthorized user' })
                }
            }
        })
    })
}

export default getUserRole