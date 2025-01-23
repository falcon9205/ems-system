import DbConnect from "@/lib/dbConnect";
import EventQuery from "@/Model/eventQuery"; // Adjust the import to your Event model
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
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  await DbConnect();
  const data = await EventQuery.find(); // Use EventQuery to fetch events
  return NextResponse.json({ data });
}

export async function POST(req) {
  const corsResponse = await handleRequest(req);
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  if (corsResponse) return corsResponse;
  console.log(req.body);
  try {
    await DbConnect();
    const body = await req.json();

    console.log("this is body length", Object.keys(body).length);
    console.log(body);

    // Destructure the required fields from the request body
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

    // Create a new event document
    const event = new EventQuery({
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


    if(body.organizerEmail){
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
        to: body.organizerEmail,
        subject: "Welcome to iLearnings!",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Your Event Hire Request</title>
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
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
    th { background-color: #008bff; color: white; }
    .social-links { margin: 20px 0; }
    .social-links a { margin: 0 10px; display: inline-block; }
    .social-links img { width: 32px; height: 32px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Event Hire Request Has Been Received</h1>
    </div>
    <div class="content">
      <p>Dear ${body.organizerName},</p>
      <p>Thank you for choosing iLearnings to help organize your event! We have received your request, and our team will review the details and get back to you soon to discuss the next steps.</p>
      
      <h3>Event Details:</h3>
      <table>
        <tr>
          <th>Event Name</th>
          <td>${body.eventname}</td>
        </tr>
        <tr>
          <th>Organization</th>
          <td>${body.organization}</td>
        </tr>
        <tr>
          <th>Event Type</th>
          <td>${body.TypeOfEvent}</td>
        </tr>
        <tr>
          <th>Event Date</th>
          <td>${body.EventDate}</td>
        </tr>
        <tr>
          <th>Event Location</th>
          <td>${body.EventLocation}</td>
        </tr>
        <tr>
          <th>Expected Participants</th>
          <td>${body.ExpectedParticipants}</td>
        </tr>
        <tr>
          <th>Event Duration</th>
          <td>${body.EventDuration}</td>
        </tr>
        <tr>
          <th>Organizer's Name</th>
          <td>${body.organizerName}</td>
        </tr>
        <tr>
          <th>Organizer's Email</th>
          <td>${body.organizerEmail}</td>
        </tr>
        <tr>
          <th>Organizer's Phone</th>
          <td>${body.organizerPhone}</td>
        </tr>
      </table>

      <p>If you have any further questions or need assistance, feel free to contact us at <strong>+91 9730002506</strong>.</p>
      
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

      try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }

    // Save the event to the database
    await event.save(); // Ensure you await this for proper error handling
    console.log("Event saved successfully");
    
    return NextResponse.json({ event, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving event:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
