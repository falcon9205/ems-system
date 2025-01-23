//model for blogs database collections
import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
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
  course : {
    type:String,
    required : true
  }
});

const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course  