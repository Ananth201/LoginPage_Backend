import express from "express";

import User from "../controllers/user.js";

import auth from "../middleware/auth.js";

const router=express.Router();

//User Register Route
router.post("/register",User.register);
//User Login Route
router.post('/login',User.login);


//Get All Users
//User first Login and See the All Registered Users List 
router.get('/user',auth,User.getUser);


export default router;