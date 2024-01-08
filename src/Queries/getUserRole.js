import User from "../Models/Users.js"
import Event from "../Models/Events.js"

const getUserRole = async (userID, eventID) => {
    try {
        const user = await User.findByPk(userID)
        const event = await Event.findByPk(eventID)

        if (!user || !event) {
            throw new Error('User or event not found')
        }

        const role = await user.hasEvent(event) ? 1 : 0

        return { success: true, role }
    } catch (error) {
        return { success: false, message: error.message || 'Unauthorized user' }
    }
}

export default getUserRole