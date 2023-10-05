import  express  from "express";
import authRoutes from "./Routes/authRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.mongoDB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});
app.use("/auth", authRoutes);
app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});