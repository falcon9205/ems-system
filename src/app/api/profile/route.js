import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import { handleCors } from "@/lib/cors";
import { CandidatesProfile } from "@/Model/user_profile";

async function handleRequest(req) {
  const allowedOrigin = process.env.NEXT_ORIGIN 

  const res = new NextResponse();
  const canProceed = handleCors(req, res, allowedOrigin);
  if (!canProceed) {
    return NextResponse.json({ message: "Access forbidden: Invalid origin" }, { status: 403 });
  }
  return null; // Indicate request can proceed
}

export async function GET(req) {
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  await DbConnect();
  const dataCandidate = await CandidatesProfile.find();
  console.log(dataCandidate);
  
  return NextResponse.json({ dataCandidate });
}

export async function POST(req) {
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  try {
    await DbConnect();
    const body = await req.json();
    const { user_ID, description, gender, experience, image_url, resume_url } =
      body;

    const profile = new Profile({
      user_ID,
      description,
      gender,
      experience,
      image_url,
      resume_url,
    });
    const result = await profile.save();
    console.log("data saved successfull");

    return NextResponse.json({ body, success: true }, { status: 200 });
  } catch (error) {
    console.log("something went wrong", error);
    return NextResponse.json({ body, success: false }, { status: 500 });
  }
}
