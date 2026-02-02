import User from "../models/User.js";

export const getUserProfile=async(req,res)=>{
  const user=await User.findById(req.userId).select("-password");

  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
};

export const updateUserProfile=async (req,res)=>{
  const user=await User.findById(req.userId);

  if(!user){
    res.status(404);
    throw new Error("User not found");
  }

  user.name=req.body.name || user.name;
  user.email=req.body.email || user.email;

  const updatedUser=await user.save();

  res.json({
    id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email
  });
};
