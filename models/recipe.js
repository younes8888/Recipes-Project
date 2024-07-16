import query from '../config/db.js';

const createRecipeTable = async () => {
    try {
        const createRecipe = `
        CREATE TABLE IF NOT EXISTS recipes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255),
        ingredients TEXT,
        instructions TEXT
        )`;
        const result = await query(createRecipe);
        console.log("New recipe table is created successfully");
    } catch (error) {
        console.error(error);
    }
};

export default createRecipeTable;