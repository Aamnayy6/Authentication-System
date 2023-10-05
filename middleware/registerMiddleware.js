import express from "express";
import User from "../models/userModel.js";
export const checkUniqueEmail= async(req, res, next)=>{
    try{
    const {email} = req.body;
    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400).send("User already exists");
        return;
    }
    next();
}catch(err){
    res.status(500).send(err);
}
};