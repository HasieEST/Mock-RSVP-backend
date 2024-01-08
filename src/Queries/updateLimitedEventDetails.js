import Event from "../Models/Events.js"

const updateLimitedEventDetails = async (eventID, limitedDetails) => {
    try {
        const eventToUpdate = await Event.findByPk(eventID)

        if (!eventToUpdate) {
            throw new Error('Event not found')
        }

        await eventToUpdate.update({
            Date: limitedDetails.date,
            Location: limitedDetails.location,
            Description: limitedDetails.description,
        })

        return { success: true, message: `Successfully updated limited details of event ${eventID}` }
    } catch (error) {
        return { success: false, message: error.message || 'Failed to update limited event details' }
    }
}

export default updateLimitedEventDetails