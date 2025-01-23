import { Quicksand } from "next/font/google";
import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { MdLocationPin } from "react-icons/md";
import IO from "@/app/io/page.js";
import "./Home.css";
import Marquee from "react-fast-marquee";
import { IoMdStar } from "react-icons/io";
import dynamic from "next/dynamic";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card/card.js";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import Timer from "../Countdown/timer";
// import required modules
import {
  Autoplay,
  Mousewheel,
  Pagination,
  EffectCards,
  Navigation,
} from "swiper/modules";
import Link from "next/link";
import VideoModal from "../VideoModal/video";

const imageSources = [
  "./Home/companies/1.jpg",
  "./Home/companies/2.jpg",
  "./Home/companies/3.jpg",
  "./Home/companies/4.jpg",
  "./Home/companies/5.jpg",
  "./Home/companies/6.jpg",
  "./Home/companies/7.jpg",
  "./Home/companies/8.jpg",
  "./Home/companies/9.jpg",
  "./Home/companies/10.jpg",
  "./Home/companies/11.jpg",
  "./Home/companies/12.jpg",
  "./Home/companies/13.jpg",
  "./Home/companies/14.jpg",
  "./Home/companies/15.jpg",
  "./Home/companies/16.jpg",
  "./Home/companies/17.jpg",
  "./Home/companies/18.jpg",
  "./Home/companies/19.jpg",
  "./Home/companies/20.jpg",
  "./Home/companies/21.jpg",
  "./Home/companies/22.jpg",
  "./Home/companies/23.jpg",
];

const imageCollab = [
  "./Home/collaborations/1.jpg",
  "./Home/collaborations/2.jpg",
  "./Home/collaborations/3.jpg",
  "./Home/collaborations/4.jpg",
  "./Home/collaborations/5.jpg",
  "./Home/collaborations/6.jpg",
  "./Home/collaborations/7.jpg",
  "./Home/collaborations/8.jpg",
  "./Home/collaborations/9.jpg",
  "./Home/collaborations/10.jpg",
  "./Home/collaborations/11.jpg",
  "./Home/collaborations/12.jpg",
  "./Home/collaborations/13.jpg",
  "./Home/collaborations/14.jpg",
  "./Home/collaborations/15.jpg",
  "./Home/collaborations/16.jpg",
  "./Home/collaborations/17.jpg",
];

const imageProfile1 = [
  "./Home/profiles/1.png",
  "./Home/profiles/2.png",
  "./Home/profiles/3.png",
  "./Home/profiles/4.png",
  "./Home/profiles/5.png",
  "./Home/profiles/6.png",
  "./Home/profiles/7.png",
  "./Home/profiles/8.png",
  "./Home/profiles/9.png",
  "./Home/profiles/10.png",
  "./Home/profiles/11.png",
  "./Home/profiles/12.png",
  "./Home/profiles/13.png",
  "./Home/profiles/14.png",
  "./Home/profiles/15.png",
  "./Home/profiles/16.png",
  "./Home/profiles/17.png",
  "./Home/profiles/18.png",
  "./Home/profiles/19.png",
  "./Home/profiles/20.png",
];

const imageProfile2 = [
  "./Home/profiles/21.png",
  "./Home/profiles/22.png",
  "./Home/profiles/23.png",
  "./Home/profiles/24.png",
  "./Home/profiles/25.png",
  "./Home/profiles/26.png",
  "./Home/profiles/27.png",
  "./Home/profiles/28.png",
  "./Home/profiles/29.png",
  "./Home/profiles/30.png",
  "./Home/profiles/31.png",
  "./Home/profiles/32.png",
  "./Home/profiles/33.png",
  "./Home/profiles/34.png",
  "./Home/profiles/35.png",
  "./Home/profiles/36.png",
  "./Home/profiles/37.png",
  "./Home/profiles/38.png",
  "./Home/profiles/39.png",
];

const testimonials = [
  {
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjX_CL9UO8GR86buWGUXknIYBlvZZDA42WSX60uCsQrd8pvefo2J=w90-h90-p-rp-mo-br100",
    rating: 5,
    review:
      "Amazing workplace! All staff members are always supportive, great work culture, Love to work here Best company to start–up carrier.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjUjijDUNSw38ASffNTMnf5kuJ9XOzO9YE3Uo4yDmanWQSRkaF3wkA=w90-h90-p-rp-mo-br100",
    rating: 5,
    review:
      "You name the course and they have it. One of the best companies in India. Highly recommended for learning and development.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjV2suE4n2CWUbDhyt2lCdMiBYUkbwBJpssvRAOIidbhMK3U5CYA=w90-h90-p-rp-mo-br100",
    rating: 5,
    review:
      "It's the best place to learn new technologies as well as understand a new environment, such as how the industry works.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjVB7Oatm7C43-c3jf4hoxt1xxy1qp_k3HSlWfx70E5Ym0fcbwXc=w90-h90-p-rp-mo-br100",
    rating: 5,
    review:
      "I attend Internship induction call and it was very professional and informative and I experienced lots of activities and it was very amazing.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjXDXCaqFLLkKcJ4U7ZLer3MssfWV-A0Q2MH9FD4XAdDViwQdyc=w90-h90-p-rp-mo-br100",
    rating: 5,
    review: "Well.... We need more workshops like this to improve our skills.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjU0aRX8oXc4m0B7ZycdAYGvp-Dunf2EA7Er9kUUiIuW6puTGU6gCQ=w90-h90-p-rp-mo-br100",
    rating: 5,
    review: "Most Refined and Valuable Coaching Institute.",
  },
];

const title1 = "Advanced Resume Template";
const Paragraph1 =
  "We provide you with advanced resume templates designed to help you stand out in today's competitive job market. Our templates feature modern layouts & achievements.";
const Link1 =
  "https://live.ilearningscareer.com/courses/Resume-Building-for-Salesforce-65fd6e3b99023900f9ef8528";
const title2 = "Course Library";
const Paragraph2 =
  "we believe in empowering learners with high-quality, engaging, and industry-relevant courses designed to elevate your career. Whether you're a beginner looking to acquire new skills or a professional aiming to stay ahead in your field.";
const Link2 = "https://live.ilearningscareer.com/s/store";
const title3 = "Linkedin Profile Enhancement";
const Paragraph3 =
  "LinkedIn profile enhancement services are designed to optimize your online professional presence, making your profile more attractive to recruiters, employers, and business connections.";
const Link3 =
  "https://live.ilearningscareer.com/courses/LinkedIn-Optimisation-for-Salesforce--65fd705e36822368f4753951";

const Urls_ids = [
  "8c_b4sdVj7M",
  "jLFAQZunnpI",
  "INZ_MZRLbco",
  "HJEbu8A9YiI",
  "7TSlXoT8nZw",

  "PXcqCsbAT8I",
  "UUv81grgd9w",
  "tOKEsd77Ilc",
  "jLFAQZunnpI",
];

const images = [
  "/Events/1.jpg",
  
  "/Events/3.jpg",
  "/Events/4.jpg",
  "/Events/5.jpg",
  
  
  "/Events/8.jpg",
  "/Events/9.jpg",
  "/Events/10.jpg",
  "/Events/11.jpg",
  "/Events/12.jpg",
  "/Home/corousel/1.jpg",
  "/Home/corousel/2.jpg",
  "/Home/corousel/3.jpg",
  "/Home/corousel/4.jpg",

  "/Home/corousel/6.jpg",
 
];

const trainers = [
  {
    name: "Ankur Shrivastava",
    experience: "11+ Years of Experience in Salesforce Business Analyst",
    imageSrc: "./Home/Trainer/ankur.jpg", // Example image path
  },
  {
    name: "Darshan",
    experience: "5+ Years of Experience in Data Science",
    imageSrc: "./Home/Trainer/darshan.png",
  },
  {
    name: "Poorva Shrivastava",
    experience: "15+ Years of Experience in IT Professionals",
    imageSrc: "./Home/Trainer/porva.png",
  },
  {
    name: "Khyati Jasani",
    experience:
      "8+ Years of Experience in Soft Skills Trainer & Personal Development",
    imageSrc: "./Home/Trainer/khyati.jpg",
  },
  {
    name: "Neeraj Vaid",
    experience: "Social Symphony‚ Creator & Public",
    imageSrc: "./Home/Trainer/neeraj_vaid.jpg", // Example image path
  },
  {
    name: "Saumya Singh",
    experience: "Linkedin Top Voice ' 24‚ Software Engineer ",
    imageSrc: "./Home/Trainer/soumya.png",
  },
  {
    name: "Alex Zyablov",
    experience: "Experience in 3D development‚ Animation & Web Design",
    imageSrc: "./Home/Trainer/alex.png",
  },
  {
    name: "Simran Khatri",
    experience: "Experienced as a publicist‚ helping multiple brands",
    imageSrc: "./Home/Trainer/simran.png",
  },
  {
    name: "Jigyasu Agarwal",
    experience: "Political strategist‚ Co founder ‚ Rebounce",
    imageSrc: "./Home/Trainer/jigyasu.png",
  },
  // Add more trainers as needed
];

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState("");
  const openModal = (value) => {
    setModalOpen(true);
    if (value == 0)
      setData("https://www.youtube.com/embed/8c_b4sdVj7M?si=xWpWZI5Kak6wumJC");
    if (value == 1)
      setData("https://www.youtube.com/embed/jLFAQZunnpI?si=xUCR_Hk6fFxyALTk");
    if (value == 2)
      setData("https://www.youtube.com/embed/INZ_MZRLbco?si=bs1dbHlUH2lIvu2H");
    if (value == 3)
      setData("https://www.youtube.com/embed/HJEbu8A9YiI?si=bLBMerI5ELpdfC-l");
    if (value == 4)
      setData("https://www.youtube.com/embed/7TSlXoT8nZw?si=SzeBvpEGSSM98Uvk");
    if (value == 5)
      setData("https://www.youtube.com/embed/PXcqCsbAT8I?si=0mpvhBBrbSK0vggy");
    if (value == 6)
      setData("https://www.youtube.com/embed/UUv81grgd9w?si=qmADKHYmiDOMm4_d");
    if (value == 7)
      setData("https://www.youtube.com/embed/tOKEsd77Ilc?si=7SXpDcbGJZ5Ig2px");
    if (value == 8)
      setData("https://www.youtube.com/embed/jLFAQZunnpI?si=qLK93SJoVr2Ql_RS");
  };
  const closeModal = () => setModalOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const [submitbutton, setSubmitButton] = useState("Submit");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, course: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // User data for TeleCRM
    const user = {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      message: formData.message,
    };

    try {
      setSubmitButton("Sending...");

      // Call your custom TeleCRM API endpoint
      const apiResponse = await fetch("/api/telecrm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Use the 'user' object here
      });

      // Check if the response is ok (status in the range 200-299)
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      // Optionally, you can use toast for a better notification
      toast.success("We'll get back to you soon!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
      });

      // Reset form and close popup after successful submission
      setIsOpen(false);
      setSubmitButton("Send");
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        message: "",
        course: "",
      });
    } catch (error) {
      toast.success("Error saving your data!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide,
      });
      setSubmitButton("Send");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className=" bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-[99%] mt-20 rounded-md"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className=" object-contain "
                src={image}
                alt={`slide_image_${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <IO />
     
     {/* Marquee Section */}
     <div className=" mt-20 md:flex w-full bg-slate-800">
        <section className="p-3  text-center md:w-[15%]">
          <h1 className="text-lg text-white">Industry Veterans</h1>
          <h1 className="text-2xl text-cyan-500 font-bold">Trust Us</h1>
        </section>
        <section className="md:w-[85%]">
          <Marquee pauseOnHover={false} direction="right" speed={40}>
            <div className="flex mx-5 gap-x-4 pt-5 pb-5">
              {imageSources.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className={`md:w-36 md:h-20 w-28 h-16  rounded-lg  object-fill ${
                    index == 0 ? "md:ml-3 ml-1" : ""
                  }`}
                  alt="featured"
                />
              ))}
            </div>
          </Marquee>
        </section>
      </div>
        

        {/* we make your career opportunities easier Banner */}
        <Marquee pauseOnHover="false" direction="left" speed={120}>
          <h1
            className={`text-2xl font-sans md:text-7xl capitalize mt-10 py-5  font-bold text-white`}
          >
            We-make-your-Career-Opportunities-easier-{" "}
          </h1>
        </Marquee>

        {/* Three cards Advanced resume Template, post course support, Linkedin Profile Enhancement */}
        <div
          className={`grid md:grid-cols-3 gap-y-5  justify-center items-center mx-auto mb-10 mt-10 md:mb-20 max-w-5xl `}
        >
          <Card title1={title1} description1={Paragraph1} link={Link1} />
          <Card title1={title2} description1={Paragraph2} link={Link2} />
          <Card title1={title3} description1={Paragraph3} link={Link3} />
        </div>

        {/* About iLearnings */}
        <div className="md:flex border-y-2 border-gray-400 md:border-none md:w-[99%] mx-auto py-10 rounded-xl">
          <section className="md:w-1/2">
            <h1 className="font-bold text-2xl md:text-4xl leading-tight text-yellow-500 text-center flex justify-center mx-auto items-center">
              About iLearnings
            </h1>

            <p
              className={`text-left  mx-2 md:px-5 text-sm text-gray-300 md:text-lg py-5 font-semibold`}
            >
              At iLearnings&sbquo; we are committed to transforming the way
              people learn and grow in their careers. Founded by Poorva
              Shrivastava&sbquo; we are a government&ndash;recognized edtech
              organization registered under the Startup India initiative. With a
              mission to empower individuals with the skills needed to excel in
              today&apos;s competitive job market&sbquo; we have trained over
              50&sbquo;000 students across 10+ countries and collaborated with
              leading educational institutions and organizations worldwide.
              Recognized as the &ldquo;Leading E&ndash;Learning Platform of the
              Year&rdquo; in Dubai
            </p>
            <button className="px-6 py-3 text-lg font-medium text-white border border-slate-800 rounded-md bg-slate-800 mx-auto flex my-10 md:my-0 ">
              <Link href="/About">Know More</Link>
            </button>
          </section>
          <Swiper
            effect={"cards"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            // navigation={true}
            modules={[Autoplay, EffectCards]}
            className="mySwiper w-44 md:w-96"
          >
            <SwiperSlide>
              <img
                className="bg-gray-400 border-8 border-gray-700"
                src="./Home/iLearnings/1.png"
                alt="achievement"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="bg-gray-500 border-8 border-gray-700"
                src="./Home/iLearnings/4.png"
                alt="achievement"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="bg-yellow-400 border-8 border-gray-700"
                src="./Home/iLearnings/2.png"
                alt="achievement"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="bg-gray-400 border-8 border-gray-700"
                src="./Home/iLearnings/3.jpg"
                alt="achievement"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* our collaboration & partners*/}
        {/* <h1 className="text-white font-bold bg-slate-700 md:rounded-t-3xl pt-10 md:pt-5 mt-10 md:pb-5 capitalize text-center text-2xl md:text-7xl">
          Our collaborations & partners
        </h1>
        <Marquee
          pauseOnHover="false"
          direction="left"
          speed={120}
          className=" bg-slate-700  md:rounded-b-3xl"
        >
          <div className="flex w-full mx-5 gap-x-4 pt-5 pb-5">
            {imageCollab.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`md:w-full w-28 h-16 md:h-36 rounded-lg  object-fill ${
                  index == 0 ? "md:ml-3 ml-1" : ""
                }`}
                alt="featured"
              />
            ))}
          </div>
        </Marquee> */}

        {/* Youtube content corousel */}
        <div className="my-32">
          <Swiper
            slidesPerView={2} // Default: 2 slides per view
            slidesPerGroup={2} // Default: Move 2 slides on each change
            spaceBetween={7} // Default: Space between slides
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                // For very small screens, show 1 slide per view
                slidesPerView: 1,
                slidesPerGroup: 1, // Move 1 slide on each change
                spaceBetween: 10,
              },
              480: {
                // For screens >= 480px, show 2 slides per view
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 10,
              },
              768: {
                // For screens >= 768px (tablets), show 3 slides per view
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
              },
              1024: {
                // For screens >= 1024px (laptops), show 4 slides per view
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 40,
              },
              1440: {
                // For large screens >= 1440px, show 4 slides per view
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {Urls_ids.map((id, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <img
                    onClick={() => openModal(id)}
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    alt="thumbnail_youtube"
                    className="w-full h-auto"
                  />
                  {/* Play button overlay */}
                  <div
                    className="absolute inset-0 flex justify-center items-center cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white bg-black bg-opacity-50 rounded-full"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Learn from the best */}
        <h1 className=" text-3xl md:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ">
          Our{" "}
          <a className="text-yellow-500">
            Trainers
          </a>{" "}&{" "}<a className="text-yellow-500">
            Speakers
          </a>
        </h1>
        <div className=" mb-28 mt-3 bg-slate-700 py-10 md:rounded-3xl  md:px-48">
          <Swiper
            slidesPerView={1} // Default for smaller screens
            slidesPerGroup={1} // Move 1 slide on each change
            spaceBetween={10} // Space between slides for all views
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1, // Mobile view: Show 1 slide
                slidesPerGroup: 1,
                spaceBetween: 10, // Adjust space for mobile
              },
              768: {
                slidesPerView: 2, // Tablet view: Show 2 slides
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2, // Laptop view: Show 2 slides
                slidesPerGroup: 2,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 2, // Large screens: Show 2 slides
                slidesPerGroup: 2,
                spaceBetween: 40,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper w-60% capitalize"
          >
            {trainers.map((trainer, index) => (
              <SwiperSlide key={index} className="rounded-2xl p-2">
                <img
                  className=" mx-auto h-60 object-cover rounded-2xl object-top"
                  src={trainer.imageSrc}
                  alt={`${trainer.name}_image`}
                />
                <h1 className="text-3xl font-bold text-white my-2 text-center">
                  {trainer.name}
                </h1>
                <h1 className="text-sm md:text-lg text-gray-900 px-3 py-2 bg-white rounded-full text-center">{trainer.experience}</h1>
                <button className="flex mx-auto mb-10 mt-5 bg-black text-white px-3 py-2 hover:bg-white hover:text-black border border-black rounded">
                  <Link href="/Contact">Ask Your Doubts Now</Link>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* join our 50k community */}
        <div className="pb-20">
        <h1 className=" text-3xl md:text-7xl text-center font-bold text-transparent my-5 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 ">
          Join our{" "}
          <a className="text-yellow-500">
            50&sbquo;000+ Learners community
          </a>
        </h1>
          <Marquee
            pauseOnHover="false"
            direction="right"
            speed={60}
            className=" bg-slate-700 border border-gray-500"
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
            className="bg-slate-700 border border-gray-500 mt-2 md:mt-5"
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
        </div>

        {/* We are featured in (newsbrands) */}
        <div
          className={`w-[95%] h-full mx-auto my-10 md:my-20 bg-gradient-to-r from-cyan-400 to-blue-500  rounded-3xl bg-cover bg-center border-orange-600  px-2 py-5   font-bold`}
        >
          <h1
            className={`bg-white  capitalize  text-transparent bg-clip-text text-center text-3xl md:text-7xl`}
          >
            We are Featured in
          </h1>
          <div className="grid grid-cols-3 w-full md:w-2/3 mx-auto gap-x-4 gap-y-4 pt-5 md:pt-10">
            <img
              src="./Home/featured/1.png"
              className="w-full h-14 md:h-32 rounded-lg object-fill"
              alt="featured"
            />
            <img
              src="./Home/featured/2.png"
              className="w-full h-14 md:h-32 rounded-lg object-fill bg-white"
              alt="featured"
            />
            <img
              src="./Home/featured/3.png"
              className="w-full h-14 md:h-32 rounded-lg object-fill "
              alt="featured"
            />
            <img
              src="./Home/featured/4.png"
              className="w-full h-14 md:h-32 rounded-lg object-fill"
              alt="featured"
            />
            <img
              src="./Home/featured/5.png"
              className="w-full h-14 md:h-32 rounded-lg object-fill"
              alt="featured"
            />
            <img
              src="./Home/featured/6.png"
              className="w-full h-14 md:h-32 rounded-lg object-fill"
              alt="featured"
            />
          </div>
        </div>

        {/* Talk to our Experts */}
        <div className="md:flex my-10 space-y-5 md:space-y-0 w-[90%] mx-auto justify-between items-center">
          <section className="">
            <div className="p-6 bg-card rounded-lg bg-[#EBEBEB] ">
              <h2 className="text-2xl font-bold mb-4">Talk to our Experts</h2>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">📞 Student :</span>
                  <Link href="tel:+918073327752">+91 8073327752</Link>
                </p>

                <p>
                  <span className="font-semibold">📧 Email :</span>
                  <Link
                    href="mailto:info@ilearningscareer.com
"
                  >
                    {" "}
                    info@ilearningscareer.com
                  </Link>
                </p>
                <p>
                  <Link href="https://maps.app.goo.gl/M7mdYUbQW1eiCztd7">
                    <span className="font-semibold flex items-center gap-x-3">
                      🏡 Office :<FaMapMarkerAlt />{" "}
                    </span>{" "}
                  </Link>
                </p>
                <p>
                  <span className="font-semibold">🕒 Timing</span> : (10:00 AM
                  to 7:00 PM)
                </p>
              </div>
              <h3 className="mt-6 text-lg font-semibold">
                Need answers? Call us!
              </h3>
              <p className="mb-4">
                Our team of experts is available to assist you
              </p>
              <Link
                target="_blank"
                href="https://topmate.io/poorva_shrivastava?utm_medium=linkedin_share&utm_campaign=share_poorva_shrivastava&fbclid=PAAabFEfCx_IrqCIzZ0ZmJVWXK6aSZjpF4iRWo7QyZXZB6LF8S51guIZUsSd8_aem_th_AUGrdEcQ2U8KTE9QXoFCBIaig7K4sKK9aG_8ZJ05doG0w8xFxtDePMPdUCVM-Fk34ls"
              >
                <button className="bg-primary bg-black text-white text-primary-foreground px-4 py-2 rounded-md text-xs md:text-sm hover:bg-white hover:text-black border border-black">
                  Book Your 15 Mins Expert Career Advice{" "}
                </button>
              </Link>
            </div>
          </section>
          <img
            className=" md:h-96"
            src="https://exitval.com/images/contactus.png"
            alt="consultant_images"
          />
        </div>

        {/* rating */}
        <div className="w-full py-10 mx-auto">
          <section className="flex gap-x-4 justify-center items-center  my-10">
            <img
              className="h-10 w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
              alt="google_logo"
            />
            <h1 className="text-lg md:text-5xl  font-bold text-yellow-500 py-3">
              Ratings & Reviews
            </h1>
          </section>
          {/* <Swiper /> */}
          <Marquee
            className={` z-1 `}
            pauseOnHover={true}
            direction="right"
            delay={0}
            speed={50}
          >
            <div className="flex-row w-full  flex shadow-sm">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="shadow-2xl md:w-96 w-96 bg-slate-700 m-10 relative rounded-lg "
                >
                  <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
                    <img
                      className={`rounded-full object-cover h-20 w-20 
                `}
                      src={testimonial.image}
                      alt="images"
                    />
                    <div className="flex text-yellow-500">
                      {Array(testimonial.rating)
                        .fill()
                        .map((_, i) => (
                          <IoMdStar key={i} />
                        ))}
                    </div>
                  </div>
                  <h1 className="pt-20 mx-10 mb-2 text-gray-300 font-semibold text-xs md:text-sm ">
                    {testimonial.review}
                  </h1>
                </div>
              ))}
            </div>
          </Marquee>
        </div>

        {isModalOpen && (
          <VideoModal isOpen={isModalOpen} data={data} onClose={closeModal} />
        )}

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold">Special Offer Form</h2>
                <p className="text-gray-600">
                  Please fill this form to avail offer on our courses.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    min="10"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleCourseChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a course</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="Full Stack Development">
                      Full Stack Development
                    </option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Interview Preparation">
                      Interview Preparation
                    </option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Cyber security">Cyber Security</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  {submitbutton}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
