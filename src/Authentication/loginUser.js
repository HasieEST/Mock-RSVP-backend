import User from '../Models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ where: { Username: username } })

    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatched = await bcrypt.compare(password, user.Hashedpassword)

    if (!passwordMatched) {
      throw new Error('Invalid password')
    }

    const jwtToken = jwt.sign({ username: username }, process.env.JWT_KEY, { expiresIn: '1h' })
    return { success: true, token: jwtToken }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export default loginUser
