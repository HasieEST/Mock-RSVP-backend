import { query } from './db.js';

const addModerator = (eventID, addUserID) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO user_events (IdUser, IdEvent, role) values (?, ? , 'moderator')`;
        query(sql, [addUserID, eventID], (insertError, result) => {
            if(insertError){
                reject({success: false, message: insertError.message})
            } else {
                resolve({success: true, message: result})
            }
        })
    })
}

export default addModerator