import { offUserModel } from "../models/off_users.js";
import jwt from 'jsonwebtoken';
const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN;

export const offUserLogin = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
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

        if (role != userExist.role) {
            return res.json({ "Error": "True", "Message": "Login with Valid Credentials..." });
        }

        if (name != userExist.name) {
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
}