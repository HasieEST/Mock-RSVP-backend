import { DataTypes } from 'sequelize'
import sequelize from '../Utils/sequalize.js'

const Users = sequelize.define('User', {
    idUsers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    Hashedpassword: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: false
})

export default Users