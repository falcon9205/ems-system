import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { Candidate, Trainer, Recruiter, Referral } from "@/Model/signup_schema";
import DbConnect from "@/lib/dbConnect";
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
  await DbConnect();
  try {
    const body = await req.json();
    console.log("length of the body ", Object.keys(body).length);

    const { authOTP, email, identity } = body;
    console.log("Email from backend", email, authOTP, identity);

    var auth = false;
    if (identity === "candidate") {
      const user = await Candidate.findOne({ email });
      if (user) {
        auth = true;
      }
    } else if (identity === "trainer") {
      const user = await Trainer.findOne({ email });
      if (user) {
        auth = true;
      }
    } else if (identity === "recruiter") {
      const user = await Recruiter.findOne({ email });
      if (user) {
        auth = true;
      }
    }else if (identity === "referral") {
		const user = await Referral.findOne({ email });
		if (user) {
		  auth = true;
		}
	}

    if (auth) {
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
      const mailoptions = {
        from: sender,
        to: email,
        subject: "Reset Your Password",
        html: `
          <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Cabin:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:520px) {
			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #0ca2fa; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Reset Your Password</span></h1>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#677079;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:18px;">
																	<p style="margin: 0; margin-bottom: 16px;">We received a request to reset your password for your ilearnings&nbsp; account. If you did not make this request, please ignore this email or contact our support if you have any concerns.</p>
																	<p style="margin: 0;">To reset your password, please Enter the otp : ${authOTP}<br><br><br><br><br></p>
																</div>
															</td>
														</tr>
													</table>
													<table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><a href="https://www.instagram.com/ilearnings/" target="_blank" style="color:#ffffff;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.instagram.com/ilearnings/"  style="height:30px;width:83px;v-text-anchor:middle;" arcsize="14%" fillcolor="#f3006c">
<v:stroke dashstyle="Solid" weight="0px" color="#f3006c"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:10px">
<![endif]-->
																		<div style="background-color:#f3006c;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:4px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:10px;font-weight:400;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 10px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 20px;">instagram</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																	</a></div>
															</td>
														</tr>
													</table>
													<table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><a href="https://www.facebook.com/iLearnings" target="_blank" style="color:#ffffff;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.facebook.com/iLearnings"  style="height:30px;width:83px;v-text-anchor:middle;" arcsize="14%" fillcolor="#0437f5">
<v:stroke dashstyle="Solid" weight="0px" color="#0437f5"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:10px">
<![endif]-->
																		<div style="background-color:#0437f5;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:4px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:10px;font-weight:400;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 10px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 20px;">Facebook</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																	</a></div>
															</td>
														</tr>
													</table>
													<table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><a href="https://www.linkedin.com/company/ilearningscareer/posts/?feedView=all" target="_blank" style="color:#ffffff;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.linkedin.com/company/ilearningscareer/posts/?feedView=all"  style="height:30px;width:77px;v-text-anchor:middle;" arcsize="14%" fillcolor="#0068a5">
<v:stroke dashstyle="Solid" weight="0px" color="#0068a5"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:10px">
<![endif]-->
																		<div style="background-color:#0068a5;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:4px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:10px;font-weight:400;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 10px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 20px;">Linkedin</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																	</a></div>
															</td>
														</tr>
													</table>
													<table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><a href="https://www.ilearningscareer.com/" target="_blank" style="color:#ffffff;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.ilearningscareer.com/"  style="height:30px;width:75px;v-text-anchor:middle;" arcsize="14%" fillcolor="#7747FF">
<v:stroke dashstyle="Solid" weight="0px" color="#7747FF"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:10px">
<![endif]-->
																		<div style="background-color:#7747FF;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:4px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:10px;font-weight:400;mso-border-alt:none;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 20px; padding-right: 20px; font-size: 10px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 20px;">Website</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																	</a></div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#0068a5;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
																	<p style="margin: 0;">© 2024 iLearnings Career & Consulting Pvt Ltd<br>All Right Reserved</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-7" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
        `,
        // text : `We received a request to reset the password for your account. To continue, please use the following One-Time Password (OTP) to complete the process. ${authOTP}`
      };
      try {
        await transporter.sendMail(mailoptions);
        console.log("Mail send successfully !");
        return NextResponse.json({ success: true }, { status: 200 });
      } catch (error) {
        console.log(error);
        console.log("Error while sending the mail !");
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }

    return NextResponse.json({ success: false }, { status: 500 });
  } catch (error) {
    console.log("error occured", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
