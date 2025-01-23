"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DelayedPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [delay, setDelay] = useState(10000); 
  
  // State for form fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const  [sendbutton,setSendButton] = useState("Send")
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const closePopup = () => {
    setShowPopup(false);
    setDelay(delay + 10000); 
  };

  const handleSubmit = async(e) => {
    e.preventDefault();  // Prevent the default form submission
    if (fullname && email && message) {
      const user = { fullname, email, message };
      setSendButton("Sending...")
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // <-- fix: send the user object directly
      });

      const data = await res.json();
      console.log("Login Data:", data);

      toast.success("Form Submitted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
      });
      
      closePopup()
      setSendButton("Send")
      setFullname("")
      setEmail("")
      setMessage("")
      
    }
    
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="hidden md:block bg-gray-100 w-full md:w-1/2 p-8 relative">
                
                <h1 className="  text-center text-4xl font-bold">Contact us</h1>
                <p className="text-black text-center">We&apos;re here to help you succeed &ndash; Reach out to us!</p>
                <img
                  className="hidden md:block"
                  src="/popup/pupup.png"
                  alt=""
                />
                <div className="absolute bottom-8 left-8 right-8 text-center">
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Get</h2>
                  <p className="text-blue-900">Values from us in different format</p>
                </div>
              </div>
              <div className="w-full  md:w-1/2 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="">
                    <h2 className="text-2xl font-bold mb-1">Hi, Learner</h2>
                    <p className="text-xl">If you have any doubts (Ask your Query)</p>
                  </div>
                  <button
                    onClick={closePopup}
                    className="text-gray-900 hover:text-gray-700 hover:bg-gray-300 rounded-full"
                    aria-label="Close popup"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Your message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white ${
                      fullname && email && message
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!fullname || !email || !message}
                  >
                    {sendbutton}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
