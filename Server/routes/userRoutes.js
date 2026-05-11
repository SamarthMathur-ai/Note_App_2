import express from 'express';
import path from 'path';
import userSignup from  '../controllers/usersController.js';


const port = 8080;
const router = express.Router()
router.use(express.urlencoded({extended:true}));// * extended for nested object.

router.post("/signup", userSignup );



export default router;