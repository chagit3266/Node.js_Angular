import { Router } from "express";
import { getAllCategory } from '../controllers/category.controller.js';

const router = Router();

//get all category
//Optional:full, code, desc
router.get('/',getAllCategory)

export default router