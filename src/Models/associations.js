import Users from "./Users"
import Events from "./Events"
import Invitees from "./Invitees"
import User_Events from "./User_events"

Users.belongsToMany(Events, { through: User_Events, foreignKey: 'IdUser' })
Events.belongsToMany(Users, { through: User_Events, foreignKey: 'IdEvent' })

Events.belongsTo(Users, { foreignKey: 'OrganizerID' })
Users.hasMany(Events, { foreignKey: 'OrganizerID' })

Invitees.belongsTo(Events, { foreignKey: 'idEvent' })
Events.hasMany(Invitees, { foreignKey: 'idEvent' })

export { Users, Events, Invitees, User_Events }
