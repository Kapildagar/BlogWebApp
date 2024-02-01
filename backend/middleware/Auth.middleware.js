import ApiError from "../utilies/ApiError.js";
import { asyncHandler } from "../utilies/asynHandler.js";
import jwt from "jsonwebtoken"
import User from "../models/User.models.js"

const Auth=asyncHandler(async(req,res,next)=>{
    try{
        console.log(req.cookies)
        const token=req.cookies?.Refreshtoken;
        console.log(token);

        if(!token){
            throw new ApiError(401,"unAuthosised User");
        }

        const userId=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        // console(userId);
        const user=await User.findById(userId?._id);
        if(!user){
             new ApiError(401,"User does not exist");
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
    }

})

export default Auth;