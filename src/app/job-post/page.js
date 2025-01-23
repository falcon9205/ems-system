"use client";
import { useLogin } from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Goodpopup from "@/components/goodPopup/goodPopup";
import ErrorPopup from "@/components/errorPopup/errorPopup";
import Dashboard from "../recruiterDashboard/page";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import Confetti from "@/components/confetti/confetti";

export default function JobPostingPage() {
  const router = useRouter();
  const [jobType, setJobType] = useState("");
  const [salaryType, setsalaryType] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const login = useLogin((state) => state.login);
  const [infoPopup, setInfoPopup] = useState(true);
  const user_ID = useLogin((state) => state.user_ID);
  const profile = useLogin((state) => state.profile);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [button, setButton] = useState("Post a job");
  const [requirements, setRequirements] = useState("");
  const [postedJobs, setPostedJobs] = useState([]);
  const [experience, setExperience] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isOpenP, setIsOpenp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isopenDashboard, setisOpenDashboard] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setIsOpen(false);
    setIsOpenp(false);
    setisOpenDashboard(false);
  };
  const [confet, setConfet] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!profile) {
        router.push("/Profile");
        return;
      }
      setSpinner(true);
      const job_data = {
        recruiter_id: user_ID,
        job_title: jobTitle,
        company_name: companyName,
        location,
        job_description: jobDescription,
        requirements,
        user_ID,
        minSalary,
        maxSalary,
        experience,
        jobType,
        companyUrl,
        salaryType,
      };
      console.log("data from frontend", job_data);

      const res = await fetch("/api/jobposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify(job_data),
      });

      if (!res.ok) {
        throw new Error("Failed to post job");
      }

      const data = await res.json();
      console.log("Job Post Response:", data);
      setConfet(true); // Set the state to true
      setTimeout(() => {
        setConfet(false); // Reset the state to false after 3 seconds
      }, 5000);
      setIsOpenp(true);
      setMsg("Your job has been successfully posted on iLearnings! ");
      setSpinner(false);
      // Clear form fields
      setButton("Post a job");
      setJobTitle("");
      setsalaryType("");
      setCompanyName("");
      setLocation("");
      setJobDescription("");
      setJobType("");
      setCompanyUrl("");
      setMinSalary("");
      setMaxSalary("");
      setRequirements("");
      setExperience("");
      // Refetch jobs to show the newly added one
    } catch (error) {
      console.error("Error:", error);
      setIsOpen(true);
      setMsg(
        "We encountered an issue while posting your job. Please try again after some time."
      );
    }
  };

  useEffect(() => {
    if (login === "0") router.push("/Login");
    // Fetch jobs data when the component mounts
  }, [login]);

  return (
    <>
      {confet && <Confetti />}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 h-full to-slate-800">
        <div className="pt-20 mb-5">
          <button
            onClick={() => setisOpenDashboard(true)}
            className=" my-5 flex ml-auto mr-3  px-2 py-1 text-[10px] md:text-sm text-white bg-slate-700 hover:bg-slate-600 rounded-md border border-black"
          >
            Dashboard
          </button>
        </div>

        <div className="container mx-auto p-4 md:py-24">
          <div className="bg-slate-800 shadow-2xl rounded-lg w-full max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-cyan-500 justify-between">
              Post a New Job{" "}
              <BsFillInfoCircleFill
                onClick={() => setInfoPopup(true)}
                className="text-white "
              />
            </h2>
            <p className="text-yellow-500 mb-6">
              Fill out the form below to post a new job opening.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="mb-4">
                <label
                  htmlFor="jobType"
                  className="block text-white font-medium mb-1"
                >
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  <option value="" disabled>
                    Select job type
                  </option>
                  <option value="Full-time">Full-time</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="jobTitle"
                  className="block text-white font-medium mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="e.g. Senior React Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-white font-medium mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="e.g. Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="companyName"
                  className="block text-white font-medium mb-1"
                >
                  Company Website URL
                </label>
                <input
                  type="url"
                  id="companyUrl"
                  name="companyUrl"
                  placeholder="e.g. https://www.acme.com"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-white font-medium mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. New York, NY or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jobDescription"
                  className="block text-white font-medium mb-1"
                >
                  Job Description
                </label>
                <textarea
                  type="text"
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Describe the job role, responsibilities(limit 500 characters)"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  maxLength={500}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="salaryType"
                  className="block text-white font-medium mb-1"
                >
                  Salary Type
                </label>
                <select
                  id="salaryType"
                  name="salaryType"
                  value={salaryType}
                  onChange={(e) => setsalaryType(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  <option value="" disabled>
                    Select salary type
                  </option>
                  <option value="LPA">Annual Salary (LPA)</option>
                  <option value="Per Month">Monthly Salary </option>
                  <option value="Per Hour">Hourly based</option>
                  <option value="Per Project">Project Based </option>
                  <option value="non">Confidential </option>
                </select>
              </div>

              {(salaryType == "" || salaryType != "non") && (
                <div className="flex justify-between gap-x-1">
                  <div className="mb-4">
                    <label
                      htmlFor="minSalary"
                      className="block text-white font-medium mb-1"
                    >
                      Min Salary
                    </label>
                    <input
                      type="text"
                      id="minSalary"
                      name="minSalary"
                      placeholder="Min salary"
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      pattern="^(0(\.\d+)?|[1-9]\d*(\.\d+)?)$" // Regex for positive and non-negative numbers
                      title="Enter a valid number, e.g., 0.2, 0.24, 1, 2, 2.3"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="maxSalary"
                      className="block text-white font-medium mb-1"
                    >
                      Max Salary
                    </label>
                    <input
                      type="text"
                      id="maxSalary"
                      name="maxSalary"
                      placeholder="Max salary"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      pattern="^(0(\.\d+)?|[1-9]\d*(\.\d+)?)$" // Regex for positive and non-negative numbers
                      title="Enter a valid number, e.g., 0.2, 0.24, 1, 2, 2.3"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="experience"
                  className="block text-white font-medium mb-1"
                >
                  Experience
                </label>
                <input
                  type="number"
                  id="exp"
                  name="exp"
                  placeholder="Experience in years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="requirements"
                  className="block text-white font-medium mb-1"
                >
                  Requirements
                </label>
                <textarea
                  type="text"
                  id="requirements"
                  name="requirements"
                  placeholder="List the required skills, experience etc.(limit 500 characters)"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  required
                  maxLength={500}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {spinner ? (
                  <ClipLoader size={20} className="mx-5" color="#ffffff" />
                ) : (
                  "Post a Job"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Dashboard isOpen={isopenDashboard} onClose={handleClose} />
      <Goodpopup isOpen={isOpenP} message={msg} onClose={handleClose} />
      <ErrorPopup isOpen={isOpen} message={msg} onClose={handleClose} />
      {infoPopup && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg border-black border  shadow-lg max-w-[95%] md:max-w-[80%] w-full space-y-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setInfoPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-gray-200 px-2 rounded-md"
            >
              ✕
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[80vh] space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-black rounded-md text-white md:py-2">
                  How To Post a Job
                </h2>
                <div className="gap-x-3 items-center text-left justify-between mt-5 md:flex space-y-10 md:space-y-0">
                  <div className="space-y-2 w-full">
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Job Title : Provide a clear and concise title (e.g.,
                      "Software Engineer").
                    </h1>
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Company Name: Enter the name of your organization.
                    </h1>
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Location: Mention the city or region of the job posting.
                    </h1>
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Job Description: (Max 300 characters) Describe the role,
                      responsibilities, and key expectations concisely. For
                      example: "We&apos;re seeking a motivated Software Engineer
                      to design&sbquo; develop&sbquo; and maintain scalable
                      applications. Strong problem-solving skills and experience
                      in React are preferred."
                    </h1>
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Salary Range: Provide a minimum and maximum salary (e.g.,
                      6LPA&ndash;10LPA/year).
                    </h1>
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Experience: Specify the required years of experience
                      (e.g., "5 years").
                    </h1>
                    <h1 className="text-xs md:text-sm  bg-gray-100 rounded-md px-1">
                      Requirements: (Max 300 characters) Highlight the necessary
                      qualifications and skills: "Bachelor&apos;s degree in
                      Computer Science or equivalent. Proficiency in JavaScript
                      and experience with Node.js and MongoDB required."
                    </h1>
                    <h1 className="text-xs md:text-sm  font-semibo d bg-gray-100 rounded-md px-1 ">
                      Note: Use clear, engaging language and avoid jargon to
                      attract a wider pool of talent.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
