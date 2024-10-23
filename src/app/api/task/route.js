import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Task from "@/Model/task";

export async function GET(req) {
  await dbConnect();
  const All_Task = await Task.find();
  return NextResponse.json({ All_Task });
}

export async function PUT(req) {
  console.log("Running PUT API");

  try {
    await dbConnect();

    const body = await req.json();
    console.log("databody",body);
    
    const { id, status } = body; // Extract taskId and status from request body
    
    // Find and update the task by ID
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status } 
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
    const { Assign_by,task_title, deadline, description, emp_name, emp_id } = body;

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
