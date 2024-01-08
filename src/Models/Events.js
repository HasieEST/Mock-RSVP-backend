import { DataTypes } from 'sequelize'
import sequelize from '../Utils/sequalize.js'

const Events = sequelize.define('Events', {
    idEvent: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Location: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    OrganizerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'events',
    timestamps: false
})

export default Events