import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export const protectRoute = async (req,res,next) =>{
  try{
    const token = req.cookies.jwt;

    if(!token){
      // console.log("you buddy no token")
      return res.status(401).json({message:"no  token"})
    }
    const decoded = jwt.verify(token,process.env.jwtsecret);

    if(!decoded){
      return res.status(401).json({message:"invalid token"})
    }

    const user = await User.findById(decoded.userid).select("-password");
    if(!user){
       return res.status(401).json({message:"user not found "})
    }
    req.user = user;
    next();
  }
  catch(err){
    console.log(err);
     return res.status(500).json({message:"internal server errors"})
  }
}
 