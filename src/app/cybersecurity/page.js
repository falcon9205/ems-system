"use client"
import React, { useState } from 'react';
import Popup from "@/components/coursePopup/page.js"


const  CybersecurityCourse=()=> {
  const [isOpenForm,setIsOpenForm] = useState(false)
  
  const handleClosed = () =>{
    setIsOpenForm(false);
  }
    return (
      <>
      <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
        <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold tracking-tight">Cybersecurity Course</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Equip yourself with essential skills to protect and defend against cyber threats in our comprehensive cybersecurity courses.
          </p>
        </header>
  
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-900">Course Overview</h2>
          <p className="text-lg text-gray-700">
            Our Cybersecurity courses are designed to equip students and professionals with the essential skills needed to protect and defend against cyber threats. From learning the basics to mastering advanced techniques, our courses cover the latest trends and technologies in the field.
          </p>
        </section>
  
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Industry-relevant Curriculum", description: "Aligned with current cybersecurity standards and best practices." },
              { title: "Hands-on Training", description: "Real-world scenarios, labs, and simulations to develop practical skills." },
              { title: "Expert Instructors", description: "Learn from experienced cybersecurity professionals." },
              { title: "Certification", description: "Earn industry-recognized certifications upon completion." },
              { title: "Placement Assistance", description: "Get support to land roles in top companies." },
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
            {["Fundamentals of Cybersecurity", "Network Security", "Cryptography", "Ethical Hacking & Penetration Testing", "Incident Response & Threat Management", "Risk Assessment & Compliance", "Secure Programming and Application Security", "Cloud and IoT Security"].map((topic, index) => (
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
              { title: "Comprehensive Course Content", description: "Covers all aspects of cybersecurity." },
              { title: "Live Sessions", description: "Learn directly from the experts through interactive sessions." },
              { title: "Flexible Learning", description: "Online classes with recorded sessions for self-paced learning." },
              { title: "Affordable Pricing", description: "Value-for-money programs with easy installment options." },
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-cyan-50 to-blue-50 shadow-md p-4 rounded-lg">
                <h3 className="text-blue-800 font-bold">{item.title}</h3>
                <p className="text-gray-700 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
  
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
          <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Secure your future in the growing field of cybersecurity. Join our course today and take the first step towards becoming a cybersecurity professional!
          </p>
          <button onClick={()=>setIsOpenForm(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">Enroll Now</button>
        </section>
      </div>
       <Popup isOpen={isOpenForm} courseName={"Cyber Security"} onClose={handleClosed} />
       </>
    );
  }
  export default CybersecurityCourse
  