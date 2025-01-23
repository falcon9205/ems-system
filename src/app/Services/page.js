"use client";
import React, { useState } from "react";

import "./services.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiArrowCircleUpRightFill } from "react-icons/pi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

const imageSources = [
  "/Home/companies/1.jpg",
  "/Home/companies/2.jpg",
  "/Home/companies/3.jpg",
  "/Home/companies/4.jpg",
  "/Home/companies/5.jpg",
  "/Home/companies/6.jpg",
  "/Home/companies/7.jpg",
  "/Home/companies/8.jpg",
  "/Home/companies/9.jpg",
  "/Home/companies/10.jpg",
  "/Home/companies/11.jpg",
  "/Home/companies/12.jpg",
  "/Home/companies/13.jpg",
  "/Home/companies/14.jpg",
  "/Home/companies/15.jpg",
  "/Home/companies/16.jpg",
  "/Home/companies/17.jpg",
  "/Home/companies/18.jpg",
  "/Home/companies/19.jpg",
  "/Home/companies/20.jpg",
  "/Home/companies/21.jpg",
  "/Home/companies/22.jpg",
  "/Home/companies/23.jpg",
];
const profiles = [
  {
    imageUrl: "/Services/22.png",
    position: "IT Analyst at TCS",
    description:
      "I am really happy to be part of the learnings channel, I highly recommend this channel especially for Salesforce aspirants and the way she (Poorva) interacted with the aspirations & explained the things very well and cleared & I recommend to all, the resume template that which were provided by ilearnings is some amazing & useful.",
  },
  {
    imageUrl: "/Services/26.jpeg",
    position: "1x Salesforce Certified",
    description:
      "I had the privilege of being mentored by Poorva Shrivastav during a transformative 3-day Salesforce workshop, which also included a hands-on live project. her depth of knowledge, passion for Salesforce, and dedication to our learning experience were truly commendable. Her ability to simplify complex concepts, coupled with the practical insights from the live project, made the workshop incredibly valuable.",
  },
  {
    imageUrl: "/Services/19.png",

    position: "Salesforce",
    description:
      "I had the pleasure of being mentored by poorva recently.Her expertise and guidance in salesforce ecosystem were instrumental in my professional growth. poorva ma'am provided valuable insights, pushed me to expand my skills, and always made time to offer support and advice.",
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E03AQG8dcwBGi6-gg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1714324033850?e=1730332800&v=beta&t=1PssFv8mJUr9GIEhA2UjmxdWGyNiBfrgZRAZijOcHVc",
    position: "Salesforce Developer & Trainer",
    description:
      "I had the pleasure of being part of the Premium Project session hosted by Poorva Srivastav, and I can confidently say she is an outstanding instructor. As a Salesforce Developer and Trainer at Groviya, I am meticulous about the quality of education, and Poorva exceeded my expectations.",
  },

  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQH7lj7GeMHDzg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1667814070631?e=1730332800&v=beta&t=rld2MLgSPzBgR0RBs5fCq0WVSKQ9keOZUd2xoE8H430",
    position: "Salesforce Administrator",
    description:
      "If you are looking for someone who can help you reach your full potential in the Salesforce field, Poorva is that person. She has played an integral role in helping me develop my skills in this industry. She positively influenced my career trajectory and help me build confidence in this field.Poorva is an excellent mentor and will guide you through tough career decisions. She will always be an active participant regarding any opportunies coming your way.",
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E03AQF8Wc1vhe8YsQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1677347470278?e=1730332800&v=beta&t=dNFNSq_Wvfd54dMKmpdSufLDKdMACxqwp9w3IrdNIpM",
    position: "Data Analyst",
    description:
      "Thank you for help. Excellent communication and teaching style. I liked the problem solving in the sessions. I learnt a lot in last one month of training",
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQH5sDW935e7Gg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1672047123051?e=1730332800&v=beta&t=7Goe3fFGTb2NtzBaeSKOzynQA3elGY-9zymojurrbeg",
    position: "Practising Business Analysis",
    description:
      "This is a very personal recommendation to me as changing the domain learning new technology is also difficult if you don’t have a good mentor. In my case i have learned salesforce from Poorva Shrivastava and i can say she is the best trainer indeed! She inspires so many people and i am one of the inspired students of her.",
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C5103AQH6EfudmTtBVg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1571664646119?e=1730332800&v=beta&t=lB_gPMuKIIqGzM5G2kuFQPUsrGjjruydpGJ2N4Osa-Q",
    position: "Salesforce Admin ",
    description:
      "I learned salesforce from Poorva. She is just an awesome trainer very friendly she knows the best technique to teach her way of teaching is very helpful if you are looking for job-oriented training. Poorva thinks very logically and explains things very intuitively, the whole class was very engaged in her class throughout all the sessions.",
  },
  {
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D5603AQG_Ze1m19NNow/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721934970146?e=1730332800&v=beta&t=c9B2igfoGKiEavATtj5hrAY_EVcCyc2IChxICuVqkvw",
    position: "Senior Sales Operations Analyst",
    description:
      "I heartily recommend Poorva, She is a leader with great attitude, dedication and amazing potential, She is always motivated well respected throughout the organization and she is able to bring the best out of her staff and personally I can say that she played an important positive role on my work career.",
  },
];
export default function Page() {
  const [activeTab, setActiveTab] = useState("corporate-training");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="p-6 mt-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="services h-[10rem] md:h-96 mb-5 md:mb-10">
        <h1 className="text-2xl md:text-7xl md:pt-20 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          Empower Your Future with Our Services
        </h1>
        <p className="text-muted-foreground mb-6 text-center text-xs md:text-xl md:py-3 md:mx-44 text-yellow-500">
          From corporate training to cutting&ndash;edge tech skills&sbquo;
          we&apos;ve got your learning journey covered.
        </p>
      </div>

      {/* our services */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 justify-center px-3 md:px-6 bg-slate-800 py-6 rounded-lg space-x-2 mb-6 text-sm md:text-lg">
        {/* Corporate Training Section */}
        <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">
            Corporate Training
          </h3>
          <p className="text-xs text-gray-300">
            Equip your employees with industry&ndash;relevant skills to drive
            business growth. Our corporate training programs are tailored to
            meet specific organizational goals&sbquo; ensuring maximum impact
            and productivity.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div>

        {/* Campus to Corporate Training Section */}
        <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">
            Campus to Corporate Training
          </h3>
          <p className="text-xs text-gray-300">
          Prepare fresh graduates for professional success. Our programs bridge the gap between academic knowledge and corporate expectations&sbquo; fostering skills in communication&sbquo; teamwork&sbquo; and adaptability.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div>

        {/* Soft Skills & Technical Training Section */}
        <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">
            Soft Skills & Technical Training
          </h3>
          <p className="text-xs text-gray-300">
          Develop essential interpersonal and technical skills to succeed in a competitive environment. Our training enhances problem&ndash;solving&sbquo; communication&sbquo; and technical expertise for all career levels.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div>

        {/* Online Courses Section */}
        {/* <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">Online Courses</h3>
          <p className="text-xs text-gray-300">
          Learn anytime&sbquo; anywhere with our diverse range of online courses. Designed for self&ndash;paced learning&sbquo; these courses cover various domains to help you grow professionally and personally.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div> */}

        {/* CRM Implementation Section */}
        <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">
            CRM Implementation
          </h3>
          <p className="text-xs text-gray-300">
          Optimize customer relationships with our expert CRM solutions. From seamless integration to customization&sbquo; we ensure your business benefits from enhanced communication and data&ndash;driven decision&ndash;making.
          </p>
          <Link href="/crm">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div>

        {/* Educational Programs Section */}
        {/* <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">
            Educational Programs
          </h3>
          <p className="text-xs text-gray-300">
          Empower students with our innovative educational programs. We focus on delivering hands-on learning experiences and practical knowledge to create future&ndash;ready professionals.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div> */}

        {/* Tech Events Section */}
        <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">Tech Events</h3>
          <p className="text-xs text-gray-300">
          Stay ahead in technology with our dynamic tech events. These events showcase the latest innovations, connect you with industry leaders&ndash; and inspire new ideas for growth.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div>

        {/* Training Section */}
        <div className="bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-600">
          <h3 className="text-lg font-bold text-cyan-500">Training</h3>
          <p className="text-xs text-gray-300">
          Advance your career with our structured training programs. From foundational skills to advanced techniques&sbquo; we provide comprehensive resources to excel in your field.
          </p>
          <Link href="">
            <button className="mt-2 px-2 py-1 text-[15px] md:text-sm text-white bg-slate-900 hover:text-cyan-500 rounded-md border border-black flex items-center gap-x-2">
              Learn More
              <PiArrowCircleUpRightFill />
            </button>
          </Link>
        </div>
      </div>

      {/* what our client say */}
      <div className=" md:w-2/3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl my-10 mx-auto">
        <h1 className="text-lg text-center md:text-5xl font-bold  py-3 text-slate-100">
          What Our Clients Say
        </h1>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper my-10"
        >
          {profiles.map((profile, index) => (
            <SwiperSlide key={index}>
              <div className="w-[80%] sm:w-2/3 md:w-2/3 mx-auto capitalize">
                <section className="flex items-center gap-x-3">
                  <img
                    className="rounded-full object-contain h-20 w-20"
                    src={profile.imageUrl}
                    alt="linkedin_profile"
                  />
                  <h1>{profile.position}</h1>
                </section>
                <p className="text-gray-800 my-3 text-xs md:text-sm font-bold">
                  {profile.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className="text-xs md:text-2xl text-center italic text-yellow-500 leading-6 md:leading-10">
        At iLearnings&sbquo; we are committed to empowering individuals and
        organizations with the skills and knowledge needed to thrive in
        today&apos;s competitive environment. Our diverse range of services is
        designed to cater to students&sbquo; professionals&sbquo; and
        companies&sbquo; helping them achieve their full potential. Discover how
        we can support your learning and growth journey.
      </p>

      <div className="my-10 md:w-2/3 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl space-y-4">
        <h1 className="text-lg text-center md:text-5xl font-bold text-white py-3">
          Why Choose iLearnings
        </h1>
        <p className="text-black font-bold md;text-lg mx-2 md:mx-20 pb-5">
          At iLearnings&sbquo; we are deeply committed to excellence and driven
          by a passion for education. We believe that learning should go beyond
          the traditional classroom experience and become a transformative
          journey that empowers individuals and organizations alike. As more
          than just a training provider&sbquo; we see ourselves as true partners
          in your personal and professional growth. Our mission is to help you
          unlock your potential and reach new heights in your career and
          personal development.
        </p>
      </div>

      <div
        className={`w-[100%] h-full bg-yellow-500 mx-auto my-10 md:my-20  rounded-3xl bg-cover bg-center px-2 py-5   font-bold`}
      >
        <h1
          className={`text-black  capitalize text-center text-2xl md:text-7xl`}
        >
          Companies who hire from us
        </h1>
        <div className="grid grid-cols-4 md:grid-cols-5 w-full md:w-2/3 mx-auto gap-x-4 gap-y-4 pt-5 md:pt-10">
          {imageSources.map((src, index) => (
            <img
              key={index}
              src={src}
              className="w-full h-10 md:h-20 rounded-lg object-fill"
              alt="featured"
            />
          ))}
        </div>
      </div>

      <h1 className="text-2xl md:text-7xl py-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
        Ready to elevate your skills or empower your organization?
      </h1>
      <button className="px-5 py-3 text-[13px] md:text-lg text-white bg-slate-700 hover:bg-slate-600 rounded-md border border-gray-500 flex mx-auto">
        <Link href="/Contact">Contact Us</Link>
      </button>
    </div>
  );
}
