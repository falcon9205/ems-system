"use client"
import React, { useState } from 'react';
import Popup from "@/components/coursePopup/page.js"

const FullStackCourse = () => {
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = () =>{
    setIsOpen(false);
  }
  return (
    <>
    <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
      <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Full Stack Development Course</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Master the complete skill set for full stack development, from front-end design to back-end logic and database management.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Course Overview</h2>
        <p className="text-lg text-gray-700">
          Our Full Stack Development course is designed to equip students with skills across the entire web development stack. Learn to build responsive front-end interfaces, develop robust back-end APIs, and manage databases effectively, preparing you for real-world full stack roles.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Comprehensive Curriculum", description: "Covers front-end, back-end, and database technologies." },
            { title: "Project-based Learning", description: "Build real-world projects to showcase your skills." },
            { title: "Expert Mentorship", description: "Guidance from experienced full stack developers." },
            { title: "Certification", description: "Receive a full stack certification upon completion." },
            { title: "Job Placement Assistance", description: "Guidance to secure full stack roles at top tech companies." },
          ].map((highlight, index) => (
            <div key={index} className="border-l-4 border-l-cyan-600 shadow-md p-4 bg-white rounded-lg">
              <h3 className="flex items-center space-x-2 text-blue-800 font-bold">
                <span className="text-blue-500">✔</span>
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
            "HTML, CSS, and JavaScript",
            "Responsive Design and Frameworks",
            "Node.js and Express",
            "APIs and RESTful Services",
            "Database Management (SQL & NoSQL)",
            "Version Control with Git & GitHub",
            "Testing and Debugging",
            "Deployment and Cloud Services",
          ].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 shadow-sm p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Target Audience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Aspiring Developers", description: "Looking to start a career in full stack development." },
            { title: "Front-end Developers", description: "Wanting to expand into back-end and database management." },
            { title: "Back-end Developers", description: "Seeking to improve front-end skills for full stack roles." },
            { title: "IT Professionals", description: "Aiming to add web development to their skill set." },
          ].map((audience, index) => (
            <div key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 shadow-md p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{audience.title}</h3>
              <p className="text-gray-700 mt-2">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Start your journey towards becoming a full stack developer. Enroll today and take the first step towards a versatile and high-demand career!
        </p>
        <button onClick={()=>setIsOpen(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">Enroll Now</button>
      </section>
    </div>
      <Popup isOpen={isOpen} courseName={"Full Stack Development"} onClose={handleClose} />
      </>
  );
};

export default FullStackCourse;
