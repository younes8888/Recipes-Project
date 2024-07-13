import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        res.send({message: "Get all recipes"});
    },
    getOneRecipe: async (req, res) => {
        const recipeId = req.params.id
        res.send(`Recipe by id ${recipeId}`)
    },
    postRecipe: async (req, res) => {
        res.send({message: "create a new recipe"})
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
