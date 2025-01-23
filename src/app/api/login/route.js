import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Admin from "@/Model/Signup_admin";
import bcrypt from "bcryptjs";
import Employee from "@/Model/Signup_employee";
import jwt from "jsonwebtoken";

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
    var identity;
    if (isAdmin) {
      const user = await Admin.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          identity = "Admin"
          const token = jwt.sign(
            { id: user._id },
            process.env.NEXT_PUBLIC_jwt,
            { expiresIn: "1h" }
          );
          console.log("token & id", token, user._id);

          const response = NextResponse.json(
            { message: "User Found", user },
            { status: 200 }
          );

          // Set the token cookie
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );
          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          )
         
          return response;
        }
         else {
          return NextResponse.json(
            { success: false, message: "Admin credential error" },
            { status: 401 }
          );
        }
      }
    } else if (!isAdmin) {
      const user = await Employee.findOne({ email });
      if (user) {
         
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          identity = "Employee"
          const token = jwt.sign(
            { id: user._id },
            process.env.NEXT_PUBLIC_jwt,
            { expiresIn: "1h" }
          );
          console.log("token & id", token, user._id);

          const response = NextResponse.json(
            { message: "User Found", user },
            { status: 200 }
          );

          // Set the token cookie
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );

          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          );

          return response;
        } else {
          return NextResponse.json(
            { success: false, message: "Employee credential error" },
            { status: 401 }
          );
        }
      }
    }

    return NextResponse.json(
      { success: false, message: "Username or password is incorrect" },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Login unsuccessful due to server error" },
      { status: 500 }
    );
  }
}
