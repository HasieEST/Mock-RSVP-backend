import { query } from './db.js';

const getAllEvents = async (user) => {
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
                        e.OrganizerID = ?`;

        query(sql, [user], (error, results) => {
            if (error) {
                reject({ success: false, message: 'Database query error' });
            } else {
                const events = results.map(event => ({
                    title: event.eventTitle,
                    date: event.eventDateTime,
                    location: event.eventLocation,
                    host: event.host,
                    role: event.isHostOrModerator
                }));
                if (events.length === 0) {
                    reject({ success: false, message: 'No events found for the user' })
                }
                resolve({ success: true, events });
            }
        });
    });
};

export default getAllEvents;
