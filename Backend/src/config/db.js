import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{});
        console.log("DB Connected Successfully");
    }catch(err){
        console.log("Error connecting to DB: " + err)
        process.exit();
    }
}
export default connectDb;