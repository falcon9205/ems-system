// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";

// Import Swiper styles
import "swiper/css";

const swiper = () => {
  return (
    <>
      <Swiper
        className="md:h-auto h-auto w-screen "
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className=" shadow-2xl w-[80%] md:w-[90%] m-10  relative border-2 rounded-lg border-red-600">
            <div className="absolute top-[-40px]  left-1/2 transform -translate-x-1/2">
              <img
                className="rounded-full object-cover h-20 w-20 border-2 border-green-500"
                src="https://lh3.googleusercontent.com/a-/ALV-UjWO9RaD0rmrAYeq9kdXrgEZjjjvsCe6fnG2z5XgQJkoUq48PxpO=w60-h60-p-rp-mo-br100"
                alt="images"
              />
              <h1 className="flex text-yellow-500"><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/></h1>
            </div>
            <h1 className="pt-20 mx-10 mb-2 text-gray-600">
            Best trainer for salesforce rishitosh he teaches everything deeply till concepts get clear. Poorva understand every situation of every student and takes immediate action without second thoughts regarding everything and guides best way best
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className=" shadow-2xl w-[80%] md:w-[90%] m-10  relative border-2 rounded-lg border-red-600">
            <div className="absolute top-[-40px]  left-1/2 transform -translate-x-1/2">
              <img
                className="rounded-full object-cover h-20 w-20 border-2 border-green-500"
                src="https://lh3.googleusercontent.com/a-/ALV-UjURPcE5n_sRbQg0VTocyK_NhYg8FpMNR3f8uHLI60Z7kARuG5Hz=w60-h60-p-rp-mo-br100"
                alt="images"
              />
              <h1 className="flex text-yellow-500"><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/></h1>
            </div>
            <h1 className="pt-20 mx-10 mb-2 text-gray-600">
            Best all in one platform for career&sbquo; skills&sbquo; placement&sbquo; jobs&sbquo; interview providing lots of free stuffs to help students succeed in their career & not only help in technical but also provide them soft skills And most importantly the CEO of ilearnings Mrs. Poorva she is really a good leader&sbquo; mentor and she treats employees as a family I really enjoying working with ilearnings</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className=" shadow-2xl w-[80%] md:w-[90%] m-10  relative border-2 rounded-lg border-red-600">
            <div className="absolute top-[-40px]  left-1/2 transform -translate-x-1/2">
              <img
                className="rounded-full object-cover h-20 w-20 border-2 border-green-500"
                src="https://lh3.googleusercontent.com/a-/ALV-UjWPFWjRuN35Q3weLt02WxTdq-7c4IXFUeUa7ZnBqfPVdGsSNtCW=w60-h60-p-rp-mo-br100"
                alt="images"
              />
              <h1 className="flex text-yellow-500"><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/><IoMdStar/></h1>
            </div>
            <h1 className="pt-20 mx-10 mb-2 text-gray-600">
            The Internship Induction was very insightful, and educating. I&apos;m looking forward to starting my internship with all enthusiasm</h1>
          </div>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
};
export default swiper;
