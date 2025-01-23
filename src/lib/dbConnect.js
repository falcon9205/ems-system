import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DbConnect = async()=>{
    console.log("URI",process.env.NEXT_PUBLIC_MONGO_URI);
    
    try{
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
        console.log('Database connect successfully');
        
    } catch(error){
        console.error("Error connection to Database :",error); 
    }
}
export default DbConnect;