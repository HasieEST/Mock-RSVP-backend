import bcrypt from 'bcrypt';

const generateHashedPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return { hashedPassword };
    } catch (error) {
        throw error;
    }
};

export default generateHashedPassword;
