"use client"
import React, { useState } from 'react';
import Popup from "@/components/coursePopup/page.js"

const DataScienceCourse = () => {
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = () =>{
    setIsOpen(false);
  }
  return (
    <>
    <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
      <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Data Science Course</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Master the art of extracting insights from data and drive informed decision-making in our comprehensive Data Science course.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Course Overview</h2>
        <p className="text-lg text-gray-700">
          Our Data Science course is designed to equip students and professionals with the essential skills needed to analyze complex data sets, build predictive models, and communicate insights effectively. From statistical analysis to machine learning, our course covers the latest techniques and technologies in the field.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Cutting-edge Curriculum", description: "Aligned with current industry standards and best practices in data science." },
            { title: "Hands-on Projects", description: "Real-world data sets and projects to develop practical skills." },
            { title: "Expert Instructors", description: "Learn from experienced data scientists and analysts." },
            { title: "Industry Certifications", description: "Prepare for recognized data science certifications." },
            { title: "Career Support", description: "Get guidance to land roles in top tech companies and startups." },
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
          {["Python for Data Science", "Statistical Analysis", "Data Visualization", "Machine Learning", "Deep Learning", "Big Data Technologies", "Data Ethics and Privacy", "Capstone Project"].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 shadow-sm p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Target Audience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Students", description: "Aspiring to build a career in data science and analytics." },
            { title: "Professionals", description: "Looking to transition into data-driven roles." },
            { title: "Managers", description: "Aiming to leverage data for better decision-making." },
            { title: "Researchers", description: "Seeking to apply data science in their field of study." },
          ].map((audience, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 shadow-md p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{audience.title}</h3>
              <p className="text-gray-700 mt-2">{audience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Start your journey in the world of data science. Join our course today and take the first step towards a data-driven career!
        </p>
        <button onClick={()=>setIsOpen(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">Enroll Now</button>
      </section>
    </div>
     <Popup isOpen={isOpen} courseName={"Data Science"} onClose={handleClose} />
     </>
  );
};

export default DataScienceCourse;
