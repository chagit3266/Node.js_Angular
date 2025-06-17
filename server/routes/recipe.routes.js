import { Router } from "express";
import { blockGuest, checkAuth,blockGuest } from "../middlewares/auth.middleware.js";

import { getAllRecipe, getRecipeById, addRecipe, deleteRecipe, updateRecipe } from "../controllers/recipe.controller.js";

const router = Router();

//Get all recipes
//If a token exists, include user's private recipes as well
//Optional: search, limit, page, maxTime :/recipes?search=aaa&limit=5&page=2 
router.get('/', checkAuth, getAllRecipe)

//Get by id
router.get('/:id', getRecipeById)

//add recipe
router.post('/', checkAuth, blockGuest, addRecipe)

//update recipe
router.put('/',checkAuth, blockGuest,updateRecipe)

//delete recipe
router.delete('/',checkAuth, blockGuest,deleteRecipe)



