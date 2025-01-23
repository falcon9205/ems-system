import Link from "next/link";
import React from "react";
const page = () => {
  return (
    <>
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="py-24 w-11/12 text-gray-300  mx-auto ">
        <h1 className="text-2xl text-center font-bold mb-4">Privacy Policy</h1>
        <ul className="text-left px-1 sm:px-0 sm:w-2/3 mx-auto items-center space-y-3 capitalize">
          <li>
            &bull; We respect your right to privacy and are committed to
            protecting your privacy. We will do what we reasonably can to
            protect the identity and private details of all users on this site.
          </li>
          <li>
            &bull; Consent - This Privacy Policy applies to your use of
            ilearningscareer.com &ldquo;Website&rdquo;. It tells you &ldquo;the
            customer&rdquo; what to expect when we collect personally
            identifiable information about you&sbquo; and what your rights are
            concerning the collection of your information. You hereby consent to
            our Privacy Policy and agree to its terms by using our website.
          </li>
          <li>
            &bull; Information we collect - We will not collect any personally
            identifiable information about you unless it is in response to you
            using our Website or actively registering for one of our online
            products. The security of your personally identifiable information
            is extremely important to us.
          </li>
          <li>
            &bull; If you contact us directly&sbquo; we may receive additional
            information about you such as your name&sbquo; email address&sbquo;
            phone number&sbquo; the contents of the message and/or attachments
            you may send us&sbquo; and any other information you may choose to
            provide.
          </li>
          <h1 className="text-lg font-bold text-center">
            How we use your information
          </h1>

          <p className="text-center underline underline-offset-1">
            We use the information we collect in the following ways:
          </p>

          <li>&bull; Send you relevant emails &ldquo;we hate spam&rdquo;.</li>
          <li>&bull; Understand and analyze how you use our website.</li>

          <p className="text-center underline underline-offset-1">
            Your Rights
          </p>

          <li>&bull; You have the following data protection rights.</li>
          <li>
            &bull; You may unsubscribe from certain email communications by
            following the unsubscribe link in the email communication itself.
          </li>
          <li>
            &bull; Similarly, if we have collected and processed your personal
            information based on your consent, then you can withdraw your
            consent at any time. Withdrawing your consent will not affect the
            lawfulness of any processing we conducted before your withdrawal,
            nor will it affect the processing of your personal information
            conducted in reliance on lawful processing grounds other than
            consent.
          </li>
          <li>
            &bull; If you have any privacy-related questions or unresolved
            problems, you may contact us using the information provided below.
          </li>
          <li>
            &bull; You have the right to complain to a data protection authority
            about our collection and use of your personal information. For more
            information, please contact your local data protection authority.
          </li>

          <p className="text-center underline underline-offset-1">children</p>

          <li>
            &bull; We take seriously our legal obligation to protect the privacy
            of children. Accordingly, we do not knowingly collect or maintain
            personal information from persons under 13 years of age, and no part
            of the Website is directed to persons under 13 years of age.
          </li>

          <p className="text-center underline underline-offset-1">Cookies</p>

          <li>&bull; The website doesn&apos;t use cookies.</li>

          <p className="text-center underline underline-offset-1">
            Updating this Privacy Policy
          </p>

          <li>
            &bull; This Privacy Policy is regularly reviewed to make sure that
            we continue to serve your privacy interests and we reserve the right
            to update it as we deem necessary. This page was last updated on 12
            December 2021.
          </li>
          
          <p className="text-center underline underline-offset-1">
            Contact Details
          </p>

          <li>
            &bull; If you have any questions, comments, or complaints about this Privacy Policy, please contact us at info@ilearningscareer.com.
          </li>

          <p className="text-center underline underline-offset-1">
            Company Details
          </p>

          <li>
            &bull; Company Details - iLearnings Career & Consulting Pvt Ltd
          </li>
          <li>
            &bull; Company Address - Office No. 15, 1st Floor, White Square, Hinjawadi - Wakad Rd, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057
          </li>
          <li>
            <Link href="https://www.ilearningscareer.com/" className="text-blue-500 lowercase"> &bull; Company website - https://www.ilearningscareer.com</Link>
           
          </li>

        </ul>
      </div>
      </div>
    </>
  );
};

export default page;
