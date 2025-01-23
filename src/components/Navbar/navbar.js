"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Handlee, Montserrat } from "next/font/google";
import { FaChevronDown } from "react-icons/fa";
import { useLogin } from "@/store/login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import DisableRightClick from "../DisableRightClick";
import "react-toastify/dist/ReactToastify.css";
import Clicks from "../countClick/clicks";
const ProgressBar = dynamic(() => import("../progress/progress"));

const font = Handlee({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
//comment
const fontNav = Montserrat({
  weight: "500",
  display: "swap",
  subsets: ["latin"],
});

export default function Navbar() {
  const router = useRouter();
  const {
    AllowProfile,
    setAllowProfile,
    identity,
    rename,
    login,
    set_User_info,
    login_Credential,
  } = useLogin((state) => ({
    identity: state.identity,
    rename: state.rename,
    login: state.login,
    login_Credential: state.login_Credential,
    user_ID: state.user_ID,
    set_User_info: state.set_User_info,
    AllowProfile: state.AllowProfile,
    setAllowProfile: state.setAllowProfile,
  }));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [AllowProfile, setAllowProfile] = useState(false);
  const [AccountDropDown, setAccountDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropDown, setLoginDropDown] = useState(false);
  const [loginDropDownMobile, setLoginDropDownMobile] = useState(false);
  const [resourceDropDown, setResourceDropDown] = useState(false);
  const [mobileresourceDropDown, setMobileresourcedropdown] = useState(false);
  const [progress, setProgress] = useState(0);

  const removeuser = async () => {
    try {
      const res = await fetch("/api/logout", 
        { method: "GET",
          headers: {
            "Content-Type": "application/json",
            'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
          },

         });
      const data = await res.json();
      console.log(data.success);
      if (data.success) {
        setMenu();
        rename("");
        set_User_info("");
        setAllowProfile(false);
        login_Credential("0");
        toast.success("Logout Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const quotes = [
    "Tanu just signed up to iKonnect!",
    "Divyanshi is now a Software Engineer at iLearnings!",
    "Rohan was promoted to Project Manager!",
    "Aditi landed her job as a Digital Marketing Specialist!",
    "Arjun joins as a Full-Stack Developer!",
    "Priya is now a Business Analyst!",
    "Rahul was hired as a Data Scientist!",
    "Sneha secured her Content Writer position!",
    "Karan joined the Sales Team!",
    "Ananya is now a UI/UX Designer!",
    "Nikhil became a Marketing Manager!",
    "Meera landed a Web Developer role!",
    "Vikram secured his position as a Network Administrator!",
    "Simran is now a Cloud Architect!",
    "Ishaan is a Finance Analyst at a global firm!",
    "Maya is a Graphic Designer!",
    "Aditya is now a Data Analyst!",
    "Anjali is excelling as a Customer Success Manager!",
    "Harsh got hired as an HR Manager!",
    "Shivani joined as an Operations Manager!",
    "Ravi is now a Cybersecurity Specialist!",
    "Priyanka secured a Social Media Manager role!",
    "Gaurav was hired as a Database Administrator!",
    "Alok is now an SEO Specialist!",
    "Neha landed her job as a Web Designer!",
    "Rajat is a Data Analyst!",
    "Sanya joined as a Mobile App Developer!",
    "Tarun is now a QA Engineer!",
    "Kriti is now a Software Tester!",
    "Vishal landed a job as a Product Manager!",
    "Aman just signed up to iKonnect!",
    "Sanya is now a Business Development Manager!",
    "Isha just joined as a Software Engineer!",
    "Vivek is now a Front-End Developer!",
    "Rohit landed his position as a Network Engineer!"
];

  
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000); 
  },[])
  useEffect(() => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const identity = Cookies.get("identity");
    
    if (token && id && identity) {
      console.log("running cookies if");
      login_Credential("1");
      set_User_info(id);
      rename(identity);
      setAllowProfile(true);
    }
  }, []);

  useEffect(() => {
    // if (login === "1") setAllowProfile(true);
    // if (login === "0") setAllowProfile(false);
    window.addEventListener("scroll", calculateScrollProgress);
    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, [login]);

  // Function to close all menus
  const setMenu = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (dropdownOpen) setDropdownOpen(false);
    if (loginDropDown) setLoginDropDown(false);
    if (loginDropDownMobile) setLoginDropDownMobile(false);
    if (AccountDropDown) setAccountDropDown(false);
  };

  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Calculate the percentage of progress based on the scroll
    const totalScroll = docHeight - windowHeight;
    const scrollProgress = (scrollTop / totalScroll) * 100;

    setProgress(scrollProgress);
  };

  return (
    <>
    <Clicks/>
      <nav
        className={`z-20 mx-auto shadow-2xl fixed top-0 left-0 w-[100%]  rounded-b-lg  border-b border-gray-400 bg-white right-0 `}
      >
        <h1 className="bg-black text-center text-[10px] md:text-sm py-1 text-white font-medium">{randomQuote}</h1>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-x-2 md:gap-x-4">
              <Link
                onClick={setMenu}
                href="/"
                className="text-white font-bold text-xl"
              >
                <img
                  src="/logo.jpg"
                  className="md:w-16 md:h-14 w-12 h-10"
                  alt="logo"
                />
              </Link>
              {/* <h1
                className={`italic font-bold bg-gradient-to-r from-pink-600 to-yellow-600 text-transparent bg-clip-text mt-2 text-sm`}
              >
                Career ki pehli udaan !
              </h1> */}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block sm:ml-6">
              <div className="flex space-x-4">
                { (identity===null || identity=="candidate" || identity =="") &&
                  <Link
                    href="/jobs-portal"
                    onClick={setMenu}
                    className="text-white px-3 border border-gray-700 py-2 bg-gradient-to-r from-pink-500 to-yellow-500  rounded-md text-sm font-bold"
                  >
                    Jobs
                  </Link>
                }
                 { (identity=="recruiter") && (login =="1") && 
                  <Link
                    href="/job-post"
                    onClick={setMenu}
                    className="text-white px-3 border border-gray-700 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-md text-sm font-bold"
                  >
                    Post a job
                  </Link>
                }
                { (identity=="referral") && (login =="1") && 
                  <Link
                    href="/referal-post"
                    onClick={setMenu}
                    className="text-white px-3 border border-gray-700 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-md text-sm font-bold"
                  >
                    Post a job
                  </Link>
                }
                <div className="relative capitalize">
                  <button
                    onMouseOver={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="text-black px-3 py-1  rounded-md text-sm font-bold flex gap-x-1 items-center"
                  >
                    Our Courses <FaChevronDown />
                  </button>
                  {dropdownOpen && (
                    <div
                      onMouseOver={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute z-50 mt-0 w-60 bg-white rounded-md shadow-lg py-1 transition-all duration-300 ease-out"
                    >
                      <Link
                        href="/Salesforce"
                        className="block px-4 py-2 text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Salesforce
                      </Link>
                      <Link
                        href="/dataanalytics"
                        className="block px-4 py-2 text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Data Analytics
                      </Link>
                      <Link
                        href="/Fullstackdevelopment"
                        className="block px-4 py-2 text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Full stack development
                      </Link>
                      <Link
                        href="/datascience"
                        className="block px-4 py-2 text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Data Science
                      </Link>
                      <Link
                        href="/cybersecurity"
                        className="block px-4 py-2  text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Cyber Security
                      </Link>
                      <Link
                        href="/interviewprep"
                        className="block px-4 py-2 text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Interview Preparations
                      </Link>
                      <Link
                        href="/softskills"
                        className="block px-4 py-2 text-black hover:bg-gray-300"
                        onClick={setMenu}
                      >
                        Soft Skills
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/Blog"
                  onClick={setMenu}
                  className="text-black px-3 py-1 hover:text-black rounded-md text-sm font-bold"
                >
                  Blogs
                </Link>

                <Link
                  href="/Events"
                  className="text-black px-3 py-1 hover:text-black rounded-md text-sm font-bold"
                  onClick={setMenu}
                >
                  Events
                </Link>

                <Link
                  href="/Services"
                  className="text-black px-3 py-1 hover:text-black rounded-md text-sm font-bold"
                  onClick={setMenu}
                >
                  Services
                </Link>
                <Link
                  href="/Hire"
                  className="text-gray-100 px-3 py-2 rounded-full  hover:underline hover:underline-offset-4 text-sm font-bold  bg-gradient-to-r from-gray-800 via-blue-500 to-gray-900   [background-size:300%] animate-moving-gradient"
                  onClick={setMenu}
                >
                  iKonnect
                </Link>
                {!AllowProfile && (
                  <div className="relative capitalize">
                    <Link href="/Login">
                      <button className="text-white bg-red-500 px-3 py-2 rounded-full text-sm font-bold flex gap-x-1 items-center">
                        Login
                      </button>
                    </Link>
                  </div>
                )}

                {AllowProfile && (
                  <div className="relative capitalize">
                    <button
                      onMouseOver={() => setAccountDropDown(!AccountDropDown)}
                      onMouseLeave={() => setAccountDropDown(!AccountDropDown)}
                      className="text-white bg-red-500 px-3 py-2 rounded-full text-sm font-bold flex gap-x-1 items-center"
                    >
                      Account
                    </button>
                    {AccountDropDown && (
                      <div
                        onMouseOver={() => setAccountDropDown(true)}
                        onMouseLeave={() => setAccountDropDown(false)}
                        className="absolute z-50 mt-0 w-60 bg-white rounded-md shadow-lg py-1 transition-all duration-300 right-[0%] border-gray-500 ease-out"
                      >
                        <Link
                          href="/Profile"
                          className="block px-4 py-2 text-black border-b hover:bg-gray-100"
                        >
                          My Profile
                        </Link>

                        <button
                          onClick={() => removeuser()}
                          className="block px-4 py-2 text-black border-b hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-500  focus:outline-none"
              >
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      !mobileMenuOpen
                        ? "M4 6h16M4 12h16m-7 6h7"
                        : "M6 18L18 6M6 6l12 12"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 ">
            { (identity===null || identity=="candidate" || identity =="") && 
                  <Link
                  href="/jobs-portal"
                  onClick={setMenu}
                  className="block text-white bg-gradient-to-r from-pink-500 to-yellow-500 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Jobs
                  </Link>
                }
                 { (identity=="recruiter") && (login =="1") &&
                  <Link
                  href="/job-post"
                  onClick={setMenu}
                  className="block text-white bg-gradient-to-r from-pink-500 to-yellow-500 px-3 py-2  rounded-md text-base font-medium"
                  >
                    Post a job
                  </Link>
                }
                 { (identity=="referral") && (login =="1") &&
                  <Link
                  href="/referal-post"
                  onClick={setMenu}
                  className="block text-white bg-gradient-to-r from-pink-500 to-yellow-500 px-3 py-2  rounded-md text-base font-medium"
                  >
                    Post a job
                  </Link>
                }
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-x-1 w-full text-left text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Courses <FaChevronDown />
              </button>
              {dropdownOpen && (
                <div className="pl-3 capitalize space-y-1 transition-all duration-300 ease-out">
                  <Link
                    href="/Salesforce"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Salesforce
                  </Link>
                  <Link
                    href="/dataanalytics"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Data Analytics
                  </Link>
                  <Link
                    href="/Fullstackdevelopment"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Full stack development
                  </Link>
                  <Link
                    href="/datascience"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Data Science
                  </Link>
                  <Link
                    href="/cybersecurity"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Cyber Security
                  </Link>
                  <Link
                    href="/interviewprep"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Interview Preparations
                  </Link>
                  <Link
                    href="/softskills"
                    onClick={setMenu}
                    className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Soft Skills
                  </Link>
                </div>
              )}

              <Link
                href="/Blog"
                onClick={setMenu}
                className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Blogs
              </Link>

              <Link
                href="/Events"
                className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                onClick={setMenu}
              >
                Events
              </Link>

              <Link
                href="/Services"
                onClick={setMenu}
                className="block text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </Link>
              <Link
                href="/Hire"
                onClick={setMenu}
                className="block px-3 py-2 rounded-full bg-gradient-to-r from-gray-800 via-blue-500 to-gray-900 [background-size:300%] animate-moving-gradient text-base font-medium text-white"
              >
                iKonnect
              </Link>

              {!AllowProfile && (
                <div className="relative capitalize">
                  <Link href="/Login">
                    <button
                      onClick={setMenu}
                      className="text-white bg-gradient-to-r from-blue-700 to-blue-900 px-3 py-2 rounded-full text-sm font-bold flex gap-x-1 items-center"
                    >
                      Login
                    </button>
                  </Link>
                </div>
              )}

              {AllowProfile && (
                <div className="relative capitalize">
                  <button
                    onClick={() => setAccountDropDown(!AccountDropDown)}
                    // onMouseLeave={() => setAccountDropDown(!AccountDropDown)}
                    className="text-white bg-gradient-to-r from-blue-700 to-blue-900 px-3 py-2 rounded-full text-sm font-bold flex gap-x-1 items-center"
                  >
                    Account
                  </button>
                  {AccountDropDown && (
                    <div
                      onClick={() => setAccountDropDown(true)}
                      // onMouseLeave={() => setAccountDropDown(false)}
                      className="absolute z-50 mt-0 w-60 bg-white rounded-md shadow-lg py-1 transition-all duration-300 left-[0%] border-gray-500 ease-out"
                    >
                      <Link
                        href="/Profile"
                        onClick={setMenu}
                        className="block px-4 py-2 text-black border-b hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={() => removeuser()}
                        className="block px-4 py-2 text-black border-b hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* <ProgressBar progress={progress} /> */}
      <ToastContainer />
      <DisableRightClick />
    </>
  );
}
