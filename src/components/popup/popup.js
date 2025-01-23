"use client";
import React, { useState, useEffect } from "react";
import Goodpopup from "@/components/goodPopup/goodPopup"
export default function DelayedPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [delay, setDelay] = useState(15000); // 15 seconds initial delay
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setIsOpen(false);

  };
  // State for form fields
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const { fullname, email, phone, message } = formData;

  const [sendButton, setSendButton] = useState("Send");

  // UseEffect to manage popup delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [showPopup, delay]);

  // Close popup and increase delay for next appearance
  const closePopup = () => {
    setShowPopup(false);
    setDelay((prevDelay) => prevDelay + 50000); // Increase delay by 50s each time
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // User data for TeleCRM
    const user = {
      fullname,
      email,
      phone,
      message
    };

    try {
      setSendButton("Sending...");

      // Call your custom TeleCRM API endpoint
      const apiResponse = await fetch("/api/telecrm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          message,
          
        }),
      });

      
        // Reset form and close popup after successful submission
        closePopup();
        setSendButton("Send");
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsOpen(true)
        setMsg("Thank you for submitting the form. We’ve received your information and will get back to you shortly. If you have any urgent questions, feel free to contact us at +91 9730002506.")
       
      
    } catch (error) {
      
      setSendButton("Send");
      console.error("Error:", error);
    }
  };

  // Handling input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Side of Popup */}
              <div className="hidden md:block bg-gray-100 w-full md:w-1/2 p-8 relative">
                <h1 className="text-center text-4xl font-bold">Contact us</h1>
                <p className="text-black text-center">
                  We&apos;re here to help you succeed &ndash; Reach out to us!
                </p>
                <img
                  className="hidden md:block"
                  src="/popup/pupup.png"
                  alt="Popup"
                />
                <div className="absolute bottom-8 left-8 right-8 text-center">
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Get</h2>
                  <p className="text-blue-900">
                    Values from us in different formats
                  </p>
                </div>
              </div>

              {/* Right Side Form */}
              <div className="w-full md:w-1/2 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Hi, Learner</h2>
                    <p className="text-xl">
                      If you have any doubts, ask your query!
                    </p>
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

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={fullname}
                    onChange={handleInputChange}
                    required
                    maxLength="10"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={phone}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                  />
                  <textarea
                    name="message"
                    placeholder="Your message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="4"
                    value={message}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white ${
                      fullname && email && phone && message
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!fullname || !email || !phone || !message}
                  >
                    {sendButton}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Goodpopup isOpen={isOpen} message={msg} onClose={handleClose} />
     
    </>
  );
}
