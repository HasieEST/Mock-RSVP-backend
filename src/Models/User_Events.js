import { DataTypes } from 'sequelize'
import sequelize from '../Utils/sequalize.js'
import Users from './Users.js'
import Events from './Events.js'

const User_Events = sequelize.define('User_Events', {
    IdUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    IdEvent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    tableName: 'User_Events',
    timestamps: false
})

Users.belongsToMany(Events, { through: User_Events, foreignKey: 'IdUser' })
Events.belongsToMany(Users, { through: User_Events, foreignKey: 'IdEvent' })

export default User_Events