import bcrypt from 'bcrypt'

const verifyPassword = async (password, salt, storedHashedPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        if (hashedPassword === storedHashedPassword) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        throw error;
    }
};

export default verifyPassword;
