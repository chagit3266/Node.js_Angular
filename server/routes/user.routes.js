import { Router } from "express";

import { blockGuest, checkAdmi, checkAuth } from "../middlewares/auth.middleware.js";

import { deleteUser, getAllUsers, signIn, signUp, updatePassword } from "../controllers/user.controller.js";

const router=Router()

router.post('/sign-in',checkAdmi,signIn)

router.post('/sign-up',signUp)

router.get('/',getAllUsers)

router.put('/',checkAuth,blockGuest,updatePassword)

router.delete('/',checkAuth,blockGuest,deleteUser)