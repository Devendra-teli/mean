import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

//--------------------------- Models imports start ----------------------------//
import userModel from "./model/user.model.js";

//--------------------------- Necessary middleware start ----------------------------//
app.use(express.json());
app.use(cors());
//--------------------------- Necessary middleware end ----------------------------//

//--------------------------- MongoDB connection login start ----------------------------//
async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/mean_curd");
  console.log("MongoDB connect successfully");
}
connectDB().catch((error) => console.log("MongoDB connection error"));
//--------------------------- MongoDB connection login end ---------------------------//

//--------------------------- APIs start ---------------------------//

// Get User
app.get("/get-users", async (req, res) => {
  try {
    let data = await userModel.find();
    res.status(200).json({ success: true, msg: "User list", data: data });
  } catch (error) {
    console.log("Error get user : ", error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal server error ",
        error: error.message,
      });
  }
});

app.get('/get-user-by-id/:id', async(req,res)=>{
  try {
    const userId = req.params.id;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).json({success: false,msg: "A valid id is require in params"});
    }
    const user = await userModel.findById(userId);
    if(user){
      res.status(200).json({success: true, msg:"User data", data: user})
    }else{
      res.status(404).json({success: false, msg: "User not found in database"});
    }
  } catch (error) {
    console.log("Error get user by id : ", error);
    res.status(500).json({success: false, msg:"Internal server error"})
  }
})

// Add user
app.post("/add-user", async (req, res) => {
  try {
    const postdata = req.body;
    if (
      postdata &&
      postdata.data &&
      postdata.data.name &&
      postdata.data.age &&
      postdata.data.dob &&
      postdata.data.address
    ) {
      const user = new userModel({
        name: postdata.data.name,
        age: postdata.data.age,
        dob: postdata.data.dob,
        address: postdata.data.address,
      });

      let resData = await user.save();
      res
        .status(200)
        .json({ success: true, msg: "User add successfully", data: resData });
    } else {
      res
        .status(400)
        .json({ success: false, msg: "Incomplete data", data: postdata.data });
    }
  } catch (error) {
    console.log("Error adding user :", error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal server error",
        error: error.message,
      });
  }
});

// Edit user
app.put("/edit-user/:id", async (req, res) => {
  try {
    const postdata = req.body;
    const userId = req.params.id;
    if (userId && postdata && postdata.data) {
      let resData = await userModel.findByIdAndUpdate(userId, postdata.data);
      res
        .status(200)
        .json({
          success: true,
          msg: "User updated successfully",
          data: resData,
        });
    } else {
      res.status(400).json({ success: false, msg: "Incomplete data" });
    }
  } catch (error) {
    console.log("Error edit user : ", error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal server error",
        error: error.message,
      });
  }
});

// Delete user
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      let resData = await userModel.findByIdAndDelete(userId);
      if(resData){
        res
        .status(200)
        .json({
          success: true,
          msg: "User deleted successfully",
          userDeleted: resData,
        });
      }else{
        res.status(500).json({success: false, msg: "User not found"})
      }
      
    } else {
      res.status(400).json({ success: false, msg: "Incomplete data" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal server error",
        error: error.message,
      });
  }
});

//--------------------------- Apis end ---------------------------//

//--------------------------- Server Listen start ---------------------------//
app.listen(3000, () => {
  console.log("Server run on http://localhost:3000");
});
//--------------------------- Server Listen end ---------------------------//
