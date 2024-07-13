import db from '../config/db.js';

const createUserTable = async (username, password) => {
    try {
        
    const result = await db.query('INSERT INTO users (username,password) VALUES (?,?)', [username,password])
    return result; 
} catch (error) {
    console.error("Error is:", error)
}
};

export default createUserTable;
