"use client"
import Popup from "@/components/coursePopup/page.js"
import { useState } from "react";
const SoftSkillsProgram = () => {
  const [isOpen,setIsOpen] = useState(false)
  const handleClose = () =>{
    setIsOpen(false);
    
  } 
  return (
    <>
    <div className=" mx-auto px-4 py-8 space-y-12 bg-slate-50 mt-20">
      <header className="text-center space-y-4 bg-gradient-to-r from-cyan-700 to-blue-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">Soft Skills Enhancement Program</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Develop essential interpersonal skills to succeed in both personal and professional environments. Our program empowers you to communicate, collaborate, and lead effectively.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Program Overview</h2>
        <p className="text-lg text-gray-700">
          This Soft Skills Enhancement Program is tailored to help individuals strengthen essential interpersonal and communication skills. Learn how to navigate complex situations, enhance teamwork abilities, and become a more effective communicator and leader.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Key Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Effective Communication", description: "Master verbal, non-verbal, and written communication skills." },
            { title: "Team Collaboration", description: "Learn how to work efficiently with diverse teams and personalities." },
            { title: "Leadership & Influence", description: "Develop skills to lead, motivate, and inspire others." },
            { title: "Conflict Resolution", description: "Gain techniques for managing and resolving conflicts professionally." },
            { title: "Emotional Intelligence", description: "Understand and manage your emotions and those of others." },
          ].map((highlight, index) => (
            <div key={index} className="border-l-4 border-l-cyan-600 shadow-md p-4 bg-white rounded-lg">
              <h3 className="text-blue-800 font-bold">{highlight.title}</h3>
              <p className="text-gray-600 mt-2">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        <div className="flex space-x-4 justify-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">What You&apos;ll Learn</button>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">Who Should Enroll</button>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">Career Benefits</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Effective Listening", "Confidence Building", "Adaptability", "Problem-Solving Skills", "Decision Making", "Stress Management", "Presentation Skills", "Networking"].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 shadow-sm p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{topic}</h3>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-blue-900">Why Choose Us?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Experienced Trainers", description: "Learn from experts with real-world communication and leadership experience." },
            { title: "Interactive Learning", description: "Engage in role-play, group exercises, and real-life scenarios." },
            { title: "Flexible Schedule", description: "Self-paced online modules and live virtual sessions." },
            { title: "Personalized Feedback", description: "Get constructive feedback on your progress and skill development." },
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 shadow-md p-4 rounded-lg">
              <h3 className="text-blue-800 font-bold">{item.title}</h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-lg text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-white">Enroll Now</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Enhance your interpersonal and communication skills to unlock greater opportunities. Join our Soft Skills Enhancement Program today and transform your professional life!
        </p>
        <button onClick={()=>setIsOpen(true)} className="text-lg px-8 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">Enroll Now</button>
      </section>
    </div>
    <Popup isOpen={isOpen} courseName={"Soft Skills"} onClose={handleClose} />
    </>
  );
}

export default SoftSkillsProgram;
