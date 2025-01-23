import DbConnect from "@/lib/dbConnect";
import { Contact} from "@/Model/feedback";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"
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
  const data = await Contact.find();
  return NextResponse.json({ data });
}

export async function POST(req) {
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  console.log(req.body);
  try {
    await DbConnect();
    const body = await req.json();
   
    console.log("this is body length", Object.keys(body).length);
    
      const{fullname,email,message} = body
     
      let feedback = new Contact({ 
        fullname,
        email,
        message
      })
      const result = feedback.save();
      console.log("feedback saved successfully ");
      if(email){
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
    const mailoptions1 = {
      from :sender,
      to : email,
      subject : "Application",
      html : `<!DOCTYPE html>
<html lang="en">

<head>
    <title>Application Received</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            background-color: #FFFFFF;
            color: #444a5b;
        }

        h1 {
            color: #008bff;
            font-size: 36px;
            font-weight: 700;
            line-height: 120%;
            text-align: left;
            margin: 20px 0;
        }

        p {
            font-size: 16px;
            line-height: 150%;
            margin: 10px 0;
        }

        .container {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #444a5b;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Application Received</h1>
        <p>Dear Candidate,</p>
        <p>Thank you for applying for the Job. We have successfully received your application.</p>
        <p>Our team will review your application and get back to you shortly. In the meantime, feel free to reach out to us if you have any questions.</p>
        <p>Thank you for your interest in joining our team!</p>
        </br>
        <p>Best regards,</p>
        <p><strong> iLearnings Team</strong></p>
        <p>Need Assistance? Call us at 9730002506</p>
        <div class="footer">
            <p><strong>iLearnings</strong> - Helping You Achieve Your Goals</p>
        </div>
    </div>
</body>

</html>
`
    }
    
    try {
       await transporter.sendMail(mailoptions1);
       console.log("Mail send successfully !")

       

       return NextResponse.json({success:true},{status:200})
    } catch (error) {
      console.log(error);
      console.log("Error while sending the mail !")
      return NextResponse.json({success:true},{status:200})
    }
      }
    return NextResponse.json({ feedback, success: true },{status:200});
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
