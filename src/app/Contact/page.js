"use client";
import Link from "next/link";
import { useState } from "react";
import Goodpopup from "@/components/goodPopup/goodPopup"
export default function ContactUs() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [sendButton, setSendButton] = useState("Send Message");
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // User data for TeleCRM
    const user = {
      fullname,
      email,
      message,
      phone
    };

    try {
      setSendButton("Sending...");

      // Call your custom TeleCRM API endpoint
      const apiResponse = await fetch("/api/telecrm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify(user),
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to send message");
      }
      setIsOpen(true)
      setMsg("Thank you for submitting the form. We’ve received your information and will get back to you shortly. If you have any urgent questions, feel free to contact us at +91 9730002506.")
      // Reset form after successful submission
      setFullname("");
      setEmail("");
      setMessage("");
      setPhone("");
      setSendButton("Send Message");
      
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending your message. Please try again.");
      setSendButton("Send Message");
    }
  };

  return (
    <>
    <div className=" w-full mx-auto px-4 py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-500">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="border border-yellow-500 rounded-lg shadow-md p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-yellow-500">Get in Touch</h2>
            <p className="text-gray-300">
              Fill out the form below and we&apos;ll get back to you as soon
              as possible.
            </p>
          </div>
          <form className="text-gray-400" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  className="border rounded p-2"
                  placeholder="Your name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  id="email"
                  className="border rounded p-2"
                  placeholder="Your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="phone" className="font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  className="border rounded p-2"
                  placeholder="Your phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="border rounded p-2"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 rounded mt-4 w-full ${
                fullname && email && message && phone
                  ? "hover:bg-blue-700"
                  : "cursor-not-allowed"
              }`}
              disabled={!fullname || !email || !message || !phone}
            >
              {sendButton}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="border border-yellow-500 rounded-lg shadow-md p-4 mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-cyan-500">Contact Information</h2>
            </div>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center">
                <span className="mr-2">&#x1F4CD;</span>
                <p>
                  Address: Office No. 15, 1st Floor, White Square, Hinjawadi -
                  Wakad Rd, Hinjawadi Village, Pune, Maharashtra 411057
                </p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F4DE;</span>
                <p>
                  <Link href="tel:+918073327752">+91 8073327752</Link>
                </p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x2709;&#xFE0F;</span>
                <p>
                  <Link href="mailto:Contact@ilearningscareer.com
">
                    info@ilearningscareer.com

                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F551;</span>
                <p>Monday - Saturday : (10:00 AM to 7:00 PM)</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="border border-yellow-500 rounded-lg shadow-md p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-400">Our Location</h2>
            </div>
            <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.965549978907!2d73.7530566!3d18.590756499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e9dcb6f4af%3A0xe23dc07047ec68e3!2siLearnings%20Career%20%26%20Consulting%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1726058771859!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Goodpopup isOpen={isOpen} message={msg} onClose={handleClose} />
    </>
  );
}
