import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try{ 
            const getAllRecipesQuery = (`
            SELECT * 
            FROM recipes`);
            const allRecipes = await query(getAllRecipesQuery);
            
            if(allRecipes.length> 0) {

                res.status(200).json({success: true, recipes: allRecipes});
            } else {
                res.status(401).json({success: false, message: 'Not found'})
            } 
        }catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    },
    getOneRecipe: async (req, res) => {
        const {id} = req.params;

        try{
            const getOneRecipeQuery = `
            SELECT * 
            FROM recipes
            WHERE id=?
            `;
            const result = await query(getOneRecipeQuery,[id])
            if( result.length> 0){
               return res.status(200).json({success: true, recipe: result})
            } else {
                return res.status(401).json({success: false, message: 'Not found'})
            }

        }catch (error){
            console.error(error);
            res.status(500).json({success: false, error: error.message})
        }
    },
    postRecipe: async (req, res) => {
        try {
        const {title, ingredients, instructions} = req.body;
        const userEmail = req.user.email;
    
        if(!title || !ingredients || !instructions){
            return res.status(401).json({success: false, message: 'Fill out all required fields'})
        } 

        const postRecipeQuery = `
        INSERT INTO recipes (title, ingredients, instructions,userEmail)
        VALUES(?,?,?,?)
        `
        const result = await query(postRecipeQuery, [title,ingredients,instructions, userEmail])
        res.status(200).json({success: true, newAddedRecipe: result})
    }catch (error){
        console.error(error)
        res.status(500).json({success: false, error: error.message});
    }
       
    },
    updateRecipe: async (req, res) => {
        const recipeId = req.params.id
        const {title, ingredients, instructions} = req.body;
        
        if(!title && !ingredients && !instructions){
            return res.status(401).json({success: false, message: 'Fill out all required fields'})
        } 

        const fieldsToUpdate = {};
        if(title) fieldsToUpdate.title = title;
        if(ingredients) fieldsToUpdate.ingredients = ingredients;
        if (instructions) fieldsToUpdate.instructions = instructions;

        const setClause = Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ')
        
        const values = [...Object.values(fieldsToUpdate), recipeId];
        
        const updateRecipeQuery = `
        UPDATE recipes
        SET ${setClause}
        WHERE id = ?
        `
        try {
            const result = await query(updateRecipeQuery, values)
            if(result.affectedRows> 0) {
            return res.json({success: true, message: "recipe updated successfully"})
        } else {
            return res.status(404).json({success: false, message: ' recipe not found'})
        } 
        } catch (error) {
                console.error(error);
                res.status(500).json({success: false, error: "failed to update the recipe"})
        }

    },
    deleteRecipe: async (req, res) => {

        const recipeId = req.params.id

        const deleteRecipeQuery = `
        DELETE FROM recipes
        WHERE id = ?
        `
        try {
            const result = await query(deleteRecipeQuery, [recipeId])
            if(result.affectedRows> 0)  {
                return res.json({success: true, message: `recipe with id ${recipeId} deleted`})
            } else {
                return res.status(400).json({success: false, message: `recipe with id ${recipeId} not found`})
            }

        }catch (error) {

            console.error(error)
            res.status(500).json({success: false, error:"failed to delete"})
        }
    },
};


export default recipeControllers;
