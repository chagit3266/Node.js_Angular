import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";

import { getAllRecipe, getRecipeById } from "../controllers/recipe.controller.js";

const router = Router();

//Get all recipes
//If a token exists, include user's private recipes as well
// // Optional: search, limit, page :/recipes?search=aaa&limit=5&page=2 
router.get('/', checkAuth, getAllRecipe)

//Get by id
router.get('/:id', getRecipeById)






