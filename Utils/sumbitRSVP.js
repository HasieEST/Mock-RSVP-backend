import { query } from './db.js'

const submitRSVP = async (data) => {
    return new Promise((resolve, reject) => {
        const isEmpty = data.name === '' || data.phoneNumber === '' || data.email === '' || data.response === ''
        if (isEmpty) {
            reject({ success: false, message: 'You can not leave name, phone number, email or response fields empty' })
        } else {
            let sql;
            if (data.additionalInfo === null || data.additionalInfo.trim() === '') {
                sql = 'INSERT INTO invitee (idEvent, Name, Phone_number, Email, Response) VALUES (?, ?, ?, ?, ?)'
                query(sql, [data.idEvent, data.name, data.phoneNumber, data.email, data.response], (insertError, result) => {
                    if (insertError) {
                        reject({ success: false, message: insertError })
                    } else {
                        resolve({ success: true, message: result })
                    }
                })
            } else {
                sql = 'INSERT INTO invitee (idEvent, Name, Phone_number, Email, Response, Additional_info) VALUES (?, ?, ?, ?, ?, ?)'
                query(sql, [data.idEvent, data.name, data.phoneNumber, data.email, data.response, data.additionalInfo], (insertError, result) => {
                    if (insertError) {
                        reject({ success: false, message: insertError });
                    } else {
                        resolve({ success: true, message: result })
                    }
                })
            }
        }
    })
}

export default submitRSVP