// utils/corsUtils.js
export function handleCors(req, res, allowedOrigin) {
  // const origin = req.headers.origin;
  const origin = req.url;
  const parsedUrl = new URL(origin);
  const hostWithPort = parsedUrl.host;
  console.log("path ", hostWithPort);
  console.log("seted path", allowedOrigin);

  // Check if the request origin matches the allowed origin
  if (hostWithPort !== allowedOrigin) {
    return false; // Indicate that the request should not proceed
  }

  // res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, PATCH, PUT, POST");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Handle preflight request

    return false; // Indicate that the preflight request has been handled
  }

  return true; // Indicate that the request can proceed
}
