import User from '../Models/Users.js'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'

const registerUser = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ Username: username }, { Email: email }] },
    })

    if (existingUser) {
      throw new Error('Duplicate username or email found')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ Username: username, Email: email, Hashedpassword: hashedPassword })

    return { success: true, message: 'Successfully created an account.' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default registerUser
