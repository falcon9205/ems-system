import nodemailer from "nodemailer"
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





export async function GET(req,res){
    return NextResponse.json({message : "running"})
}

export async function POST(req){
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;


    const body = await req.json();
    const {authOTP,email} = body;
    console.log("Email from backend route authenticate",email,authOTP)
    
    
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
      html : `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
      background: #1E90FF; /* Blue color */
      color: #ffffff;
      border-radius: 8px 8px 0 0;
    }
    .content {
      text-align: center;
      padding: 20px;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #1E90FF; /* Blue color */
      margin: 20px 0;
    }
    .social-buttons {
      text-align: center;
      margin-top: 20px;
    }
    .social-buttons a {
      text-decoration: none;
      margin: 0 10px;
      display: inline-block;
      font-size: 0;
    }
    .social-buttons img {
      width: 32px;
      height: 32px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888888;
      margin-top: 20px;
    }
    .footer a {
      text-decoration: none;
      color: #1E90FF; /* Blue color for links */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your OTP Code</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Use the OTP code below to complete your authentication:</p>
      <div class="otp">${authOTP}</div>
      <p>This code is valid for the next 10 minutes. Do not share this OTP with anyone.</p>
    </div>
    <div class="social-buttons">
      <p>Follow us on:</p>
      <a href="https://www.facebook.com/iLearnings" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
      </a>
      <a href="https://www.instagram.com/ilearnings/" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram">
      </a>
      <a href="https://www.linkedin.com/company/ilearningscareer/posts/?feedView=all" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
      </a>
      <a href="https://www.youtube.com/@iLearnings" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube">
      </a>
    </div>
    <div class="footer">
      <p>If you did not request this, please ignore this email.</p>
      <p>© 2024 iLearnings Career & Consulting Pvt Ltd</p>
      <p><a href="https://www.ilearningscareer.com/" target="_blank">Visit our website</a></p>
    </div>
  </div>
</body>
</html>
`
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