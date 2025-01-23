import DbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { Candidate, Trainer, Recruiter, Referral } from "@/Model/signup_schema";
import { Blogger } from "@/Model/blog_schema";
import bcrypt, { hash } from "bcryptjs";
import nodemailer from "nodemailer";
import { handleCors } from "@/lib/cors";
import ReferralSystem from "@/Model/referral";
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
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  await DbConnect();
  const dataCandidate = await Candidate.find();
  const dataTrainer = await Trainer.find();
  const dataRecruiter = await Recruiter.find();
  const dataReferal = await Referral.find();
  return NextResponse.json({
    dataCandidate,
    dataReferal,
    dataRecruiter,
    dataTrainer,
  });
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
  console.log(req.body);

  try {
    // Connect to the database
    await DbConnect();
    
    // Parse the incoming JSON data
    const body = await req.json();
    const { email } = body;

    // Check for existing users with the same email
    const dataCandidate = await Candidate.findOne({ email });
    const dataTrainer = await Trainer.findOne({ email });
    const dataRecruiter = await Recruiter.findOne({ email });
    const dataReferral = await Referral.findOne({ email });

    if (dataCandidate || dataTrainer || dataRecruiter || dataReferral) {
      return NextResponse.json(
        {
          message: "Cannot use same Email-ID for multiple Accounts",
          success: false,
        },
        { status: 400 }
      );
    }

    // Handle user creation based on the number of fields in the body
    if (Object.keys(body).length === 4) {
      // Blogger registration
      const { fullname, email, password } = body;
      const hashpassword = await bcrypt.hash(password, 10);
      let user = new Blogger({
        fullname,
        email,
        password: hashpassword,
      });
      const result = await user.save();
      console.log("Saving blogger data", result);
    } else if (Object.keys(body).length === 5) {
      // Candidate registration
      const { firstname, lastname, email, password, identity } = body;
      const hashpassword = await bcrypt.hash(password, 10);
      if (identity == "referral") {
        let user = new Referral({
          firstname,
          lastname,
          email,
          password: hashpassword,
        });
        const result = await user.save();
        console.log("Saving referral data ", result);
      } else {
        let user = new Candidate({
          firstname,
          lastname,
          email,
          password: hashpassword,
        });
        const result = await user.save();
        console.log("Saving candidate data", result);
      }
    } else if (Object.keys(body).length === 6) {
      // Trainer registration
      const { firstname, lastname, email, password, trainerof } = body;
      const hashpassword = await bcrypt.hash(password, 10);
      let user = new Trainer({
        firstname,
        lastname,
        email,
        trainerof,
        password: hashpassword,
      });
      const result = await user.save();
      console.log("Saving trainer data", result);
    } else {
      // Recruiter registration
      const {
        firstname,
        lastname,
        email,
        password,
        organizationname,
        contact,
      } = body;
      const hashpassword = await bcrypt.hash(password, 10);
      let user = new Recruiter({
        firstname,
        lastname,
        email,
        organizationname,
        contact,
        password: hashpassword,
      });
      const result = await user.save();
      console.log("Saving recruiter data", result);
    }

    // Send confirmation email if user creation was successful
    if (body.firstname && body.lastname) {
      const sender = process.env.NEXT_PUBLIC_Nodemailder_Mail_id;
      const sender_passkey = process.env.NEXT_PUBLIC_Nodemailder;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: sender,
          pass: sender_passkey,
        },
      });

      const mailOptions = {
        from: sender,
        to: email,
        subject: "Welcome to iLearnings!",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Welcome to iKonnect</title>
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
      <h1>Welcome to ikonnect!</h1>
    </div>
    <div class="content">
      <p>Dear ${body.firstname} ${body.lastname},</p>
      <p>We are thrilled to have you as part of the iLearnings community! Your account has been successfully created, and we are excited to accompany you on your journey to success.</p>
      
      <h3>Here's What You Can Do Now:</h3>
      <ul>
        <li><strong>Update Your Profile:</strong> Add more details about yourself to help us personalize your experience.</li>
        <li><strong>Explore Resources:</strong> Discover courses, training materials, and career opportunities tailored to your goals.</li>
        <li><strong>Connect with Experts:</strong> Engage with trainers, recruiters, and like-minded peers to grow your network.</li>
      </ul>

      <h3>Platform Highlights:</h3>
      <ul>
        <li><strong>Expert-Led Courses:</strong> Access industry-focused learning materials curated by experts.</li>
        <li><strong>Career Support:</strong> Find internships, job openings, and mentorship opportunities.</li>
        <li><strong>Progress Tracking:</strong> Monitor your growth and achievements with our built-in tools.</li>
      </ul>

      <p>If you ever feel stuck or have questions, our support team is just a call away at <strong>+91 9730002506</strong>.</p>
      
      <a href="https://www.ilearningscareer.com/Login" class="cta">Log In to Your Account</a>
      
      <h3>Stay Connected:</h3>
      <p>Follow us on social media to stay updated with the latest news, events, and resources:</p>
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

      <p>We are here to empower your future and ensure you achieve your dreams.</p>
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
        console.log("Mail sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
   
    let user;
    const user_id = "678e25b01b3c810674529a7f"
    // If the user_ID looks like a valid ObjectId, use findById
    if (mongoose.Types.ObjectId.isValid(user_id)) {
      user = await Recruiter.findById(user_id);
      if (!user) user = await Candidate.findById(user_id);
      if (!user) user = await Referral.findById(user_id);
    } else {
      // If it's not a valid ObjectId, search by custom identifier (e.g., user_id)
      user = await Recruiter.findOne({ user_id: user_id });
      if (!user) user = await Candidate.findOne({ user_id: user_id });
      if (!user) user = await Referral.findOne({ user_id: user_id });
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid link" }, { status: 400 });
    }
    // console.log("userid from the backend ",user_id);
    
    
    const result = await ReferralSystem.findOneAndUpdate(
      { user_id }, // Query to find user by _id
      {
        $inc: { clicks: 1, register: 1 }, // Increment both clicks and register by 1
        $set: {
          fullname: user.firstname + " " + user.lastname,
          email: user.email,
          
        },
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if no match is found
        setDefaultsOnInsert: true, // Apply default values if creating a new document
      }
    );
    

    // const result = await ReferralSystem.findOneAndUpdate(
    //   { _id: user_id }, // Query to find user by user_id (or _id if using ObjectId)
    //   {
    //     $inc: { clicks: 1 }, // Increment clicks by 1
    //     $inc: { register: 1 },
    //     $set: {
    //       fullname: user.firstname + " " + user.lastname,
    //       email: user.email,
    //     },
    //   },
    //   {
    //     new: true, // Return the updated document
    //     upsert: true, // Create a new document if no match is found
    //     setDefaultsOnInsert: true, // Apply default values if creating a new document
    //   }
    // );

    console.log("Data saved/updated successfully:", result);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
