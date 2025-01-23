import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import JobPost from "@/Model/jobpost";
import { Candidate, Recruiter, Referral } from "@/Model/signup_schema";
import { handleCors } from "@/lib/cors";
import nodemailer from "nodemailer";

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
export async function POST(req) {
    const corsResponse = await handleRequest(req);
    if (corsResponse) return corsResponse;
  
    try {
      await DbConnect();
      const body = await req.json();
      const {
        recruiter_id,
        job_title,
        company_name,
        location,
        job_description,
        experience,
        requirements,
        user_ID,
        minSalary,
        maxSalary,
        jobType,
        companyUrl,
        salaryType,
        referralid,
        referralname,
        applylink,
      } = body;
  
      
  
      // Proceed with job posting logic
      const recruiter_User = await Referral.findOne({ _id: user_ID });
      if (!recruiter_User) {
        return NextResponse.json(
          { error: "Invalid Recruiter login" },
          { status: 400 }
        );
      }
  
      const recruiter_email = recruiter_User.email;
      const newJobPost = new JobPost({
        recruiter_id,
        recruiter_email,
        job_title,
        company_name,
        location,
        experience,
        job_description,
        requirements,
        maxSalary,
        minSalary,
        jobType,
        companyUrl,
        salaryType,
        referralid,
        referralname,
        applylink,
      });
  
      const result = await newJobPost.save();
      console.log("Job post successful:", result);

      const candidates = await Candidate.find();
      const emailIDs = candidates.map((candidate) => candidate.email);
      console.log("Candidate emails:", emailIDs);
  
      if (emailIDs.length > 0) {
        // Trigger email sending asynchronously in the background
        sendEmails(emailIDs);
        console.log('Emails are being sent in the background');
      }
      return NextResponse.json(
        {
          job: result,
          message: "Job posted successfully, emails are being sent.",
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error posting job:", error);
      return NextResponse.json(
        { error: "Something went wrong while posting the job" },
        { status: 500 }
      );
    }
  }

  async function sendEmails(emailArray) {
    const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id;
    const sender_passkey = process.env.NEXT_PUBLIC_Nodemailder;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: sender,
        pass: sender_passkey,
      },
    });
  
    const mailOptions = (email) => ({
      from: sender,
      to: email,
      subject: 'New Job Posted - Check it Out!',
      html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>New Job Posting - iLearnings</title>
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
        <h1>New Job Posting on iKonnect</h1>
      </div>
      <div class="content">
        <p>Dear Candidate,</p>
                              <p>Exciting news! We have just posted a new job opportunity. This could be the perfect chance for you to take the next step in your career.</p>
                              <p>Our recruitment team is looking for talented individuals to join us. Don't miss this chance to explore your next big opportunity.</p>
                              <p>Click the link below to check out the latest job posting and apply now!</p>
                              <br>
                              <p>Warm regards,</p>
        
  
        <p>Interested? Click the link below to apply for the job directly through iKonnect:</p>
        <a href="https://www.ilearningscareer.com/jobs-portal/" class="cta">Apply Now</a>
        
        <h3>Stay Connected:</h3>
        <p>Follow us on social media to stay updated with more job opportunities, events, and resources:</p>
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
  
        <p>If you have any questions or need further assistance, feel free to reach out to our support team at <strong>+91 9730002506</strong>.</p>
  
        <p>Good luck with your application, and we hope to see you onboard soon!</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 iLearnings - Empowering Your Future</p>
        <p>Visit us at <a href="https://www.ilearningscareer.com/">www.ilearningscareer.com</a></p>
      </div>
    </div>
  </body>
  </html>
  `, // Your email content here
    });
  
    try {
      // Send emails in parallel
      await Promise.all(
        emailArray.map(async (email) => {
          await transporter.sendMail(mailOptions(email));
        })
      );
      console.log('All emails sent successfully');
    } catch (error) {
      console.error('Error while sending emails:', error);
    }
  }