import User from "../Models/Users.js"

const getUserID = async (username) => {
    try {
        const user = await User.findOne({
            attributes: ['idUsers'],
            where: { Username: username }
        })

        if (!user) {
            return { success: false, message: 'There is no user with that username' }
        }

        return { success: true, id: user.idUsers }
    } catch (error) {
        return { success: false, message: 'Database error: UserID' }
    }
}

export default getUserID