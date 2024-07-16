import query from "../config/db.js";

// const createUserTable = async (username, password) => {
//     try {
        
//     const result = await query('INSERT INTO users (username,password) VALUES (?,?)', [username,password])
//     return result; 
// } catch (error) {
//     console.error("Error is:", error)
// }
// };
const createUserTable = async (username, password) => {
    try {
        const createUser = `
        CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
        )`;
        
    const result = await query(createUser)
    console.log("New Users table successfully created");
} catch (error) {
    console.error("Error is:", error)
}
};

export default createUserTable;
