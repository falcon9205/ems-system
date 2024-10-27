import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Admin from "@/Model/Signup_admin";
import bcrypt from "bcryptjs";
import Employee from "@/Model/Signup_employee";
import jwt from "jsonwebtoken";
import useLogin from "@/store/login";

export async function GET(req) {
  await dbConnect();
  const Users_Data = await Employee.find();
  return NextResponse.json({ Users_Data });
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, password, isAdmin } = body;
    console.log(isAdmin);

    if (isAdmin) {
      let user = await Admin.findOne({ email });

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.NEXT_PUBLIC_Secret,
            { expiresIn: "1h" }
          );
          console.log("token ", token);

          // const response = NextResponse.json(
          //   { message: "user found" },
          //   { status: 200 }
          // );
          // response.cookies.set("token", token, {
          //   httpOnly: true,
          // });

          // return response;

          return NextResponse.json(
            {
              success: true,
              message: "Admin login successful",
              user,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Admin credential error",
            },
            { status: 401 }
          );
        }
      }
    } else if (!isAdmin) {
      console.log("running file");

      let user = await Employee.findOne({ email });

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return NextResponse.json(
            {
              success: true,
              message: "Employee login successful",
              user,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Employee credential error",
            },
            { status: 401 }
          );
        }
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Username or password is incorrect",
      },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Login unsuccessful due to server error",
      },
      { status: 500 }
    );
  }
}
