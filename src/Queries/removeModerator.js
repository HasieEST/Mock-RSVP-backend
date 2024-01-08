import Users from "../Models/Users.js"
import Events from "../Models/Events.js"

const removeModerator = async (eventID, userID) => {
    try {
        const user = await Users.findByPk(userID)
        const event = await Events.findByPk(eventID)

        if (!user || !event) {
            throw new Error('User or Event not found')
        }

        await user.removeEvent(event)

        return { success: true, message: 'Successfully removed moderator' }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export default removeModerator