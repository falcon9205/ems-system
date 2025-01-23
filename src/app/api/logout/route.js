import { NextResponse } from "next/server";

export async function POST() {
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
