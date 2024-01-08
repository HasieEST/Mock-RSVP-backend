import { DataTypes } from 'sequelize'
import sequelize from '../Utils/sequalize.js'

const User_Events = sequelize.define('user_events', {
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
    tableName: 'user_events',
    timestamps: false
})

export default User_Events