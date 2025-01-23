import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import {CandidatesProfile} from "@/Model/user_profile";
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
export async function GET(req) {
  const corsResponse = await handleRequest(req);
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  if (corsResponse) return corsResponse;
  try {
    await DbConnect();

    // Extract user_ID from the query parameters
    const { searchParams } = new URL(req.url);

    const user_ID = searchParams.get("user_ID");
    console.log(user_ID);

    // Find the document by user_ID
    const candidateProfile = await CandidatesProfile.findOne({ user_ID });
    console.log(candidateProfile);

    if (!candidateProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ candidateProfile }, { status: 200 });
  } catch (error) {
    console.log("Error fetching profile:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
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
    
    // Await the request's JSON body
    const body = await req.json();
    console.log(body);
    
    // Destructure body content
    const {
      fullname,
      user_ID,
      dob,
      address,
      highestQualification,
      university,
      graduationYear,
      experience,
      state,
      intro,
      skills,
      country,
      linkedinProfile,
      portfolio,
      imageUrl,
      resumeUrl,
      gender
    } = body;

    // Validate user_ID
    if (!user_ID) {
      return NextResponse.json(
        { message: "user_ID is required", success: false },
        { status: 400 }
      );
    }

    // Using findOneAndUpdate() to check if user exists, update if so, or create new document if not
    const result = await CandidatesProfile.findOneAndUpdate(
      { user_ID }, // Query to find user by user_ID
      {
        $set: {
          fullname,
          dob,
          skills,
          address,
          highestQualification,
          university,
          graduationYear,
          experience,
          state,
          intro,
          country,
          linkedinProfile,
          portfolio,
          imageUrl,
          resumeUrl,
          gender
        },
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if no match is found
        setDefaultsOnInsert: true, // Apply default values if creating a new document
      }
    );

    console.log("Data saved/updated successfully:", result);

    return NextResponse.json({ body: result, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Something went wrong", message: error.message, success: false },
      { status: 500 }
    );
  }
}

