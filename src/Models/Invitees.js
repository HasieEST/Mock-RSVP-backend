import { DataTypes } from 'sequelize'
import sequelize from '../Utils/sequalize.js'

const Invitees = sequelize.define('Invitees', {
    idInvitee: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idEvent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Response: {
        type: DataTypes.ENUM('Interested', 'Attending'),
        allowNull: false,
    },
    Additional_info: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'invitees',
    timestamps: false
})

export default Invitees