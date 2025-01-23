import { NextResponse } from "next/server";
import { Contact } from "@/Model/feedback";
import EventQuery from "@/Model/eventQuery";
import DbConnect from "@/lib/dbConnect";
import nodemailer from "nodemailer";
import Course from "@/Model/courseQuery";
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

export async function POST(req) {
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

    if (Object.keys(body).length === 4) {
      // Contact Form Submission
      const { fullname, email, phone, message } = body;
      if (!fullname || !email || !phone || !message) {
        return NextResponse.json({ success: false }, { status: 400 });
      }

      const userData = new Contact({
        fullname,
        email,
        phone,
        message,
      });
      const result = await userData.save();
      console.log("Contact us data saved");
      if (body.fullname && body.email) {
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
  
        const mailOptions1 = {
          from: sender,
          to: body.email,
          subject: "We Have Received Your Query",
          html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>We Have Received Your Query</title>
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
      .social-links { margin: 20px 0; }
      .social-links a { margin: 0 10px; display: inline-block; }
      .social-links img { width: 32px; height: 32px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>We Have Received Your Query</h1>
      </div>
      <div class="content">
        <p>Dear ${body.fullname},</p>
        <p>Thank you for reaching out to us! We have received your query, and our support team will get back to you as soon as possible. We are committed to providing the assistance you need.</p>
        
        <h3>What Happens Next:</h3>
        <ul>
          <li><strong>We Review Your Query:</strong> Our team will carefully review your message and prepare a response.</li>
          <li><strong>We Respond:</strong> You can expect a response from us within 24 hours. We may request additional information if necessary.</li>
          <li><strong>Get Assistance:</strong> Whether it's a technical issue, a product question, or any general inquiry, we are here to assist you.</li>
        </ul>
  
        <p>If you have any urgent concerns or if you need immediate help, please don’t hesitate to contact us directly at <strong>+91 9730002506</strong>.</p>
        
        <a href="https://www.ilearningscareer.com/Contact" class="cta">Visit Our Help Center</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 iLearnings - Empowering Your Future</p>
        <p>Visit us at <a href="https://www.ilearningscareer.com/">www.ilearningscareer.com</a></p>
        <div class="social-links">
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
      </div>
    </div>
  </body>
  </html>
  `,
        };
        const mailOptions2 = {
          from: sender,
          to: "sunitha@ilearningscareer.com",
          subject: "New Query Recieved",
          html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title>Contact Us Notification</title>
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

        th,
        td {
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
    </style>
</head>

<body>
    <table class="nl-container" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="row-content">
                    <tr>
                        <td class="header">
                            <h1>New Contact Us Submission</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Dear Team,</p>
                            <p>A new contact form submission has been received. Below are the details:</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>${fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>${email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>${phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Message</td>
                                        <td>${message}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Please review and respond as soon as possible. Thank you!</p>
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
          await transporter.sendMail(mailOptions1);
          await transporter.sendMail(mailOptions2)
          console.log("Mail sent successfully!");
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
    } 
    else if (Object.keys(body).length === 11) {
      // Event Query Form Submission
      const {
        eventname,
        organization,
        TypeOfEvent,
        EventDate,
        EventLocation,
        ExpectedParticipants,
        EventDuration,
        organizerName,
        organizerEmail,
        organizerPhone,
        AdditionInfo,
      } = body;
      
      if (
        !eventname || !organization || !TypeOfEvent || !EventDate ||
        !EventLocation || !ExpectedParticipants || !EventDuration ||
        !organizerName || !organizerEmail || !organizerPhone || !AdditionInfo
      ) {
        return NextResponse.json({ success: false }, { status: 400 });
      }

      const userData = new EventQuery({
        eventname,
        organization,
        TypeOfEvent,
        EventDate,
        EventLocation,
        ExpectedParticipants,
        EventDuration,
        organizerName,
        organizerEmail,
        organizerPhone,
        AdditionInfo,
      });
      const result = await userData.save();
      console.log("Event data saved");
    }
    else if (Object.keys(body).length === 5) {
      // Course Query Form Submission
      const { fullname, email, phone, message, course } = body;
      if (!fullname || !email || !phone || !message || !course) {
        return NextResponse.json({ success: false }, { status: 400 });
      }

      const userData = new Course({
        fullname,
        email,
        phone,
        message,
        course,
      });
      const result = await userData.save();
      console.log("Course data saved");

      if (body.fullname && body.email && body.course) {
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
  
        const mailOptions1 = {
          from: sender,
          to: body.email,
          subject: "We Have Received Your Query",
          html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>We Have Received Your Query</title>
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
      .social-links { margin: 20px 0; }
      .social-links a { margin: 0 10px; display: inline-block; }
      .social-links img { width: 32px; height: 32px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>We Have Received Your Query</h1>
      </div>
      <div class="content">
        <p>Dear ${body.fullname},</p>
        <p>Thank you for reaching out to us! We have received your query, and our support team will get back to you as soon as possible. We are committed to providing the assistance you need.</p>
        
        <h3>What Happens Next:</h3>
        <ul>
          <li><strong>We Review Your Query:</strong> Our team will carefully review your message and prepare a response.</li>
          <li><strong>We Respond:</strong> You can expect a response from us within 24 hours. We may request additional information if necessary.</li>
          <li><strong>Get Assistance:</strong> Whether it's a technical issue, a product question, or any general inquiry, we are here to assist you.</li>
        </ul>
  
        <p>If you have any urgent concerns or if you need immediate help, please don’t hesitate to contact us directly at <strong>+91 9730002506</strong>.</p>
        
        <a href="https://www.ilearningscareer.com/Contact" class="cta">Visit Our Help Center</a>
      </div>
      <div class="footer">
        <p>&copy; 2024 iLearnings - Empowering Your Future</p>
        <p>Visit us at <a href="https://www.ilearningscareer.com/">www.ilearningscareer.com</a></p>
        <div class="social-links">
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
      </div>
    </div>
  </body>
  </html>
  `,
        };
        const mailOptions2 = {
          from: sender,
          to: "sunitha@ilearningscareer.com",
          subject: "New Course Query Recieved",
          html: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title>Contact Us Notification</title>
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

        th,
        td {
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
    </style>
</head>

<body>
    <table class="nl-container" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="row-content">
                    <tr>
                        <td class="header">
                            <h1>New Contact Us Submission</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Dear Team,</p>
                            <p>A new contact form submission has been received. Below are the details:</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>${fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>${email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>${phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Course</td>
                                        <td>${course}</td>
                                    </tr>
                                    <tr>
                                        <td>Message</td>
                                        <td>${message}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Please review and respond as soon as possible. Thank you!</p>
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
          await transporter.sendMail(mailOptions1);
          await transporter.sendMail(mailOptions2)
          console.log("Mail sent successfully!");
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
    }

   

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to process request", success: false },
      { status: 500 }
    );
  }
}
