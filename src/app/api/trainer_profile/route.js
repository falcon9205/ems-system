import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import {TrainersProfile} from "@/Model/user_profile";
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
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  try {
    await DbConnect();

    // Extract user_ID from the query parameters
    const { searchParams } = new URL(req.url);
    const user_ID = searchParams.get("user_ID");
    console.log(user_ID);
    if(user_ID){
    // Find the document by user_ID
    const trainerProfile = await TrainersProfile.findOne({ user_ID });
    console.log(trainerProfile);
    
    if (!trainerProfile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ trainerProfile }, { status: 200 });
  }else{
    const trainerProfiles = await TrainersProfile.find();
    console.log(trainerProfiles);
    return NextResponse.json ({trainerProfiles},{status:200})
    
  }
  } catch (error) {
    console.log("Error fetching profile:", error);
    return NextResponse.json({ message: "An error occurred", error }, { status: 500 });
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
    const body = await req.json();

    const {
      fullname,
      language,
      user_ID,
      AreaOfExpertise,
      highestQualification,
      freeSessionLink,
      graduationYear,
      experience,
      state,
      linkedinProfile,
      portfolio,
      imageUrl,
      resumeUrl,
      gender
    } = body;
    console.log("data from backend ",fullname);
    
    // Using findOneAndUpdate() to check if user exists, update if so, or create new document if not
    const result = await TrainersProfile.findOneAndUpdate(
      { user_ID }, // Query to find user by user_ID
      {
        $set: {
            fullname,
            AreaOfExpertise,
            highestQualification,
            freeSessionLink,
            graduationYear,
            experience,
            state,
            language,
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
    console.log("Something went wrong", error);
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
