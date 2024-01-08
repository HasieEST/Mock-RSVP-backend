import Event from "../Models/Events.js"
import User from "../Models/Users.js"
import User_Events from "../Models/User_events.js"

const getAllEvents = async (user) => {
  try {
    const events = await Event.findAll({
      attributes: [
        ['Title', 'title'],
        ['Date', 'date'],
        ['Location', 'location'],
        [Sequelize.literal('users.Username'), 'host'],
        [Sequelize.literal(`CASE WHEN user_events.role IN ('host', 'moderator') THEN 1 ELSE 0 END`), 'role']
      ],
      include: [
        {
          model: User,
          attributes: [],
          required: true,
          where: { idUsers: user }
        },
        {
          model: User_Events,
          attributes: [],
          required: true,
          where: { IdEvent: Sequelize.col('event.idEvent') }
        }
      ]
    })

    if (!events || events.length === 0) {
      throw new Error('No events found for the user')
    }

    const mappedEvents = events.map((event) => ({
      title: event.title,
      date: event.date,
      location: event.location,
      host: event.host,
      role: event.role
    }))

    return { success: true, events: mappedEvents }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default getAllEvents