import mongoose from "mongoose"

 const conn=async()=>{
  try{
      await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rwnzodx.mongodb.net/?retryWrites=true&w=majority`)
        console.log("connected to Database")
      
    }
    catch(err){
      console.log(err);
    }
    }

export default conn;