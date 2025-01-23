//model for blogs database collections
import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    candidateId: {
        type: String,
        required: true,
        
      },
      jobId: {
        type:String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
      linkedinProfile: {
        type: String,
        required:true
      },
      resumeUrl: {
        type: String,
        required: true,
        trim: true,
      },
      fullname : {
        type:String,
        require: true,
        uppercase: true
     },
},{timestamps:true});



const Applications =
  mongoose.models.Applications || mongoose.model("Applications", applicationSchema);


export default Applications
