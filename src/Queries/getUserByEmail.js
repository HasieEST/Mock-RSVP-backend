import User from "../Models/Users.js"

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                Email: email,
            },
            attributes: ['idUsers']
        })

        if (!user) {
            throw new Error('No user is registered with this email')
        }

        return { success: true, id: user.idUsers }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export default getUserByEmail