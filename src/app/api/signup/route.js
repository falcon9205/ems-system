import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Admin from "@/Model/Signup_admin";
import bcrypt, { hash } from "bcryptjs";
import Employee from "@/Model/Signup_employee";

export async function GET(req) {
  await dbConnect();
  const Users_Data = await Admin.find();
  return NextResponse.json({ Users_Data });
}

export async function POST(req) {
  console.log( "backend console ",req.body);
  const body = await req.json();
  console.log("this is body", Object.keys(body).length);
  const { fullName, email, designation, password, isAdmin } = body;
  try {
    if (isAdmin) {
      await dbConnect();
      
      
      const hashpassword = await bcrypt.hash(password, 10);
      const user_admin = new Admin({
        fullName,
        designation,
        email,
        password: hashpassword,
      });
      await user_admin.save();
      console.log("admin data saved ");
      return NextResponse.json({ user_admin , identity : "Admin" }, { status: 200 });
    } 
    
    else {
        await dbConnect();
      
        const hashpassword = await bcrypt.hash(password, 10);
        const user_employee = new Employee({
          fullName,
          designation,
          email,
          password: hashpassword,
        });
        await user_employee.save();
        console.log("Employee data saved ");
        return NextResponse.json({ user_employee , identity : "Employee",success : true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
