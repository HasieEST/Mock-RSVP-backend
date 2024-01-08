import { query } from './db.js'

const updateLimitedEventDetails = async (eventID, limitedDetails) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE event SET Date = ?, Location = ?, Description = ? WHERE idEvent = ?'
        query(updateQuery, [limitedDetails.date, limitedDetails.location, limitedDetails.description, eventID], (error, result) => {
            if (error) {
                reject({success: false, message: error.sqlMessage})
            } else {
                resolve({success: true, message: 'Succesfully updated ' + fullDetails.title})
            }
        })
    });
};

export default updateLimitedEventDetails;
