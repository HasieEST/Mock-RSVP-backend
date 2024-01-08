import Event from "../Models/Events.js"

const deleteEvent = async (eventID) => {
    try {
        const eventToDelete = await Event.findByPk(eventID)

        if (!eventToDelete) {
            throw new Error('Event not found')
        }

        await eventToDelete.destroy()

        return { success: true, message: `Event ${eventID} has been successfully deleted` }
    } catch (error) {
        return { success: false, message: error.message || `Failed to delete event ${eventID}` }
    }
}

export default deleteEvent