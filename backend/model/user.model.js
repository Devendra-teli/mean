import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  dob: String,
  address: String,
},{timestamps: true});

const userModel = mongoose.model('user',userSchema);

export default userModel