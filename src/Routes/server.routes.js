import express from 'express'
const router = express.Router()
import authenticateToken from '../Authentication/authenticateToken.js'
import authenticationController from '../Controllers/authentication.controller.js'
import applicationController from '../Controllers/application.controller.js'

/*Authentication*/
router.post('/register',authenticationController.register)
router.post('/login', authenticationController.login)

/*Main application*/
router.get('/upcoming',authenticateToken, applicationController.upcoming )
router.get('/events',authenticateToken, applicationController.events)
router.get('/events/:eventID',authenticateToken, applicationController.event)

router.post('/create-event',authenticateToken, applicationController.create_Event)
router.post('/rsvp/:eventID', applicationController.rsvp)
router.post('/events/:eventID/addmoderator',authenticateToken, applicationController.add_Moderator)

router.patch('/events/:eventID',authenticateToken, applicationController.updateEvent)

router.delete('/events/:eventID',authenticateToken, applicationController.delete_Event)
router.delete('/events/:eventID/removemoderator',authenticateToken, applicationController.remove_Moderator)

export default router