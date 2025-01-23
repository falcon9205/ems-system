"use client";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { RxCross2 } from "react-icons/rx";
const page = () => {
  const [showCourses, setShowCourses] = useState(false);

  const imageProfile1 = [
    "/Home/profiles/1.png",
    "/Home/profiles/2.png",
    "/Home/profiles/3.png",
    "/Home/profiles/4.png",
    "/Home/profiles/5.png",
    "/Home/profiles/6.png",
    "/Home/profiles/7.png",
    "/Home/profiles/8.png",
    "/Home/profiles/9.png",
    "/Home/profiles/10.png",
    "/Home/profiles/11.png",
    "/Home/profiles/12.png",
    "/Home/profiles/13.png",
    "/Home/profiles/14.png",
    "/Home/profiles/15.png",
    "/Home/profiles/16.png",
    "/Home/profiles/17.png",
    "/Home/profiles/18.png",
    "/Home/profiles/19.png",
    "/Home/profiles/20.png",
  ];
  const imageProfile2 = [
    "/Home/profiles/21.png",
    "/Home/profiles/22.png",
    "/Home/profiles/23.png",
    "/Home/profiles/24.png",
    "/Home/profiles/25.png",
    "/Home/profiles/26.png",
    "/Home/profiles/27.png",
    "/Home/profiles/28.png",
    "/Home/profiles/29.png",
    "/Home/profiles/30.png",
    "/Home/profiles/31.png",
    "/Home/profiles/32.png",
    "/Home/profiles/33.png",
    "/Home/profiles/34.png",
    "/Home/profiles/35.png",
    "/Home/profiles/36.png",
    "/Home/profiles/37.png",
    "/Home/profiles/38.png",
    "/Home/profiles/39.png",
  ];
  const courses = [
    
    {
      name: "Full Stack Development",
      link: "https://live.ilearningscareer.com/courses/Full-Stack-Development-Internship-Project-66486f17af2ff6090e04a189",
    },
   
    
   
    {
      name: "Salesforce",
      link: "https://live.ilearningscareer.com/courses/Salesforce-Internship-Project-with-iLearnings-661e8bf16da8f318f2619826",
    },
    
    
   

    {
      name: "Social Media",
      link: "https://live.ilearningscareer.com/courses/Social-Media-Promotion-Internship-Project-664f008c6c9a197400766e96",
    },
    {
      name: "Human Resource",
      link: "https://live.ilearningscareer.com/courses/HR--Human-Resource-Management-66448abfb3ae6729be2cbc21",
    },
    {
      name: "UI/UX",
      link: "https://live.ilearningscareer.com/courses/UIUX-Internship-Project-6658419410daa762a9791576",
    },
    {
      name: "Content Writer",
      link: "https://live.ilearningscareer.com/courses/Content-Writer-66448daf4b98d350e4173c82",
    },
    {
      name: "Data Science/Data Analyst",
      link: "https://live.ilearningscareer.com/courses/Data-Analyst-Internship-678a64834525533bd70e83e5",
    }, {
      name: "Graphic Designer",
      link: "https://live.ilearningscareer.com/courses/Graphic-Designer-66448b7faf46493f7a39aee7",
    },
    {
      name: "Digital Marketing",
      link: "https://live.ilearningscareer.com/courses/Social-Media-Promotion-Internship-Project-664f008c6c9a197400766e96",
    },
  ];
  return (
    <>
       <Head>
        <title>iLearnings - Dynamic Page</title>
        <meta name="description" content="This is a dynamic page on iLearnings." />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 pt-20">
        <div className=" mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="text-lg md:text-xl font-bold text-white">
                iLearnings
              </div>
              <span className="px-2 py-1 text-xs md:text-sm text-white bg-slate-700 rounded-md capitalize">
                Skill up&sbquo; scale up&sbquo; and stand out
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className=" text-3xl md:text-6xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ">
                  Get Your Internship Certificate for <br />
                  Just{" "}
                  <a className="text-yellow-500 underline underline-offset-2">
                    ₹99!
                  </a>{" "}
                </h1>
                <p className="text-slate-300 text-lg md:text-xl">
                  Join over 50,000 professionals who boosted their careers this
                  year with our certified courses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setShowCourses(true);
                  }}
                  className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600"
                >
                  Get Certified Now
                </button>
                <Link
                  href="/certificate.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-6 py-3 text-lg font-medium text-white border border-slate-700 rounded-md hover:bg-slate-800 w-full">
                    View Sample Certificate
                  </button>
                </Link>
              </div>

              <div className="flex gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">Assured certification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300">
                    133% better job prospects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-300">Industry recognized</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              <div className="bg-black/40 backdrop-blur border border-slate-800 rounded-md p-6">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-3 rounded-full">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="pt-8 space-y-6 bg-[url('/certificate.png')] bg-cover bg-center w-full md:h-96 h-44">
                  <div className="text-center">
                    {/* <h2 className="text-2xl font-semibold text-white mb-2">Certificate of Achievement</h2>
                  <p className="text-slate-400">This certificate is presented to</p>
                  <p className="text-xl text-white mt-2">Your Name</p> */}
                  </div>

                  <div className="space-y-4">
                    {/* <div className="text-center text-slate-400">
                    for successfully completing
                    <p className="text-white font-medium mt-1">Advanced Web Development</p>
                  </div> */}

                    <div className="border-t border-slate-700 pt-4">
                      {/* <p className="text-center text-sm text-slate-400 mb-4">Recognized by leading companies</p> */}
                      <div className="flex justify-center gap-4 flex-wrap">
                        {/* {["LinkedIn", "Google", "Swiggy", "Flipkart", "Dunzo"].map((company) => (
                        <span
                          key={company}
                          className="px-3 py-1 text-sm text-white bg-slate-800 rounded-md"
                        >
                          {company}
                        </span>
                      ))} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
            </div>
          </div>

          <div>
            <p className="text-gray-100 text-center text-xs md:text-xl bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md md:rounded-full md:mx-20 mt-20 mb-5 py-1">
              Enhance your resume with a project certified by a trusted&sbquo;
              government&ndash;recognized organization.
            </p>
            <Link href="/Contact">
            <button
              
              className="rounded-lg text-white text-lg md:text-xl bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto flex px-5 py-2"
            >
              Contact Us for Query !
            </button></Link>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 py-10  md:mx-20">
              <div className="text-white p-4 font-medium  border border-slate-700 rounded-md hover:bg-slate-700">
                <h1 className=" md:text-lg ">
                  Government-Recognized Certificate
                </h1>
                <p className="text-xs md:text-sm">
                  Add credibility with our recognition and award in Dubai.
                </p>
              </div>

              <div className="text-white p-4 font-medium  border border-slate-700 rounded-md hover:bg-slate-700">
                <h1 className=" md:text-lg ">Resume Boost</h1>
                <p className="text-xs md:text-sm">
                  Showcase this project in college and job interviews.
                </p>
              </div>

              <div className="text-white  p-4 font-medium  border border-slate-700 rounded-md hover:bg-slate-700 ">
                <h1 className=" md:text-lg ">Learn from Experts</h1>
                <p className="text-xs md:text-sm">
                  Industry professionals have prepared this project for
                  practical exposure.
                </p>
              </div>

              <div className="text-white  p-4 font-medium  border border-slate-700 rounded-md hover:bg-slate-700 ">
                <h1 className=" md:text-lg ">Proven Success</h1>
                <p className="text-xs md:text-sm">
                  Over 9000+ students have completed this project and benefited
                  from it.
                </p>
              </div>
            </section>

            <h1 className="text-center text-xl md:text-7xl md:pt-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Who can{" "}
              <a className="text-yellow-500 underline underline-offset-2">
                BENEFIT !
              </a>{" "}
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 py-10 md:mx-20">
              <div className="text-white md:space-y-5 py-5 px-2 text-center font-medium  border border-slate-700 rounded-md hover:bg-slate-700">
                <h1 className="text-xl md:text-4xl ">For Students</h1>
                <p className="text-sm md:text-sm">
                  Use it as a college project to gain practical experience.
                </p>
              </div>

              <div className="text-white md:space-y-5 py-5 px-2 text-center font-medium  border border-slate-700 rounded-md hover:bg-slate-700">
                <h1 className="text-xl md:text-4xl ">For Freshers</h1>
                <p className="text-sm md:text-sm">
                  Enhance your resume with hands-on technical experience.
                </p>
              </div>
            </section>

            <div className="">
              <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text font-bold  rounded-t-3xl pt-5  capitalize text-center text-xl py-2 md:text-7xl">
                Join Our <a className="text-yellow-500">50&sbquo;000+</a>{" "}
                Learners Community
              </h1>
              <Marquee
                pauseOnHover="false"
                direction="right"
                speed={60}
                className="border border-slate-700 rounded-md hover:bg-slate-700"
              >
                <div className="flex w-ful mx-5 gap-x-4 pt-5 pb-5">
                  {imageProfile1.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      className={` h-16 md:h-24 rounded-lg  object-fill ${
                        index == 0 ? "md:ml-3 ml-1" : ""
                      }`}
                      alt="featured"
                    />
                  ))}
                </div>
              </Marquee>
              <Marquee
                pauseOnHover="false"
                direction="left"
                speed={60}
                className="border mt-4 border-slate-700 rounded-md hover:bg-slate-700"
              >
                <div className="flex w-ful mx-5 gap-x-4 pt-5 pb-5">
                  {imageProfile2.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      className={` h-16 md:h-24 rounded-lg  object-fill ${
                        index == 0 ? "md:ml-3 ml-1" : ""
                      }`}
                      alt="featured"
                    />
                  ))}
                </div>
              </Marquee>
              <h1 className="text-center text-red-600 md:text-3xl py-5 font-sans">
                Limited&ndash;Time Offer &ndash; Get Your Certificate for Just
                ₹99!
              </h1>
            </div>

            <button
              onClick={() => {
                setShowCourses(true);
              }}
              className="rounded-md text-white text-xl bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto flex px-5 py-2 my-10"
            >
              Get Started Now
            </button>

            <div className="md:flex text-center justify-between gap-x-10 space-y-2 md:space-y-0 md:mx-10 md:py-10">
              <h1 className="bg-[#0077b6] text-sm md:text-2xl text-white rounded-full px-5 py-2">
                Trusted by 50&sbquo;000+ Learners Worldwide
              </h1>
              <h1 className="bg-[#0077b6] text-sm md:text-2xl text-white rounded-full px-5 py-2">
                Leading E&ndash;Learning Platform 2023 &ndash; Dubai
              </h1>
            </div>
          </div>
        </div>
      </div>

      {showCourses && (
        <div className="fixed inset-0  backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 rounded-lg shadow-xl md:max-w-[90%] w-full overflow-hidden transition-transform duration-500 ease-in-out transform `}
          >
            <section className="w-full py-4 text-black md:w-[100%] bg-slate-900">
              <div className="flex text-white items-center text-xl justify-between mx-5">
                <h1>Select your internship</h1>
                <RxCross2
                  className=" border-slate-700 border py-1 px-1 rounded-md hover:bg-slate-800"
                  onClick={() => setShowCourses(false)}
                />
              </div>
            </section>
            <section className="grid md:grid-cols-3 mx-2 md:mx-8 grid-cols-2 gap-x-2 gap-y-2 py-2 md:py-5">
              {courses.map((course, index) => (
                <Link
                  key={index}
                  href={course.link}
                  className="px-2 md:px-6  text-center py-3 text-sm md:text-lg font-medium text-white border border-slate-700 rounded-md hover:bg-slate-800"
                  title={`Learn more about ${course.name}`}
                  target="_blank" rel="noopener">
                  {course.name}
                </Link>
              ))}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
