import User from "../models/userModel.js";
export const registerUser= async (req, res)=>{
        try{
        const {email, userName, password} = req.body;
        const user = new User({
            email:email,
            userName:userName,
            password:password
        });
        await user.save();
        res.send("added");
        }catch(err){
            res.status(500).send(err);
        }
};