"use client"
// SalesforceCourse.jsx
import React, { useState } from 'react';
import Popup from "@/components/coursePopup/page.js"
const SalesforceCourse = () => {
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = () =>{
    setIsOpen(false);
  }
  return (
    <>
    <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
      <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Salesforce Course</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Build expertise in the world of Salesforce with our comprehensive courses, covering everything from Administration to Marketing Cloud.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Course Overview</h2>
        <p className="text-lg text-gray-700">
          Our Salesforce courses are crafted to provide in-depth knowledge and hands-on experience with various Salesforce tools and platforms. Whether you're looking to become an admin, developer, business analyst, or specialize in LWC, CPQ, or Marketing Cloud, our curriculum has you covered.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Industry-relevant Curriculum", description: "Aligned with current Salesforce industry standards and best practices." },
            { title: "Hands-on Projects", description: "Real-world scenarios and projects to enhance practical skills." },
            { title: "Expert Instructors", description: "Learn from certified Salesforce professionals." },
            { title: "Certification Prep", description: "Prepare for Salesforce Admin, Dev, and other Salesforce certification exams." },
            { title: "Career Assistance", description: "Receive guidance to secure roles in top Salesforce-driven companies." },
          ].map((highlight, index) => (
            <div key={index} className="border-l-4 border-l-cyan-600 shadow-md p-4 bg-white rounded-lg">
              <h3 className="flex items-center space-x-2 text-blue-800 font-bold">
                <span className="text-green-500">✔</span>
                <span>{highlight.title}</span>
              </h3>
              <p className="text-gray-600 mt-2">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        <div className="flex space-x-4 justify-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">What You&apos;ll Learn</button>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">Who Should Enroll</button>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">Career Opportunities</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Salesforce Admin",
            "Salesforce LWC",
            "Salesforce CPQ",
            "Salesforce Development",
            "Business Analyst",
            "Admin+Dev+LWC Combined",
            "Marketing Cloud",
          ].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-sm p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Target Audience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Students", description: "Aspiring to build a career in Salesforce administration, development, or analysis." },
            { title: "Professionals", description: "Looking to transition into Salesforce-related roles." },
            { title: "Managers", description: "Aiming to implement Salesforce effectively within their teams." },
            { title: "Consultants", description: "Seeking to add Salesforce expertise to their skill set." },
          ].map((audience, index) => (
            <div key={index} className="bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{audience.title}</h3>
              <p className="text-gray-700 mt-2">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Advance your Salesforce skills and accelerate your career. Join our course today and get certified for a Salesforce role!
        </p>
        <button onClick={()=>setIsOpen(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">Enroll Now</button>
      </section>
    </div>
    
    <Popup isOpen={isOpen} courseName={"Salesforce"} onClose={handleClose} />
    </>
  );
};

export default SalesforceCourse;
