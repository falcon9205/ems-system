"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css"; // Optional for custom styling
import Marquee from "react-fast-marquee";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/store/login";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Card from "@/components/ikonnectCard/card"
import Card1 from "@/components/99storeCard/card"

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const slides = [
    
    {
      img: "./Home/embla/3.jpg",
      link: "/certified",
      alt: "Advaita Competition",
    },
    {
      img: "./Home/embla/4.jpg",
      link: "/jobs-portal",
      alt: "Homepage Event",
    },
    {
      img: "./Home/embla/5.jpg",
      link: "/Blog",
      alt: "Homepage Event",
    },
  ];

  return (
    <div className="embla  px-5 ">
      <div className="embla__viewport " ref={emblaRef}>
      <div className="embla__container md:w-[50%]">
      {slides.map((slide, index) => (
        <div className="embla__slide" key={index}>
          <Link href={slide.link} target="_blank" rel="noopener noreferrer">
            <img
              src={slide.img}
              className="mx-auto rounded-2xl"
              alt={slide.alt}
            />
          </Link>
        </div>
      ))}
    </div>
      </div>
      <button className="embla__prev" onClick={scrollPrev}>
        <AiOutlineArrowLeft color="black" className="font-bold" />
      </button>
      <button className="embla__next" onClick={scrollNext}>
        <AiOutlineArrowRight color="black" className="font-bold" />
      </button>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const { identity, login } = useLogin((state) => ({
    identity: state.identity,
    login: state.login,
  }));
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
  const title1 = "iKonnect";
const Paragraph1 =
  "It is a platform that simplifies hiring and job applications, connecting recruiters and candidates for a seamless recruitment experience.";
const Link1 =
  "/Hire";
  const title2 = "99 Store";
  const Paragraph2 =
    "99 Store on iLearnings is a platform offering free eBooks and courses at an affordable price of ₹99. It aims to make quality learning resources accessible to everyone.";
  const Link2 =
    "https://live.ilearningscareer.com/s/pages/99store";
  return (
    <>
      {/* Hero Section */}
      <div className="w-screen">
  <section className="md:w-full space-y-1 h-full md:py-16 py-10 md:px-16 flex flex-col justify-center items-center text-center">
    <h1 className="text-2xl md:text-7xl capitalize font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      Swipe&sbquo; Connect&sbquo; Work &mdash;{" "}
      <a className="text-yellow-500">It&apos;s That Simple !</a>
    </h1>
    <p className="text-[10px] md:text-xl font-semibold text-gray-400 md:w-[40rem]">
      Find the Right Talent, Find the Right Job &ndash; Anytime, Anywhere
    </p>
  </section>

  {/* Feature Cards Section */}
  <section className="flex flex-wrap justify-center items-center gap-x-[10%] gap-y-5 mx-auto mb-10 mt-10 md:mb-20 max-w-screen-md">
    <Card title1={title1} description1={Paragraph1} link={Link1} />
    <Card1 title1={title2} description1={Paragraph2} link={Link2} />
  </section>
</div>


      {/* 4 USP of iLearnings */}
      <div className="flex mt-10 mb-10 font-bold md:gap-x-4 gap-x-2 mx-1 text-white md:mx-10 my-30 capitalize">
          <div className=" bg-slate-800 text-white border border-gray-600 w-full md:p-10 shadow-2xl text-center rounded-md py-2">
            {/* <img className="mx-auto h-20 w-20" src="./Home/trio/learner.png" alt="rating"/> */}
            <h1 className="lg:text-5xl  font-bold text-lg">4.8</h1>
            <h1 className="lg:text-lg  text-xs">Google Rating</h1>
          </div>
          <div className="bg-slate-800 text-white border border-gray-600 w-full md:p-10 shadow-2xl text-center rounded-md py-2">
            {/* <img className="mx-auto h-20 w-20" src="./Home/trio/social.png" alt="rating"/> */}
            <h1 className="lg:text-5xl font-bold  text-lg ">50&sbquo;000+ </h1>
            <h1 className="lg:text-lg  text-xs">Learners</h1>
          </div>
          <div className=" bg-slate-800 text-white border border-gray-600 w-full md:p-10 shadow-2xl text-center rounded-md py-2">
            {/* <img className="mx-auto h-20 w-20" src="./Home/trio/learner.png" alt="rating"/> */}
            <h1 className="lg:text-5xl  font-bold text-lg">10+</h1>
            <h1 className="lg:text-lg  text-xs">Countries</h1>
          </div>
          <div className=" bg-slate-800 text-white border border-gray-600 w-full md:p-10 shadow-2xl text-center rounded-md py-2">
            {/* <img className="mx-auto h-20 w-20" src="./Home/trio/learner.png" alt="rating"/> */}
            <h1 className="lg:text-5xl  font-bold text-lg">85%</h1>
            <h1 className="lg:text-lg  text-xs">placement</h1>
          </div>
        </div>

      

      {/* Embla Carousel Section */}
      <EmblaCarousel />
    </>
  );
};

export default Page;
