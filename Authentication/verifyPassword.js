import bcrypt from 'bcrypt'

const verifyPassword = async (password, storedHashedPassword) => {
    try {
        if (await bcrypt.compare(password, storedHashedPassword)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export default verifyPassword;
