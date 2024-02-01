import Blog from "../models/blog.models.js";
import blog from "../routes/Blog.routes.js";
import ApiError from "../utilies/ApiError.js";
import { ApiResponse } from "../utilies/ApiResonpse.js";
import { uploadOnCloudinary } from "../utilies/Cloudinary.js";
import { asyncHandler } from "../utilies/asynHandler.js";


const Create_Blog=asyncHandler(async(req,res,next)=>{
       console.log(req.user._id);
       const user=req.user._id;
       if(!user){
        throw new ApiError(400,'Not login');
       }

       console.log(req.body);
       console.log(req.file.path);
       const path=req.file.path;
       if(!path){
        throw new ApiError(400,"enter the user img");
       }
       console.log("working 1")
       const img=await uploadOnCloudinary(path);
       console.log("working 2")
       console.log(img)
       const img_url=img.url;
       console.log(img_url);

       const new_Blog=await Blog.create({
        img_url,
        tittle:req.body.tittle,
        des:req.body.des,
         user,
       })
       console.log(new_Blog);
       res.status(200).json(new ApiResponse(200,new_Blog,"Blog sucessfully Created"));

        
})


const get_All_Blog=asyncHandler(async(req,res,next)=>{
     const All_blog=await Blog.find();
     console.log(All_blog);

     res.status(200).json(new ApiResponse(200,All_blog,"All blog"));
})





export {
    Create_Blog,
    get_All_Blog,
}