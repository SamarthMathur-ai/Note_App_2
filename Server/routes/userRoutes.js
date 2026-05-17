import express from 'express';
import path from 'path';
import {userSignup,handleLogin} from  '../controllers/usersController.js';


const port = 8080;
const router = express.Router()

router.use(express.json());// * So that it can read json.
router.use(express.urlencoded({extended:true}));// * extended for nested object.

router.post("/signup", userSignup );
router.post("/login", handleLogin);


export default router;