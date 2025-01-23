import DbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import  {Blogger, Blogs}  from "@/Model/blog_schema";
import { Candidate, Trainer, Recruiter } from "@/Model/signup_schema";

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
  await DbConnect();
  const blogs_Data = await Blogs.find()
  console.log(blogs_Data)
  return NextResponse.json({blogs_Data});
}

export async function POST(req) {
  const corsResponse = await handleRequest(req);
  
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  try{
    await DbConnect();

    // Parse the incoming JSON data
    const body = await req.json();
    const {blog_data,currentDate,user_ID,thumbnail_url } = body;
    let user = await Blogger.findOne({_id : user_ID}) 
    if(!user)
      user = await Trainer.findOne({_id : user_ID})
    if(!user)
      user = await Recruiter.findOne({_id : user_ID})
    console.log("userdata",user);
    
    const author_name = `${user.fullname}`;
    const blog =new Blogs({
      blog_id : user_ID,
      author_name,
      thumbnail_image : thumbnail_url,
      content:blog_data,
      date : currentDate
    })
    const result = await blog.save();
      console.log("Blog saved successful");

    return NextResponse.json({
      user , success:true
    },{status:200}) 
  } catch(error){
    console.error("Error saving Blog:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 })
  }
  
}
