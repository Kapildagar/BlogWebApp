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

// Add the code to delete the images form the cloudinary
const Update_Blog=asyncHandler(async(req,res,next)=>{
  console.log("llllll")
  //  console.log(req.body);
  //  console.log(req.file)
  console.log(req.user._id);
  const blogid=req.params.id;

  const user=req.user._id;
  if(!user){
   throw new ApiError(400,'Not login');
  }

  console.log(req.body);
  console.log(req.file?.path);
  const path=req.file?.path;
  if(!path){
    const new_Blog=await Blog.findByIdAndUpdate({_id:blogid},{
      tittle:req.body.tittle,
      des:req.body.des,
     },
     {new:true})
     console.log(new_Blog);
     res.status(200).json(new ApiResponse(200,new_Blog,"Blog sucessfully Updated"));  
     return;
  }
  console.log("working 1")
  const img=await uploadOnCloudinary(path);
  console.log("working 2")
  console.log(img)
  const img_url=img.url;
  console.log(img_url);
 

  const new_Blog=await Blog.findByIdAndUpdate({_id:blogid},{
   img_url,
   tittle:req.body.tittle,
   des:req.body.des,
    user,
  },
  {new:true})
  console.log(new_Blog);
  res.status(200).json(new ApiResponse(200,new_Blog,"Blog sucessfully Updated"));  
})



//Add the code to delete the images form the cloudinary
const Delete_Blog=asyncHandler(async(req,res,next)=>{

  // console.log(req.user._id);
  const blogid=req.params.id;
  console.log(blogid);
  // const user=req.user._id;
  // if(!user){
  //  throw new ApiError(400,'Not login');
  // }

  // console.log(req.body);
  // console.log(req.file.path);
  // const path=req.file.path;
  // if(!path){
  //  throw new ApiError(400,"enter the user img");
  // }
  // console.log("working 1")
  // const img=await uploadOnCloudinary(path);
  // console.log("working 2")
  // console.log(img)
  // const img_url=img.url;
  // console.log(img_url);
  

  await Blog.findByIdAndDelete({_id:blogid})

  // console.log(data);
  const user=req.user._id;
  const data=await Blog.find({user});
  
  res.status(200).json(new ApiResponse(200,data,"Blog sucessfully Deleted"));  
})





const get_All_Blog=asyncHandler(async(req,res,next)=>{
     const All_blog=await Blog.find();
     console.log(All_blog);
        

     res.status(200).json(new ApiResponse(200,All_blog,"All blog"));
})

const All_user_Blog=asyncHandler(async(req,res,next)=>{
  const user=req.user._id;
  const data=await Blog.find({user});
  console.log(data);
  res.status(200).json(new ApiResponse(200,data,"user all blog"));
})

const getBlogDetails=asyncHandler(async(req,res,next)=>{
    const id=req.params.id;
    const data=await Blog.findById({_id:id});
    console.log(data);
    res.status(200).json(new ApiResponse(200,data,"Data send"));
    
})






export {
    Create_Blog,
    get_All_Blog,
    Update_Blog,
    Delete_Blog,
    All_user_Blog,
    getBlogDetails
}