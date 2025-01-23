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

export async function GET(req) {
  const corsResponse = await handleRequest(req);
  if (corsResponse) return corsResponse;
  const frontend_key = req.headers.get('X-Custom-Header');
  console.log("from the backend ",frontend_key,process.env.NEXT_PUBLIC_FRONTEND);
  
  if(frontend_key!==process.env.NEXT_PUBLIC_FRONTEND){
    return NextResponse.json({ message: 'Forbidden: Invalid request source' },{status:403});
  }
    console.log("Running backend of logout");
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
 
       // Set the token cookie with an empty value and secure flags
    response.headers.append(
      "Set-Cookie",
      `token=; Path=/; Max-Age=0; SameSite=None; Secure`
    );

    // Set the user ID cookie with an empty value and secure flags
    response.headers.append(
      "Set-Cookie",
      `id=; Path=/; Max-Age=0; SameSite=None; Secure`
    );

    // Set the identity cookie with an empty value and secure flags
    response.headers.append(
      "Set-Cookie",
      `identity=; Path=/; Max-Age=0; SameSite=None; Secure`
    );

    return response;
    
   

   
}