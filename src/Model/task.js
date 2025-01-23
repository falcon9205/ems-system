import mongoose from "mongoose";

const TaskSchema =new mongoose.Schema({
    emp_id : {
        type: String,
        required : true
    },
    Assign_by : {
        type :String,
        required:true
    },
    emp_name : {
        type:String,
        required:true,
        
    },
    task_title : {
        type : String,
        required : true
    },
    deadline : {
        type : String,
        required:true
    },
    description : {
        type:String
    },
    status : {
        type: Boolean,
        default : false
    },
    reason : {
        type:String
    }

},{timestamps:true})

const Task  = mongoose.models.Task || mongoose.model('Task',TaskSchema);

export default Task