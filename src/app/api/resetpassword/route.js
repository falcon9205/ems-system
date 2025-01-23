import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { Candidate, Trainer, Recruiter } from "@/Model/signup_schema";
import DbConnect from "@/lib/dbConnect";
import bcrypt, { hash } from "bcryptjs";
import { handleCors } from "@/lib/cors";

async function handleRequest(req) {
  const allowedOrigin = process.env.NEXT_ORIGIN 

  const res = new NextResponse();
  const canProceed = handleCors(req, res, allowedOrigin);
  if (!canProceed) {
    return NextResponse.json({ message: "Access forbidden: Invalid origin" }, { status: 403 });
  }
  return null; // Indicate request can proceed
}

export async function POST(req) {
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  await DbConnect();
  try {
    const body = await req.json();
    console.log("length of the body ", Object.keys(body).length);
    const { email, password, identity } = body;
    console.log("data from the backend ", email, password, identity);
    const hashpassword = await bcrypt.hash(password, 10);
    if (identity === "candidate") {
      const user = await Candidate.findOneAndUpdate(
        { email }, // filter
        { $set: { password: hashpassword } }, // update
        { new: true, runValidators: true } // options
      );
      return NextResponse.json({
        success: true,
        message: "Password updated successfully",
      });
    } else if (identity === "trainer") {
      const user = await Trainer.findOneAndUpdate(
        { email }, // filter
        { $set: { password: hashpassword } }, // update
        { new: true, runValidators: true } // options
      );
      return NextResponse.json({
        success: true,
        message: "Password updated successfully",
      });
    } else if (identity === "recruiter") {
      const user = await Recruiter.findOneAndUpdate(
        { email }, // filter
        { $set: { password: hashpassword } }, // update
        { new: true, runValidators: true } // options
      );
      return NextResponse.json({ success: true, message: "Password updated successfully" });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  } catch (error) {
    console.log("error occured", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
