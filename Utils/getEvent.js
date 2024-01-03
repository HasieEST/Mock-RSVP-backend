import { config } from 'dotenv';
config();
import { query } from './db.js';

const getEvent = async (eventID) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 
                        e.Title as eventTitle,
                        e.Date as eventDateTime,
                        e.Location as eventLocation,
                        u.Username as host,
                        CASE WHEN ue.role in ('host', 'moderator') THEN 1 else 0 END AS isHostOrModerator
                    FROM
                        event e
                    INNER JOIN
                        user_events ue ON e.IdEvent = ue.IdEvent
                    INNER JOIN
                        users u ON e.OrganizerID = u.idUsers
                    WHERE 
                        e.idEvent = ?`;
        query(sql, [eventID], (error, results) => {
            if(error) {
                reject({success: false, message: 'Database error'})
            } else {
                if(results.length === 1) {
                    const JSON = {
                        success: true,
                        title: results[0].eventTitle,
                        date: results[0].eventDateTime,
                        location: results[0].eventLocation,
                        host: results[0].host,
                        role: results[0].isHostOrModerator
                    };
                    resolve(JSON)
                } else {
                    reject({success: false, message: 'Event not found'})
                }
            }
        })
    })
}

export default getEvent;
