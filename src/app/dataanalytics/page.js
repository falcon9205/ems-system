"use client"
import React, { useState } from 'react';
import Popup from "@/components/coursePopup/page.js"

const DataAnalyticsCourse = () => {
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = () =>{
    setIsOpen(false);
  }
  return (
    <>
    <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
      <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Data Analytics Course</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Unlock insights from data and drive impactful decisions with our comprehensive Data Analytics course.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Course Overview</h2>
        <p className="text-lg text-gray-700">
          Our Data Analytics course provides essential skills for analyzing, interpreting, and visualizing data. Learn data wrangling, statistical analysis, and business intelligence techniques, preparing you for a data-driven role in any industry.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Industry-Aligned Curriculum", description: "Focuses on current data analysis techniques and best practices." },
            { title: "Hands-on Projects", description: "Analyze real-world data sets for practical experience." },
            { title: "Experienced Instructors", description: "Learn from industry experts in data analytics." },
            { title: "Certification", description: "Gain an industry-recognized certificate upon completion." },
            { title: "Placement Assistance", description: "Guidance to secure roles in top companies and organizations." },
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
            "Data Wrangling & Preprocessing",
            "Data Visualization with Tableau & Power BI",
            "Statistical Analysis & Hypothesis Testing",
            "Python for Data Analytics",
            "SQL for Data Retrieval",
            "Machine Learning Basics",
            "Business Intelligence & Reporting",
            "Capstone Project",
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
            { title: "Aspiring Data Analysts", description: "Looking to build a career in data analytics." },
            { title: "Business Professionals", description: "Seeking to make data-driven decisions." },
            { title: "Researchers", description: "Wanting to apply data analytics in their work." },
            { title: "Students", description: "Exploring opportunities in the data analytics field." },
          ].map((audience, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{audience.title}</h3>
              <p className="text-gray-700 mt-2">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          Start your journey towards becoming a data analyst. Enroll today to gain skills for a rewarding career in data analytics!
        </p>
        <button onClick={()=>setIsOpen(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-purple-50">Enroll Now</button>
      </section>
    </div>
    <Popup isOpen={isOpen} courseName={"Data Analytics"} onClose={handleClose} />
    </>
  );
};

export default DataAnalyticsCourse;
