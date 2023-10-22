import crypto from "node:crypto";
import * as OTPAuth from "otpauth";
import User from "../models/userModel.js";
import base32Encode from "base32-encode";
function generateRandomBase32(){
    const secret = crypto.randomBytes(15);
    const base32 = base32Encode(secret, 'RFC4648').replace(/=/g, "").substring(0, 24);
    console.log(base32);
    return base32;
}

export const generateOTP = async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        const secret = generateRandomBase32();
        const totp = new OTPAuth.TOTP({
            issuer: "Google Auth",
            label: "2FA",
            algorithm: "SHA1", 
            digits: 6,
            period: 30,
            secret:secret,
        });
        const otpurl = totp.toString();
        user.otpAuthUrl = otpurl;
        user.otpBase32 = secret;
        await user.save();
        return res.send({
            "secret": secret,
           "qrcode": otpurl
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send("err");
    }
};
export const verifyOTP = async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        const token = req.body.token;
        const totp = new OTPAuth.TOTP({
            issuer: "Google Auth",
            label: "2FA",
            algorithm: "SHA1", 
            digits: 6,
            period: 30,
            secret:user.otpBase32,
        });
       const delta= totp.validate({token});
       if(delta===null){
       return res.status(401).send("f");
       }
       user.is2faEnabled = true;
       await user.save();
       return res.send({message:"2fa setup", status:"success"});
    }
    catch(err){
        console.log(err);
    }
};

export const validateOTP = async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        const token = req.body.token;
        console.log(req.body.email);
        console.log(token);
        const totp = new OTPAuth.TOTP({
            issuer: "Google Auth",
            label: "2FA",
            algorithm: "SHA1", 
            digits: 6,
            period: 30,
            secret:user.otpBase32,
        });
       const delta= totp.validate({token});
       if(delta===null){
       return res.status(401).send({status:"fail"});
       }
       return res.send({status:"success"});
    }
    catch(err){
        console.log(err);
    }
};