"use client";
import React, { useRef, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { ImLocation2 } from "react-icons/im";
import { GoPeople } from "react-icons/go";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import Link from "next/link";

const page = () => {
  const [popup, setPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const images = [
    "/Events/1.jpg",
    "/Events/2.jpg",
    "/Events/3.jpg",
    "/Events/4.jpg",
    "/Events/5.jpg",
    "/Events/6.jpg",
    "/Events/7.jpg",
    "/Events/8.jpg",
    "/Events/9.jpg",
    "/Events/10.jpg",
    "/Events/11.jpg",
    "/Events/12.jpg",
    "/Home/corousel/1.jpg",
    "/Home/corousel/2.jpg",
    "/Home/corousel/3.jpg",
    "/Home/corousel/4.jpg",
    "/Home/corousel/5.jpg",
    "/Home/corousel/6.jpg",
  ];
  const dayanand = [
    "/Events/dayanand/8.png",
    "/Events/dayanand/6.png",
    "/Events/dayanand/7.png",
    "/Events/dayanand/5.png",
    "/Events/dayanand/9.png",
  ];
  const amity = [
    "/Events/amity/10.png",
    "/Events/amity/11.png",
    "/Events/amity/12.png",
    "/Events/amity/13.png",
    "/Events/amity/14.png",
    "/Events/amity/15.png",
  ];
  const microsoft = [
    "/Events/microsoft/1.png",
    "/Events/microsoft/2.png",
    "/Events/microsoft/3.png",
    "/Events/microsoft/4.png",
  ];
  const dnyaneshwar = [
    "/Events/gyaneshwar/16.png",
    "/Events/gyaneshwar/17.png",
    "/Events/gyaneshwar/18.png",
    "/Events/gyaneshwar/19.png",
    "/Events/gyaneshwar/20.png",
  ];
  const expo = [
    "/Events/expo/21.png",
    "/Events/expo/22.png",
    "/Events/expo/23.png",
    "/Events/expo/24.png",
    "/Events/expo/25.png",
  ];
  const prachi = [
    "/Events/prachi/26.jpg",
    "/Events/prachi/27.jpg",
    "/Events/prachi/28.jpg",
    "/Events/prachi/29.jpg",
    "/Events/prachi/30.jpg",
    "/Events/prachi/31.jpg",
  ];
  const tenx = [
    "/Events/10x/33.jpg",
    "/Events/10x/34.jpg",
    "/Events/10x/35.jpg",
    "/Events/10x/36.jpg",
    "/Events/10x/37.jpg",
    "/Events/10x/38.jpg",
    "/Events/10x/39.jpg",
    "/Events/10x/40.jpg",
  ];

  const eventData = [
    {
      title: "Dayananda Sagar Academy of Technology and Management",
      details:
        "We are thrilled to announce a significant partnership between ilearnings and Dayananda Sagar Academy of Technology and Management (DSATM), marking a new chapter in educational collaboration. This Memorandum of Understanding (MoU) is a pivotal step toward bridging the gap between academia and industry, fostering innovation, and enhancing career readiness for students.",
      date: "September 18, 2024",
      time: "9:00 AM - 5:00 PM",
      attendees: "500+ Attendees",
      location: "(DSATM) Campus",
      locationLink: "https://maps.app.goo.gl/qNW1Gw5C29hrKpAx8",
      images: [
        "/Events/dayanand/8.png",
        "/Events/dayanand/6.png",
        "/Events/dayanand/7.png",
        "/Events/dayanand/5.png",
        "/Events/dayanand/9.png",
      ], // add the images for the slider
    },
    {
      title: "Amity University, Bangalore",
      details:
        "We are thrilled to announce that iLearnings founder and CEO Poorva Shrivastava, was invited as a guest speaker at Amity University!",
      date: "September 17, 2024",
      time: "2:00 PM - 5:00 PM",
      attendees: "350+ Attendees",
      location: "(Amity) Campus",
      locationLink: "https://maps.app.goo.gl/t3XYx7ES9ZbwnP5m6",
      images: [
        "/Events/amity/10.png",
        "/Events/amity/11.png",
        "/Events/amity/12.png",
        "/Events/amity/13.png",
        "/Events/amity/14.png",
        "/Events/amity/15.png",
      ],
    },
    {
      title: "Microsoft, New Delhi–Gurugram",
      details:
        "We are excited to share that Poorva Shrivastava, founder & CEO of ilearnings, was invited as a distinguished guest at an AI-focused event hosted by Microsoft.",
      date: "September 14, 2024",
      time: "12:00 PM - 3:00 PM",
      attendees: "100+ Attendees",
      location: "(Microsoft) Office",
      locationLink: "https://maps.app.goo.gl/o56Rs1o7G2u4ZayC8",
      images: [
        "/Events/microsoft/1.png",
        "/Events/microsoft/2.png",
        "/Events/microsoft/3.png",
        "/Events/microsoft/4.png",
      ],
    },
    {
      title: "Mula Education Society's Shri Dnyaneshwar Mahavidyalaya",
      details:
        "We are thrilled to share that iLearnings has officially partnered with Mula Education Society's Shri Dnyaneshwar Mahavidyalaya.",
      date: "September 6, 2024",
      time: "12:00 PM - 3:00 PM",
      attendees: "200+ Attendees",
      location: "(SDMN) Campus",
      locationLink: "https://maps.app.goo.gl/TBh99zWf75pB1saZA",
      images: [
        "/Events/gyaneshwar/16.png",
        "/Events/gyaneshwar/17.png",
        "/Events/gyaneshwar/18.png",
        "/Events/gyaneshwar/19.png",
        "/Events/gyaneshwar/20.png",
      ],
    },
    {
      title: "iLearnings Innovative Expo",
      details:
        "Expo was a gateway to discovering cutting-edge holistic education, engaging with thought leaders, and exploring groundbreaking ideas.",
      date: "August (1-12), 2024",
      time: "7:00 PM",
      attendees: "100+ Attendees",
      location: "Virtual Session",
      locationLink: "",
      images: [
        "/Events/expo/21.png",
        "/Events/expo/22.png",
        "/Events/expo/23.png",
        "/Events/expo/24.png",
        "/Events/expo/25.png",
      ],
    },
    {
      title: "iLearnings Felicitated 10th CBSE Topper",
      details:
        "Here we are talking about Prachi Nigam, a high school UP topper and Shubham Verma, an Intermediate school with 17 more toppers from Sita Inter College.",
      date: "March 3, 2024",
      time: "2:00 PM - 4:00 PM",
      attendees: "700+ Attendees",
      location: "(Sita Inter College) Uttar Pradesh",
      locationLink: "https://maps.app.goo.gl/WREhzwmiTnMZBcu4A",
      images: [
        "/Events/prachi/26.jpg",
        "/Events/prachi/27.jpg",
        "/Events/prachi/28.jpg",
        "/Events/prachi/29.jpg",
        "/Events/prachi/30.jpg",
        "/Events/prachi/31.jpg",
      ],
    },
    {
      title: "10x India Ladies Event",
      details:
        " Our Founder and CEO was honored to be invited to the 10x India Ladies Event&sbquo; the largest women's summit in India. She shared valuable insights on her entrepreneurial journey, inspiring women to take bold steps in their own careers and ventures. This summit was a celebration of women's achievements and a platform to empower future leaders.",
      date: "",
      time: "",
      attendees: "1000+ Attendees",
      location: "New Delhi",
      locationLink: "",
      images: [
        "/Events/10x/33.jpg",
        "/Events/10x/34.jpg",
        "/Events/10x/35.jpg",
        "/Events/10x/36.jpg",
        "/Events/10x/37.jpg",
        "/Events/10x/38.jpg",
        "/Events/10x/39.jpg",
        "/Events/10x/40.jpg",
      ],
    },
  ];

  const handleButton = (event) => {
    setSelectedEvent(event);
    setPopup(true);
  };
  return (
    <>
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="pt-20 pb-5 ">
          <Link href="/organize">
            <button className=" my-5 flex ml-auto mr-3 rounded-md px-3 py-2  text-[10px] md:text-sm text-white bg-slate-700 hover:bg-slate-600  border-black border">
              Collab With Us
            </button>
          </Link>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper w-[95%] rounded-2xl"
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
        </div>

        <section className="grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-10 pb-20 pt-10">
          {eventData.map((event, index) => (
            <div
              key={index}
              className="event-card text-center border  rounded-lg space-y-2  p-2 mx-10 md:mx-5"
            >
              <h3 className="text-xl text-cyan-500 font-semibold">
                {event.title}
              </h3>

              <p className="text-sm flex justify-center items-center gap-x-2 text-gray-300">
                <SlCalender className="text-sm md:text-lg" /> {event.date}
              </p>

              <p className="text-sm flex justify-center items-center gap-x-2 text-gray-300">
                <ImLocation2 className="text-sm md:text-lg" />
                <a
                  href={event.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.location}
                </a>
              </p>
              <p className="text-sm flex justify-center items-center gap-x-2 text-gray-300">
                <GoPeople className="text-lg md:text-xl" /> : {event.attendees}
              </p>
              <button
                onClick={() => handleButton(event)}
                className="mx-auto  font-semiboldflex text-xs md:text-sm  rounded-md px-2 py-1  text-[10px]text-white bg-slate-700 hover:bg-slate-600  border-black text-white border"
              >
                Know more
              </button>
            </div>
          ))}
        </section>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-slate-800 p-6 rounded-lg border-black border  shadow-lg max-w-[95%] md:max-w-[80%] w-full space-y-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-gray-200 px-2 rounded-md"
            >
              ✕
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[80vh] space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 rounded-full text-white md:py-2">
                  Event description
                </h2>
                <div className="md:flex gap-x-3 items-center justify-between mt-5">
                  {/* Swiper Component */}
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper w-full md:w-[50%] "
                  >
                    {selectedEvent.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="object-contain h-96"
                          src={image}
                          alt={`slide_image_${index}`}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Event Details */}
                  <div className="w-full md:w-[50%] text-left">
                    <h1 className="text-xl font-semibold bg-slate-700 text-gray-300 rounded-lg p-2 ">
                      {selectedEvent.title}
                    </h1>
                    <h1 className="text-sm my-4 bg-slate-700 text-gray-300 rounded-lg p-2">
                      {selectedEvent.details}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default page;
