"use client"
import React, { useState } from 'react';
import Popup from "@/components/coursePopup/page.js"
const SpecializedInterviewPrepCourse = () => {
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = () =>{
    setIsOpen(false);
  }
  return (
    <>
    <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
      <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Specialized Interview Preparation Course</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Master the skills and confidence needed to ace your interviews with personalized guidance and targeted preparation strategies.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Course Overview</h2>
        <p className="text-lg text-gray-700">
          Our Specialized Interview Preparation Course is designed to equip candidates with practical skills and insights to excel in job interviews across various domains. From resume building to mock interviews, this course covers all aspects to help you make a lasting impression on recruiters.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Personalized Feedback", description: "Receive tailored advice to enhance your strengths and work on improvement areas." },
            { title: "Mock Interviews", description: "Practice with simulated interviews to gain real-world experience." },
            { title: "Expert Mentorship", description: "Learn from experienced interviewers and industry professionals." },
            { title: "Comprehensive Resources", description: "Access to study materials, guides, and practice questions." },
            { title: "Resume and Portfolio Building", description: "Get assistance in crafting a resume that stands out." },
            { title: "Soft Skills Training", description: "Master the essential interpersonal skills needed for interview success." },
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
            "Behavioral Interview Techniques",
            "Technical Interview Preparation",
            "Resume Building and Optimization",
            "Effective Communication Skills",
            "Industry-specific Interview Preparation",
            "Mock Interview Practice",
            "Body Language and Professional Etiquette",
            "Handling Difficult Questions",
          ].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-sm p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Why Choose Us?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Industry-Relevant Curriculum", description: "Focused on real-world interview scenarios and techniques." },
            { title: "Live Mock Interviews", description: "Gain confidence through practice with simulated interviews." },
            { title: "Flexible Schedule", description: "Self-paced and live options to fit your schedule." },
            { title: "Affordable and Effective", description: "High-value learning at a competitive price." },
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{item.title}</h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          Take the next step towards your dream job by preparing with confidence and expert guidance. Join the Specialized Interview Preparation Course today!
        </p>
        <button onClick={()=>setIsOpen(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">Enroll Now</button>
      </section>
    </div>
    <Popup isOpen={isOpen} courseName={"Interview Preparation"} onClose={handleClose} />
    </>
  );
};

export default SpecializedInterviewPrepCourse;
