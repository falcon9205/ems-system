import React from "react";
import "./about.css"; // Ensure this path is correct
import { BiSolidVideoRecording } from "react-icons/bi";
import { PiBookOpenUserFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";
import { FaMedal } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { IoPeople } from "react-icons/io5";

export const metadata = {
  title: "About us",
  description: "Learn about iLearnings' journey, mission, and innovative learning solutions.",
};


const Page = () => {
  const content = [
    {
      logo: <BiSolidVideoRecording size={40} />,
      heading: "Live Learning",
      paragraph:
        "Learn live with top educators, chat with teachers and other attendees, and get your doubts cleared.",
    },
    {
      logo: <PiBookOpenUserFill  size={40} />,
      heading: "Structured learning",
      paragraph:
        "Our curriculum is designed by experts to make sure you get the best learning experience.",
    },
    {
      logo: <FaPeopleGroup  size={40} />,
      heading: "Customized Programs",
      paragraph:
        "At iLearnings, we never believe in one size fits all. Dive into workshops meticulously crafted for your unique needs.",
    },
    {
      logo: <MdOutlineFreeCancellation size={40} />,
      heading: "Free Webinars",
      paragraph:
        "Learn with Free webinars where participants can listen to a speaker, view presentations or videos, and participate in discussions or Q&A sessions.",
    },
    {
      logo: <SiSpeedtest  size={40} />,
      heading: "Practice tests",
      paragraph:
        "With the quizzes and live tests practice what you learned, and track your class performance.",
    },
    {
      logo: <FaMedal  size={40}/>,
      heading: "Get certified",
      paragraph:
        "ParaFlaunt your skills with course certificates. You can showcase the certificates on LinkedIn with a click.",
    },
  ];
  return (
    <>
      <div className="overview mt-20 md:h-[50vh] py-20 md:py-0">
        <h1 className="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent md:pt-20 md:py-5 text-center text-3xl md:text-6xl font-bold">
          iLearnings Career & Consulting Pvt Ltd
        </h1>
        <p className="text-center text-yellow-500 text-xs md:text-2xl font-semibold mx-3 md:mx-20">
          Empowering students with knowledge and skills for the future.
        </p>
      </div>

      {/* what ilearnings offer */}
      <div className="mb-10">
        <h1 className="text-center text-3xl md:text-6xl my-10 font-bold text-cyan-500 ">
          What <a className="text-yellow-500">iLearnings</a> Offer
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-3 mx-2 md:mx-20 gap-x-8 gap-y-8">
          {content.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-10 rounded-2xl capitalize"
            >
              <h1 className="text-cyan-500">{item.logo}</h1>
              <h1 className="text-2xl text-yellow-500 font-bold">{item.heading}</h1>
              <p className="text-gray-300 pt-1">{item.paragraph}</p>
            </div>
          ))}
        </section>
      </div>

      {/*Global Learnings platform  */}
      <div className="md:flex w-full py-10 ">
        <section className="text-white  md:w-2/3 flex flex-col justify-center items-center">
          <h1 className="text-center text-3xl md:text-6xl font-bold mb-4">
            Global Learning Platform
          </h1>
          <div className="flex md:py-5 flex-row items-center gap-x-7">
            <section className="text-center text-yellow-500 border-b border-cyan-500">
              <h1 className="text-2xl  md:text-4xl font-semibold">
                50&sbquo;000+
              </h1>
              <p className="text-sm md:text-xl font-semibold">Learners</p>
            </section>
            <section className="text-center text-yellow-500">
              <h1 className="text-2xl md:text-4xl font-semibold">500+</h1>
              <p className="text-sm md:text-xl font-semibold border-b border-cyan-500">
                Live Classes
              </p>
            </section>
            <section className="text-center text-yellow-500">
              <h1 className="text-2xl md:text-4xl font-semibold">85%</h1>
              <p className="text-sm md:text-xl border-b font-semibold border-cyan-500">
                Placement
              </p>
            </section>
          </div>
        </section>

        <img
          className="md:h-96 md:my-0 w-60 flex mx-auto md:w-1/2 object-contain"
          src="/About/books.png"
          alt="study"
        />
      </div>

      {/* Our team */}
      <div className="my-20  w-full">
        <h1 className="text-center text-3xl md:text-6xl my-10 font-bold text-cyan-500 ">
          Meet Our <a className="text-yellow-500">Leadership</a>
        </h1>
        <section className="md:flex md:mx-auto justify-center gap-x-10 space-y-10 md:space-y-0  px-10">
          <div className="bg-slate-800 py-10 rounded-xl w-full text-center">
            <img
              className="w-44 h-44 object-cover rounded-full mx-auto"
              src="/About/porva.jpg"
              alt="team_image"
            />
            <h1 className="text-2xl md:text-3xl mt-5 text-cyan-500 font-semibold">
              Poorva Shrivastava
            </h1>
            <h1 className="text-sm md:text-lg text-yellow-500">CEO & CO-FOUNDER</h1>
          </div>

          <div className="bg-slate-800 py-10 rounded-xl w-full text-center">
            <img
              className="w-44 h-44 object-cover rounded-full mx-auto"
              src="/About/rahul.png"
              alt=""
            />
            <h1 className="text-2xl md:text-3xl mt-5 font-semibold text-cyan-500">
              Rahul Munoth
            </h1>
            <h1 className="text-sm md:text-lg text-yellow-500">DIRECTOR</h1>
          </div>

          <div className="bg-slate-800 py-10 rounded-xl w-full text-center">
            <img
              className="w-44 h-44 object-cover rounded-full mx-auto"
              src="/About/neha.jpg"
              alt=""
            />
            <h1 className="text-2xl md:text-3xl mt-5 font-semibold text-cyan-500">
              Neha Kasireddy
            </h1>
            <h1 className="text-sm md:text-lg text-yellow-500">PROJECT CO-ORDINATOR</h1>
          </div>
        </section>
      </div>

      {/* vision and mission */}
      <div className="md:flex justify-between gap-x-10 md:mx-10 mx-5 space-y-5 mb-10 md:space-y-0">
        <section className="bg-slate-800 p-5 rounded-2xl">
          <h1 className="text-center text-3xl md:text-4xl mb-5 font-bold text-gray-100">
            iLearnings Vision
          </h1>
          <img
            className="rounded-lg w-full md:h-72 object-cover"
            src="/About/vision.jpg"
            alt="vision"
          />
          <p className="capitalize pt-10 text-gray-400 text-sm md:text-lg font-semibold">
            At ilearnings&sbquo; Our vision is to make high&ndash;qualitty
            education accessible to everyone&sbquo; regardless of their
            background or location. We strive to break down barriers to
            learnings and provide opportunities for personal and professional
            growth to learners globally
          </p>
        </section>

        <section className="bg-slate-800 p-5 rounded-2xl">
          <h1 className="text-center text-3xl md:text-4xl mb-5 font-bold text-gray-100">
            iLearnings Mission
          </h1>
          <img
            className="rounded-lg w-full md:h-72 object-cover"
            src="/About/mission.jpg"
            alt="vision"
          />
          <p className="capitalize pt-10 text-gray-400 text-sm md:text-lg font-semibold">
            our mission is to revolutionize the way people learn by offering a
            diverse range of affordable&sbquo; effective courses that cater to
            the nedds of the common person. We aim to provide a platform where
            learners can acuire new skills&sbquo; advance their careers and
            pursie their passion with confidence.
          </p>
        </section>
      </div>

      {/* global impact */}
      <img className="w-full" src="/About/global.jpg" alt="global_impact" />
      <h1 className="text-center border-b-2 md:px-5 pb-2 w-[90%] mx-auto text-xs md:text-3xl mb-5 italic text-yellow-500">
        In just one year&sbquo; iLearnings has expanded it&apos;s global reach&sbquo;
        gaining recognition for it&apos;s innovative and unique approach to online
        education.
      </h1>

      <div className="md:flex my-20 mx-3 md:mx-10 gap-x-10  md:space-y-0 space-y-5" >
        <section className="space-y-5 border-2 border-gray-600 rounded-lg p-5">
          <h1 className="flex items-center justify-center gap-x-2 text-2xl md:text-4xl font-bold text-cyan-500">
            <GoOrganization size={34} /> Founded in 2023
          </h1>
          <p className="text-yellow-500"> 
            iLearnings is a consulting and education services provider for Global
            companies. Us being practitioners in the data analytics and
            management space&sbquo; makes us a preferred choice as education
            partnersfor most of the organizations. We specialize in
            end&ndash;to&ndash; end data solutions from Implementation to
            development of reports/dashboards to enabling users through tool
            training and adoption.
          </p>
        </section>
        <section className="space-y-5 border-2 border-gray-600 rounded-lg p-5">
          <h1 className="flex items-center justify-center gap-x-2 text-2xl md:text-4xl font-bold text-cyan-500">
            <IoPeople size={34} /> 10-50 Employees
          </h1>
          <p className="text-yellow-500">
            With a dynamic team of employees&sbquo; our organization thrives on
            the diverse expertise and innovative thinking each member brings to
            the table. Our team consists of specialists from a variety of
            fields&sbquo; each contributing a unique perspective and skill set. This
            collaborative environment fosters creativity&sbquo; allowing us to tackle
            challenges with fresh ideas and solutions. Together&sbquo; we drive the
            success of every project&sbquo; ensuring continuous growth and delivering
            exceptional results that push the boundaries of what&apos;s possible. Our
            commitment to innovation and teamwork is the foundation of our
            expanding global presence and reputation for excellence.
          </p>
        </section>
      </div>
    </>
  );
};

export default Page;
