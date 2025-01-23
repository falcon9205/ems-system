"use client"
import React from "react";
import { FaCode } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineSocialDistance } from "react-icons/md";
import { FaPeoplePulling } from "react-icons/fa6";
import { MdOutlineGraphicEq } from "react-icons/md";
import { SiLibreofficewriter } from "react-icons/si";
import { MdDataExploration } from "react-icons/md";
import { PiGraphicsCardFill } from "react-icons/pi";
import { SiWesterndigital } from "react-icons/si";
import { MdOutlineTimer } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaTabletAlt } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { FaLinkedin } from "react-icons/fa";
import Razorpay from "razorpay";
import Link from "next/link";

const page = () => {
  const amount = 99;
  const handlePayment = async () => {
    // setIsProcessing(true);
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
    } finally {
      // setIsProcessing(false);
    }
  };
  return (
    <>
      <div className="min-h-screen  pt-10 bg-white pb-10">
        <div className=" mx-auto px-2  md:px-8 py-12">
          {/* Header */}

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 md:justify-items-end items-center space-y-4">
            {/* Left Column */}

            <div className="space-y-8">
              <div className="space-y-7">
                <div>
                  <h1 className="text-left font-bold md:text-xl">
                    "Skills Over Degree - Elon Musk"
                  </h1>
                </div>

                <h1 className=" text-2xl text-blue-500  md:text-5xl leading-10  font-bold">
                  IGI 3.0 <br />
                  <a className=" text-black"> iLearnings Global Internship</a>
                </h1>

                <p className="text-slate-600 font-medium text-lg md:text-sm pb-3">
                  At iLearnings we&apos;re on a mission to empower 1 million
                  candidates with internships&sbquo; live projects&sbquo; and
                  real&ndash;world experience this year
                </p>

                <span className="px-2 py-1 text-[10px] md:text-xs text-white mt-1 bg-blue-600 md:py-1 rounded-md ">
                  Starts 3rd February 2025
                </span>
              </div>
            </div>

            <img
              className="rounded-md md:h-96"
              src="https://i.ytimg.com/vi/o1HiNtM3xfw/maxresdefault.jpg"
            />
          </div>
        </div>

        <p className="domains text-gray-100 text-center text-xs md:text-3xl font-bold bg-blue-600 w-[50%] md:w-96 mx-auto rounded-md py-1 mt-20 ">
          Domains You Can Rock
        </p>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 py-10 mx-2 md:mx-20">
          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <FaCode className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Technical
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">Salesforce</h1>
              <img
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHlqbXpwMmJxbnZkdHczdWNsbmppejF3NGFvbXBwMTdzaWJiemJ4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DivlOk2S7HzyOTc7my/giphy.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Gain Practical Salesforce Knowledge with Our Internship Program
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <FaLaptopCode className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Coding
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">Full Stack Development</h1>
              <img
                src="https://media.licdn.com/dms/image/D4D12AQG2-3Vm_jyYIw/article-cover_image-shrink_600_2000/0/1693753179836?e=2147483647&v=beta&t=XR0NwEBapgyMfEor_5WiyLKiyQzwoPKtp6EKkXY_zpQ"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Practice Full Stack Development on Live Projects and Build Your
                Portfolio
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <MdOutlineSocialDistance className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Content Strategy
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold"> Social Media</h1>
              <img
                src="https://cdn.dribbble.com/users/925704/screenshots/6513438/scrolling.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Master Social Media Strategy and Tactics with Real-World
                Internship Experience
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <FaPeoplePulling className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                People Management
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">Human Resource</h1>
              <img
                src="https://i.pinimg.com/originals/cd/42/d8/cd42d8fc8f9c592694fa8033fdd55544.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Enhance Your HR Expertise with Practical Experience in Our
                Internship
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <MdOutlineGraphicEq className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Visual Creativity
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">UI UX</h1>
              <img
                src="https://cdn.dribbble.com/users/8619169/screenshots/16392779/media/9736d4a7eec3c1ca28fd77f788dd02a9.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                UI/UX Internship: Learn&sbquo; Design&sbquo; and Improve User
                Experiences
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <SiLibreofficewriter className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Storytelling Expertise
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">Content Writer</h1>
              <img
                src="https://creamyanimation.com/wp-content/uploads/2018/01/Creamy-Script.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Hone Your Writing Skills with Our Content Writing Internship
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <MdDataExploration className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Analytical Insight
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">
                Data Scientist/Data Analyst
              </h1>
              <img
                src="https://cdn.dribbble.com/users/176039/screenshots/9022929/media/b21392d51355d99c7b82a5fedf2c4f85.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Become a Data Expert: Practical Experience in Data Analysis
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <PiGraphicsCardFill className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Design
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">Graphic Designer</h1>
              <img
                src="https://static.wixstatic.com/media/a6ec8d_f3d240a734d24dbba3fce3c0ef4a8e81~mv2.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Create Stunning Visuals and Learn Industry&ndash;Ready Graphic
                Design Skills
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>

          <div className="bg-gray-100 shadow-2xl p-4 space-y-5 rounded-md">
            <section className="flex items-center justify-between">
              <SiWesterndigital className="bg-blue-200 text-blue-600 p-1 text-2xl rounded-md" />
              <h1 className=" text-blue-600 text-sm bg-blue-200 px-1 rounded-md">
                {" "}
                Strategic Promotion
              </h1>
            </section>
            <section className="space-y-5">
              <h1 className="text-2xl font-bold">Digital Marketing</h1>
              <img
                src="https://i.pinimg.com/originals/85/04/77/850477fed08bfe98598082bcd309ce70.gif"
                className="rounded-md h-44 w-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Transform Your Marketing Knowledge with Our Digital Marketing
                Internship
              </p>
              <div className="flex items-center justify-between text-xs">
                <p className="flex items-center gap-x-1 bg-gray-300 px-2 rounded-full py-1">
                  <MdOutlineTimer className=" text-xl" />
                  Duration : 3 months
                </p>
                <button onClick={handlePayment} className="bg-blue-500 px-2 py-1 rounded-md text-white">
                  Enroll Now
                </button>
              </div>
            </section>
          </div>
        </section>

        <p className="text-gray-100 text-center text-xs md:text-3xl font-bold bg-blue-500 w-[50%] md:w-96 mx-auto rounded-md py-1 mt-20 ">
          Why You&apos;ll Love It Here
        </p>
        <section className="grid grid-cols-1 text-center md:grid-cols-2 gap-x-5 gap-y-5 py-10 mx-2 md:mx-20">
          <div className="text-black p-4 font-medium  bg-slate-200 rounded-md">
            <img
              className="md:h-72 w-full rounded-lg object-cover"
              src="https://img.freepik.com/premium-vector/image-product-management-aspirant-attempting-live-project-vector-illustration-flat-2_764382-49883.jpg"
            />
            <h1 className=" md:text-xl font-bold ">Live Projects</h1>

            <p className="text-xs md:text-sm">
              Real-world live project experience &ndash; No boring stuff here!
            </p>
          </div>

          <div className="text-black p-4 font-medium  bg-slate-200 rounded-md">
            <img
              className="md:h-72 w-full rounded-lg object-cover"
              src="https://static.vecteezy.com/system/resources/previews/008/518/281/non_2x/business-workshop-flat-illustration-concept-vector.jpg"
            />
            <h1 className=" md:text-xl font-bold ">Workshops</h1>
            <p className="text-xs md:text-sm">
              12 killer workshops to boost your skills (tech & non-tech).
            </p>
          </div>

          <div className="text-black  p-4 font-medium  bg-slate-200 rounded-md ">
            <img
              className="md:h-72 w-full rounded-lg object-cover"
              src="https://img.freepik.com/free-vector/help-support-climbing-employee-from-mentor-leader-hand-team-corporate-people-walking-up-ladder-together-flat-vector-illustration-success-career-growth-leadership-teamwork-concept_74855-21923.jpg"
            />
            <h1 className=" md:text-xl font-bold ">Mentors</h1>
            <p className="text-xs md:text-sm">
              Work with the coolest mentors and industry pros.
            </p>
          </div>

          <div className="text-black p-4 font-medium  bg-slate-200 rounded-md ">
            <img
              className="md:h-72 w-full rounded-lg object-cover"
              src="https://cdn3.vectorstock.com/i/1000x1000/99/67/business-opportunities-as-vision-chances-vector-35139967.jpg"
            />
            <h1 className=" md:text-xl font-bold ">Opportunities</h1>
            <p className="text-xs md:text-sm">
              Unlock opportunities for full&ndash;time roles with iLearnings &
              top companies.
            </p>
          </div>
        </section>

        <p className="text-gray-100 text-center text-sm md:text-3xl font-bold bg-blue-500 w-[60%] md:w-[50] mx-auto rounded-md py-1 mt-20 ">
          Perks That&apos;ll Make You Smile
        </p>
        <section className=" text-center  gap-x-5   mx-2 md:mx-20">
          <div className="text-black p-4 font-medium   rounded-md">
            <img
              className="object-contain h-96 justify-center mx-auto rounded-xl md:mt-5"
              src="/certificate.png"
            />
            <h1 className=" md:text-xl  mt-5 underline underline-offset-1">
              Sample Certificate
            </h1>
          </div>
        </section>

        <h1 className="text-gray-100 text-center text-sm md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 w-[90%] mx-auto rounded-full py-1 mt-20 ">
          Star of the Interns Awards
          <p className="text-[10px] md:text-lg">
            for the best performers with epic prizes worth ₹50,000
          </p>
        </h1>
        <section className="grid grid-cols-1 text-center md:grid-cols-3 gap-x-5 gap-y-5 py-10 mx-2 md:mx-20">
          <div className="text-black p-4 font-medium  border hover:bg-gray-100 rounded-md">
            <img
              className="h-52 object-cover justify-center  mx-auto"
              src="https://images.indianexpress.com/2014/11/sonymdr.gif"
              alt="price_image"
            />
            <h1 className="mt-5 md:text-xl flex items-center justify-between ">
              Sony Headset{" "}
              <FaHeadphonesSimple className="bg-black text-white px-1 text-3xl rounded-md" />
            </h1>
          </div>

          <div className="text-black p-4 font-medium  border hover:bg-gray-100 rounded-md">
            <img
              className="h-52 object-cover justify-center  mx-auto"
              src="https://i.gifer.com/D1aL.gif"
              alt="price_image"
            />
            <h1 className="mt-5 md:text-xl flex items-center justify-between ">
              Tablet{" "}
              <FaTabletAlt className="bg-black text-white px-1 text-3xl rounded-md" />
            </h1>
          </div>

          <div className="text-black p-4 font-medium  border hover:bg-gray-100 rounded-md">
            <img
              className="h-52 object-cover justify-center  mx-auto"
              src="https://www.ictacademy.in/iict/demo-images/cashprize.gif"
              alt="price_image"
            />
            <h1 className="mt-5 md:text-xl flex items-center justify-between ">
              Cash Prizes{" "}
              <GiCash className="bg-black text-white px-1 text-3xl rounded-md" />
            </h1>
          </div>
        </section>

        <p className="text-gray-100 text-center text-sm md:text-3xl font-bold bg-blue-500 w-[40%] md:w-[30%]  mx-auto rounded-md py-1 mt-20 ">
          Internship Spocs
        </p>
        <section className="grid grid-cols-1 text-center md:grid-cols-3 gap-x-5 gap-y-5 py-10 mx-2 md:mx-20">
          <div className="text-black p-4 font-medium  rounded-md">
            <img
              className="h-44 w-44 object-cover rounded-full justify-center  mx-auto"
              src="/spoc1.png"
              alt="price_image"
            />
            <h1 className="mt-5 font-bold md:text-xl ">Neha Kasireddy</h1>
            <p className="md:text-xs">(Salesforce Admin)</p>
          </div>

          <div className="text-black p-4 font-medium  rounded-md">
            <img
              className="h-44 w-44 object-cover rounded-full justify-center  mx-auto"
              src="/spoc2.jpeg"
              alt="price_image"
            />
            <h1 className="mt-5 font-bold md:text-xl ">Himanshu Maurya</h1>
            <p className="md:text-xs">(Full Stack Developer)</p>
          </div>

          <div className="text-black p-4 font-medium  rounded-md">
            <img
              className="h-44 w-44 object-cover rounded-full justify-center  mx-auto"
              src="/spoc3.png"
              alt="price_image"
            />
            <h1 className="mt-5 font-bold md:text-xl ">
              Tanu Priya Shrivastava
            </h1>
            <p className="md:text-xs">(Human Resource)</p>
          </div>
        </section>

        <div className="md:flex justify-between items-center space-y-5 md:space-y-0 mx-10">
          <section className=" bg-gray-100 p-4 rounded-lg">
            <h1 className="md:text-6xl leading-1">
              Meet the Mind behind this Program - Our Cool Boss!
            </h1>
            <h1 className="text-sm md:text-5xl text-blue-700 mt-5 md:mt-5">
              Poorva Shrivastava
            </h1>
            <p className="text-xs flex items-center justify-between md:justify-normal">
              (Founder & CEO of ilearnings)
              <Link href="https://www.linkedin.com/in/poorva-shrivastava-edtechfounder/">
                <FaLinkedin className="text-2xl md:text-3xl text-blue-500" />
              </Link>{" "}
            </p>
          </section>
          <img
            className="h-96 rounded-xl md:rounded-full object-cover"
            src="https://media.licdn.com/dms/image/v2/D4D22AQFsprUM_cRdAg/feedshare-shrink_1280/B4DZRV1.zXHkAo-/0/1736607009945?e=1740614400&v=beta&t=SudxI58z7HX_ucjy0CLP0wOyge_Z3BhqG0ITgBhgO7U"
          />
        </div>

        <div className="md:flex items-center gap-x-3 text-xs text-center md:text-xl mx-auto w-[90%] space-y-2 md:space-y-0 md:w-full justify-center">
          {/* <h1 className="bg-red-500 text-white px-2 py-1 rounded-sm">
            Who can Join ?
          </h1> */}
          <h1 className="text-black rounded-sm px-2 py-1 ">
            If you&apos;re a student or fresher ready to slay and learn&sbquo;
            we&apos;re waiting for you
          </h1>
        </div>

        <Link href="#domains">
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-2 py-1 mt-5 rounded-full text-xl text-white block mx-auto">
            Enroll Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default page;
