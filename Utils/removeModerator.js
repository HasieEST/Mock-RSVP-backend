import { query } from './db.js'

const removeModerator = async (eventID, userID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM user_events WHERE IdEvent = ? AND IdUser = ?'
        query(sql, [eventID, userID], (deletionError, result) => {
            if (deletionError) {
                reject({success: false, message: deletionError})
            }
            else { 
                resolve({success: true, message: result})
            }
        })
    })
}

export default removeModerator