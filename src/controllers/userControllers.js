import { userModel } from "../model/user_model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploaderCloudinary } from "../utils/cloudinary.js";

 const registerUsers= asyncHandler(async(req,res)=>{
    console.log("*****************Request**********",req.files)
  const {
    fullName,email, username,password
  }=req.body
  //filed check
  if([    fullName,email, username,password].some((field) => field.trim() === "")){
    throw new ApiError(400, "All fields are require ");
  }
  // existed user checker
  const existedUser = await userModel.findOne({
    $or:[{username},{email}]
  })
  if(existedUser) throw ApiError(409, "Username and email already exist!!")

  
//avatar checker 
const avatarLocalPath= req.files?.avatar[0]?.path
const coverImgLocalPath= req.files?.coverImage[0]?.path
if(!avatarLocalPath) throw ApiError(400, "Avatar file required") 

 const avatar= await uploaderCloudinary(avatarLocalPath)  
 const coverImage= await uploaderCloudinary(coverImgLocalPath)  ?? ""
 
 if(!avatar) throw ApiError (404, " Cloudinary response error")
  
  userModel.create({
    fullName,
    avatar:avatar.url,
    coverImg:coverImage.url,
    password,
    email,
    username:username.toLowerCase()

  })  

 const createdUser = await userModel.findById(user._id).select("-password -refreshToken") 

 if(!createdUser) throw ApiError(500,"Not user create properly")
 res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully"))   

})
export { registerUsers}