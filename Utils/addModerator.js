import { query } from './db.js';

const addModerator = (eventID, addUserID, callback) => {
    const sql = `INSERT INTO user_events (IdUser, IdEvent, role) values (?, ? , 'moderator')`;
    query(sql, [addUserID, eventID], (insertError, result) => {
        if(insertError) {
            console.log(insertError);
            callback(insertError, null);
        } else {
            callback(null, result);
        };
    });
};

export default addModerator