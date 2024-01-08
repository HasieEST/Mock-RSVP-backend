import User from "../Models/Users.js"
import Event from "../Models/Events.js"
import User_Events from "../Models/User_events.js"

const addModerator = async (eventID, addUserID) => {
    try {
        const user = await User.findByPk(addUserID)
        const event = await Event.findByPk(eventID)

        if (!user || !event) {
            throw new Error('User or Event not found')
        }

        await User_Events.create({
            IdUser: user.id,    
            IdEvent: event.id,  
            role: 'moderator'
        })

        return { success: true, message: 'Successfully added moderator' }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export default addModerator