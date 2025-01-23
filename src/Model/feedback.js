//model for blogs database collections
import mongoose from "mongoose";
const constactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone : {
    type: Number,
    required: true,
    trim:true,
    min:10
  },
  message: {
    type: String,
    required: true,
  },
});

const offerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", constactSchema);
const Offer = mongoose.models.Offer || mongoose.model("Offer",offerSchema)
export {Offer,Contact};
