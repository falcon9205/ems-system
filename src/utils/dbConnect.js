import mongoose from "mongoose";

const dbConnect = async ()=>{
    // try {
    //     const connect = await mongoose.connect(process.env.NEXT_PUBLIC_MongoDBURI)
    //     console.log(`MongoDB Connected: ${connect.connection.host}`);
    // } catch (error) {
    //     console.error(`Error: ${error.message}`);
    //     // process.exit(1);
    // }
    mongoose.connect(process.env.NEXT_PUBLIC_MongoDBURI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
}

export default dbConnect;