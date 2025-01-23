import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import { CandidatesProfile, RecruitersProfile } from "@/Model/user_profile";
import nodemailer from "nodemailer";
import { Recruiter } from "@/Model/signup_schema";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    // Connect to the database
    await DbConnect();

    // Calculate the date 10 days ago
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    // Fetch inactive recruiters and candidates
    const inactiveRecruiters = await RecruitersProfile.find(
      { updatedAt: { $lt: tenDaysAgo } }, // Filter condition
      { user_ID: 1, _id: 0 } // Include email, exclude _id
    );

    console.log("rec", inactiveRecruiters);

    const userIds = inactiveRecruiters.map((recruiter) => recruiter.user_ID);

    // Find recruiters whose _id matches any user_ID in the inactiveRecruiters array and return their email addresses
    const inactiveEmails = await Recruiter.find({
      _id: { $in: userIds }, // Match if _id is in the extracted user_ID array
    }).select("email -_id");

    if (inactiveEmails.length === 0) {
      return NextResponse.json({ message: "No inactive users found." });
    }
    const emailArray = inactiveEmails.map((recruiter) => recruiter.email);

    console.log(emailArray);
    sendEmails(emailArray);
    return NextResponse.json({
      message: `Emails sent to ${inactiveEmails.length} inactive users.`,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { message: "Failed to process request.", error: error.message },
      { status: 500 }
    );
  }
}

async function sendEmails(emailArray) {
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

  const mailOptions = (email) => ({
    from: sender,
    to: email,
    subject: '"We Miss You! Post a Job on iKonnect Today',
    html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title>We Missed You!</title>
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
                            <h1>We Missed You!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            
                            <p>We noticed that you haven&#39;t posted any new vacancies on our portal in the past few days. We truly missed your presence on iLearnings and the opportunities you create for talented candidates.</p>
                            <p>If there&#39;s anything we can do to make posting jobs easier or assist you with the process, please don&#39;t hesitate to let us know. We&#39;re here to support your recruitment efforts every step of the way.</p>
                            <p>Posting a job takes just a few moments and helps connect you with the right talent to meet your hiring needs.</p>
                            <div class="cta">
                                <a href="https://www.ilearningscareer.com/job-post/" target="_blank" class="cta-button">Post a Job Now</a>
                            </div>
                            <br>
                            <p>Looking forward to seeing you back in action soon!</p>
                            <p>Warm regards,</p>
                            <p><strong>The iLearnings Recruitment Team</strong></p>
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
`, // Your email content here
  });

  try {
    // Send emails in parallel
    await Promise.all(
      emailArray.map(async (email) => {
        await transporter.sendMail(mailOptions(email));
      })
    );
    console.log("All emails sent successfully");
  } catch (error) {
    console.error("Error while sending emails:", error);
  }
}
