import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import MongooseMorgan from "mongoose-morgan";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import viewRoutes from "./Routes/viewRoutes.js";
import mfaRoutes from "./Routes/mfaRoutes.js"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
app.set('view engine', 'ejs');
//rate limting allows 5 login requests / hour from 1 ip
const Loginlimiter = rateLimit({
  limit: 50, 
  windowMs: 60 * 60 * 1000,
  message: 'Too many attempts, try again in an hour'
});


app.use('/auth/login', Loginlimiter);

app.use(MongooseMorgan({connectionString: process.env.mongoDB_URI}, {},'short'));

mongoose
  .connect(process.env.mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res)=>{
  res.render("home");
})

app.use("/auth", authRoutes);
app.use("/otp/auth", mfaRoutes);
app.use("/view", viewRoutes);
app.all("*", (req, res, next)=>{
  res.status(404).send({
    status: 'fail',
    message: `Route ${req.originalUrl} could not be found`
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
