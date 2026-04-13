import mongoose from "mongoose";

export const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("database connected")
  }
  catch(err){
    console.log(err)
  }
}