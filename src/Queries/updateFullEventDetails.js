import Event from "../Models/Events.js"

const updateFullEventDetails = async (eventID, fullDetails) => {
    try {
        const eventToUpdate = await Event.findByPk(eventID)

        if (!eventToUpdate) {
            throw new Error('Event not found')
        }

        await eventToUpdate.update({
            Title: fullDetails.title,
            Date: fullDetails.date,
            Location: fullDetails.location,
            Description: fullDetails.description,
            OrganizerID: fullDetails.organizerID
        })

        return { success: true, message: `Successfully updated ${fullDetails.title}` }
    } catch (error) {
        return { success: false, message: error.message || 'Failed to update event details' }
    }
}

export default updateFullEventDetails
