import { query } from './db.js';

const submitRSVP = async (data, callback) => {
    let sql;
    if (data.additionalInfo === null) {
        sql = 'INSERT INTO invitee (idEvent, Name, Phone_number, Email, Response) VALUES (?, ?, ?, ?, ?)';
        query(sql, [data.idEvent, data.name, data.phoneNumber, data.email, data.response], (insertError, results) => {
            if (insertError) {
                console.log(insertError)
                callback(insertError, null)
            } else {
                callback(null, results)
            }
        })
    } else {
        sql = 'ISNERT INTO invitee (idEvent, Name, Phone_number, Email, Response, Additional_info) VALUES (?, ?, ?, ?, ?, ?)';
        query(sql, [data.idEvent, data.name, data.phoneNumber, data.email, data.response, data.additionalInfo], (insertError, results) => {
            if (insertError) {
                console.log(insertError)
                callback(insertError, null)
            } else {
                callback(null, results)
            }
        })
    }
}

export default submitRSVP;