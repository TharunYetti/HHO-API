import express from "express";
const router = express.Router();
import { offUserModel } from "../models/off_users.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../config.js";
import { middleware } from "../middlware.js";


router.post('/create-event',middleware,async(req,res)=>{
    console.log(res.user);
    return res.json("I  am creating an event");
})


// router.post('/vol-registration',async(req,res)=>{
//     try {
        
//     } catch (error) {
//         console.log(error.message);
//         return res.json({"Error":"True","Message":error.message});
//     }
// })

export default router