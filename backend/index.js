import express from "express"
import dotenv from 'dotenv';
import conn from "./dbconn/dbconn.js"
import route from "./routes/userRoutes.js";
import __dirname from 'express'
import cors from "cors";
import cookieParser from "cookie-parser";
import blog from "./routes/Blog.routes.js";

dotenv.config()

const app=express()
app.use(cors({origin:'https://webapp-mocha-six.vercel.app',
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,
optionsSuccessStatus: 204,}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.use(cookieParser());
// console.log(__dirname());
// // app.use(fileUpload())
app.use("/api/v1/user",route);
app.use("/api/v1/blog",blog);
app.get('/',(req,res)=>{
    res.send("working in the deployment mode");
})

app.listen(process.env.PORT||5000,async()=>{
    try{
    await conn();
    console.log(`server is running on ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})



