import { NextResponse } from "next/server";
import Applications from "@/Model/applications";
import DbConnect from "@/lib/dbConnect";
import { handleCors } from "@/lib/cors";
import { Candidate } from "@/Model/signup_schema";
import { CandidatesProfile } from "@/Model/user_profile";
import JobPost from "@/Model/jobpost";
import nodemailer from "nodemailer"
// Reusable CORS handler
async function handleRequest(req) {
  const allowedOrigin = process.env.NEXT_ORIGIN 

  const res = new NextResponse();
  const canProceed = handleCors(req, res, allowedOrigin);
  if (!canProceed) {
    return NextResponse.json({ message: "Access forbidden: Invalid origin" }, { status: 403 });
  }
  return null; // Indicate request can proceed
}

// GET request handler
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
    const application = await Applications.find();
    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error("Server-side issue:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// Add more HTTP methods (e.g., POST, PUT, DELETE) as needed


export async function POST(req){
    const corsResponse = await handleRequest(req);
    const frontend_key = req.headers.get('X-Custom-Header');
    console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
    
    if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
      return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
    }
    if (corsResponse) return corsResponse;
   try {
    await DbConnect()
    const body = await req.json()

    
    const {job_id,user_ID} = body
    console.log("Length of  body",Object.keys(body).length);
    
    console.log("From applications ",user_ID,job_id);
    if(!user_ID || !job_id)
    {
        return NextResponse.json({success:false},{status : 400})
    }
    var user ; 
    user = await Candidate.findOne({_id:user_ID})
    if(!user)
      user = await Trainer.findOne({_id:user_ID})
    
    var dataset;
    dataset = await CandidatesProfile.findOne({user_ID})
    

    const recruiter = await JobPost.findOne({_id:job_id})
    // console.log("dataset",dataset);
    

    const application = new Applications({
        candidateId:user_ID,
        jobId:job_id,
        fullname : dataset.fullname,
        resumeUrl : dataset.resumeUrl,
        linkedinProfile : dataset.linkedinProfile,
        experience : dataset.experience
    })
    const result = await application.save()
    console.log("Data of application ",application)
   
    
    if(user && recruiter)
    {

    
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
      to : user.email,
      subject : "Application Received",
      html : `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title>Application Acknowledgement</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f4f7fc;
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        }

        .nl-container {
            width: 100%;
            background-color: #f4f7fc;
        }

        .row-content {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        h1 {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin: 0;
        }

        .header {
            background-color: #008bff;
            padding: 20px;
            text-align: center;
        }

        .content {
            padding: 20px 30px;
            color: #333333;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
        }

        .footer {
            background-color: #f9fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #555555;
            border-top: 1px solid #e6e6e6;
        }

        .footer a {
            color: #008bff;
            text-decoration: none;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #008bff;
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
        }

        .cta-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <table class="nl-container" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="row-content">
                    <tr>
                        <td class="header">
                            <h1>Application Acknowledgement</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Dear Candidate,</p>
                            <p>Thank you for applying for the position. We have successfully received your application and appreciate your interest in joining our team.</p>
                            <p>Our recruitment team is currently reviewing your submission. If your qualifications align with our requirements, we will contact you shortly to discuss the next steps in the hiring process.</p>
                            <p>If you have any questions or require further assistance, please feel free to reach out to us. We are here to help and ensure a smooth application experience for you.</p>
                            <br>
                            <p>Warm regards,</p>
                            <p><strong>The iLearnings Recruitment Team</strong></p>
                            <div class="cta">
                                <a href="https://www.ilearningscareer.com/Login" target="_blank" class="cta-button">Visit Portal</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p><strong>iLearnings</strong> - Empowering Your Future</p>
                            <p>Visit us at <a href="https://www.ilearningscareer.com/" target="_blank">www.ilearningscareer.com</a></p>
                            <p>Need Assistance? Call us at <strong>+91 9730002506</strong></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`
    }
    const mailoptions2 = {
      from :sender,
      to : recruiter.recruiter_email,
      subject : "New Applications",
      html : `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title>New Application Notification</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f4f7fc;
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        }

        .nl-container {
            width: 100%;
            background-color: #f4f7fc;
        }

        .row-content {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        h1 {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin: 0;
        }

        .header {
            background-color: #008bff;
            padding: 20px;
            text-align: center;
        }

        .content {
            padding: 20px 30px;
            color: #333333;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 10px;
            border: 1px solid #008bff;
            text-align: left;
        }

        th {
            background-color: #f0f8ff;
            font-weight: bold;
            color: #333333;
        }

        .footer {
            background-color: #f9fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #555555;
            border-top: 1px solid #e6e6e6;
        }

        .footer a {
            color: #008bff;
            text-decoration: none;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #008bff;
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
        }

        .cta-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <table class="nl-container" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="row-content">
                    <tr>
                        <td class="header">
                            <h1>New Application Received</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Dear Team,</p>
                            <p>A new application has been received. Please log in to the <strong>iLearnings portal</strong> to review and respond to the candidate's application at your earliest convenience.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Candidate Details</th>
                                        <th>Provided Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>${dataset.fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>Experience</td>
                                        <td>${dataset.experience}</td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td>${recruiter.job_title}</td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn Profile</td>
                                        <td><a href="${dataset.linkedinProfile}" target="_blank">View Profile</a></td>
                                    </tr>
                                    <tr>
                                        <td>Resume</td>
                                        <td><a href="${dataset.resumeUrl}" target="_blank">Download Resume</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Thank you for your attention to this matter. Please let us know if you require any assistance.</p>
                            <a href="https://www.ilearningscareer.com/Login" target="_blank" class="cta-button">Visit Portal</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p><strong>iLearnings</strong> - Empowering Your Future</p>
                            <p>Visit us at <a href="https://www.ilearningscareer.com/" target="_blank">www.ilearningscareer.com</a></p>
                            <p>Need Assistance? Call us at <strong>+91 9730002506</strong></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`
    }
    try {
       await transporter.sendMail(mailoptions1);
       console.log("Mail send successfully !")

       await transporter.sendMail(mailoptions2);
       console.log("Mail send successfully !")

       return NextResponse.json({success:true},{status:200})
    } catch (error) {
      console.log(error);
      console.log("Error while sending the mail !")
      return NextResponse.json({success:true},{status:200})
    }
  }
  


    return NextResponse.json({success:true},{status:200})
   } catch (error) {
       console.log("Error occured due to server side",error);
       return NextResponse.json({success:false},{status:500})
       
   }
}