import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();

//Get all recipes
router.get('/',()=>{})
//Get all my recipes
router.get('/my',checkAuth,()=>{})

router.get('/:id',()=>{})
