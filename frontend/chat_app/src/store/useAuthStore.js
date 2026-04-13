import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set,get)=>({
authUser:null,
isSigningUp:false,
isLoggingIng:false,
isUpdatingProfile:false,
isCheckingAuth:true, 
onlineUsers:[],
socket:null,

checkAuth: async () =>{
  try{
    const res = await axiosInstance.get("/auth/check");
    set({authUser:res.data})
     get().connectSocket();
  }
  catch(err){
    console.log(err,"no token buddy")
    set({authUser:null});

  }
  finally{
    set({isCheckingAuth:false});
  }
},
signup: async (data) =>{
  set({isSigningUp:true});
  try{
  const res =   await axiosInstance.post("/auth/signup",data);
  console.log("----------------",res);
  toast.success("Account created successfully");
  set({authUser:res.data})
   get().connectSocket();
  }
  catch(err){
    console.log(err);
    toast.error(err.response.data.message)

  }
  finally{
    set({isSigningUp:false})
  }

},
logout: async()=>{
try {
  axiosInstance.post("/auth/logout");
  set({authUser:null});
  toast.success("Logged out successfully");
  get().disconnectSocket()
 
  
} catch (error) {
  toast.error(error.response.data.message);
}
},
login:async (data)=>{
  try {
    const res = await axiosInstance.post("/auth/login",data);
    set({authUser:res.data});
    toast.success("logged in successfully");
     get().connectSocket();
    
  } catch (error) {
    toast.error("Login error")
    
  }
  finally{
    set({isLoggingIng:false})
  }

},
updateProfile: async (data) =>{
  set({isUpdatingProfile:true});
  try {
    const res = await axiosInstance.put("auth/update-profile",data);
    set({authUser:res.data});
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log("error in update profile",error);
    toast.error(error.response.data.message);
    
  }
  finally{
    set({isUpdatingProfile:false})
  }

},
connectSocket:() =>{
  const {authUser} = get();
  if(!authUser||get().socket?.connected) return;
const socket = io(BASE_URL,{
  query:{
    userId:authUser._id
  }
});
socket.on("getonlineusers",(userIds) =>{
set({onlineUsers:userIds})
})
socket.connect();
set({socket})
},
disconnectSocket:()=>{
  if(get().socket?.connect) get().socket.disconnect()

}
}));