import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import Applications from "@/Model/applications";
import { Candidate } from "@/Model/signup_schema";
import JobPost from "@/Model/jobpost";
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

export async function DELETE(req) {
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
    const { status, candidateId, jobId } = body;

    if (!candidateId || !status || !jobId) {
      return NextResponse.json(
        { error: "Please provide candidateId, jobId, and status" },
        { status: 400 }
      );
    }

    // Delete the application
    const deletedPost = await Applications.findOneAndDelete({ candidateId });
    if (!deletedPost) {
      return NextResponse.json(
        { error: "Application not found or already deleted" },
        { status: 404 }
      );
    }

    // Fetch candidate and job data
    const user = await Candidate.findById(candidateId);
    const jobData = await JobPost.findById(jobId);

    if (!user || !jobData ) {
      return NextResponse.json(
        { error: "Candidate or job data not found" },
        { status: 404 }
      );
    }
    if(status== "0"){
    // Mail Configuration
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id ;
    const senderPass = process.env.NEXT_PUBLIC_Nodemailder;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: sender,
        pass: senderPass,
      },
    });
    console.log("sender",sender);
    console.log("senderpasscode",senderPass);
    console.log("useremail",user.email);
    console.log("username",user.firstname);
    console.log("userlast",user.lastname);
    
    const mailOptions = {
      from: sender,
      to: user.email, // Ensure email is fetched correctly
      subject: "Application Update: Next Steps",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Application Shortlisted</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f7fc; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }
    .header { background: #008bff; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; color: #333; }
    .footer { background: #f9fafc; text-align: center; padding: 20px; font-size: 14px; color: #555; }
    a { color: #008bff; text-decoration: none; }
    .cta { display: inline-block; padding: 10px 20px; background: #008bff; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin-bottom: 8px; }
    .social-links { margin: 20px 0; text-align: center; }
    .social-links a { margin: 0 15px; display: inline-block; }
    .social-links img { width: 32px; height: 32px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Shortlisted!</h1>
    </div>
    <div class="content">
      <p>Dear ${user.firstname} ${user.lastname},</p>
      <p>We are pleased to inform you that you have been shortlisted for the position of <b>${jobData.job_title}</b> at <b>${jobData.company_name}</b>.</p>
      
      <h3>Next Steps:</h3>
      <ul>
        <li>Log in to your iLearnings account to check your application status and view further instructions.</li>
        <li>Prepare for the next stages of the hiring process as outlined on your dashboard.</li>
        <li>Stay connected with us for updates regarding your application.</li>
      </ul>

      <p>If you have any questions or need assistance, please contact us at <strong>+91 9730002506</strong>.</p>
      
      <a href="https://www.ilearningscareer.com/Login" class="cta">Check Your Status</a>
      
      <h3>Stay Connected:</h3>
      <p>Follow us on social media to stay updated with the latest job opportunities and news:</p>
      <div class="social-links">
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

      <p>We are excited about the potential of working together and wish you the best for the upcoming stages.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 iLearnings - Empowering Your Future</p>
      <p>Visit us at <a href="https://www.ilearningscareer.com/">www.ilearningscareer.com</a></p>
    </div>
  </div>
</body>
</html>
`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
}
else if(status == "1")
   {
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id ;
    const senderPass = process.env.NEXT_PUBLIC_Nodemailder;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: sender,
        pass: senderPass,
      },
    });
    console.log("sender",sender);
    console.log("senderpasscode",senderPass);
    console.log("useremail",user.email);
    console.log("username",user.firstname);
    console.log("userlast",user.lastname);
    
    const mailOptions = {
      from: sender,
      to: user.email, // Ensure email is fetched correctly
      subject: "Application Update: Next Steps",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Application Status Update</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f7fc; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }
    .header { background: #ff4d4d; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; color: #333; }
    .footer { background: #f9fafc; text-align: center; padding: 20px; font-size: 14px; color: #555; }
    a { color: #008bff; text-decoration: none; }
    .cta { display: inline-block; padding: 10px 20px; background: #008bff; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin-bottom: 8px; }
    .social-links { margin: 20px 0; text-align: center; }
    .social-links a { margin: 0 15px; display: inline-block; }
    .social-links img { width: 32px; height: 32px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Status Update</h1>
    </div>
    <div class="content">
      <p>Dear ${user.firstname} ${user.lastname},</p>
      <p>Thank you for applying for the position of <b>${jobData.job_title}</b> at <b>${jobData.company_name}</b>.</p>
      
      <p>We regret to inform you that your application has not been shortlisted for this position at this time. While this may not be the outcome you were hoping for, we encourage you to explore other opportunities with us.</p>
      
      <h3>Next Steps:</h3>
      <ul>
        <li>Log in to your iLearnings account to view other job opportunities that match your profile.</li>
        <li>Stay updated on new openings by following us on social media.</li>
        <li>Feel free to apply for roles better aligned with your skills and experience.</li>
      </ul>

      <p>If you have any questions or need assistance, please contact us at <strong>+91 9730002506</strong>.</p>
      
      <a href="https://www.ilearningscareer.com/Login" class="cta">Explore Opportunities</a>
      
      <h3>Stay Connected:</h3>
      <p>Follow us on social media to stay updated with the latest job opportunities and news:</p>
      <div class="social-links">
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

      <p>Thank you for considering iLearnings as part of your career journey. We wish you the best of luck in your future endeavors.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 iLearnings - Empowering Your Future</p>
      <p>Visit us at <a href="https://www.ilearningscareer.com/">www.ilearningscareer.com</a></p>
    </div>
  </div>
</body>
</html>
`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
   }
    return NextResponse.json(
      { message: "Application deleted successfully and email sent", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
