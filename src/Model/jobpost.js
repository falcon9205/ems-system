import mongoose from "mongoose";
const jobPostSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      required: true,
    },

    job_title: {
      type: String,
      required: true,
    },
    salaryType :{
      type: String,
      
    },
    company_name: {
      type: String,
      required: true,
    },
    companyUrl: {
      type: String,
     
    },
    experience: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    recruiter_id: {
      type: String,
      required: true,
    },
    recruiter_email: {
      type: String,
      required: true,
    },
    maxSalary: {
      type: String,
      
    },
    minSalary: {
      type: String,
      
    },
    applylink : {
      type:String
    },
    referralname :{
      type:String
    },
    referralid : {
      type:String
    }
  },
  { timestamps: true }
);

const JobPost =
  mongoose.models.JobPost || mongoose.model("JobPost", jobPostSchema);

export default JobPost;
