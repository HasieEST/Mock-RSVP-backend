import { query } from './db.js';

const createEvent = async (user, body) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO event (Title, Date, Location, Description, OrganizerID) VALUES (?, ?, ?, ?, ?)';
        query(sql, [body.title, body.date, body.location, body.description, user], (insertError, results) => {
            if (insertError) {
                reject({ success: true, message: insertError.sqlMessage })
            } else {
                resolve({ success: true, results })
            }
        })
    })
}

export default createEvent