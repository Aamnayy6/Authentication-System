import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

export const registerUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const user = new User({
      email: email,
      userName: userName,
      password: bcrypt.hashSync(password, 10),
    });
    await user.save();
    const jwtoken = createjwtoken({email:user.email, userName: user.userName});
    res.cookie('jwt', jwtoken, cookieOptions);
    res.send({status:"success", jwtoken ,data: {
        user
    }});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

function createjwtoken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      res.status(401).send("incorrect pass");
      return;
    }
 
    const jwtoken = createjwtoken({ email: user.email, userName: user.userName});
   
    res.cookie("jwt", jwtoken, cookieOptions);
    res.send({
      status: "success",
      jwtoken,
      data: {
        user
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    return;
  }
};
