import { Montserrat } from "next/font/google";
import React from "react";
const fontTypeAnimation = Montserrat({
  weight: "500",
  display: "swap",
  subsets: ["latin"],
});
const page = () => {
  return (
    <>
      <div className="pt-16 ">
        <section className="py-10 md:px-3 md:flex ">
          <img
            className="w-[90%] mx-auto md:w-[40rem] object-cover"
            src="https://salesforce-ilearning.vercel.app/Salesforce/Assets/div_2.jpg"
            alt="course_image"
          />
          <div className="md:p-10 p-5">
            <h1 className={`text-2xl md:text-4xl font ${fontTypeAnimation.className}`}>
              Salesforce Admin by iLearnings
            </h1>
            <p className="text-sm py-4 border-b">
              A Salesforce Administrator (Salesforce Admin) is a professional
              responsible for managing and configuring a company&apos;s
              Salesforce environment. Salesforce is a cloud-based customer
              relationship management (CRM) platform widely used for sales,
              service, marketing, and other business functions.
            </p>
            <div className="md:flex mt-5  md:gap-x-10">
              <input
                type="text"
                name="name"
                className=" rounded-md p-2 bg-slate-800"
                placeholder="Discount Coupon"
              />
              <button
                type="submit"
                className="ml-2 md:ml-0 text-white bg-orange-500 border-0   hover:bg-orange-600 rounded p-3"
              >
                Get Discount
              </button>
            </div>
            <div className="flex gap-x-2 md:gap-x-5 mt-5 items-center text-2xl px-2">
              <h1>₹14999/-</h1>

              <h1 className="line-through">₹25000</h1>
              <button className="text-lg text-white bg-green-500 border-0    rounded px-2 py-2 ml-4">Buy Course</button>
              <button className="text-lg hidden md:block text-gray-500   underline underline-offset-1 rounded px-2 py-2 ml-4">Brochure</button>
            </div>
            <button className="text-lg block md:hidden text-gray-500   underline underline-offset-1 rounded px-2 py-2 ">Brochure</button>
        
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
