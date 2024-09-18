import express from "express";
const router = express.Router();
import { offUserModel } from "../models/off_users.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../config.js";


router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);
        const { off_name, off_email, off_password, role } = req.body;

        if (!off_name || !off_email || !off_password || !role) {
            return res.json({ "Error": "True", "Message": "All Fields Required..." });
        }


        const userExist = await offUserModel.findOne({off_email});
        console.log(userExist);

        if (!userExist) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials...." });
        }

        console.log("hi");
        console.log(off_password);
        console.log(userExist.off_password);
        if (off_password != userExist.off_password) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        }
    
        console.log("helllo");

        if (role != userExist.role) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        }

        if (off_name != userExist.off_name) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        }


        const payload = {
            user:{
                id:userExist._id,
                role:userExist.role
            }
        }

        //jwt sign
        jwt.sign(payload,JWT_SECRET_KEY,{"expiresIn":"100d"},
            (err,token)=>{
                if(err){
                    return res.json({"Error":"True","Message":"Token is not generated"});
                }

                return res.json({token});
            }
        )
        // return res.json({ "Error": "False", "Message": "Login is Successfull..." });
    } catch (error) {
        console.log(error.message);
        return res.json({ "Error": "True", "Message": error.message });
    }
})


export default router