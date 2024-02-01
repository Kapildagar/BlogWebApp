import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter the name"]
    },
    fullName: {
        type: String,
        required: [true, "Enter the name"]
    },
    email: {
        type: String,
        required: [true, "Enter the Email"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Enter the Password"]
    },
    avatar:{
        type:String
    },
    coverImage:{
        type:String
    }, 
    refreshToken: {
        type: String
    },
    accessToken: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    console.log(process.env.REFRESH_TOKEN_SECRET)
      return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    console.log(data)
}
const User = mongoose.model("User", userSchema);


export default User;