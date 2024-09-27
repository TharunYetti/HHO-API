import { offUserModel } from "../models/off_users.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY

export const offUserLogin = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ "Error": "True", "Message": "All Fields Required..." });
        }


        const userExist = await offUserModel.findOne({email});
        console.log(userExist);

        if (!userExist) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials...." });
        }

        console.log(password);
        console.log(userExist.password);
        if (password != userExist.password) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        }
    
        console.log("helllo");
        
        // if (role != userExist.role) {
        //     return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        // }

        // if (name != userExist.name) {
        //     return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        // }


        const payload = {
            user:{
                id:userExist._id,
                role:userExist.role
            }
        }
        console.log(JWT_SECRET_KEY);
        //jwt sign
        jwt.sign(payload,JWT_SECRET_KEY,{"expiresIn":"100d"},
            (err,token)=>{
                if(err){
                    console.log(err.message);
                    return res.json({"Error":"True","Message":"Token is not generated"});
                }
                console.log(token);
                return res.json({token});
            }
        )
        // return res.json({ "Error": "False", "Message": "Login is Successfull..." });
    } catch (error) {
        console.log(error.message);
        return res.json({ "Error": "True", "Message": error.message });
    }
}