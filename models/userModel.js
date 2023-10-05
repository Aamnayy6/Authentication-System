import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:String,
    password: String,
    email: String
});
const User = new mongoose.model("Visitor", userSchema);
export default User;