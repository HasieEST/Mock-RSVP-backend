import bcrypt from 'bcrypt'

const verifyPassword = async (password, salt, storedHashedPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        if (hashedPassword === storedHashedPassword) {
            return true; // Passwords match
        } else {
            return false; // Passwords don't match
        }
    } catch (error) {
        throw error;
    }
};

export default verifyPassword;