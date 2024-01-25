import registerUser from "../Authentication/registerUser.js"
import loginUser from "../Authentication/loginUser.js"


const register = async (req, res) => {
    try {
        const result = await registerUser(req.body.username, req.body.email, req.body.password)
        res.status(200).json(result)
    } catch (error) {
        let statusCode = 500
        if (error.message === 'Duplicate username or email found') {
            statusCode = 400
        }
        res.status(statusCode).json(error)
    }
}

const login = async (req, res) => { 
    try {
        const result = await loginUser(req.body.username, req.body.password)
        res.status(200).json(result)
      } catch (error) {
        let statusCode = 500
        if (error.message === 'User not found' || error.message === 'Invalid password') {
          statusCode = 400
        }
        res.status(statusCode).json(error)
      }
}

export default {register, login}