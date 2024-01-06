import { query } from './db.js';

const removeModerator = async (eventID, userID, callback) => {
    const sql = 'DELETE FROM user_events WHERE IdEvent = ? AND IdUser = ?'
    query(sql, [eventID, userID], (deletionError, result) =>{
        if(deletionError) {
            console.log(deletionError);
            callback(deletionError, null);
        } else {
            callback(null, result);
        }
    })
}

export default removeModerator;