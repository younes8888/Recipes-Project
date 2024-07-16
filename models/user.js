import query from "../config/db.js";


const createUserTable = async () => {
    try {
        const createUserQuery= `
        CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
        )`;
        
    const result = await query(createUserQuery)
    console.log("New Users table successfully created");
} catch (error) {
    console.error("Error is:", error)
}
};

export default createUserTable;
