import { config } from 'dotenv';
config();
import { query } from './db.js';

const createEvent = async (user, body, callback) => {
    const title = body.title;
    const date = body.date;
    const location = body.location;
    const description = body.description;
    const sql = 'INSERT INTO event (Title, Date, Location, Description, OrganizerID) VALUES (?, ?, ?, ?, ?)';

    
    query(sql, [title, date, location, description, user.id], (insertError, results) => {
        if(insertError) {
            console.log(insertError)
             callback(insertError, null)
        } else {
            callback(null, results)
        }
    })
};


export default createEvent;