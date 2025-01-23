"use client";
import React, { useState } from "react";

import Goodpopup from "@/components/goodPopup/goodPopup"
const Page = ({ isOpen, courseName, onClose }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [Submit,setSubmit] = useState("Submit")
 const [isOpenP, setIsOpenp] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setIsOpenp(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmit("Submitting....")
      // Call your custom TeleCRM API endpoint
      const apiResponse = await fetch("/api/telecrm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          message,
          course: courseName,
        }),
      });
      
     
     
        onClose();
        setSubmit("Submit")
        setFullname("");
        setEmail("");
        setPhone("");
        setMessage("");
        setIsOpenp(true)
        setMsg("Thank you! Your form has been submitted successfully. We’ve received your details and will get back to you shortly.")
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      
      {isOpen && (
        <div className="fixed inset-0 px-2 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold">Course Enquiry Form</h2>
              <p className="text-gray-600">
                Please fill out this form to inquire about our {courseName}{" "}
                course.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                  placeholder="Enter your phone number"
                  required
                  maxLength={10}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Read-only Course Display */}
              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  value={courseName}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm bg-gray-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message here"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                {Submit}
              </button>
            </form>
          </div>
        </div>
      )}
     <Goodpopup isOpen={isOpenP} message={msg} onClose={handleClose} /> 
    </>
  );
};

export default Page;
