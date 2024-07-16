import bcrypt from 'bcryptjs';

const matchPasswords = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export default matchPasswords;
