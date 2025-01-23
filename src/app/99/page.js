"use client";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { HiArrowTurnRightDown } from "react-icons/hi2";
import { razorpayPayment } from "@/lib/razorpay";
import Script from "next/script";
// import Marquee from "react-marquee-line";

const page = () => {
  const ebooks = [
    {
      title: "ChatGPT Prompts E-book for Job Seekers",

      subheadline:
        "Your ultimate guide to acing the job market, with expert tips, strategies, and insights tailored for job seekers at every stage of their career journey.",
    },
    {
      title: "Data Analytics",

      subheadline:
        "Master the art of transforming data into actionable insights with proven techniques, tools, and case studies for aspiring data analysts.",
    },
    {
      title: "Practice 21 Salesforce Triggers Live",

      subheadline:
        "Enhance your Salesforce development skills by practicing 21 live triggers, with step-by-step instructions and best practices for efficient coding.",
    },
    {
      title: "Salesforce ",

      subheadline:
        "An all-in-one guide to mastering Salesforce, with in-depth coverage of tools, features, and techniques to build powerful CRM solutions.",
    },
    {
      title: "Python ",

      subheadline:
        "Unlock the power of Python through comprehensive tutorials, from basics to advanced concepts, to elevate your programming journey.",
    },
    {
      title: "Salesforce CPQ",

      subheadline:
        "Learn to streamline quoting processes and enhance sales productivity with expert insights on Salesforce CPQ implementation and best practices.",
    },
    {
      title: "Mastering AI Prompt Engineering",

      subheadline:
        "Step into the future of AI with an essential guide to prompt engineering, helping you craft effective queries for powerful AI models.",
    },
    {
      title: "Full Stack Development ",
      category: "Interview Prep",
      subheadline:
        "A complete roadmap to becoming a full-stack developer, from frontend to backend technologies, with practical examples and project-based learning.",
    },
    {
      title: "SQL Interview Question ",

      subheadline:
        "Prepare for your next SQL interview with a curated collection of real-world SQL questions and detailed answers for all skill levels.",
    },
    {
      title: "Salesforce Marketing Cloud",

      subheadline:
        "Dive deep into Salesforce Marketing Cloud with expert tips and strategies to optimize email marketing, automation, and customer engagement.",
    },
    {
      title: "Tableau Interview Questions",

      subheadline:
        "Ace your Tableau interview with a comprehensive guide to the most common questions and key concepts every candidate should know.",
    },
    {
      title: "Python Interview Questions",

      subheadline:
        "Get ready to shine in your Python interview with essential questions, answers, and tips covering everything from syntax to advanced topics.",
    },
    {
      title: "Data Analyst Interview Questions",

      subheadline:
        "Prepare to impress with targeted data analyst interview questions and expert advice on how to handle practical, technical, and situational queries.",
    },
    {
      title: "Power BI Interview Questions ",

      subheadline:
        "Master Power BI with a collection of critical interview questions, real-world case studies, and best practices to demonstrate your skills.",
    },
    {
      title: "Machine Learning",

      subheadline:
        "Delve into machine learning concepts and algorithms with this comprehensive guide, perfect for beginners and advanced learners alike.",
    },
    {
      title: "Salesforce Developer Interview Questions",

      subheadline:
        "Gear up for your Salesforce Developer interview with a selection of real-world questions, hands-on solutions, and expert-level preparation tips.",
    },
    {
      title: "Business Analyst Interview Questions ",

      subheadline:
        "Ensure success in your business analyst interview with targeted questions and answers, focusing on the skills and insights needed for the role.",
    },
  ];

  const project = [
    {
      title: "50 AWS Questions ",

      subheadline:
        "Comprehensive Guide to AWS: 50 Questions for Mastery and Certification",
    },
    {
      title: "Social Marketing Campaign",

      subheadline:
        "Crafting Impactful Social Media Strategies for Maximum Engagement",
    },
    {
      title: "Mastering SEO",

      subheadline:
        "Unlocking the Secrets to Search Engine Optimization for Higher Rankings",
    },
    {
      title: "Web Hosting on AWS",

      subheadline:
        "Effortless Website Deployment and Management with AWS Hosting",
    },
    {
      title: "Online Marketplace",

      subheadline:
        "Building a Scalable Online Marketplace: From Concept to Launch",
    },
    {
      title: "CRM System in Salesforce",

      subheadline:
        "Designing a Powerful CRM System with Salesforce for Business Growth",
    },
  ];

  const recorded = [
    {
      title: "Salesforce Admin",
      subheadline:
        "Master the Fundamentals of Salesforce Administration for Business Success",
    },
    {
      title: "Salesforce Marketing Cloud",
      subheadline:
        "Leveraging Salesforce Marketing Cloud for Effective Campaign Management",
    },
    {
      title: "Salesforce CPQ",
      subheadline: "Streamlining Sales Processes with Salesforce CPQ Solutions",
    },
    {
      title: "Business Analyst",
      subheadline:
        "Driving Business Insights and Strategy as a Skilled Business Analyst",
    },
    {
      title: "Data Science, Machine Learnings & AI",
      subheadline:
        "Harnessing Data Science and AI for Transformative Business Impact",
    },
    {
      title: "Salesforce LWC",
      subheadline:
        "Building Dynamic and Scalable UI Components with Salesforce LWC",
    },
    {
      title: "Salesforce Development+LWC",
      subheadline:
        "Comprehensive Development with Salesforce and Lightning Web Components",
    },
    {
      title: "Salesforce Admin+Development",
      subheadline:
        "Mastering Both Administration and Development in Salesforce",
    },
  ];

  const interviewPrep = [
    {
      title: "Salesforce CPQ",
      subheadline: "Master Salesforce CPQ to Simplify Quote-to-Cash Processes",
    },
    {
      title: "Business Analyst",
      subheadline:
        "Ace Business Analyst Interviews with Expert Preparation Strategies",
    },
    {
      title: "Python",
      subheadline:
        "Crack Python Interviews with In-Depth Programming Knowledge",
    },
    {
      title: "Salesforce Marketing Cloud",
      subheadline:
        "Prepare for Salesforce Marketing Cloud Interviews with Confidence",
    },
    {
      title: "Salesforce Admin+Dev",
      subheadline:
        "Excel in Interviews with Combined Salesforce Admin and Developer Expertise",
    },
    {
      title: "Salesforce Community Cloud",
      subheadline:
        "Succeed in Salesforce Community Cloud Interviews with Practical Insights",
    },
    {
      title: "Common Interview Questions",
      subheadline:
        "Tackle Common Interview Questions with Confidence and Skill",
    },
    {
      title: "Interview Preparation",
      subheadline: "Comprehensive Course to Master Any Interview with Ease",
    },
  ];

  const imageProfile1 = [
    "/Home/profiles/1.png",
    "/Home/profiles/2.png",
    // Add other profile images here...
  ];

  const amount = 99;


  const handlePayment = async () => {
    
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
      });
      const data = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "ilearnings",
        description: "testing razorpay transaction",
        order_id: data.orderId,
        handler: function (res) {
          console.log("payment successfull", res);
        },
        prefill: {
          name: "john doe",
          email: "data@gmail.com",
          contact: "99999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("payment failed", error);
    } 
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 pt-20">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className="mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="text-lg md:text-xl font-bold text-white">
                iLearnings
              </div>
              <span className="px-2 py-1 text-xs md:text-sm text-white bg-slate-700 rounded-md capitalize">
                Skill up, scale up, and stand out
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Upgrade Your Skills for Just{" "}
                  <a className="text-yellow-500 underline underline-offset-2">
                    ₹99!
                  </a>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl">
                  Unlock the door to knowledge with our ₹99 Store &ndash;
                  empowering your career with premium resources at unbeatable
                  prices.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-white  text-sm">
                  <h1 className="bg-slate-700 px-2 py-1 rounded-full">
                    E &ndash; Books
                  </h1>
                  <h1 className="bg-slate-700 px-2 py-1 rounded-full">
                    Recorded Courses
                  </h1>
                  <h1 className="bg-slate-700 px-2 py-1 rounded-full">
                    Interview Prep. Kit
                  </h1>
                  <h1 className="bg-slate-700 px-2 py-1 rounded-full">
                    Projects
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              <img
                className="rounded-xl border-8 border-slate-700"
                src="https://i.pinimg.com/736x/69/9b/29/699b292ac47cad7c1c99686a7b6121ba.jpg"
              />
            </div>
          </div>

          <div>
            <p className="text-gray-100 text-center text-xs md:text-lg bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md md:rounded-full md:mx-20 mt-20 mb-5 py-1">
              Premium learning made accessible with our ₹99 Store &ndash;
              because your growth deserves the best, without the high cost.
            </p>
            <Link href="/Contact">
              <button className="rounded-lg text-white text-lg md:text-xl bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto flex px-5 py-2">
                Contact Us for Query !
              </button>
            </Link>

            <section>
              <h1 className="text-white pt-10 pb-3 text-4xl text-center">
                E–Books
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                {ebooks.map((item, index) => (
                  <div
                    key={index}
                    className="store-item bg-slate-700 border border-slate-700 rounded-xl p-4"
                  >
                    <h3 className="text-cyan-500 font-bold text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">e-Book</p>
                    <p className="text-gray-100 my-2">{item.subheadline}</p>

                    <div className="flex justify-between">
                      <h1 className="text-yellow-500 font-bold text-3xl">
                        ₹99
                      </h1>
                      <button
                        onClick={handlePayment}
                        className="flex items-center gap-x-3 text-white bg-cyan-500 px-3 py-1 rounded-md"
                      >
                        <FiDownload /> Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <h1 className="text-white pt-20 pb-3 text-4xl text-center">
                Projects
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                {project.map((item, index) => (
                  <div
                    key={index}
                    className="store-item bg-slate-700 border border-slate-700 rounded-xl p-4"
                  >
                    <h3 className="text-cyan-500 font-bold text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">Project</p>
                    <p className="text-gray-100 my-2">{item.subheadline}</p>

                    <div className="flex justify-between">
                      <h1 className="text-yellow-500 font-bold text-3xl">
                        ₹99
                      </h1>
                      <button
                        onClick={handlePayment}
                        className="flex items-center gap-x-3 text-white bg-cyan-500 px-3 py-1 rounded-md"
                      >
                        <FiDownload /> Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <h1 className="text-white pt-20 pb-3 text-4xl text-center">
                Recorded Courses
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                {recorded.map((item, index) => (
                  <div
                    key={index}
                    className="store-item bg-slate-700 border border-slate-700 rounded-xl p-4"
                  >
                    <h3 className="text-cyan-500 font-bold text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">Recorded course</p>
                    <p className="text-gray-100 my-2">{item.subheadline}</p>

                    <div className="flex justify-between">
                      <h1 className="text-yellow-500 font-bold text-3xl">
                        ₹99
                      </h1>
                      <button
                        onClick={handlePayment}
                        className="flex items-center gap-x-3 text-white bg-cyan-500 px-3 py-1 rounded-md"
                      >
                        <FiDownload /> Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <h1 className="text-white pt-20 pb-3 text-4xl text-center">
                Interview preparation
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                {interviewPrep.map((item, index) => (
                  <div
                    key={index}
                    className="store-item bg-slate-700 border border-slate-700 rounded-xl p-4"
                  >
                    <h3 className="text-cyan-500 font-bold text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">Interview prep.</p>
                    <p className="text-gray-100 my-2">{item.subheadline}</p>

                    <div className="flex justify-between">
                      <h1 className="text-yellow-500 font-bold text-3xl">
                        ₹99
                      </h1>
                      <button
                        onClick={handlePayment}
                        className="flex items-center gap-x-3 text-white bg-cyan-500 px-3 py-1 rounded-md"
                      >
                        <FiDownload /> Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
