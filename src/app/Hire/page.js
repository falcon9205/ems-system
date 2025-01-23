"use client";
import React from "react";

import { IoIosPeople } from "react-icons/io";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useEffect } from "react";
import { useLogin } from "@/store/login";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
import { tags } from "@/store/course";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const opportunities = [
  {
    title: "E-books",
    color: "",
    image:
      "https://i.pinimg.com/736x/c3/cf/df/c3cfdff1aae19215ad9d16f41b98cc79.jpg",
    link: "https://live.ilearningscareer.com/s/pages/99store",
  },
  {
    title: "Interview Preparation",
    color: "",
    image:
      "https://i.pinimg.com/736x/2c/3c/3e/2c3c3e0839cfaf138d7801ede496d636.jpg",
    link: "https://live.ilearningscareer.com/s/pages/99store",
  },
  {
    title: "Recorded Courses",
    color: "",
    image:
      "https://i.pinimg.com/736x/98/fe/c2/98fec26f39b8ecf67df979bc150d36e5.jpg",
    link: "https://live.ilearningscareer.com/s/pages/99store",
  },
  {
    title: "Projects",
    color: "",
    image:
      "https://i.pinimg.com/736x/eb/4e/2c/eb4e2ccb8341b399de6856b4685fc9c9.jpg",
    link: "https://live.ilearningscareer.com/s/pages/99store",
  },
];
const Page = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const { identity, login } = useLogin((state) => ({
    identity: state.identity,
    login: state.login,
  }));

  const [profiles, setprofiles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [fulltimejobs, setfulltimeJobs] = useState([]);
  const [freelancejob, setfreelancejobs] = useState([]);
  const [referrals, setreferrals] = useState([]);

  const fetchProfiles = async () => {
    const res = await fetch(`/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Data coming from db:", data.dataCandidate);
    setprofiles(data.dataCandidate);
  };

  const fetchJobs = async () => {
    const res = await fetch(`/api/jobposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Data coming from jobs:", data.job_data);
    setJobs(data.job_data);
  };

  const { tagline, setTagline } = tags((state) => ({
    tagline: state.tagline,
    setTagline: state.setTagline,
  }));
  const router = useRouter();
  const [arrow, setArrow] = useState(<MdOutlineKeyboardArrowDown />);
  useEffect(() => {
    fetchProfiles();
    fetchJobs();
    if (openAccordion) setArrow(<MdOutlineKeyboardArrowUp />);
    else setArrow(<MdOutlineKeyboardArrowDown />);
  }, [openAccordion]);
  const toggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(null); // Close the accordion if it's already open
    } else {
      setOpenAccordion(index); // Open the clicked accordion
    }
  };

  useEffect(() => {
    const filteredJobs = jobs.filter(
      (job) => job.applylink && job.applylink !== null
    );
    setreferrals(filteredJobs);

    const filteredFulltime = jobs.filter((job) => job.jobType == "Full-time");
    setfulltimeJobs(filteredFulltime);

    const filteredFreelance = jobs.filter((job) => job.jobType == "Freelance");
    setfreelancejobs(filteredFreelance);

    console.log(fulltimejobs, freelancejob, referrals);
  }, [jobs]);

  const redirect = () => {
    if (identity === "recruiter") router.push("/job-post");
    else if (identity === "candidate") router.push("/jobs-portal");
    else if (identity === "trainer") router.push("/TrainerHub");
    else router.push("/Login");
  };

  const setTaglinerouter = (value) => {
    setTagline(value);
    console.log(login);

    if (login == "1") router.push("/referal-post");
    else router.push("/Login");
  };

  return (
    <>
      <div className="bg-gradient-to-b pb-10 from-slate-900 via-slate-900 to-slate-800">
        {/*  */}
        <section className="md:w-full space-y-1 h-full py-20 md:py-28 px-10 flex gap-y-5 flex-col justify-center text-white items-center text-center">
          <h1 className="text-2xl md:text-6xl  font-semibold">
            Connect&sbquo; Collaborate&sbquo; and Grow with
            <a className="text-yellow-500"> iKonnect</a>
          </h1>
          <p className="text-xs md:text-xl font-semibold s  md:w-[40rem]">
            Your one &ndash; stop platform for employers&sbquo; trainers&sbquo;
            and job seekers to come together&sbquo; share opportunities&sbquo;
            and foster growth.
          </p>
          <button
            onClick={() => redirect()}
            className=" text-white px-2 py-2 text-sm md:text-lg bg-slate-700 hover:bg-slate-600 rounded-md border border-black"
          >
            Explore Opportunities
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:mx-10 ">
          <div
            onClick={() => setTaglinerouter(2)}
            className="w-[90%] md:w-[80%] flex-row mx-auto border border-gray-700 bg-white px-10 py-4 md:px-10 rounded-lg"
          >
            {" "}
            <h1 className="text-xl md:text-3xl text-gray-900 py-5 font-semibold text-center">
              <IoIosPeople className="text-center text-5xl md:text-6xl flex mx-auto" />
              I want to post vacancy
            </h1>
          </div>

          <div
            onClick={() => setTaglinerouter(1)}
            className="w-[90%] cursor-pointer md:w-[80%] flex-row mx-auto border border-gray-700 bg-white px-10 py-4 md:px-10 rounded-lg"
          >
            {" "}
            <h1 className="text-xl md:text-3xl py-5 text-gray-900 font-semibold text-center">
              <FaPeopleRoof className="text-center text-5xl  md:text-6xl flex mx-auto" />
              I want to apply for jobs
            </h1>
          </div>
          <div
            onClick={() => setTaglinerouter(2)}
            className="w-[90%] cursor-pointer md:w-[80%] flex-row mx-auto border border-gray-700 bg-white px-10 py-4 md:px-10 rounded-lg"
          >
            {" "}
            <h1 className="text-xl md:text-3xl py-5 text-gray-900 font-semibold text-center">
              <FaHandsHelping className="text-center text-5xl  md:text-6xl flex mx-auto" />
              Post Referral jobs
            </h1>
          </div>
        </section>

        <section className="mt-32">
          <h1 className="text-white text-center md:text-5xl bg-slate-700 w-[95%] mx-auto rounded-t-full py-2">
            <a className="text-yellow-500 font-bold">iKonnect </a>: Find your
            ideal career match!
          </h1>
          <Marquee
            pauseOnHover="false"
            direction="right"
            speed={30}
            className="bg-slate-700 py-5"
          >
            {profiles.map((item, index) => (
              <div
                key={index}
                className="bg-slate-600 border border-gray-600 text-black rounded-md mx-2 text-center pb-4 space-y-4 flex flex-col items-center"
              >
                <div className="m-3 w-28 h-32 md:w-44 md:h-60 relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.fullname}
                    layout="fill" // Makes the image fill its parent container
                    objectFit="cover" // Ensures the image maintains its aspect ratio
                    className="rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-white">{item.fullname}</p>
                  <p className="text-xs text-gray-300">
                    Exp: {item.experience}
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </section>

        <section className="mt-32">
          <h1 className="text-white text-center md:text-5xl bg-slate-700 w-[95%] mx-auto rounded-t-full py-2">
            Full Time:{" "}
            <a className="text-yellow-500 font-bold">iKonnect Jobs </a>
          </h1>
          <Marquee
            pauseOnHover="false"
            direction="right"
            speed={30}
            className="bg-slate-700 py-5"
          >
            {fulltimejobs.map((item, index) => (
              <Link href="/jobs-portal">
                <div
                  key={index}
                  className="bg-slate-600 border border-gray-500 text-black rounded-md mx-2 text-center p-2  flex flex-col items-center space-y-2"
                >
                  {/* <h1 className="bg-slate-500 px-2 text-sm rounded-md text-white">{item.jobType}</h1> */}
                  <h1 className="text-cyan-500  md:text-2xl font-bold">
                    {item.job_title}
                  </h1>
                  <p className="flex items-center gap-x-1 text-gray-400 bg-slate-700 rounded-full border-2 border-yellow-500 px-2 md:text-lg">
                    <FaBuildingCircleCheck />
                    {item.company_name}
                  </p>
                  <p className="flex items-center gap-x-1 text-gray-300 md:text-sm">
                    <IoLocationOutline />
                    {item.location}
                  </p>
                  <p className=" text-gray-300 text-sm">
                    Experience : {item.experience}+ Years
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>
        </section>

        <section className="mt-32">
          <h1 className="text-white text-center md:text-5xl bg-slate-700 w-[95%] mx-auto rounded-t-full py-2">
            Freelance:{" "}
            <a className="text-yellow-500 font-bold">iKonnect Jobs </a>
          </h1>
          <Marquee
            pauseOnHover="false"
            direction="right"
            speed={30}
            className="bg-slate-700 py-5"
          >
            {freelancejob.map((item, index) => (
              <Link href="/jobs-portal">
                <div
                  key={index}
                  className="bg-slate-600 border border-gray-500 text-black rounded-md mx-2 text-center p-2  flex flex-col items-center space-y-2"
                >
                  {/* <h1 className="bg-slate-500 px-2 text-sm rounded-md text-white">{item.jobType}</h1> */}
                  <h1 className="text-cyan-500  md:text-2xl font-bold">
                    {item.job_title}
                  </h1>
                  <p className="flex items-center gap-x-1 text-gray-400 bg-slate-700 rounded-full border-2 border-yellow-500 px-2 md:text-lg">
                    <FaBuildingCircleCheck />
                    {item.company_name}
                  </p>
                  <p className="flex items-center gap-x-1 text-gray-300 md:text-sm">
                    <IoLocationOutline />
                    {item.location}
                  </p>
                  <p className=" text-gray-300 text-sm">
                    Experience : {item.experience}+ Years
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>
        </section>

        <section className="mt-32">
          <h1 className="text-white text-center md:text-5xl bg-slate-700 w-[95%] mx-auto rounded-t-full py-2">
            Referral:{" "}
            <a className="text-yellow-500 font-bold">iKonnect Jobs </a>
          </h1>
          <Marquee
            pauseOnHover="false"
            direction="right"
            speed={30}
            className="bg-slate-700 py-5"
          >
            {referrals.map((item, index) => (
              <Link href="/jobs-portal">
                {" "}
                <div
                  key={index}
                  className="bg-slate-600 border border-gray-500 text-black rounded-md mx-2 text-center p-2  flex flex-col items-center space-y-2"
                >
                  {/* <h1 className="bg-slate-500 px-2 text-sm rounded-md text-white">{item.jobType}</h1> */}
                  <h1 className="text-cyan-500  md:text-2xl font-bold">
                    {item.job_title}
                  </h1>
                  <p className="flex items-center gap-x-1 text-gray-400 bg-slate-700 rounded-full border-2 border-yellow-500 px-2 md:text-lg">
                    <FaBuildingCircleCheck />
                    {item.company_name}
                  </p>
                  <p className="flex items-center gap-x-1 text-gray-300 md:text-sm">
                    <IoLocationOutline />
                    {item.location}
                  </p>
                  <p className=" text-gray-300 text-sm">
                    Experience : {item.experience}+ Years
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>
        </section>

        <section className="mt-32 mx-2 md:mx-5">
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1">
            Pick an <span className="text-yellow-400">Opportunity</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opportunity) => (
              <Link
                key={opportunity.title}
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="rounded-lg shadow-md overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 group-hover:shadow-xl transition-transform transform group-hover:scale-105">
                  <div
                    className={`h-48 relative ${opportunity.color} flex items-center justify-center rounded-t-lg`}
                  >
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-35"
                    />
                    <h3 className="text-2xl font-bold text-center text-white z-10">
                      {opportunity.title}
                    </h3>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 mx-5 ">
          <h1 className="text-xl md:text-7xl text-center mt-20 mb-5  md:mb-10  text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-1">
            Why Choose<a className="text-yellow-400"> iKonnect?</a>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6  bg-slate-700 border border-gray-600 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Comprehensive Opportunities
              </h3>
              <p className="text-gray-400">
                Access a wide range of full time, freelancing and internship
                opportunities tailored to diverse skills and industries.
              </p>
            </div>

            <div className="p-6  bg-slate-700 border border-gray-600 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">
                User &ndash; Friendly Platform
              </h3>
              <p className="text-gray-400">
                Navigate easily through a well-designed portal and save time
                with features like filters, recommendations, and direct
                applications.
              </p>
            </div>

            <div className="p-6  bg-slate-700 border border-gray-600 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Mission &ndash; Driven Initiative
              </h3>
              <p className="text-gray-400">
                Join a platform dedicated to empowering 1,000,000 candidates by
                2025.
              </p>
            </div>

            <div className="p-6  bg-slate-700 border border-gray-600 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Support and Feedback &ndash; Oriented
              </h3>
              <p className="text-gray-400">
                Get continuous support and guidance to help you achieve your
                career goals.
              </p>
            </div>
          </div>
        </section>

       <Link href="/refer-link"> <button className="flex mx-auto text-white bg-slate-600 rounded-md px-3 py-1 md:text-xl hover:bg-slate-700">Refer & Earn</button></Link>
      </div>
    </>
  );
};

export default Page;
