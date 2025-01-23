import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import { RecruitersProfile } from "@/Model/user_profile";
import { handleCors } from "@/lib/cors";
import ReferralSystem from "@/Model/referral";
import { Candidate, Recruiter, Referral } from "@/Model/signup_schema";
import mongoose from "mongoose";

async function handleRequest(req) {
  const allowedOrigin = process.env.NEXT_ORIGIN;

  const res = new NextResponse();
  const canProceed = handleCors(req, res, allowedOrigin);
  if (!canProceed) {
    return NextResponse.json(
      { message: "Access forbidden: Invalid origin" },
      { status: 403 }
    );
  }
  return null; // Indicate request can proceed
}

export async function GET(req) {
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get("X-Custom-Header");
  console.log(
    "from the backend ",
    frontend_key,
    process.env.NEXT_PUBLIC_FRONTEND
  );

  if (frontend_key !== process.env.NEXT_PUBLIC_FRONTEND) {
    return NextResponse.json(
      { message: "Forbidden: Invalid request source" },
      { status: 403 }
    );
  }
  try {
    await DbConnect();
    const {searchParams} = new URL(req.url);
    const user_id = searchParams.get('user_ID')
    
    const data = await ReferralSystem.findOne({ user_id})
    console.log("id from get", user_id);

    return NextResponse.json({data},{status:200})
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
  const frontend_key = req.headers.get("X-Custom-Header");
  console.log(
    "from the backend ",
    frontend_key,
    process.env.NEXT_PUBLIC_FRONTEND
  );

  if (frontend_key !== process.env.NEXT_PUBLIC_FRONTEND) {
    return NextResponse.json(
      { message: "Forbidden: Invalid request source" },
      { status: 403 }
    );
  }
  try {
    await DbConnect();
    const body = await req.json();
    const { queryValue, fullname, email, clicks, points, register } = body;
    console.log("id", queryValue);

    let user;

    // If the queryValue looks like a valid ObjectId, use findById
    if (mongoose.Types.ObjectId.isValid(queryValue)) {
      user = await Recruiter.findById(queryValue);
      if (!user) user = await Candidate.findById(queryValue);
      if (!user) user = await Referral.findById(queryValue);
    } else {
      // If it's not a valid ObjectId, search by custom identifier (e.g., user_id)
      user = await Recruiter.findOne({ user_id: queryValue });
      if (!user) user = await Candidate.findOne({ user_id: queryValue });
      if (!user) user = await Referral.findOne({ user_id: queryValue });
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid link" }, { status: 400 });
    }

    // Increment clicks by 1 each time the API is called
    const result = await ReferralSystem.findOneAndUpdate(
      { user_id: queryValue }, // Query to find user by user_id (or _id if using ObjectId)
      {
        $inc: { clicks: 1 }, // Increment clicks by 1
        $set: {
          fullname: user.firstname + " " + user.lastname,
          email : user.email,
          points,
          register,
        },
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if no match is found
        setDefaultsOnInsert: true, // Apply default values if creating a new document
      }
    );

    console.log("Data saved/updated successfully:", result);

    return NextResponse.json({ success: true, user: result }, { status: 200 });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
