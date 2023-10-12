import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  isVerifiedAccount: {
    type: Boolean,
    default: false,
  },
  emailVerificationLink:String,
});
userSchema.methods.comparePassword = async function(userPassword){
  const isMatch = await bcrypt.compare(userPassword, this.password);
  if(isMatch){
    return true;
  }
  return false;
}
const User = new mongoose.model("Visitor", userSchema);
export default User;
