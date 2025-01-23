"use client";
import React, { useEffect, useState } from "react";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useLogin } from "@/store/login";
import Load from "@/components/BlogLoader/load";
import Goodpopup from "@/components/goodPopup/goodPopup";
import { ClipLoader } from "react-spinners";
import ErrorPopup from "@/components/errorPopup/errorPopup";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import Fuse from "fuse.js";

const Page = () => {
  const router = useRouter();
  const [postedJobs, setPostedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState("");
  const { profile, profile_setup, user_ID } = useLogin((state) => ({
    profile: state.profile,
    profile_setup: state.profile_setup,
    user_ID: state.user_ID,
  }));
  const [exp , setexp] = useState("")
  const [isOpenP, setIsOpenp] = useState(false);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [application, setApplication] = useState([]);
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
      console.log("Data coming from applications:", data.application);
      setApplication(data.application);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fuseOptions = {
    keys: ["job_title"],
    threshold: 0.4,
  };

  const fuse = new Fuse(postedJobs, fuseOptions);

  const fetchJobsData = async (jobType) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/jobposts`, {
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
      console.log("fdata",data);
      
      
      if (jobType === "") {
        const filterdata = data.job_data
        filterdata.reverse()
        setPostedJobs(filterdata);
        
      } else if (jobType === "Referral") {
        console.log("Runing referal code");
        
        const filterdata = data.job_data.filter((job) => job.companyUrl ==="");
        setFilteredJobs(filterdata);
        setPostedJobs(filterdata)
        
        
      } else {
        const filterdata = data.job_data.filter((job) => job.jobType === jobType);
        setPostedJobs(filterdata);
      }

      if(exp!=="")
      {
        const filterdata =postedJobs.filter((job) => job.experience === exp);
        setPostedJobs(filterdata);
      }
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredJobs(postedJobs);
    } else {
      const result = fuse.search(searchQuery).map(({ item }) => item);
      setFilteredJobs(result);
    }
  };

  useEffect(() => {
    handleSearch(searchData);
    console.log("updating",postedJobs);
    
  }, [searchData, postedJobs]);

  useEffect(() => {
    fetchJobsData(jobType);
    fetchApplications();
  }, [jobType,exp]);

  const handleClick = (jobid) => {
    router.push(`/jobs-portal/${jobid}`);
  };

  return (
    <>
      <div className=" h-full">
        <h1 className="text-2xl pt-20  md:py-20 md:text-7xl text-center font-bold text-white pb-5 md:pb-10">
          iLearnings Certified Jobs
        </h1>

        <div className="mb-4 flex flex-col md:flex-row mx-auto items-center justify-center space-y-3 md:space-y-0 md:space-x-4 w-full md:px-[5%]">
          <input
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            type="search"
            className="px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none w-[90%] md:w-full focus:ring focus:ring-indigo-200"
            placeholder="🔍 Search "
          />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 bg-slate-700 text-white w-[90%] md:w-auto"
          >
            <option value="" disabled>
              Select job type
            </option>
            <option value="Full-time">Full-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Referral">Referral</option>
          </select>
          <select
            value={exp}
            onChange={(e) =>setexp(e.target.value)}
            className="px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 bg-slate-700 text-white w-[90%] md:w-auto"
          >
            <option value="" disabled>
              Experience
            </option>
            <option value="0">Freshers</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
          </select>
        </div>

        {loading ? (
          <Load />
        ) : (
          <section className="mx-5 md:mx-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-5">
  {filteredJobs.map((job) => {
    const appliedCount = application.filter(
      (data) => data.jobId === job._id
    ).length;

    return (
      <div
        key={job._id}
        onClick={() => handleClick(job._id)}
        className="job-card space-y-2 rounded-xl cursor-pointer bg-slate-700 p-5 text-white"
      >
        <h2 className="md:text-2xl text-cyan-400 font-semibold">
          {job.job_title}
        </h2>
        <Link
          href={job.companyUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-sm md:text-lg text-yellow-500">
            {job.company_name}
          </p>
        </Link>
        <p className="text-xs md:text-sm flex items-center gap-x-1">
          <CiLocationOn /> {job.location}
        </p>
        <p className="text-xs md:text-sm flex items-center gap-x-1">
          Experience:{" "}
          {job.experience === 0 ? "Freshers" : `${job.experience}+ years`}
        </p>
        <div className="flex gap-x-2">
          <button
            onClick={() => handleClick(job._id)}
            className="bg-[#275DF5] hover:bg-blue-700 mt-2 text-gray-100 flex rounded-md px-2 py-1 items-center gap-x-1"
          >
            Get Info <FaArrowRightLong />
          </button>

          {/* Show applied count only if companyUrl exists */}
          {job.companyUrl && (
            <h1
              className="bg-slate-800 mt-2 text-gray-100 flex rounded-md px-2 py-1 items-center gap-x-1"
            >
              {appliedCount} Applied
            </h1>
          )}
        </div>
      </div>
    );
  })}
</section>

        )}

        <Goodpopup isOpen={isOpenP} message={msg} onClose={handleClose} />
        <ErrorPopup isOpen={isOpen} message={msg} onClose={handleClose} />
      </div>
    </>
  );
};

export default Page;
