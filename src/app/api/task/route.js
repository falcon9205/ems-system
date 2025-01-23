import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Task from "@/Model/task";
import nodemailer from "nodemailer"

export async function GET(req) {
  const data = await Task.find()
  return NextResponse.json(data)
}

export async function PUT(req) {
  console.log("Running PUT API");

  try {
    await dbConnect();

    const body = await req.json();
    console.log("databody",body);
    
    const { id, status ,reason } = body; // Extract taskId and status from request body
    
    // Find and update the task by ID
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status,reason } 
    );

    if (!updatedTask) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
    }

    console.log("Task updated successfully", updatedTask);
    return NextResponse.json({ success: true, updatedTask }, { status: 200 });

  } catch (error) {
    console.log("Error updating task:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update task" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const {email, Assign_by,task_title, deadline, description, emp_name, emp_id } = body;
    console.log("Email from backend ",email)
    const tasks = new Task({
      Assign_by,
      task_title,
      deadline,
      description,
      emp_name,
      emp_id,
      
    });
    await tasks.save()
    console.log("Task data saved ");
    
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id 
    const sender_passkey = process.env.NEXT_PUBLIC_Nodemailder
    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure : true,
      port:465,
      auth:{
        user: sender,
        pass: sender_passkey,
      }
    })
    const mailoptions = {
      from :sender,
      to : email,
      subject : "Task Assigned",
      text : `New task has been assigned to you pls check your EMS portal ! ${sender}`
    }
    try {
       await transporter.sendMail(mailoptions);
       console.log("Mail send successfully !")
    } catch (error) {
      console.log(error);
      console.log("Error while sending the mail !")
    }
    return NextResponse.json({tasks,success : true }, { status: 200 });
    

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to add task ",
      },
      { status: 500 }
    );
  }
}
