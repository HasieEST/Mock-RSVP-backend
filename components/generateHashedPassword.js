// Generate a salt and hash a password
import bcrypt from 'bcrypt';

const saltRounds = 10;

const generateHashedPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return { salt, hashedPassword };
    } catch (error) {
        throw error;
    }
};

export default generateHashedPassword;
