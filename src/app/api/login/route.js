import { NextResponse } from "next/server";
import DbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { Candidate, Trainer, Recruiter, Referral } from "@/Model/signup_schema";
import { Blogger } from "@/Model/blog_schema";
import jwt from "jsonwebtoken";
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
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
  if (corsResponse) return corsResponse;
  try {
    await DbConnect();
    const body = await req.json();
    const { email, password, identity } = body;
    console.log(identity);
    let data;
    // Attempt to find user in Candidate collection

    if (identity === "candidate") {
      let user = await Candidate.findOne({ email });
      // If found in Candidate, verify password
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          data = user;
        
           const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
           
          console.log("token", token);
          
          const response =  NextResponse.json(
            {
              success: true,
              message: "Candidate login successful",
              user,
            },
            { status: 200 }
          );
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );
          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          )
         
          return response;
          
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Candidate credential error",
            },
            { status: 401 }
          );
        }
      }
    }

    // Attempt to find user in Trainer collection
    else if (identity === "trainer") {
      let user = await Trainer.findOne({ email });
      console.log("user found ",user);
      
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          
          console.log("token", token);
          
          const response =  NextResponse.json(
            {
              success: true,
              message: "Trainer login successful",
              user,
            },
            { status: 200 }
          );
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );
          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          )
         
          return response;
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Trainer credential error",
            },
            { status: 401 }
          );
        }
      }
    }

    //Attemp to find user in Recruiter collection
    else if (identity === "recruiter") {
      // Attempt to find user in Recruiter collection
      let user = await Recruiter.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          
          console.log("token", token);
          
          const response =  NextResponse.json(
            {
              success: true,
              message: "Recruiter login successful",
              user,
            },
            { status: 200 }
          );
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );
          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          )
         
          return response;
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Recruiter credential error",
            },
            { status: 401 }
          );
        }
      }
    }

    //Attemp to find user in Referal collection
    else if (identity === "referral") {
      // Attempt to find user in Recruiter collection
      let user = await Referral.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          
          console.log("token", token);
          
          const response =  NextResponse.json(
            {
              success: true,
              message: "Referral login successful",
              user,
            },
            { status: 200 }
          );
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );
          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          )
         
          return response;
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Referral credential error",
            },
            { status: 401 }
          );
        }
      }
    }

    //Attempt to find user in blogger collection
    else {
      //Attemp to find user in blogger collection
      let user = await Blogger.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          
          console.log("token", token);
          
          const response =  NextResponse.json(
            {
              success: true,
              message: "Blogger login successful",
              user,
            },
            { status: 200 }
          );
          response.headers.append(
            "Set-Cookie",
            `token=${token}; Path=/;  Max-Age=10000`
          );

          // Set the user ID cookie
          response.headers.append(
            "Set-Cookie",
            `id=${user._id}; Path=/;  Max-Age=10000`
          );
          response.headers.append(
            "Set-Cookie",
            `identity=${identity}; Path=/;  Max-Age=10000`
          )
         
          return response;
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Blogger credential error",
            },
            { status: 401 }
          );
        }
      }
    }

    // If no user found in any of the collections
    return NextResponse.json(
      {
        success: false,
        message: "Username or password is incorrect",
      },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Login unsuccessful due to server error",
      },
      { status: 500 }
    );
  }
}