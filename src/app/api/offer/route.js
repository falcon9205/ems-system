import DbConnect from "@/lib/dbConnect";
import { Offer } from "@/Model/feedback";
import { NextResponse } from "next/server";
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
  await DbConnect();
  const data = await Offer.find();
  return NextResponse.json({ data });
}

export async function POST(req) {
  
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  try {
    await DbConnect();
    const body = await req.json();
   
    console.log("this is body length", Object.keys(body).length);
    console.log(body);
    
      const{fullname, email, phone, course, message} = body
     
      let offer = new Offer({
        fullname, email, phone, course, message
      })
      const result = offer.save();
      console.log("offer saved successfully ");
    return NextResponse.json({ offer, success: true },{status:200});
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
