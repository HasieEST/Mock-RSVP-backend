import Event from "../Models/Events.js"
import User from "../Models/Users.js"
import User_Events from "../Models/User_events.js"
import { literal } from "sequelize"

const getEvent = async (eventID) => {
  try {
    const eventDetails = await Event.findOne({
      where: { idEvent: eventID },
      attributes: [
        ['Title', 'title'],
        ['Date', 'date'],
        ['Location', 'location'],
        [literal('users.Username'), 'host'],
        [literal(`CASE WHEN user_events.role IN ('host', 'moderator') THEN 1 ELSE 0 END`), 'role']
      ],
      include: [
        {
          model: User,
          attributes: [],
          required: true,
          through: { attributes: [] }
        },
        {
          model: User_Events,
          attributes: [],
          required: true,
          where: { IdEvent: eventID },
          include: [
            {
              model: User,
              attributes: [],
              required: true,
            }
          ]
        }
      ]
    })

    if (!eventDetails) {
      throw new Error('Event not found')
    }

    return {
      success: true,
      title: eventDetails.title,
      date: eventDetails.date,
      location: eventDetails.location,
      host: eventDetails.host,
      role: eventDetails.role
    }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default getEvent
