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
            FROM Recipes
            WHERE id=?
            `;
            const result = await query(getOneRecipeQuery,[id])
            if( result.length> 0){
                res.status(200).json({success: true, recipe: result})
            } else {
                res.status(401).json({success: false, message: 'Not found'})
            }

        }catch (error){
            console.error(error);
        }
    },
    postRecipe: async (req, res) => {
        try {
        const {title, ingredients, instructions} = req.body;
        const userEmail = req.user.email;
    
        if(!title || !ingredients || !instructions){
            res.status(401).json({success: false, message: 'Fill out all required fields'})
        } 

        const postRecipeQuery = `
        INSERT INTO recipes (title, ingredients, instructions,userEmail)
        VALUES(?,?,?,?)
        `
        const result = await query(postRecipeQuery, [title,ingredients,instructions, userEmail])
        res.status(200).json({success: true, newAddedRecipe: result})
    }catch (error){
        console.error(error)
    }
       
    },
    updateRecipe: async (req, res) => {
        const recipeId = req.params.id
        res.send(`message: update a recipe with id ${recipeId}`)
    },
    deleteRecipe: async (req, res) => {
        const recipeId = req.params.id
        res.send(`message: 'Delete recipe with id {recipeId}`)
    },
};

export default recipeControllers;
