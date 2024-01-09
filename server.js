import { config } from 'dotenv'
config()
import express from 'express'
import authenticateToken from './src/Authentication/authenticateToken.js'
import sequelize from './src/Utils/sequalize.js'
import User_Events from './src/Models/User_events.js'
import Invitees from './src/Models/Invitees.js'
import Users from './src/Models/Users.js'
import Events from './src/Models/Events.js'


import registerUser from './src/Authentication/registerUser.js'
import loginUser from './src/Authentication/loginUser.js'
import getUserID from './src/Queries/getUserID.js'
import getUpcomingEvent from './src/Queries/getUpcomingEvent.js'
import createEvent from './src/Queries/createEvent.js'
import getEvent from './src/Queries/getEvent.js'
import getAllEvents from './src/Queries/getAllEvents.js'
import getUserRole from './src/Queries/getUserRole.js'
import updateLimitedEventDetails from './src/Queries/updateLimitedEventDetails.js'
import updateFullEventDetails from './src/Queries/updateFullEventDetails.js'
import deleteEvent from './src/Queries/deleteEvent.js'
import submitRSVP from './src/Queries/submitRSVP.js'
import addModerator from './src/Queries/addModerator.js'
import removeModerator from './src/Queries/removeModerator.js'


const server = express()
let app

server.use(express.json())

server.post('/register', async (req, res) => {
  try {
    const result = await registerUser(req.body.username, req.body.email, req.body.password)
    res.status(200).json(result)
  } catch (error) {
    let statusCode = 500
    if (error.message === 'Duplicate username or email found') {
      statusCode = 400
    }
    res.status(statusCode).json(error)
  }
})


server.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req.body.username, req.body.password)
    res.status(200).json(result)
  } catch (error) {
    let statusCode = 500
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      statusCode = 400
    }
    res.status(statusCode).json(error)
  }
})


server.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const userID = await getUserID(req.user.username)
    console.log(userID)
    const upcomingEvent = await getUpcomingEvent(userID.id)
    res.status(200).json(upcomingEvent)
  } catch (error) {
    let statusCode = 500
    if (error.message === 'User not found' || error.message === 'Event not found') {
      statusCode = 404
    }
    res.status(statusCode).json(error)
  }
})

server.post('/create-event', authenticateToken, async (req, res) => {
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
})

server.get('/events', authenticateToken, async (req, res) => {
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
})

server.get('/events/:eventID', authenticateToken, async (req, res) => {
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
})

server.patch('/events/:eventID', authenticateToken, async (req, res) => {
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
})

server.delete('/events/:eventID', authenticateToken, async (req, res) => {
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
})

server.post('/rsvp/:eventID', async (req, res) => {
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
})

server.post('/events/:eventID/addmoderator', authenticateToken, async (req, res) => {
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
})

server.delete('/events/:eventID/removemoderator', authenticateToken, async (req, res) => {
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
})



sequelize.sync({ alter: true }).then(()=>{
  app = server.listen(3006, () => {
    console.log('Server started on port 3006')
  })
}).catch((error) => {
  console.error('Unable to sync models with the database: ', error)
})

export default app