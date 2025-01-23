import mongoose from "mongoose";

const c_profile = new mongoose.Schema(
  {
    user_ID: {
      type: String,
      required: true,
      trim: true,
    },
    fullname : {
      type:String,
      require: true,
      uppercase: true
   },
   phone : {
      type:Number,
      require: true
   },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    highestQualification: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // This defines an array of strings
      required: true,
    },
    intro : {
      type:String,
      required:true
    },
    country : {
      type:String,
      required:true
    },
    university: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    linkedinProfile: {
      type: String,
      required:true
    },
    gender : {
      type: String,
      required: true,
      trim: true,
    },
    portfolio: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const t_profile = new mongoose.Schema(
  {
    user_ID: {
      type: String,
      required: true,
      trim: true,
    },
    fullname : {
       type:String,
       require: true,
       uppercase: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    phone : {
      type:Number,
      require: true
   },
    resumeUrl: {
      type: String,
      required: true,
      trim: true,
    },
    country : {
      type:String,
      required:true
    },
    gender : {
      type: String,
      required: true,
      trim: true,
    },
    AreaOfExpertise: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    language : {
      type: String,
      required: true,
    },
    highestQualification: {
      type: String,
      required: true,
    },
    freeSessionLink: {
      type: String,
     
    },
    graduationYear: {
      type: Number,
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
    portfolio: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const r_profile = new mongoose.Schema({
  user_ID: {
    type: String,
    required: true,
    trim: true,
  },
  fullname : {
     type:String,
     require: true,
     uppercase: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  phone : {
    type:Number,
    require: true
 },
  gender : {
    type: String,
    required: true,
    trim: true,
  },
  country : {
    type:String,
    required:true
  },
  Industry: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
   
  linkedinProfile: {
    type: String,
    required:true
  },
 
},{timestamps:true})

const ref_profile = new mongoose.Schema(
  {
    user_ID: {
      type: String,
      required: true,
      trim: true,
    },
    fullname : {
      type:String,
      require: true,
      uppercase: true
   },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    phone : {
      type:Number,
      require: true
   },
    country : {
      type:String,
      required:true
    },
    dob: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    linkedinProfile: {
      type: String,
      required:true
    },
    gender : {
      type: String,
      required: true,
      trim: true,
    },
    address : {
      type: String,
      required: true,
    }
    
  },
  { timestamps: true }
);

const CandidatesProfile =
  mongoose.models.CandidatesProfile ||
  mongoose.model("CandidatesProfile", c_profile);

const TrainersProfile =
  mongoose.models.TrainersProfile ||
  mongoose.model("TrainersProfile", t_profile);

const RecruitersProfile = mongoose.models.RecruitersProfile || mongoose.model("RecruitersProfile",r_profile)  

const ReferralProfile  = mongoose.models.ReferralProfile || mongoose.model("ReferralProfile",ref_profile)  

export  {CandidatesProfile,TrainersProfile,RecruitersProfile,ReferralProfile};
