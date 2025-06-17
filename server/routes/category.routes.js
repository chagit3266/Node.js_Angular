import { Router } from "express";
import { getAllCategory } from "../controllers/category.controller";

const router = Router();

//get all category
//Optional:full, code, desc
router.get('/',getAllCategory)
