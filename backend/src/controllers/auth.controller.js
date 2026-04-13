
import bcrypt from "bcrypt";
import User from "../models/user.model.js"
import {sendtoken} from "../lib/util.js"

import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res)=>{
  try{
    const {fullName,email,password} = req.body;
    
    if(!password || !fullName || !email){
      return res.status(400).send("Credentials can't be empty");
    }
    
    const existinguser = await User.findOne({email});
    if(existinguser){
      return res.status(400).json({message:"Email already exist"})
    }
    
    if(password.length < 6 ){
      return res.status(400).send("Password must be of atleast 6 characters");   
    }
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const newuser = new User({
      fullName,email,password:hashedPassword
    })
    
    if(newuser){
      await newuser.save();
      sendtoken(newuser._id,res);
      
      res.json({
        fullName,email,password,hash:hashedPassword,profilePic:newuser.profilePic
      })
    }
    else{
      return res.status(400).json({message:"Could not create user"})
    }
    
  }
  catch(err){
    console.log(err)
    res.status(500).send("Server error bro");
    
  }
}

export const login = async  (req,res)=>{
  try{
    const {email,password} = req.body
    
    const user = await User.findOne({email});
    
    if(!user){
      return res.status(400).json({"message":"invalid credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({"message":"invalid credentials"});
    }
    sendtoken(user._id,res);
    // res.json({ email, message: "you are logged in " })
    res.send(user)
    
  }
  catch(err){
    console.log(err)
  }
}

export const logout = (req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"})
  }
  catch(err){
    console.log(err);
  }
}

export const updateProfile = async(req,res) =>{
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;
    
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"});
    }
    
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser)
    
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Internal server error"})
    
  }
}


export const checkAuth = (req,res)=>{
  try{
    res.status(200).json(req.user);
  }
  catch(err){
    console.log(err);
    res.status(500).json({messgae:"Internal server error"})
  }
}


