import getUserData from './getUserData.js';
import verifyPassword from './verifyPassword.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const loginUser = async (username, password) => {
    const userData = await getUserData(username);

    if (userData.success) {
        const { hashedPassword, salt } = userData;
        const passwordMatches = await verifyPassword(password, salt, hashedPassword);

        if (passwordMatches) {
            const token = jwt.sign({ username }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            return { success: true, token };
        } else {
            return { success: false, message: 'Invalid password' };
        }
    } else {
        return { success: false, message: 'User not found' };
    }
};

export default loginUser;
