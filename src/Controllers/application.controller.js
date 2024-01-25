import getUserID from '../Queries/getUserID.js'
import getUpcomingEvent from '../Queries/getUpcomingEvent.js'
import createEvent from '../Queries/createEvent.js'
import getEvent from '../Queries/getEvent.js'
import getAllEvents from '../Queries/getAllEvents.js'
import getUserRole from '../Queries/getUserRole.js'
import updateLimitedEventDetails from '../Queries/updateLimitedEventDetails.js'
import updateFullEventDetails from '../Queries/updateFullEventDetails.js'
import deleteEvent from '../Queries/deleteEvent.js'
import submitRSVP from '../Queries/submitRSVP.js'
import addModerator from '../Queries/addModerator.js'
import removeModerator from '../Queries/removeModerator.js'

const upcoming = async (req, res) => {
    try {
        const userID = await getUserID(req.user.username)
        const upcomingEvent = await getUpcomingEvent(userID.id)
        res.status(200).json(upcomingEvent)
    } catch (error) {
        let statusCode = 500
        if (error.message === 'User not found' || error.message === 'Event not found') {
            statusCode = 404
        }
        res.status(statusCode).json(error)
    }
}

const create_Event = async (req, res) => {
    try {
        const userID = await getUserID(req.user.username)
        const result = await createEvent(userID.id, req.body)
        res.status(200).json(result)
    } catch (error) {
        let statusCode = 500
        switch (true) {
            case error.message.includes('User not found'):
                statusCode = 404
                break
            case error.message.includes('cannot be null'):
                statusCode = 400
                break
        }
        res.status(statusCode).json(error)
    }
}

const events = async (req, res) => {
    try {
        const userID = await getUserID(req.user.username)
        const eventsResult = await getAllEvents(userID.id)
        res.status(200).json({ events: eventsResult.events })
    } catch (error) {
        let statusCode = 500
        if (error.message === 'User not found' || error.message === 'No events found for the user') {
            statusCode = 404
        }
        res.status(statusCode).json(error)
    }
}

const event = async (req, res) => {
    try {
        const eventJSON = await getEvent(req.params.eventID)
        const userID = await getUserID(req.user.username)
        const role = await getUserRole(userID.id, req.params.eventID)
        if (role.role === 1 || role.role === 0) {
            res.status(200).json(eventJSON)
        }
    } catch (error) {
        let statusCode = 500
        switch (error.message) {
            case 'Event not found':
                statusCode = 404
                break
            case 'User not found':
                statusCode = 404
                break
            case 'Unauthorized user':
                statusCode = 401
                error.message = 'This user is not authorized to view this event'
                break
        }
        res.status(statusCode).json(error)
    }
}

const updateEvent = async (req, res) => {
    try {
        const userID = await getUserID(req.user.username)
        const event = await getEvent(req.params.eventID)
        console.log(event)
        if (event.success) {
            const role = await getUserRole(userID.id, req.params.eventID)
            let updateResult
            switch (role.role) {
                case 0:
                    updateResult = await updateLimitedEventDetails(req.params.eventID, req.body)
                case 1:
                    updateResult = await updateFullEventDetails(req.params.eventID, req.body)
            }
            res.status(200).json(updateResult)
        }
    } catch (error) {
        let statusCode = 500
        switch (true) {
            case error.message.includes('Unauthorized user'):
                statusCode = 401
                error.message = 'This user is not authorized to edit this event'
                break
            case error.message.includes('Event not found'):
                statusCode = 404
                break
            case error.message.includes('cannot be null'):
                statusCode = 400
                break
        }
        res.status(statusCode).json(error)
    }
}

const delete_Event = async (req, res) => {
    try {
        const userID = await getUserID(req.user.username)
        const event = await getEvent(req.params.eventID)
        if (event.success) {
            const role = await getUserRole(userID.id, req.params.eventID)
            if (role.role === 1) {
                const result = await deleteEvent(req.params.eventID)
                res.status(200).json(result)
            }
        }
    } catch (error) {
        let statusCode = 500
        switch (error.message) {
            case 'User not found':
                statusCode = 404
                break
            case 'Event not found':
                statusCode = 404
                break
            case 'Unauthorized user':
                statusCode = 401
                error.message = 'This user is not authorized to delete this event'
                break
        }
        res.status(statusCode).json(error)
    }
}

const rsvp = async (req, res) => {
    try {
        const exists = await getEvent(req.params.eventID)
        if (exists.success) {
            const payload = {
                idEvent: req.params.eventID,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                response: req.body.response,
                additionalInfo: req.body.additionalInfo
            }
            const result = await submitRSVP(payload)
            res.status(200).json(result)
        }
    } catch (error) {
        let statusCode = 500
        if (error.message === 'Event not found') {
            statusCode = 404
        }
        res.status(statusCode).json(error.message)
    }
}

const add_Moderator = async (req, res) => {
    try {
        const eventExist = await getEvent(req.params.eventID)
        const userID = await getUserID(req.user.username)
        const role = await getUserRole(userID.id, req.params.eventID)

        let userExist
        if (isValidEmail(req.body.newMod)) {
            userExist = await getUserByEmail(req.body.newMod)
        } else {
            userExist = await getUserID(req.body.newMod)
        }

        if (userExist.success && eventExist.success && role.role === 1) {
            const result = await addModerator(req.params.eventID, userExist.id)
            res.status(200).json(result)
        }
    } catch (error) {
        let statusCode = 500
        if (error.message.includes('ER_DUP_ENTRY')) {
            error.message = 'This user is already associated with this event'
            statusCode = 400
        }

        if (error.message === 'Event not found' || error.message === 'No user is registered with this email' || error.message === 'There is no user with that username') {
            statusCode = 404
        }


        res.status(statusCode).json(error.message)
    }
}

const remove_Moderator = async (req, res) => {
    try {
        const eventExist = await getEvent(req.params.eventID)
        const userID = await getUserID(req.user.username)
        const role = await getUserRole(userID.id, req.params.eventID)
        const userExist = await getUserID(req.body.moderator)
        const userRole = await getUserRole(userExist.id)

        if (userExist.success && eventExist.success && role.role === 1 && userRole.role !== 1) {
            const result = await removeModerator(req.params.eventID, userExist.id)
            res.status(200).json(result)
        }
    } catch (error) {
        let statusCode = 500
        if (error.message === 'Event not found' || error.message === 'No user is registered with this email' || error.message === 'There is no user with that username') {
            statusCode = 404
        }
        if (error.message === 'Unauthorized user') {
            if (typeof UserRole === 'undefined') {
                statusCode = 404
                error.message = 'This user is not affiliated with this event'
            } else {
                statusCode = 401
            }

        }
        res.status(statusCode).json(error.message)
    }
}

export default {upcoming, create_Event, events, event, updateEvent, delete_Event, rsvp, add_Moderator, remove_Moderator}