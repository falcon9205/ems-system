import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="w-full bg-black  md:flex py-10">
        <section className="border-b  md:border-b-0 border-gray-700 text-white w-full ">
          <img
            className="block md:hidden rounded-sm mx-auto mb-5 w-24 h-20 bg-white px-2 py-2"
            src="/logo.jpg"
            alt="logo_footer"
          />
          <div className="flex items-center justify-center gap-x-1">
          <img
            className="hidden md:block w-10 h-9 bg-white px-2 py-2 rounded-sm "
            src="/logo.jpg"
            alt="logo_footer"
          />
           <h1 className="text-center md:flex items-center font-bold text-lg md:text-sm">
           iLearnings Career & Consulting Pvt Ltd
          </h1>
          </div>
         
          <p className="text-sm  mx-2 text-center md:text-left my-3">
            Company Address : Address: Office No. 15, 1st Floor&sbquo; White Square&sbquo;
            Hinjawadi &ndash; Wakad Rd&sbquo; Hinjawadi Village&sbquo; Hinjawadi&sbquo; Pune&sbquo;
            Pimpri-Chinchwad&sbquo; Maharashtra 411057
          </p>
          <p className="justify-center  md:justify-normal flex items-center gap-x-2 text-xs mx-2  py-1 ">
            Location :{" "}
            <Link
              href="https://maps.app.goo.gl/AeusgcuBz5Ct9EM67"
              target="_blank"
            >
              <FaMapMarkerAlt
                className="text-gray-400 hover:text-blue-500"
                size={16}
              />
            </Link>
          </p>
          
        </section>

        <section className="text-white py-3 md:py-0 border-gray-700  border-b md:border-b-0  w-full text-center ">
          <h1 className=" font-bold text-center text-xl">Legal Notices</h1>
          <p className="text-sm mt-3 hover:text-blue-500">
            <Link href="/Refund">Refund Policy</Link>
          </p>
          <p className="text-sm hover:text-blue-500">
            <Link href="/PrivacyPolicy">Privacy Policy</Link>
          </p>
          <p className="text-sm hover:text-blue-500">
            <Link href="/Terms">Terms & Conditions</Link>
          </p>
        </section>

        <section className="text-white py-3 md:py-0 w-full border-gray-700 border-b md:border-b-0 text-center ">
          <h1 className=" font-bold text-center text-xl">Discover</h1>
          <Link href="/Blog">
            {" "}
            <p className="text-sm mt-3 hover:text-blue-500 ">Blog</p>
          </Link>
          <Link href="/About">
            {" "}
            <p className="text-sm hover:text-blue-500">About Us</p>
          </Link>
          <Link href="/Contact">
            <p className="text-sm hover:text-blue-500">Contact Us</p>
          </Link>
        </section>

        <section className="md:py-0  text-white w-full py-3 ">
          <h1 className="text-center font-bold text-xl">Follow Us!</h1>
          <div className="flex gap-x-3 py-3 justify-center">
            <Link href="https://www.facebook.com/iLearnings" target="_blank">
              <img
                className="w-9 h-9"
                src="/Footer/facebook.svg"
                alt="social_handles"
              />
            </Link>
            <Link href="https://www.instagram.com/ilearnings/" target="_blank">
              {" "}
              <img
                className="w-10 h-10"
                src="/Footer/instagram.svg"
                alt="social_handles"
              />
            </Link>
            <Link href="https://www.linkedin.com/company/ilearningscareer/posts/?feedView=all" target="_blank">
              {" "}
              <img
                className="w-10 h-10"
                src="/Footer/linkedin.svg"
                alt="social_handles"
              />
            </Link>
            <Link href="https://www.youtube.com/@iLearnings" target="_blank">
              <img
                className="w-10 h-10"
                src="/Footer/youtube.svg"
                alt="social_handles"
              />
            </Link>
          </div>
        </section>
      </div>

      <div className="bg-black  text-gray-500">
        <h1 className="text-sm text-center  md:text-sm">
          © 2024 iLearnings Career & Consulting Pvt Ltd
        </h1>
        <h1 className=" text-sm text-center  md:text-sm">All Right Reserved</h1>
      </div>
    </>
  );
};

export default Footer;
