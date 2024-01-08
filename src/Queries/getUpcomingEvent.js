import Event from "../Models/Events.js"
import User_Events from "../Models/User_events.js"
import { Op, literal } from "sequelize"

const getUpcomingEvent = async (userId) => {
  try {
    const upcomingEvent = await Event.findOne({
      attributes: ['Title', 'Date', 'Location'],
      include: [
        {
          model: User_Events,
          attributes: [],
          where: {
            IdUser: userId
          }
        }
      ],
      where: {
        Date: { [Op.gte]: literal('NOW()') }
      },
      order: [['Date', 'ASC']]
    })

    if (!upcomingEvent) {
      return { success: false, message: 'Event not found' }
    }

    return {
      success: true,
      title: upcomingEvent.Title,
      date: upcomingEvent.Date,
      location: upcomingEvent.Location
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Database query error' }
  }
}

export default getUpcomingEvent
