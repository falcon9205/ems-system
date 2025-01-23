import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      
      lowercase: true,
      trim: true,
    },
    clicks: {
      type: Number,
      required: true,
    },
    register: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model exists in the cache; if not, create it
const ReferralSystem =
  mongoose.models.ReferralSystem || mongoose.model("ReferralSystem", referralSchema);

export default ReferralSystem;
