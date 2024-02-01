import mongoose, { Schema } from 'mongoose'


const blogSchema=new mongoose.Schema({
    img_url:{
        type:String,

    },
    tittle:{
        type:String,
        required:[true,"Enter the tittle"]
    },
    des:{
        type:String,
        required:true
    },
    user:{
        type:Schema.ObjectId,
        ref:"User"
    },
    isprivate:{
        type:Boolean,
        default:false
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:[
        {
            type:Schema.ObjectId,
            ref:"User"
        }
    ]

},{
    timestamps:true
})

const Blog=mongoose.model("blog",blogSchema);

export default Blog;