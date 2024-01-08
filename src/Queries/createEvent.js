import Event from "../Models/Events.js"
import User_Events from "../Models/User_events.js"


Event.addHook('afterCreate', async (event) => {
    try {
        await User_Events.create({
            IdUser: event.dataValues.OrganizerID,
            IdEvent: event.dataValues.idEvent,
            role: 'host' 
        })
    } catch (error) {
        console.error('Failed to associate user with the event:', error)
    }
})

const createEvent = async (user, body) => {
    try {
        const event = await Event.create({
            Title: body.title,
            Date: body.date,
            Location: body.location,
            Description: body.description,
            OrganizerID: user
        })

        return { success: true, event }
    } catch (error) {
        return { success: false, message: 'Failed to create the event' }
    }
}

export default createEvent