import Invitee from "../Models/Invitees.js"
import isValidEmail from "../Utils/isValidEmail.js"
import isValidPhoneNumber from "../Utils/isValidPhoneNumber.js"

const submitRSVP = async (data) => {
    try {
        const isEmpty =
            data.name === '' || data.phoneNumber === '' || data.email === '' || data.response === ''
        if (isEmpty) {
            throw new Error('You cannot leave name, phone number, email, or response fields empty')
        }
        if (!isValidEmail(data.email)) {
            throw new Error('You must insert proper email address')
        }
        if (!isValidPhoneNumber(data.phoneNumber)) {
            throw new Error('You must insert a phone number here')
        }

        const invitee = await Invitee.create({
            idEvent: data.idEvent,
            Name: data.name,
            Phone_number: data.phoneNumber,
            Email: data.email,
            Response: data.response,
            Additional_info: data.additionalInfo || null
        })

        return { success: true, message: invitee }
    } catch (error) {
        return { success: false, message: error.message || 'Failed to submit RSVP' }
    }
}

export default submitRSVP
