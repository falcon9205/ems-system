import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="py-24 w-11/12 mx-auto text-gray-300  ">
        <h1 className="text-2xl text-center font-bold mb-4">Refund Policy</h1>
        <ul className="text-left px-1 sm:px-0 sm:w-2/3 mx-auto items-center space-y-3 capitalize">
          <li>
            &bull; Thank you for purchasing our courses at iLearnings Career & Consulting Pvt Ltd. We strive to ensure our users have a rewarding experience while they discover, assess, and purchase our courses, whether it is instructor-led or self-paced training.
           </li>
           <li>
            &bull; As with any online purchase experience, there are terms and conditions that govern our Refund Policy. When you buy a training course from us, you agree to our Privacy Policy, Terms of Use, and Refund Policy.
           </li>
          <p className="text-center underline underline-offset-1">
            For Self-Paced Learning:
          </p>
          <p className="text-left underline underline-offset-1">
          To qualify for a refund, you must:
          </p>
          <li>
            &bull; Submit your refund request within 7 days of purchasing a course.
           </li>
           <li>
            &bull; Have consumed less than 25% of the video-learning content.
           </li>
           <li>
            &bull; Have not attended more than one (1) live online class.
           </li>
           <li>
            &bull; Not have requested any exam voucher or kit.
           </li>
           <li>
            &bull; Any refund request failing to meet all of these requirements will not be accepted, and no refund will be provided.
           </li>
           
           <p className="text-center underline underline-offset-1">
           University Partnered Programs / Bootcamps:
          </p>
          <p className="text-left underline underline-offset-1">
          To qualify for a refund, you must:
          </p>
          <li>
            &bull; Submit your refund request within 7 days from the start date of the regular class (Live or Recorded as the case may be), whether attended or not.
           </li>
           <li>
            &bull; Any refund request failing to meet this requirement will not be accepted, and no refund will be provided.
           </li>
           <li>
            &bull; For instructor-led training and University Partnered programs, iLearnings reserves the right to reschedule/cancel a class/session due to any unavoidable circumstances. iLearnings will reschedule any cancelled class/session.
           </li>

           <p className="text-center underline underline-offset-1">
           Cancellation & Refunds: For CSM, CSPO, PSM, PSPO programs &ldquo;Update this program details after discuss&rdquo;
          </p>
          <li>
            &bull; We reserve the right to reschedule/cancel a class/session due to any unavoidable circumstances or change the location of a class (if applicable). To qualify for a refund, you must:
           </li>
           <li>
            &bull; Not have attended any classes.
           </li>
           <li>
            &bull; Submit your refund request within 7 days of purchasing a course.
           </li>
          
           <p className="text-center underline underline-offset-1">
           Refund Request Initiation:
          </p>
          <p className="text-left underline underline-offset-1">
          Refund requests can be initiated in two ways:
          </p>
          <li>
            &bull; From the My Orders section, by clicking on “Initiate Refund” for the relevant course. This will work when item purchase-quantity is one.
           </li>
           <li>
            &bull; In case item purchase-quantity is more than one, please reach out to our support team through our Help & Support section on the website.
           </li>

           <p className="text-center underline underline-offset-1">
           Refunds: Duplicate Payment
          </p>
          <li>
            &bull; Refunds of any duplicate payments will be processed via the same source &ldquo;original method of payment&rdquo; within 10 &ndash;15 working days after you have submitted your request.
           </li>
           <li>
            &bull;iLearnings reserves the right to revise this policy without any prior notice.
           </li>

           <p className="text-center underline underline-offset-1">
           Contact Information
          </p>
          <li className="lowercase">
            <Link href="mailto:info@ilearningscareer.com" className="text-blue-500">&bull; Email: info@ilearningscareer.com</Link>
           </li>
           <li className="lowercase">
           <Link href="https://www.ilearningscareer.com" className="text-blue-500">&bull; Website: iLearningscareer.com</Link>
           </li>
           <li>
            &bull; Company Name: iLearnings Career & Consulting Pvt Ltd
           </li>
           <li>
            &bull; Company Address: Office No. 15, 1st Floor, White Square, Hinjawadi - Wakad Rd, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057
           </li>
           <p className="text-center font-extralight underline underline-offset-1">
           This page was last updated on 10th July 2024
          </p>
        </ul>
      </div>
      </div>
    </>
  );
};

export default page;
