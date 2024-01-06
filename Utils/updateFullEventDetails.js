import { query } from './db.js';

const updateFullEventDetails = async (eventID, fullDetails) => {
    return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE event SET Title = ?, Date = ?, Location = ?, Description = ?, OrganizerID = ? WHERE idEvent = ?';
        query(updateQuery, [fullDetails.title, fullDetails.date, fullDetails.location, fullDetails.description, fullDetails.organizerID, eventID], error => {
            if (error) {
                reject({success: false, message: error.sqlMessage})
            } else {
                resolve({success: true, message: 'Succesfully updated ' + fullDetails.title})
            }
        });
    })
};

export default updateFullEventDetails;