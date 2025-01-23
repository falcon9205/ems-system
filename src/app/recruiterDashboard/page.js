"use client";
import { useLogin } from "@/store/login";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import Load from "@/components/BlogLoader/load";
import { FaLinkedin } from "react-icons/fa";
import { RiFolderDownloadFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Dashboard = ({ isOpen, onClose }) => {
  const router = useRouter()
  const [postedJobs, setPostedJobs] = useState([]);
  const login = useLogin((state) => state.login);
  const user_ID = useLogin((state) => state.user_ID);
  const [application, setApplication] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Rejected,setrejected]  = useState("Rejected")
  const [Shortlist,setshortlist] = useState("Shortlist") 
  const [table, setTable] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const fetchJobsData = async () => {
    try {
      const res = await fetch(`/api/jobposts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Data coming from db:", data.job_data);
      setPostedJobs(
        data.job_data.filter((job) => job.recruiter_id === user_ID)
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching jobs:", error);
    }
  };
  const fetchApplications = async () => {
    try {
      const res = await fetch(`/api/application`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Data coming from applications:", data.application);
      setApplication(data.application);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const updateCandidate = async (status, candidateId, jobId) => {
    console.log("from frontend",status, candidateId, jobId);
    // if(status == "0")
    //   setshortlist("...")
    // else(status == "1")
    //   setrejected("...") 
    setSpinner(true)
    try {
      const datapack = { status, candidateId, jobId };
      const res = await fetch("/api/profileviewmail", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify(datapack), // Send the ID of the job to delete
      });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }

      const data = await res.json();
      console.log("Application Delete Response:", data);
      // Refetch jobs after deletion
      fetchApplications();
      profileInfo();
      setSpinner(false)
    } catch (error) {
      console.log("Error while deleting this job", error);
      setSpinner(false)
    }
  };

  const profileInfo = async (id) => {
    console.log("Job ID:", id);
    const filteredInfo = application.filter((data) => data.jobId === id);
    setInfo(filteredInfo);
    console.log("from the table ", info);

    setTable(true); // Display the table
  };

  const removepost = async (id) => {
    try {
      const res = await fetch("/api/jobposts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify({ id }), // Send the ID of the job to delete
      });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }

      const data = await res.json();
      console.log("Job Delete Response:", data);
      fetchJobsData(); // Refetch jobs after deletion
    } catch (error) {
      console.log("Error while deleting this job", error);
    }
  };

  const handleClick = (jobid) => {
    router.push(`/jobs-portal/${jobid}`);
  };

  useEffect(() => {
    if (isOpen) {
      fetchJobsData();
      fetchApplications();
      console.log("running effect");
      setTable(false);
    }
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <div className="fixed backdrop-blur-lg bg-black  inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 p-6 rounded-lg border-black border  shadow-lg max-w-[95%] md:max-w-[80%] w-full space-y-6 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-gray-200 px-2 rounded-md"
            >
              ✕
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[80vh] space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 rounded-full text-white md:py-2">
                  Jobs Posted
                </h2>
                <div className="md:flex gap-x-3 items-center justify-between mt-5">
                  {loading ? (
                    <Load />
                  ) : (
                    <>
                      {table ? (
                        <div className="w-full">
                          <div className="mx-auto flex  justify-between">
                            <h1 className="text-2xl text-gray-300 font-semibold">
                              Candidates Data
                            </h1>
                            <button
                              onClick={() => setTable(false)}
                              className="bg-gray-300 px-2 rounded-md"
                            >
                              <IoMdArrowRoundBack />
                            </button>
                          </div>

                          <table className="w-full my-5">
                            <thead>
                              <tr>
                                <th className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">
                                  Full Name
                                </th>
                                <th className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">
                                  Experience
                                </th>
                                {/* <th className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">Job ID</th> */}
                                <th className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">
                                  LinkedIn{" "}
                                </th>
                                <th className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">
                                  Resume
                                </th>
                                <th className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {info.map((candidate) => (
                                <tr key={candidate.candidateId}>
                                  <td className="border border-gray-400 p-2 text-[8px] text-gray-300 md:text-sm">
                                    {candidate.fullname}
                                  </td>
                                  <td className="border border-gray-400 p-2 text-[8px] text-gray-300 md:text-sm">
                                    {candidate.experience}
                                  </td>
                                  {/* <td className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm">{candidate.jobId}</td> */}
                                  <td className="border border-gray-400 p-2 text-[8px] text-gray-300 md:text-sm">
                                    <a
                                      href={candidate.linkedinProfile}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FaLinkedin className="mx-auto text-xl text-blue-700" />
                                    </a>
                                  </td>
                                  <td className="border border-gray-400 p-2 text-[8px] text-gray-300 md:text-sm">
                                    <a
                                      href={candidate.resumeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <RiFolderDownloadFill className="mx-auto text-xl text-green-700" />
                                    </a>
                                  </td>
                                  <td className="border border-gray-400 p-2 text-[8px] text-cyan-500 md:text-sm md:flex items-center space-y-1 md:space-y-0 justify-center gap-x-2">
                                    <h1
                                      onClick={() =>
                                        updateCandidate(
                                          "0",
                                          candidate.candidateId,
                                          candidate.jobId
                                        )
                                      }
                                      className="text-green-600 bg-gray-200 hover:bg-gray-300 px-2 rounded-sm   border border-gray-400"
                                    >
                                      {spinner ? <ClipLoader size={10} className="mx-5" color="#ffffff" /> : "Shortlist"}
                                    </h1>
                                    <h1
                                      onClick={() =>
                                        updateCandidate(
                                          "1",
                                          candidate.candidateId,
                                          candidate.jobId
                                        )
                                      }
                                      className="text-red-600 bg-gray-200 hover:bg-gray-300 px-2  rounded-sm   border border-gray-400"
                                    >
                                       {spinner ? <ClipLoader size={10} className="mx-5" color="#ffffff" /> : "Rejected"}
                                    </h1>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5 w-full">
                          {postedJobs.map((job) => {
                            const appliedCount = application.filter(
                              (data) => data.jobId === job._id
                            ).length;

                            return (
                              <div
                                key={job._id}
                                className="job-card space-y-2 rounded-xl border border-gray-700 shadow-2xl bg-slate-800 p-5 text-gray-600"
                              >
                                {/* Job Title and Delete Button */}
                               <div className="flex items-center justify-between md:text-2xl text-xl"><div> <h2 className="md:text-2xl text-xl text-cyan-500 font-semibold flex items-center gap-x-2
                              ">
                                  {job.job_title} <FaArrowUpRightFromSquare onClick={()=>{handleClick(job._id)}}  color="white" className="md:text-xl "/></h2></div>
                                  <MdDelete
                                    onClick={() => removepost(job._id)}
                                    className="cursor-pointer"
                                    color="red"
                                  /></div>
                                

                                {/* Company Name */}
                                <p className="text-sm md:text-lg text-yellow-500 flex items-center gap-x-2">
                                  <PiBuildingApartmentDuotone />{" "}
                                  {job.company_name}
                                </p>

                                {/* Job Location */}
                                <p className="text-xs md:text-sm text-gray-400  border-b- p-1 rounded-md flex items-center gap-x-2 mt-5">
                                  <CiLocationOn /> {job.location}
                                </p>

                                {/* Job Description */}
                                {/* <p className="text-xs md:text-sm text-gray-400  border-b- p-1 rounded-md flex text-left items-center gap-x-2 mt-1">
                                  Description: {job.job_description}
                                </p> */}

                                {/* Salary Range */}
                                <p className="text-xs md:text-sm text-gray-400  border-b- p-1 rounded-md flex items-center gap-x-2 mt-1">
                                  Salary: {job.minSalary} {job.salaryType!== "LPA"?"":"LPA"} - {job.maxSalary} {job.salaryType=="non"?"Confidential":job.salaryType}
                        
                                </p>

                                {/* Experience Required */}
                                <p className="text-xs md:text-sm text-gray-400  border-b- p-1 rounded-md flex items-center gap-x-2 mt-1">
                                  Experience: {job.experience} years
                                </p>

                                {/* Job Requirements */}
                                {/* <p className="text-xs md:text-sm text-gray-400  border-b- p-1 rounded-md flex text-left items-center gap-x-2 mt-1">
                                  Requirements: {job.requirements}
                                </p> */}

                                {/* Candidates Applied Button */}
                                <button
                                  onClick={() => profileInfo(job._id)}
                                  className="bg-[#275DF5] font-bold text-gray-100 mx-auto flex rounded-md px-2 py-1"
                                >
                                  {appliedCount} Candidates Applied
                                </button>
                              </div>
                            );
                          })}
                        </section>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
