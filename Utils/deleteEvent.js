import { query } from './db.js'

const deleteEvent = async (eventID) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM events WHERE IdEvent = ?'
        query(sql, [eventID], (deletionError, result) => {
            if (deletionError) {
                reject({ success: false, message: deletionError })
            } else {
                resolve({ success: true, result })
            }
        })
    })
}

export default deleteEvent;