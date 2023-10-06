import User from "../models/userModel.js";
import bcrypt from "bcrypt";
export const registerUser= async (req, res)=>{
        try{
        const {email, userName, password} = req.body;
        const user = new User({
            email:email,
            userName:userName,
            password:bcrypt.hashSync(password, 10),
        });
        await user.save();
        res.send(user);
        }catch(err){
            res.status(500).send(err);
        }
};