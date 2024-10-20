import mongoose from "mongoose";

const EmployeeSchema =new mongoose.Schema({
    fullName : {
        type: String,
        required : true
    },
    designation : {
        type :String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }

},{timestamps:true})

const Employee  = mongoose.models.Employee || mongoose.model('Employee',EmployeeSchema);

export default Employee