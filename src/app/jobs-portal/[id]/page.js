"use client";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Loading from "@/components/BlogLoader/load.js";
import { useParams, useRouter } from "next/navigation";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { LuTarget } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import Goodpopup from "@/components/goodPopup/goodPopup";
import { ClipLoader } from "react-spinners";
import ErrorPopup from "@/components/errorPopup/errorPopup";
import { Montserrat, Quicksand, Sanchez } from "next/font/google";
import { useLogin } from "@/store/login";
import Link from "next/link";

const font = Sanchez({
  weight: "400",
  subsets: ["latin"],
});
const BlogDetails = () => {
  const { id } = useParams(); // Use destructuring to access the 'id' parameter
  const [job, setJob] = useState(null); // State to store the specific blog
  const [loader, setLoader] = useState(true);
  const [application_data, setApplication_Data] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const { profile, profile_setup, user_ID,identity } = useLogin((state) => ({
    profile: state.profile,
    identity : state.identity,
    profile_setup: state.profile_setup,
    user_ID: state.user_ID,
  }));
  const [isOpenP, setIsOpenp] = useState(false);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    setIsOpenp(false);
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`/api/application`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Application data", data.application);
      setApplication_Data(data.application);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const applied = async (job_id) => {
    // Check if user has a profile
    if (!profile) {
      setIsOpen(true);
      setMsg(
        "To get started, please set up your profile by providing the necessary details."
      );
      router.push("/Profile");
      return;
    }
    setSpinner(true);
    // Log or process the job ID and user ID
    console.log("Job ID:", job_id);
    console.log("User ID:", user_ID);
    const credentials = { job_id, user_ID };
    const res = await fetch("/api/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
      },
      body: JSON.stringify(credentials), // <-- fix: send the user object directly
    });

    const data = await res.json();
    console.log("job Data:", data);
    if (data.success) {
      setIsOpenp(true);
      setMsg(
        "Congratulations! You have successfully applied for the job, and your profile details have been shared with the hiring team"
      );
      fetchApplications();
      setSpinner(false);
    }

    // Additional logic to submit the application can go here
    // For example, making an API call to save the job application
  };

  useEffect(() => {
    console.log("running id ", id);
    const fetchData = async () => {
      const res = await fetch(`/api/jobposts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch blogs.");
        setLoader(false);
        return;
      }

      const data = await res.json();
      console.log(data.job_data);

      // Find the blog with the matching blog_id
      const filteredBlog = data.job_data.find((job) => job._id === id);
      setJob(filteredBlog); // Set the specific blog
      setLoader(false); // Turn off the loader
    };
    fetchApplications();
    fetchData();
  }, [id]);

  return (
    <>
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 h-full to-slate-800">
        {loader ? (
          <Loading />
        ) : job ? (
          // Calculate hasApplied before returning JSX
          (() => {
            const hasApplied = application_data.some(
              (application) =>
                application.jobId === job._id &&
                application.candidateId === user_ID
            );

            return (
              <div className="py-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 min-h-screen">
                <section className="border  border-gray-500 bg-slate-800 mx-[2%] md:mx-[10%] space-y-5 rounded-lg p-5">
                  <div className="flex justify-between items-center">
                    <h1 className="text-cyan-500 md:text-2xl">
                      {job.job_title}
                    </h1>
                    <h1 className="px-2 py-1 text-[10px] md:text-sm text-white bg-slate-700 rounded-md ">
                      Posted on :{" "}
                      {new Date(job.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </h1>
                  </div>

                  <div className="flex justify-between items-center my-2">
                    <Link href={job.companyUrl} target="_blank" rel="noopener">
                      <h1 className="flex items-center gap-x-2 text-yellow-500 text-sm md:text-lg">
                        <PiBuildingApartmentDuotone />
                        {job.company_name}
                      </h1>
                    </Link>
                    {!job.applylink && (
                      <button
                      onClick={() => {
                        if (identity !== "candidate") {
                          alert("Only candidates can apply."); // Optional: Add a message for feedback
                          return;
                        }
                        applied(job._id); // Call the function if the condition is met
                      }}
                       
                        className={`bg-pink-500 hover:bg-pink-600 text-sm text-white py-2 px-3 rounded-lg ${
                          hasApplied
                            ? "cursor-not-allowed opacity-50"
                            : "hover:text-gray-300"
                        }`}
                      >
                        {hasApplied ? (
                          "Already Applied"
                        ) : spinner ? (
                          <ClipLoader
                            size={20}
                            className="mx-5"
                            color="#ffffff"
                          />
                        ) : (
                          <h1 className="flex  items-center gap-x-2">
                            Apply Now 
                          </h1>
                        )}
                      </button>
                    )}

                    {job.applylink && (
                      <a
                        href={
                          job.applylink.includes("@")
                            ? `mailto:${job.applylink}` // Set mailto if it's an email
                            : job.applylink // Use as-is if it's a proper URL
                        }
                        target={
                          job.applylink.includes("@") ? "_self" : "_blank"
                        } // Open in a new tab for URLs, same tab for mailto
                        rel={
                          job.applylink.includes("@")
                            ? undefined
                            : "noopener noreferrer"
                        } // Add security for external links
                      >
                        <button
                          className={`bg-pink-500 hover:bg-pink-600 text-sm text-white py-2 px-3 rounded-lg`}
                          
                        >
                          <h1 className="flex items-center gap-x-2">
                            Apply Now
                          </h1>
                        </button>
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {job.salaryType !== "non" && job.salaryType !== "" && (
                      <div className="bg-slate-700/30 p-5 rounded-lg flex items-center">
                        <div>
                          <div className="text-sm text-slate-400">
                            Salary Range
                          </div>
                          <div className="text-slate-200">
                            Salary: ₹ {job.minSalary}{" "}
                            {job.salaryType !== "LPA" ? "" : "LPA"} - ₹{" "}
                            {job.maxSalary}{" "}
                            {job.salaryType !== "LPA" ? "" : "LPA"}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-700/30 p-4 rounded-lg flex items-center">
                      <div>
                        <div className="text-sm text-slate-400">Location</div>
                        <div className="text-slate-200">{job.location}</div>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg flex items-center">
                      <div>
                        <div className="text-sm text-slate-400">Job type</div>
                        <div className="text-slate-200">{job.jobType}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
                    <h1 className="flex items-center gap-x-2 text-white font-bold md:text-xl">
                      Experience :{" "}
                      {job.experience == 0
                        ? "Freshers"
                        : `${job.experience}+ years`}
                    </h1>
                  </div>

                  <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
                    <h1 className="flex items-center gap-x-2 text-white font-bold md:text-xl">
                      <LuTarget className="text-cyan-500" />
                      Job Description
                    </h1>
                    <h1 className="text-slate-300 text-sm leading-relaxed">
                      {job.job_description}
                    </h1>
                  </div>

                  <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
                    <h1 className="flex items-center gap-x-2 text-white font-bold md:text-xl">
                      <GoPeople className="text-cyan-500" />
                      Job Requirements
                    </h1>
                    <h1 className="text-slate-300 text-sm leading-relaxed">
                      {job.requirements}
                    </h1>
                  </div>

               {job.referralid && job.referralname && <div className="grid  grid-cols-2 text-center gap-x-5 text-white ">
                  <h1 className="bg-slate-700/30 p-4 rounded-lg">Referral ID : {job.referralid} </h1>
                  <h1 className="bg-slate-700/30 p-4 rounded-lg">Referral Name : {job.referralname} </h1>
                  
                </div>}

                </section>
              </div>
            );
          })()
        ) : (
          <p>Job not found.</p>
        )}
      </div>

      <Goodpopup isOpen={isOpenP} message={msg} onClose={handleClose} />
      <ErrorPopup isOpen={isOpen} message={msg} onClose={handleClose} />
    </>
  );
};

export default BlogDetails;
