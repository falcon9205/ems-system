import nodemailer from "nodemailer"
import { NextResponse } from "next/server";

export async function GET(req,res){
    return NextResponse.json({message : "running"})
}

export async function POST(req){
    const body = await req.json();
    const {authOTP,email} = body;
    console.log("Email from backend ",email,authOTP)
    
    
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id 
    const sender_passkey = process.env.NEXT_PUBLIC_Nodemailder
    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure : true,
      port:465,
      auth:{
        user: sender,
        pass: sender_passkey,
      }
    })
    const mailoptions = {
      from :sender,
      to : email,
      subject : "OTP authenticate",
      text : `To complete your authentication process, please use the following One-Time Password (authOTP): ${authOTP}`
    }
    try {
       await transporter.sendMail(mailoptions);
       console.log("Mail send successfully !")
       return NextResponse.json({success:true},{status:200})
    } catch (error) {
      console.log(error);
      console.log("Error while sending the mail !")
      return NextResponse.json({success:true},{status:200})
    }

}