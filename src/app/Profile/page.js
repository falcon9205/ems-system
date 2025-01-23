"use client";

import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BsUpload } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { useLogin } from "@/store/login";
import { useRouter } from "next/navigation";
import Loader from "@/components/BlogLoader/load";
import Link from "next/link";
import ErrorPopup from "@/components/errorPopup/errorPopup";
import Goodpopup from "@/components/goodPopup/goodPopup";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import Confetti from "@/components/confetti/confetti";

export default function ProfileSetup() {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
    console.log("Skills data ", skills);
  };
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };
  const { identity, user_ID, profile, profile_setup } = useLogin((state) => ({
    identity: state.identity,
    user_ID: state.user_ID,
    profile: state.profile,
    profile_setup: state.profile_setup,
  }));
  const { rename, login, set_User_info, login_Credential } = useLogin(
    (state) => ({
      rename: state.rename,
      login: state.login,
      login_Credential: state.login_Credential,

      set_User_info: state.set_User_info,
    })
  );
  const [confet, setconfet] = useState(false);
  const [profile_slogan, setProfile_slogan] = useState("Set Up Your Profile");
  // Form Data
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [experience, setExperience] = useState("");
  const [state, setState] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [AreaOfExpertise, setAreaOfExpertise] = useState("");
  const [freeSessionLink, setFreeSessionLink] = useState("");
  const [language, setLanguage] = useState("");
  const [Industry, setIndustry] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");

  const [phone, setphone] = useState("");
  const [location, setLocation] = useState("");
  const [intro, setIntro] = useState("");
  const [gender, setgender] = useState("");
  const [isOpenP, setIsOpenp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setIsOpen(false);
    setIsOpenp(false);
  };
  const linkedinProfileRegex =
    /^https:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
  const linkedinCompanyRegex =
    /^https:\/\/(www\.)?linkedin\.com\/company\/[a-zA-Z0-9_-]+\/?$/;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setIsSubmitDisabled(!(termsAccepted && dataConsent));
  }, [termsAccepted, dataConsent]);

  const validateLinkedinURL = (url) => {
    return linkedinProfileRegex.test(url);
  };
  const validateLinkedInCompany = (url) => {
    return linkedinCompanyRegex.test(url);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const identity = Cookies.get("identity");

    if (token && id && identity) {
      console.log("running cookies if");
      login_Credential("1");
      set_User_info(id);
      rename(identity);
    }

    if (!user_ID) router.push("/Login");
    console.log(profile);
  }, [identity, user_ID, profile]);

  const handleUploadSuccess = (result) => {
    setImageUrl(result.info.secure_url);
    console.log("Image uploaded:", result.info.secure_url);
    document.body.style.overflow = "auto";
  };

  const handleUploadSuccessPdf = (result) => {
    setResumeUrl(result.info.secure_url);
    console.log("Resume uploaded:", result.info.secure_url);
    document.body.style.overflow = "auto";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      identity !== "recruiter" &&
      identity !== "referral" &&
      (!imageUrl || !resumeUrl)
    ) {
      setIsOpen(true);
      setMsg(
        "To complete your profile, we kindly request you to fill all the details"
      );
      return;
    }
    // else if(identity =="recruiter" && !validateLinkedInCompany(linkedinProfile)){
    //   setIsOpen(true)
    //   setMsg("Please enter a valid Company LinkedIn profile URL.")
    //   return
    // }
    else if (identity =="candidate" && skills.length==0){
      setIsOpen(true);
      setMsg("Please mention your skills.");
      return;
    }
    else if (identity == "candidate" && !validateLinkedinURL(linkedinProfile)) {
      setIsOpen(true);
      setMsg("Please enter a valid LinkedIn profile URL.");
      return;
    } else if (
      identity == "referral" &&
      !validateLinkedinURL(linkedinProfile)
    ) {
      setIsOpen(true);
      setMsg("Please enter a valid LinkedIn profile URL.");
      return;
    } else if (!imageUrl) {
      setIsOpen(true);
      setMsg(
        "To complete your profile, we kindly request you to fill all the details"
      );
      return;
    } else {
      setSpinner(true);
      try {
        if (identity === "candidate") {
          const user = {
            fullname,
            user_ID,
            dob,
            address,
            highestQualification,
            university,
            graduationYear,
            experience,
            state,
            intro,
            skills,
            linkedinProfile,
            portfolio,
            imageUrl,
            resumeUrl,
            country: selectedCountry,
            gender,
          };
          console.log(user);

          const res = await fetch(`/api/candidate_profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
            body: JSON.stringify(user),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          setconfet(true);
          setTimeout(() => {
            setconfet(false);
            router.push("/jobs-portal");
          }, 5000);
          setIsOpenp(true);
          setMsg("Your profile has been successfully updated");
          profile_setup(true);

          console.log(user);
        } else if (identity === "trainer") {
          console.log("running trainer code");

          const user = {
            fullname,
            user_ID,
            AreaOfExpertise,
            highestQualification,
            freeSessionLink,
            graduationYear,
            experience,
            state,
            linkedinProfile,
            portfolio,
            imageUrl,
            resumeUrl,
            language,
            country: selectedCountry,
            gender,
          };
          console.log(user);

          const res = await fetch(`/api/trainer_profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
            body: JSON.stringify(user),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          setIsOpenp(true);
          setMsg("Your profile has been successfully updated");
          profile_setup(true);
          router.push("/TrainerHub");
          console.log("trainer data", user);
        } else if (identity === "recruiter") {
          const user = {
            fullname,
            user_ID,
            imageUrl,
            Industry,
            phone,
            country: selectedCountry,
            state,
            linkedinProfile,
            gender,
          };
          console.log(user);
          console.log("running recruiter fetch api");

          const res = await fetch(`/api/recuiter_profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
            body: JSON.stringify(user),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          setconfet(true);
          setTimeout(() => {
            setconfet(false);
            router.push("/job-post");
          }, 5000);
          setIsOpenp(true);
          setMsg("Your profile has been successfully updated");
          profile_setup(true);

          console.log(user);
        } else if (identity === "referral") {
          const user = {
            fullname,
            user_ID,
            imageUrl,
            address,
            country: selectedCountry,
            dob,
            state,
            linkedinProfile,
            gender,
          };
          console.log(user);
          console.log("running referral fetch api");

          const res = await fetch(`/api/referral_profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
            body: JSON.stringify(user),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          setconfet(true);
          setTimeout(() => {
            setconfet(false);
            router.push("/referal-post");
          }, 5000);
          setIsOpenp(true);
          setMsg("Your profile has been successfully updated");
          profile_setup(true);

          console.log(user);
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
      setSpinner(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (identity === "candidate") {
          const res = await fetch(`/api/candidate_profile?user_ID=${user_ID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
          });

          // Check if the response is OK (status in the range 200-299)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          console.log("Data coming from db:", data.candidateProfile);

          if (data && data.candidateProfile) {
            setProfile_slogan("Edit Your Profile");
            setFullname(data.candidateProfile.fullname);
            setImageUrl(data.candidateProfile.imageUrl);
            setDob(data.candidateProfile.dob);
            setgender(data.candidateProfile.gender);
            setIntro(data.candidateProfile.intro);
            setAddress(data.candidateProfile.address);
            setPortfolio(data.candidateProfile.portfolio);
            setState(data.candidateProfile.state);
            setSelectedCountry(data.candidateProfile.country);
            setHighestQualification(data.candidateProfile.highestQualification);
            setUniversity(data.candidateProfile.university);
            setLinkedinProfile(data.candidateProfile.linkedinProfile);
            setGraduationYear(data.candidateProfile.graduationYear);
            setExperience(data.candidateProfile.experience);
            setResumeUrl(data.candidateProfile.resumeUrl);
            setSkills(data.candidateProfile.skills)
            profile_setup(true);
            
          }
        } else if (identity === "trainer") {
          const res = await fetch(`/api/trainer_profile?user_ID=${user_ID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
          });

          // Check if the response is OK (status in the range 200-299)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          console.log("Data coming from db:", data);

          if (data && data.trainerProfile) {
            setProfile_slogan("Edit Your Profile");
            setFullname(data.trainerProfile.fullname);
            setImageUrl(data.trainerProfile.imageUrl);
            setLanguage(data.trainerProfile.language);
            setAreaOfExpertise(data.trainerProfile.AreaOfExpertise);
            setState(data.trainerProfile.state);

            setSelectedCountry(data.trainerProfile.country);
            setPortfolio(data.trainerProfile.portfolio);
            setFreeSessionLink(data.trainerProfile.freeSessionLink);
            setHighestQualification(data.trainerProfile.highestQualification);
            setLinkedinProfile(data.trainerProfile.linkedinProfile);
            setGraduationYear(data.trainerProfile.graduationYear);
            setExperience(data.trainerProfile.experience);
            setResumeUrl(data.trainerProfile.resumeUrl);
            setLanguage(data.trainerProfile.setLanguage);
            setgender(data.trainerProfile.gender);
            profile_setup(true);
          }
        } else if (identity === "recruiter") {
          const res = await fetch(`/api/recuiter_profile?user_ID=${user_ID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
          });

          // Check if the response is OK (status in the range 200-299)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          console.log("Data coming from db:", data);

          if (data && data.recruiterProfile) {
            setProfile_slogan("Edit Your Profile");
            setFullname(data.recruiterProfile.fullname);
            setImageUrl(data.recruiterProfile.imageUrl);
            setIndustry(data.recruiterProfile.Industry);
            setphone(data.recruiterProfile.phone);
            setState(data.recruiterProfile.state);
            setSelectedCountry(data.recruiterProfile.country);
            setLinkedinProfile(data.recruiterProfile.linkedinProfile);
            setgender(data.recruiterProfile.gender);
            profile_setup(true);
          }
        } else if (identity === "referral") {
          const res = await fetch(`/api/referral_profile?user_ID=${user_ID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
            },
          });

          // Check if the response is OK (status in the range 200-299)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          console.log("Data coming from db:", data);

          if (data && data.referralProfile) {
            setProfile_slogan("Edit Your Profile");
            setFullname(data.referralProfile.fullname);
            setImageUrl(data.referralProfile.imageUrl);
            setAddress(data.referralProfile.address);
            setDob(data.referralProfile.dob);
            setState(data.referralProfile.state);
            setSelectedCountry(data.referralProfile.country);
            setLinkedinProfile(data.referralProfile.linkedinProfile);
            setgender(data.referralProfile.gender);
            profile_setup(true);
          }
        }
      } catch (error) {
        setIsOpen(true);
        setMsg(
          "Welcome to iLearnings! To get started, please create your profile by providing the following details:"
        );
        // You can set a loading state or an error message here if needed
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or error
      }
    };

    fetchData();
  }, [user_ID]); // Don't forget to add user_ID as a dependency if it's used in the effect

  const handleWidgetClose = () => {
    document.body.style.overflow = "auto";
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setState(""); // Reset state when country changes
  };
  const selectedCountryData = countries.find(
    (country) => country.name === selectedCountry
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {confet && <Confetti />}
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
            <div className="max-w-4xl mx-auto py-20 p-6 ">
              <h1 className="text-3xl text-center font-bold mb-6 text-cyan-500">
                {profile_slogan}
              </h1>

              {/* Image Upload */}
              {identity !== "blogger" && (
                <div className="my-5">
                  {imageUrl === null && (
                    <CldUploadWidget
                      uploadPreset={process.env.NEXT_PUBLIC_PROFILE_PRESET}
                      options={{
                        maxFiles: 1,
                        clientAllowedFormats: ["jpeg", "png", "jpg"],
                      }}
                      onSuccess={handleUploadSuccess}
                      onClose={handleWidgetClose}
                    >
                      {({ open }) => (
                        <div className="flex items-center justify-center gap-x-3">
                          <button
                            className="flex text-xs md:text-sm px-3 w-full py-3 border border-cyan-500 hover:bg-black text-yellow-500 rounded-md font-semibold"
                            onClick={() => open()}
                          >
                            Upload Profile Photo
                          </button>
                          <button onClick={() => open()}>
                            <BsUpload className="text-gray-600 bg-gray-300 w-10 h-10 rounded-full px-3" />
                          </button>
                        </div>
                      )}
                    </CldUploadWidget>
                  )}

                  {imageUrl !== null && (
                    <div>
                      <img
                        src={imageUrl}
                        className="h-44 w-44 rounded-full mx-auto object-cover"
                        alt="Profile"
                      />
                      <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_PROFILE_PRESET}
                        options={{
                          maxFiles: 1,
                          clientAllowedFormats: ["jpeg", "png", "jpg"],
                        }}
                        onSuccess={handleUploadSuccess}
                        onClose={handleWidgetClose}
                      >
                        {({ open }) => (
                          <div>
                            <button
                              className="text-yellow-500 mx-auto flex text-center"
                              onClick={() => open()}
                            >
                              Edit your photo
                            </button>
                          </div>
                        )}
                      </CldUploadWidget>
                    </div>
                  )}
                </div>
              )}

              {/* Resume Upload */}
              {identity !== "blogger" &&
                identity !== "recruiter" &&
                identity !== "referral" && (
                  <div className="my-5">
                    <CldUploadWidget
                      uploadPreset={process.env.NEXT_PUBLIC_RESUME_PRESET}
                      options={{
                        maxFiles: 1,
                        clientAllowedFormats: ["pdf"],
                      }}
                      onSuccess={handleUploadSuccessPdf}
                      onClose={handleWidgetClose}
                    >
                      {({ open }) => (
                        <div className="flex items-center justify-center gap-x-3">
                          <button
                            onClick={() => open()}
                            className="flex text-xs md:text-sm text-yellow-500 w-full px-3 py-3 border border-cyan-500 hover:bg-black hover:text-white rounded-md font-semibold"
                          >
                            Upload Resume
                          </button>
                          <button className="text-xs text-yellow-500 underline underline-offset-1">
                            {resumeUrl ? (
                              <Link href={resumeUrl} target="_blank">
                                Old Resume
                              </Link>
                            ) : (
                              <RiPagesLine className="text-gray-600 bg-gray-300 w-10 h-10 rounded-full px-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </CldUploadWidget>
                  </div>
                )}

              {/* form for candidates only */}
              {identity === "candidate" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Photo Upload */}

                    {/* Form Fields */}
                    <div>
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        id="text"
                        type="text"
                        value={fullname}
                        required
                        placeholder="Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        value={dob}
                        required
                        onChange={(e) => setDob(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        required
                        onChange={(e) => setgender(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Highest Qualification
                      </label>
                      <select
                        id="qualification"
                        value={highestQualification}
                        required
                        onChange={(e) =>
                          setHighestQualification(e.target.value)
                        }
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Qualification</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Diploma">Diploma</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="university"
                        className="block text-sm font-medium text-gray-300"
                      >
                        University Name
                      </label>
                      <input
                        id="university"
                        type="text"
                        value={university}
                        required
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="Enter university name"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="graduation"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Graduation Year
                      </label>
                      <input
                        id="graduation"
                        type="number"
                        value={graduationYear}
                        required
                        onChange={(e) => setGraduationYear(e.target.value)}
                        min="1900"
                        max="2099"
                        step="1"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Experience
                      </label>
                      <select
                        id="experience"
                        value={experience}
                        required
                        onChange={(e) => setExperience(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="1+ year">1+ year</option>
                        <option value="2+ years">2+ years</option>
                        <option value="4+ years">4+ years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>

                    <div>
                      {/* Country Selector */}
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Select Your Country
                      </label>
                      <select
                        id="country"
                        required
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                      >
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {/* State Selector */}
                      {selectedCountry && (
                        <>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-300 mt-4"
                          >
                            Select Your State
                          </label>
                          <select
                            id="state"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                          >
                            <option value="">Select a state</option>
                            {selectedCountryData &&
                              selectedCountryData.states.map((state, index) => (
                                <option key={index} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-gray-300"
                      >
                        LinkedIn Profile
                      </label>
                      <input
                        id="linkedin"
                        type="url"
                        value={linkedinProfile}
                        required
                        onChange={(e) => setLinkedinProfile(e.target.value)}
                        placeholder="Enter LinkedIn URL"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="portfolio"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Portfolio Website
                      </label>
                      <input
                        id="portfolio"
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="Enter portfolio URL (optional)"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Profile Bio
                      </label>
                      <textarea
                        id="intro"
                        value={intro}
                        required
                        onChange={(e) => setIntro(e.target.value)}
                        placeholder="Keep it short (Limit 500 Characters) eg. I am a fullstack Developer."
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center  gap-2 mb-4">
                   <div className=""><label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        placeholder="Mention your top skills"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 ml-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                      >
                        Add
                      </button></div> 
                    </div>

                    <div className="flex flex-wrap h-10 gap-2 mb-4">
                     
                      {skills.map((skill, index) => (
                        
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                          
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consent checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        required
                        onChange={() => setTermsAccepted(!termsAccepted)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I agree to the{" "}
                        <Link href="/Terms" className="text-yellow-500">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={dataConsent}
                        required
                        onChange={() => setDataConsent(!dataConsent)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="consent"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I consent to the storage of my data
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full py-3 text-white text-lg font-bold rounded-md ${
                      isSubmitDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}
                  >
                    Create Profile
                  </button>
                </form>
              )}

              {/*form for referral only */}
              {identity === "referral" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Photo Upload */}

                    {/* Form Fields */}
                    <div>
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        id="text"
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        required
                        onChange={(e) => setFullname(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        value={dob}
                        required
                        onChange={(e) => setDob(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        required
                        onChange={(e) => setgender(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      {/* Country Selector */}
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Select Your Country
                      </label>
                      <select
                        id="country"
                        required
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                      >
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {/* State Selector */}
                      {selectedCountry && (
                        <>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-300 mt-4"
                          >
                            Select Your State
                          </label>
                          <select
                            id="state"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                          >
                            <option value="">Select a state</option>
                            {selectedCountryData &&
                              selectedCountryData.states.map((state, index) => (
                                <option key={index} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-gray-300"
                      >
                        LinkedIn Profile
                      </label>
                      <input
                        id="linkedin"
                        type="url"
                        value={linkedinProfile}
                        required
                        onChange={(e) => setLinkedinProfile(e.target.value)}
                        placeholder="Enter LinkedIn URL"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Consent checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        required
                        onChange={() => setTermsAccepted(!termsAccepted)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I agree to the{" "}
                        <Link href="/Terms" className="text-yellow-500">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={dataConsent}
                        required
                        onChange={() => setDataConsent(!dataConsent)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="consent"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I consent to the storage of my data
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full py-3 text-white text-lg font-bold rounded-md ${
                      isSubmitDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}
                  >
                    Create Profile
                  </button>
                </form>
              )}

              {/* form for trainers only */}
              {identity === "trainer" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Photo Upload */}

                    {/* Form Fields */}
                    <div>
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        id="text"
                        type="text"
                        value={fullname}
                        required
                        placeholder="Enter your Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Area of Expertise
                      </label>
                      <select
                        id="AreaOfExpertise"
                        value={AreaOfExpertise}
                        required
                        onChange={(e) => setAreaOfExpertise(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select a field</option>
                        <option value="Full Stack Development">
                          Full Stack Development
                        </option>
                        <option value="Salesforce Admin">
                          Salesforce Admin
                        </option>
                        <option value="Python">Python</option>
                        <option value="Machine Learnings">
                          Machine Learnings
                        </option>
                        <option value="Java">Java</option>
                      </select>
                    </div>

                    <div>
                      {/* Country Selector */}
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Select Your Country
                      </label>
                      <select
                        id="country"
                        required
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                      >
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {/* State Selector */}
                      {selectedCountry && (
                        <>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-300 mt-4"
                          >
                            Select Your State
                          </label>
                          <select
                            id="state"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                          >
                            <option value="">Select a state</option>
                            {selectedCountryData &&
                              selectedCountryData.states.map((state, index) => (
                                <option key={index} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Highest Qualification
                      </label>
                      <select
                        id="qualification"
                        value={highestQualification}
                        required
                        onChange={(e) =>
                          setHighestQualification(e.target.value)
                        }
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Qualification</option>
                        <option value="Diploma">phD</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Graduate">Undergraduate</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        required
                        onChange={(e) => setgender(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="university"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Free Sessions links
                      </label>
                      <input
                        id="freeSessionLink"
                        type="url"
                        value={freeSessionLink}
                        onChange={(e) => setFreeSessionLink(e.target.value)}
                        placeholder="Enter session link"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="graduation"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Graduation Year
                      </label>
                      <input
                        id="graduation"
                        type="number"
                        value={graduationYear}
                        required
                        onChange={(e) => setGraduationYear(e.target.value)}
                        min="1999"
                        max="2026"
                        step="1"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Experience
                      </label>
                      <select
                        id="experience"
                        value={experience}
                        required
                        onChange={(e) => setExperience(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Experience</option>
                        <option value="1+ year">1+ years</option>
                        <option value="2+ year">2+ year</option>
                        <option value="5+ years">5+ years</option>
                        <option value="10+ years">10+ years</option>
                        <option value="15+ years">15+ years</option>
                        <option value="20+ years">20+ years</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Teaching Language
                      </label>
                      <select
                        id="language"
                        value={language}
                        required
                        onChange={(e) => setLanguage(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select a language</option>

                        <option value="hi">Hindi</option>

                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-gray-300"
                      >
                        LinkedIn Profile
                      </label>
                      <input
                        id="linkedin"
                        type="url"
                        value={linkedinProfile}
                        required
                        onChange={(e) => setLinkedinProfile(e.target.value)}
                        placeholder="Enter LinkedIn URL"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="portfolio"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Portfolio Website
                      </label>
                      <input
                        id="portfolio"
                        type="url"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="Enter portfolio URL (optional)"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Consent checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        required
                        onChange={() => setTermsAccepted(!termsAccepted)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I agree to the{" "}
                        <Link href="/Terms" className="text-yellow-500">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={dataConsent}
                        required
                        onChange={() => setDataConsent(!dataConsent)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="consent"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        I consent to the storage of my data
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full py-3 text-white text-lg font-bold rounded-md ${
                      isSubmitDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}
                  >
                    Create Profile
                  </button>
                </form>
              )}

              {identity === "blogger" && (
                <h1 className="text-center md:text-2xl">
                  As part of maintaining the integrity and structure of our
                  platform, bloggers do not have access to recreate or edit
                  their profiles. This policy ensures consistency across content
                  creator accounts and allows us to maintain a uniform
                  presentation of blog contributors.
                </h1>
              )}

              {identity === "recruiter" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Photo Upload */}

                    {/* Form Fields */}
                    <div>
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        id="text"
                        type="text"
                        value={fullname}
                        required
                        placeholder="Enter your Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Industry
                      </label>
                      <select
                        id="industry"
                        value={Industry}
                        required
                        onChange={(e) => setIndustry(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Industry</option>
                        <option value="Technology and IT">
                          Technology and IT
                        </option>
                        <option value="Healthcare and Pharmaceuticals">
                          Healthcare and Pharmaceuticals
                        </option>
                        <option value="Finance and Banking">
                          Finance and Banking
                        </option>
                        <option value="Manufacturing and Engineering">
                          Manufacturing and Engineering
                        </option>
                        <option value="Education">Education</option>
                        <option value="Media and Entertainment">
                          Media and Entertainment
                        </option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        required
                        onChange={(e) => setgender(e.target.value)}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="university"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Contact Phone no.
                      </label>
                      <input
                        id="phone"
                        type="number"
                        value={phone}
                        required
                        onChange={(e) => setphone(e.target.value.slice(0, 10))}
                        placeholder="phone"
                        maxLength={10}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      {/* Country Selector */}
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Select Your Country
                      </label>
                      <select
                        id="country"
                        required
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                      >
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {/* State Selector */}
                      {selectedCountry && (
                        <>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-300 mt-4"
                          >
                            Select Your State
                          </label>
                          <select
                            id="state"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm"
                          >
                            <option value="">Select a state</option>
                            {selectedCountryData &&
                              selectedCountryData.states.map((state, index) => (
                                <option key={index} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                          </select>
                        </>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Company Linkedin Profile
                      </label>
                      <input
                        id="linkedin"
                        type="url"
                        required
                        value={linkedinProfile}
                        onChange={(e) => setLinkedinProfile(e.target.value)}
                        placeholder="Enter company LinkedIn url"
                        className="mt-1 py-1 px-3 block w-full border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Consent checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        required
                        onChange={() => setTermsAccepted(!termsAccepted)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I agree to the{" "}
                        <Link href="/Terms" className="text-yellow-500">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={dataConsent}
                        required
                        onChange={() => setDataConsent(!dataConsent)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="consent"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        I consent to the storage of my data
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-full py-3 text-white text-lg font-bold rounded-md ${
                      isSubmitDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}
                  >
                    {spinner ? (
                      <ClipLoader size={20} className="mx-5" color="#ffffff" />
                    ) : (
                      "Create Profile"
                    )}
                  </button>
                </form>
              )}
            </div>{" "}
          </div>
        </>
      )}
      <Goodpopup isOpen={isOpenP} message={msg} onClose={handleClose} />
      <ErrorPopup isOpen={isOpen} message={msg} onClose={handleClose} />
    </>
  );
}

const countries = [
  {
    code2: "AF",
    code3: "AFG",
    name: "Afghanistan",
    capital: "Kabul",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "BDS",
        name: "Badakhshān",
        subdivision: null,
      },
      {
        code: "BGL",
        name: "Baghlān",
        subdivision: null,
      },
      {
        code: "BAL",
        name: "Balkh",
        subdivision: null,
      },
      {
        code: "BDG",
        name: "Bādghīs",
        subdivision: null,
      },
      {
        code: "BAM",
        name: "Bāmyān",
        subdivision: null,
      },
      {
        code: "DAY",
        name: "Dāykundī",
        subdivision: null,
      },
      {
        code: "FRA",
        name: "Farāh",
        subdivision: null,
      },
      {
        code: "FYB",
        name: "Fāryāb",
        subdivision: null,
      },
      {
        code: "GHA",
        name: "Ghaznī",
        subdivision: null,
      },
      {
        code: "GHO",
        name: "Ghōr",
        subdivision: null,
      },
      {
        code: "HEL",
        name: "Helmand",
        subdivision: null,
      },
      {
        code: "HER",
        name: "Herāt",
        subdivision: null,
      },
      {
        code: "JOW",
        name: "Jowzjān",
        subdivision: null,
      },
      {
        code: "KAN",
        name: "Kandahār",
        subdivision: null,
      },
      {
        code: "KHO",
        name: "Khōst",
        subdivision: null,
      },
      {
        code: "KNR",
        name: "Kunar",
        subdivision: null,
      },
      {
        code: "KDZ",
        name: "Kunduz",
        subdivision: null,
      },
      {
        code: "KAB",
        name: "Kābul",
        subdivision: null,
      },
      {
        code: "KAP",
        name: "Kāpīsā",
        subdivision: null,
      },
      {
        code: "LAG",
        name: "Laghmān",
        subdivision: null,
      },
      {
        code: "LOG",
        name: "Lōgar",
        subdivision: null,
      },
      {
        code: "NAN",
        name: "Nangarhār",
        subdivision: null,
      },
      {
        code: "NIM",
        name: "Nīmrōz",
        subdivision: null,
      },
      {
        code: "NUR",
        name: "Nūristān",
        subdivision: null,
      },
      {
        code: "PIA",
        name: "Paktiyā",
        subdivision: null,
      },
      {
        code: "PKA",
        name: "Paktīkā",
        subdivision: null,
      },
      {
        code: "PAN",
        name: "Panjshayr",
        subdivision: null,
      },
      {
        code: "PAR",
        name: "Parwān",
        subdivision: null,
      },
      {
        code: "SAM",
        name: "Samangān",
        subdivision: null,
      },
      {
        code: "SAR",
        name: "Sar-e Pul",
        subdivision: null,
      },
      {
        code: "TAK",
        name: "Takhār",
        subdivision: null,
      },
      {
        code: "URU",
        name: "Uruzgān",
        subdivision: null,
      },
      {
        code: "WAR",
        name: "Wardak",
        subdivision: null,
      },
      {
        code: "ZAB",
        name: "Zābul",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AX",
    code3: "ALA",
    name: "Åland Islands",
    capital: "Mariehamn",
    region: "Europe",
    subregion: "Northern Europe",
    states: [],
  },
  {
    code2: "AL",
    code3: "ALB",
    name: "Albania",
    capital: "Tirana",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "01",
        name: "Berat",
        subdivision: null,
      },
      {
        code: "09",
        name: "Dibër",
        subdivision: null,
      },
      {
        code: "02",
        name: "Durrës",
        subdivision: null,
      },
      {
        code: "03",
        name: "Elbasan",
        subdivision: null,
      },
      {
        code: "04",
        name: "Fier",
        subdivision: null,
      },
      {
        code: "05",
        name: "Gjirokastër",
        subdivision: null,
      },
      {
        code: "06",
        name: "Korçë",
        subdivision: null,
      },
      {
        code: "07",
        name: "Kukës",
        subdivision: null,
      },
      {
        code: "08",
        name: "Lezhë",
        subdivision: null,
      },
      {
        code: "10",
        name: "Shkodër",
        subdivision: null,
      },
      {
        code: "11",
        name: "Tiranë",
        subdivision: null,
      },
      {
        code: "12",
        name: "Vlorë",
        subdivision: null,
      },
    ],
  },
  {
    code2: "DZ",
    code3: "DZA",
    name: "Algeria",
    capital: "Algiers",
    region: "Africa",
    subregion: "Northern Africa",
    states: [
      {
        code: "01",
        name: "Adrar",
        subdivision: null,
      },
      {
        code: "16",
        name: "Alger",
        subdivision: null,
      },
      {
        code: "23",
        name: "Annaba",
        subdivision: null,
      },
      {
        code: "44",
        name: "Aïn Defla",
        subdivision: null,
      },
      {
        code: "46",
        name: "Aïn Témouchent",
        subdivision: null,
      },
      {
        code: "05",
        name: "Batna",
        subdivision: null,
      },
      {
        code: "07",
        name: "Biskra",
        subdivision: null,
      },
      {
        code: "09",
        name: "Blida",
        subdivision: null,
      },
      {
        code: "34",
        name: "Bordj Bou Arréridj",
        subdivision: null,
      },
      {
        code: "10",
        name: "Bouira",
        subdivision: null,
      },
      {
        code: "35",
        name: "Boumerdès",
        subdivision: null,
      },
      {
        code: "08",
        name: "Béchar",
        subdivision: null,
      },
      {
        code: "06",
        name: "Béjaïa",
        subdivision: null,
      },
      {
        code: "02",
        name: "Chlef",
        subdivision: null,
      },
      {
        code: "25",
        name: "Constantine",
        subdivision: null,
      },
      {
        code: "17",
        name: "Djelfa",
        subdivision: null,
      },
      {
        code: "32",
        name: "El Bayadh",
        subdivision: null,
      },
      {
        code: "39",
        name: "El Oued",
        subdivision: null,
      },
      {
        code: "36",
        name: "El Tarf",
        subdivision: null,
      },
      {
        code: "47",
        name: "Ghardaïa",
        subdivision: null,
      },
      {
        code: "24",
        name: "Guelma",
        subdivision: null,
      },
      {
        code: "33",
        name: "Illizi",
        subdivision: null,
      },
      {
        code: "18",
        name: "Jijel",
        subdivision: null,
      },
      {
        code: "40",
        name: "Khenchela",
        subdivision: null,
      },
      {
        code: "03",
        name: "Laghouat",
        subdivision: null,
      },
      {
        code: "29",
        name: "Mascara",
        subdivision: null,
      },
      {
        code: "43",
        name: "Mila",
        subdivision: null,
      },
      {
        code: "27",
        name: "Mostaganem",
        subdivision: null,
      },
      {
        code: "28",
        name: "Msila",
        subdivision: null,
      },
      {
        code: "26",
        name: "Médéa",
        subdivision: null,
      },
      {
        code: "45",
        name: "Naama",
        subdivision: null,
      },
      {
        code: "31",
        name: "Oran",
        subdivision: null,
      },
      {
        code: "30",
        name: "Ouargla",
        subdivision: null,
      },
      {
        code: "04",
        name: "Oum el Bouaghi",
        subdivision: null,
      },
      {
        code: "48",
        name: "Relizane",
        subdivision: null,
      },
      {
        code: "20",
        name: "Saïda",
        subdivision: null,
      },
      {
        code: "22",
        name: "Sidi Bel Abbès",
        subdivision: null,
      },
      {
        code: "21",
        name: "Skikda",
        subdivision: null,
      },
      {
        code: "41",
        name: "Souk Ahras",
        subdivision: null,
      },
      {
        code: "19",
        name: "Sétif",
        subdivision: null,
      },
      {
        code: "11",
        name: "Tamanghasset",
        subdivision: null,
      },
      {
        code: "14",
        name: "Tiaret",
        subdivision: null,
      },
      {
        code: "37",
        name: "Tindouf",
        subdivision: null,
      },
      {
        code: "42",
        name: "Tipaza",
        subdivision: null,
      },
      {
        code: "38",
        name: "Tissemsilt",
        subdivision: null,
      },
      {
        code: "15",
        name: "Tizi Ouzou",
        subdivision: null,
      },
      {
        code: "13",
        name: "Tlemcen",
        subdivision: null,
      },
      {
        code: "12",
        name: "Tébessa",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AS",
    code3: "ASM",
    name: "American Samoa",
    capital: "Pago Pago",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "AD",
    code3: "AND",
    name: "Andorra",
    capital: "Andorra la Vella",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "07",
        name: "Andorra la Vella",
        subdivision: null,
      },
      {
        code: "02",
        name: "Canillo",
        subdivision: null,
      },
      {
        code: "03",
        name: "Encamp",
        subdivision: null,
      },
      {
        code: "08",
        name: "Escaldes-Engordany",
        subdivision: null,
      },
      {
        code: "04",
        name: "La Massana",
        subdivision: null,
      },
      {
        code: "05",
        name: "Ordino",
        subdivision: null,
      },
      {
        code: "06",
        name: "Sant Julià de Lòria",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AO",
    code3: "AGO",
    name: "Angola",
    capital: "Luanda",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "BGO",
        name: "Bengo",
        subdivision: null,
      },
      {
        code: "BGU",
        name: "Benguela",
        subdivision: null,
      },
      {
        code: "BIE",
        name: "Bié",
        subdivision: null,
      },
      {
        code: "CAB",
        name: "Cabinda",
        subdivision: null,
      },
      {
        code: "CNN",
        name: "Cunene",
        subdivision: null,
      },
      {
        code: "HUA",
        name: "Huambo",
        subdivision: null,
      },
      {
        code: "HUI",
        name: "Huíla",
        subdivision: null,
      },
      {
        code: "CCU",
        name: "Kuando Kubango",
        subdivision: null,
      },
      {
        code: "CNO",
        name: "Kwanza Norte",
        subdivision: null,
      },
      {
        code: "CUS",
        name: "Kwanza Sul",
        subdivision: null,
      },
      {
        code: "LUA",
        name: "Luanda",
        subdivision: null,
      },
      {
        code: "LNO",
        name: "Lunda Norte",
        subdivision: null,
      },
      {
        code: "LSU",
        name: "Lunda Sul",
        subdivision: null,
      },
      {
        code: "MAL",
        name: "Malange",
        subdivision: null,
      },
      {
        code: "MOX",
        name: "Moxico",
        subdivision: null,
      },
      {
        code: "NAM",
        name: "Namibe",
        subdivision: null,
      },
      {
        code: "UIG",
        name: "Uíge",
        subdivision: null,
      },
      {
        code: "ZAI",
        name: "Zaire",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AI",
    code3: "AIA",
    name: "Anguilla",
    capital: "The Valley",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "AQ",
    code3: "ATA",
    name: "Antarctica",
    capital: "",
    region: "Polar",
    subregion: "",
    states: [],
  },
  {
    code2: "AG",
    code3: "ATG",
    name: "Antigua and Barbuda",
    capital: "Saint John's",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "10",
        name: "Barbuda",
        subdivision: null,
      },
      {
        code: "11",
        name: "Redonda",
        subdivision: null,
      },
      {
        code: "03",
        name: "Saint George",
        subdivision: null,
      },
      {
        code: "04",
        name: "Saint John",
        subdivision: null,
      },
      {
        code: "05",
        name: "Saint Mary",
        subdivision: null,
      },
      {
        code: "06",
        name: "Saint Paul",
        subdivision: null,
      },
      {
        code: "07",
        name: "Saint Peter",
        subdivision: null,
      },
      {
        code: "08",
        name: "Saint Philip",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AR",
    code3: "ARG",
    name: "Argentina",
    capital: "Buenos Aires",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "B",
        name: "Buenos Aires",
        subdivision: null,
      },
      {
        code: "K",
        name: "Catamarca",
        subdivision: null,
      },
      {
        code: "H",
        name: "Chaco",
        subdivision: null,
      },
      {
        code: "U",
        name: "Chubut",
        subdivision: null,
      },
      {
        code: "C",
        name: "Ciudad Autónoma de Buenos Aires",
        subdivision: null,
      },
      {
        code: "W",
        name: "Corrientes",
        subdivision: null,
      },
      {
        code: "X",
        name: "Córdoba",
        subdivision: null,
      },
      {
        code: "E",
        name: "Entre Ríos",
        subdivision: null,
      },
      {
        code: "P",
        name: "Formosa",
        subdivision: null,
      },
      {
        code: "Y",
        name: "Jujuy",
        subdivision: null,
      },
      {
        code: "L",
        name: "La Pampa",
        subdivision: null,
      },
      {
        code: "F",
        name: "La Rioja",
        subdivision: null,
      },
      {
        code: "M",
        name: "Mendoza",
        subdivision: null,
      },
      {
        code: "N",
        name: "Misiones",
        subdivision: null,
      },
      {
        code: "Q",
        name: "Neuquén",
        subdivision: null,
      },
      {
        code: "R",
        name: "Río Negro",
        subdivision: null,
      },
      {
        code: "A",
        name: "Salta",
        subdivision: null,
      },
      {
        code: "J",
        name: "San Juan",
        subdivision: null,
      },
      {
        code: "D",
        name: "San Luis",
        subdivision: null,
      },
      {
        code: "Z",
        name: "Santa Cruz",
        subdivision: null,
      },
      {
        code: "S",
        name: "Santa Fe",
        subdivision: null,
      },
      {
        code: "G",
        name: "Santiago del Estero",
        subdivision: null,
      },
      {
        code: "V",
        name: "Tierra del Fuego",
        subdivision: null,
      },
      {
        code: "T",
        name: "Tucumán",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AM",
    code3: "ARM",
    name: "Armenia",
    capital: "Yerevan",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AG",
        name: "Aragac̣otn",
        subdivision: null,
      },
      {
        code: "AR",
        name: "Ararat",
        subdivision: null,
      },
      {
        code: "AV",
        name: "Armavir",
        subdivision: null,
      },
      {
        code: "ER",
        name: "Erevan",
        subdivision: null,
      },
      {
        code: "GR",
        name: "Geġark'unik'",
        subdivision: null,
      },
      {
        code: "KT",
        name: "Kotayk'",
        subdivision: null,
      },
      {
        code: "LO",
        name: "Loṙi",
        subdivision: null,
      },
      {
        code: "SU",
        name: "Syunik'",
        subdivision: null,
      },
      {
        code: "TV",
        name: "Tavuš",
        subdivision: null,
      },
      {
        code: "VD",
        name: "Vayoć Jor",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Širak",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AW",
    code3: "ABW",
    name: "Aruba",
    capital: "Oranjestad",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "AU",
    code3: "AUS",
    name: "Australia",
    capital: "Canberra",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    states: [
      {
        code: "ACT",
        name: "Australian Capital Territory",
        subdivision: null,
      },
      {
        code: "NSW",
        name: "New South Wales",
        subdivision: null,
      },
      {
        code: "NT",
        name: "Northern Territory",
        subdivision: null,
      },
      {
        code: "QLD",
        name: "Queensland",
        subdivision: null,
      },
      {
        code: "SA",
        name: "South Australia",
        subdivision: null,
      },
      {
        code: "TAS",
        name: "Tasmania",
        subdivision: null,
      },
      {
        code: "VIC",
        name: "Victoria",
        subdivision: null,
      },
      {
        code: "WA",
        name: "Western Australia",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AT",
    code3: "AUT",
    name: "Austria",
    capital: "Vienna",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "B",
        name: "Burgenland",
        subdivision: null,
      },
      {
        code: "K",
        name: "Kärnten",
        subdivision: null,
      },
      {
        code: "NÖ",
        name: "Niederösterreich",
        subdivision: null,
      },
      {
        code: "OÖ",
        name: "Oberösterreich",
        subdivision: null,
      },
      {
        code: "S",
        name: "Salzburg",
        subdivision: null,
      },
      {
        code: "ST",
        name: "Steiermark",
        subdivision: null,
      },
      {
        code: "T",
        name: "Tirol",
        subdivision: null,
      },
      {
        code: "V",
        name: "Vorarlberg",
        subdivision: null,
      },
      {
        code: "W",
        name: "Wien",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AZ",
    code3: "AZE",
    name: "Azerbaijan",
    capital: "Baku",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "NX",
        name: "Naxçıvan",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BS",
    code3: "BHS",
    name: "The Bahamas",
    capital: "Nassau",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "AK",
        name: "Acklins",
        subdivision: null,
      },
      {
        code: "BY",
        name: "Berry Islands",
        subdivision: null,
      },
      {
        code: "BI",
        name: "Bimini",
        subdivision: null,
      },
      {
        code: "BP",
        name: "Black Point",
        subdivision: null,
      },
      {
        code: "CI",
        name: "Cat Island",
        subdivision: null,
      },
      {
        code: "CO",
        name: "Central Abaco",
        subdivision: null,
      },
      {
        code: "CS",
        name: "Central Andros",
        subdivision: null,
      },
      {
        code: "CE",
        name: "Central Eleuthera",
        subdivision: null,
      },
      {
        code: "FP",
        name: "City of Freeport",
        subdivision: null,
      },
      {
        code: "CK",
        name: "Crooked Island and Long Cay",
        subdivision: null,
      },
      {
        code: "EG",
        name: "East Grand Bahama",
        subdivision: null,
      },
      {
        code: "EX",
        name: "Exuma",
        subdivision: null,
      },
      {
        code: "GC",
        name: "Grand Cay",
        subdivision: null,
      },
      {
        code: "HI",
        name: "Harbour Island",
        subdivision: null,
      },
      {
        code: "HT",
        name: "Hope Town",
        subdivision: null,
      },
      {
        code: "IN",
        name: "Inagua",
        subdivision: null,
      },
      {
        code: "LI",
        name: "Long Island",
        subdivision: null,
      },
      {
        code: "MC",
        name: "Mangrove Cay",
        subdivision: null,
      },
      {
        code: "MG",
        name: "Mayaguana",
        subdivision: null,
      },
      {
        code: "MI",
        name: "Moores Island",
        subdivision: null,
      },
      {
        code: "NO",
        name: "North Abaco",
        subdivision: null,
      },
      {
        code: "NS",
        name: "North Andros",
        subdivision: null,
      },
      {
        code: "NE",
        name: "North Eleuthera",
        subdivision: null,
      },
      {
        code: "RI",
        name: "Ragged Island",
        subdivision: null,
      },
      {
        code: "RC",
        name: "Rum Cay",
        subdivision: null,
      },
      {
        code: "SS",
        name: "San Salvador",
        subdivision: null,
      },
      {
        code: "SO",
        name: "South Abaco",
        subdivision: null,
      },
      {
        code: "SA",
        name: "South Andros",
        subdivision: null,
      },
      {
        code: "SE",
        name: "South Eleuthera",
        subdivision: null,
      },
      {
        code: "SW",
        name: "Spanish Wells",
        subdivision: null,
      },
      {
        code: "WG",
        name: "West Grand Bahama",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BH",
    code3: "BHR",
    name: "Bahrain",
    capital: "Manama",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "14",
        name: "Al Janūbīyah",
        subdivision: null,
      },
      {
        code: "13",
        name: "Al Manāmah",
        subdivision: null,
      },
      {
        code: "15",
        name: "Al Muḩarraq",
        subdivision: null,
      },
      {
        code: "16",
        name: "Al Wusţá",
        subdivision: null,
      },
      {
        code: "17",
        name: "Ash Shamālīyah",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BD",
    code3: "BGD",
    name: "Bangladesh",
    capital: "Dhaka",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "A",
        name: "Barisal",
        subdivision: null,
      },
      {
        code: "B",
        name: "Chittagong",
        subdivision: null,
      },
      {
        code: "C",
        name: "Dhaka",
        subdivision: null,
      },
      {
        code: "D",
        name: "Khulna",
        subdivision: null,
      },
      {
        code: "E",
        name: "Rajshahi",
        subdivision: null,
      },
      {
        code: "F",
        name: "Rangpur",
        subdivision: null,
      },
      {
        code: "G",
        name: "Sylhet",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BB",
    code3: "BRB",
    name: "Barbados",
    capital: "Bridgetown",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "01",
        name: "Christ Church",
        subdivision: null,
      },
      {
        code: "02",
        name: "Saint Andrew",
        subdivision: null,
      },
      {
        code: "03",
        name: "Saint George",
        subdivision: null,
      },
      {
        code: "04",
        name: "Saint James",
        subdivision: null,
      },
      {
        code: "05",
        name: "Saint John",
        subdivision: null,
      },
      {
        code: "06",
        name: "Saint Joseph",
        subdivision: null,
      },
      {
        code: "07",
        name: "Saint Lucy",
        subdivision: null,
      },
      {
        code: "08",
        name: "Saint Michael",
        subdivision: null,
      },
      {
        code: "09",
        name: "Saint Peter",
        subdivision: null,
      },
      {
        code: "10",
        name: "Saint Philip",
        subdivision: null,
      },
      {
        code: "11",
        name: "Saint Thomas",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BY",
    code3: "BLR",
    name: "Belarus",
    capital: "Minsk",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "BR",
        name: "Brestskaya voblasts'",
        subdivision: null,
      },
      {
        code: "HO",
        name: "Homyel'skaya voblasts'",
        subdivision: null,
      },
      {
        code: "HM",
        name: "Horad Minsk",
        subdivision: null,
      },
      {
        code: "HR",
        name: "Hrodzenskaya voblasts'",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Mahilyowskaya voblasts'",
        subdivision: null,
      },
      {
        code: "MI",
        name: "Minskaya voblasts'",
        subdivision: null,
      },
      {
        code: "VI",
        name: "Vitsyebskaya voblasts'",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BE",
    code3: "BEL",
    name: "Belgium",
    capital: "Brussels",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "BRU",
        name: "Brussels Hoofdstedelijk Gewest",
        subdivision: null,
      },
      {
        code: "WAL",
        name: "Région Wallonne",
        subdivision: null,
      },
      {
        code: "VLG",
        name: "Vlaams Gewest",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BZ",
    code3: "BLZ",
    name: "Belize",
    capital: "Belmopan",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "BZ",
        name: "Belize",
        subdivision: null,
      },
      {
        code: "CY",
        name: "Cayo",
        subdivision: null,
      },
      {
        code: "CZL",
        name: "Corozal",
        subdivision: null,
      },
      {
        code: "OW",
        name: "Orange Walk",
        subdivision: null,
      },
      {
        code: "SC",
        name: "Stann Creek",
        subdivision: null,
      },
      {
        code: "TOL",
        name: "Toledo",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BJ",
    code3: "BEN",
    name: "Benin",
    capital: "Porto-Novo",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "AL",
        name: "Alibori",
        subdivision: null,
      },
      {
        code: "AK",
        name: "Atakora",
        subdivision: null,
      },
      {
        code: "AQ",
        name: "Atlantique",
        subdivision: null,
      },
      {
        code: "BO",
        name: "Borgou",
        subdivision: null,
      },
      {
        code: "CO",
        name: "Collines",
        subdivision: null,
      },
      {
        code: "DO",
        name: "Donga",
        subdivision: null,
      },
      {
        code: "KO",
        name: "Kouffo",
        subdivision: null,
      },
      {
        code: "LI",
        name: "Littoral",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Mono",
        subdivision: null,
      },
      {
        code: "OU",
        name: "Ouémé",
        subdivision: null,
      },
      {
        code: "PL",
        name: "Plateau",
        subdivision: null,
      },
      {
        code: "ZO",
        name: "Zou",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BM",
    code3: "BMU",
    name: "Bermuda",
    capital: "Hamilton",
    region: "Americas",
    subregion: "Northern America",
    states: [],
  },
  {
    code2: "BT",
    code3: "BTN",
    name: "Bhutan",
    capital: "Thimphu",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "33",
        name: "Bumthang",
        subdivision: null,
      },
      {
        code: "12",
        name: "Chhukha",
        subdivision: null,
      },
      {
        code: "22",
        name: "Dagana",
        subdivision: null,
      },
      {
        code: "GA",
        name: "Gasa",
        subdivision: null,
      },
      {
        code: "13",
        name: "Ha",
        subdivision: null,
      },
      {
        code: "44",
        name: "Lhuentse",
        subdivision: null,
      },
      {
        code: "42",
        name: "Monggar",
        subdivision: null,
      },
      {
        code: "11",
        name: "Paro",
        subdivision: null,
      },
      {
        code: "43",
        name: "Pemagatshel",
        subdivision: null,
      },
      {
        code: "23",
        name: "Punakha",
        subdivision: null,
      },
      {
        code: "45",
        name: "Samdrup Jongkha",
        subdivision: null,
      },
      {
        code: "14",
        name: "Samtse",
        subdivision: null,
      },
      {
        code: "31",
        name: "Sarpang",
        subdivision: null,
      },
      {
        code: "15",
        name: "Thimphu",
        subdivision: null,
      },
      {
        code: "TY",
        name: "Trashi Yangtse",
        subdivision: null,
      },
      {
        code: "41",
        name: "Trashigang",
        subdivision: null,
      },
      {
        code: "32",
        name: "Trongsa",
        subdivision: null,
      },
      {
        code: "21",
        name: "Tsirang",
        subdivision: null,
      },
      {
        code: "24",
        name: "Wangdue Phodrang",
        subdivision: null,
      },
      {
        code: "34",
        name: "Zhemgang",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BO",
    code3: "BOL",
    name: "Bolivia",
    capital: "Sucre",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "H",
        name: "Chuquisaca",
        subdivision: null,
      },
      {
        code: "C",
        name: "Cochabamba",
        subdivision: null,
      },
      {
        code: "B",
        name: "El Beni",
        subdivision: null,
      },
      {
        code: "L",
        name: "La Paz",
        subdivision: null,
      },
      {
        code: "O",
        name: "Oruro",
        subdivision: null,
      },
      {
        code: "N",
        name: "Pando",
        subdivision: null,
      },
      {
        code: "P",
        name: "Potosí",
        subdivision: null,
      },
      {
        code: "S",
        name: "Santa Cruz",
        subdivision: null,
      },
      {
        code: "T",
        name: "Tarija",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BQ",
    code3: "BES",
    name: "Bonaire",
    capital: "Kralendijk",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "BA",
    code3: "BIH",
    name: "Bosnia and Herzegovina",
    capital: "Sarajevo",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "BRC",
        name: "Brčko distrikt",
        subdivision: null,
      },
      {
        code: "BIH",
        name: "Federacija Bosna i Hercegovina",
        subdivision: null,
      },
      {
        code: "SRP",
        name: "Republika Srpska",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BW",
    code3: "BWA",
    name: "Botswana",
    capital: "Gaborone",
    region: "Africa",
    subregion: "Southern Africa",
    states: [
      {
        code: "CE",
        name: "Central",
        subdivision: null,
      },
      {
        code: "CH",
        name: "Chobe",
        subdivision: null,
      },
      {
        code: "FR",
        name: "Francistown",
        subdivision: null,
      },
      {
        code: "GA",
        name: "Gaborone",
        subdivision: null,
      },
      {
        code: "GH",
        name: "Ghanzi",
        subdivision: null,
      },
      {
        code: "JW",
        name: "Jwaneng",
        subdivision: null,
      },
      {
        code: "KG",
        name: "Kgalagadi",
        subdivision: null,
      },
      {
        code: "KL",
        name: "Kgatleng",
        subdivision: null,
      },
      {
        code: "KW",
        name: "Kweneng",
        subdivision: null,
      },
      {
        code: "LO",
        name: "Lobatse",
        subdivision: null,
      },
      {
        code: "NE",
        name: "North-East",
        subdivision: null,
      },
      {
        code: "NW",
        name: "North-West",
        subdivision: null,
      },
      {
        code: "SP",
        name: "Selibe Phikwe",
        subdivision: null,
      },
      {
        code: "SE",
        name: "South-East",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Southern",
        subdivision: null,
      },
      {
        code: "ST",
        name: "Sowa Town",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BV",
    code3: "BVT",
    name: "Bouvet Island",
    capital: "",
    region: "",
    subregion: "",
    states: [],
  },
  {
    code2: "BR",
    code3: "BRA",
    name: "Brazil",
    capital: "Brasília",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "AC",
        name: "Acre",
        subdivision: null,
      },
      {
        code: "AL",
        name: "Alagoas",
        subdivision: null,
      },
      {
        code: "AP",
        name: "Amapá",
        subdivision: null,
      },
      {
        code: "AM",
        name: "Amazonas",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Bahia",
        subdivision: null,
      },
      {
        code: "CE",
        name: "Ceará",
        subdivision: null,
      },
      {
        code: "DF",
        name: "Distrito Federal",
        subdivision: null,
      },
      {
        code: "ES",
        name: "Espírito Santo",
        subdivision: null,
      },
      {
        code: "GO",
        name: "Goiás",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Maranhão",
        subdivision: null,
      },
      {
        code: "MT",
        name: "Mato Grosso",
        subdivision: null,
      },
      {
        code: "MS",
        name: "Mato Grosso do Sul",
        subdivision: null,
      },
      {
        code: "MG",
        name: "Minas Gerais",
        subdivision: null,
      },
      {
        code: "PR",
        name: "Paraná",
        subdivision: null,
      },
      {
        code: "PB",
        name: "Paraíba",
        subdivision: null,
      },
      {
        code: "PA",
        name: "Pará",
        subdivision: null,
      },
      {
        code: "PE",
        name: "Pernambuco",
        subdivision: null,
      },
      {
        code: "PI",
        name: "Piauí",
        subdivision: null,
      },
      {
        code: "RN",
        name: "Rio Grande do Norte",
        subdivision: null,
      },
      {
        code: "RS",
        name: "Rio Grande do Sul",
        subdivision: null,
      },
      {
        code: "RJ",
        name: "Rio de Janeiro",
        subdivision: null,
      },
      {
        code: "RO",
        name: "Rondônia",
        subdivision: null,
      },
      {
        code: "RR",
        name: "Roraima",
        subdivision: null,
      },
      {
        code: "SC",
        name: "Santa Catarina",
        subdivision: null,
      },
      {
        code: "SE",
        name: "Sergipe",
        subdivision: null,
      },
      {
        code: "SP",
        name: "São Paulo",
        subdivision: null,
      },
      {
        code: "TO",
        name: "Tocantins",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IO",
    code3: "IOT",
    name: "British Indian Ocean Territory",
    capital: "Diego Garcia",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [],
  },
  {
    code2: "UM",
    code3: "UMI",
    name: "United States Minor Outlying Islands",
    capital: "",
    region: "Americas",
    subregion: "Northern America",
    states: [
      {
        code: "81",
        name: "Baker Island",
        subdivision: null,
      },
      {
        code: "84",
        name: "Howland Island",
        subdivision: null,
      },
      {
        code: "86",
        name: "Jarvis Island",
        subdivision: null,
      },
      {
        code: "67",
        name: "Johnston Atoll",
        subdivision: null,
      },
      {
        code: "89",
        name: "Kingman Reef",
        subdivision: null,
      },
      {
        code: "71",
        name: "Midway Islands",
        subdivision: null,
      },
      {
        code: "76",
        name: "Navassa Island",
        subdivision: null,
      },
      {
        code: "95",
        name: "Palmyra Atoll",
        subdivision: null,
      },
      {
        code: "79",
        name: "Wake Island",
        subdivision: null,
      },
    ],
  },
  {
    code2: "VG",
    code3: "VGB",
    name: "Virgin Islands (British)",
    capital: "Road Town",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "VI",
    code3: "VIR",
    name: "Virgin Islands (U.S.)",
    capital: "Charlotte Amalie",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "BN",
    code3: "BRN",
    name: "Brunei",
    capital: "Bandar Seri Begawan",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "BE",
        name: "Belait",
        subdivision: null,
      },
      {
        code: "BM",
        name: "Brunei-Muara",
        subdivision: null,
      },
      {
        code: "TE",
        name: "Temburong",
        subdivision: null,
      },
      {
        code: "TU",
        name: "Tutong",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BG",
    code3: "BGR",
    name: "Bulgaria",
    capital: "Sofia",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "01",
        name: "Blagoevgrad",
        subdivision: null,
      },
      {
        code: "02",
        name: "Burgas",
        subdivision: null,
      },
      {
        code: "08",
        name: "Dobrich",
        subdivision: null,
      },
      {
        code: "07",
        name: "Gabrovo",
        subdivision: null,
      },
      {
        code: "26",
        name: "Haskovo",
        subdivision: null,
      },
      {
        code: "09",
        name: "Kardzhali",
        subdivision: null,
      },
      {
        code: "10",
        name: "Kyustendil",
        subdivision: null,
      },
      {
        code: "11",
        name: "Lovech",
        subdivision: null,
      },
      {
        code: "12",
        name: "Montana",
        subdivision: null,
      },
      {
        code: "13",
        name: "Pazardzhik",
        subdivision: null,
      },
      {
        code: "14",
        name: "Pernik",
        subdivision: null,
      },
      {
        code: "15",
        name: "Pleven",
        subdivision: null,
      },
      {
        code: "16",
        name: "Plovdiv",
        subdivision: null,
      },
      {
        code: "17",
        name: "Razgrad",
        subdivision: null,
      },
      {
        code: "18",
        name: "Ruse",
        subdivision: null,
      },
      {
        code: "27",
        name: "Shumen",
        subdivision: null,
      },
      {
        code: "19",
        name: "Silistra",
        subdivision: null,
      },
      {
        code: "20",
        name: "Sliven",
        subdivision: null,
      },
      {
        code: "21",
        name: "Smolyan",
        subdivision: null,
      },
      {
        code: "23",
        name: "Sofia",
        subdivision: null,
      },
      {
        code: "22",
        name: "Sofia-Grad",
        subdivision: null,
      },
      {
        code: "24",
        name: "Stara Zagora",
        subdivision: null,
      },
      {
        code: "25",
        name: "Targovishte",
        subdivision: null,
      },
      {
        code: "03",
        name: "Varna",
        subdivision: null,
      },
      {
        code: "04",
        name: "Veliko Tarnovo",
        subdivision: null,
      },
      {
        code: "05",
        name: "Vidin",
        subdivision: null,
      },
      {
        code: "06",
        name: "Vratsa",
        subdivision: null,
      },
      {
        code: "28",
        name: "Yambol",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BF",
    code3: "BFA",
    name: "Burkina Faso",
    capital: "Ouagadougou",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "01",
        name: "Boucle du Mouhoun",
        subdivision: null,
      },
      {
        code: "02",
        name: "Cascades",
        subdivision: null,
      },
      {
        code: "03",
        name: "Centre",
        subdivision: null,
      },
      {
        code: "04",
        name: "Centre-Est",
        subdivision: null,
      },
      {
        code: "05",
        name: "Centre-Nord",
        subdivision: null,
      },
      {
        code: "06",
        name: "Centre-Ouest",
        subdivision: null,
      },
      {
        code: "07",
        name: "Centre-Sud",
        subdivision: null,
      },
      {
        code: "08",
        name: "Est",
        subdivision: null,
      },
      {
        code: "09",
        name: "Hauts-Bassins",
        subdivision: null,
      },
      {
        code: "10",
        name: "Nord",
        subdivision: null,
      },
      {
        code: "11",
        name: "Plateau-Central",
        subdivision: null,
      },
      {
        code: "12",
        name: "Sahel",
        subdivision: null,
      },
      {
        code: "13",
        name: "Sud-Ouest",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BI",
    code3: "BDI",
    name: "Burundi",
    capital: "Bujumbura",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "BB",
        name: "Bubanza",
        subdivision: null,
      },
      {
        code: "BM",
        name: "Bujumbura Mairie",
        subdivision: null,
      },
      {
        code: "BL",
        name: "Bujumbura Rural",
        subdivision: null,
      },
      {
        code: "BR",
        name: "Bururi",
        subdivision: null,
      },
      {
        code: "CA",
        name: "Cankuzo",
        subdivision: null,
      },
      {
        code: "CI",
        name: "Cibitoke",
        subdivision: null,
      },
      {
        code: "GI",
        name: "Gitega",
        subdivision: null,
      },
      {
        code: "KR",
        name: "Karuzi",
        subdivision: null,
      },
      {
        code: "KY",
        name: "Kayanza",
        subdivision: null,
      },
      {
        code: "KI",
        name: "Kirundo",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Makamba",
        subdivision: null,
      },
      {
        code: "MU",
        name: "Muramvya",
        subdivision: null,
      },
      {
        code: "MY",
        name: "Muyinga",
        subdivision: null,
      },
      {
        code: "MW",
        name: "Mwaro",
        subdivision: null,
      },
      {
        code: "NG",
        name: "Ngozi",
        subdivision: null,
      },
      {
        code: "RT",
        name: "Rutana",
        subdivision: null,
      },
      {
        code: "RY",
        name: "Ruyigi",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KH",
    code3: "KHM",
    name: "Cambodia",
    capital: "Phnom Penh",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "2",
        name: "Baat Dambang",
        subdivision: null,
      },
      {
        code: "1",
        name: "Banteay Mean Chey",
        subdivision: null,
      },
      {
        code: "3",
        name: "Kampong Chaam",
        subdivision: null,
      },
      {
        code: "4",
        name: "Kampong Chhnang",
        subdivision: null,
      },
      {
        code: "5",
        name: "Kampong Spueu",
        subdivision: null,
      },
      {
        code: "6",
        name: "Kampong Thum",
        subdivision: null,
      },
      {
        code: "7",
        name: "Kampot",
        subdivision: null,
      },
      {
        code: "8",
        name: "Kandaal",
        subdivision: null,
      },
      {
        code: "9",
        name: "Kaoh Kong",
        subdivision: null,
      },
      {
        code: "10",
        name: "Kracheh",
        subdivision: null,
      },
      {
        code: "23",
        name: "Krong Kaeb",
        subdivision: null,
      },
      {
        code: "24",
        name: "Krong Pailin",
        subdivision: null,
      },
      {
        code: "18",
        name: "Krong Preah Sihanouk",
        subdivision: null,
      },
      {
        code: "11",
        name: "Mondol Kiri",
        subdivision: null,
      },
      {
        code: "22",
        name: "Otdar Mean Chey",
        subdivision: null,
      },
      {
        code: "12",
        name: "Phnom Penh",
        subdivision: null,
      },
      {
        code: "15",
        name: "Pousaat",
        subdivision: null,
      },
      {
        code: "13",
        name: "Preah Vihear",
        subdivision: null,
      },
      {
        code: "14",
        name: "Prey Veaeng",
        subdivision: null,
      },
      {
        code: "16",
        name: "Rotanak Kiri",
        subdivision: null,
      },
      {
        code: "17",
        name: "Siem Reab",
        subdivision: null,
      },
      {
        code: "19",
        name: "Stueng Traeng",
        subdivision: null,
      },
      {
        code: "20",
        name: "Svaay Rieng",
        subdivision: null,
      },
      {
        code: "21",
        name: "Taakaev",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CM",
    code3: "CMR",
    name: "Cameroon",
    capital: "Yaoundé",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "AD",
        name: "Adamaoua",
        subdivision: null,
      },
      {
        code: "CE",
        name: "Centre",
        subdivision: null,
      },
      {
        code: "ES",
        name: "East",
        subdivision: null,
      },
      {
        code: "EN",
        name: "Far North",
        subdivision: null,
      },
      {
        code: "LT",
        name: "Littoral",
        subdivision: null,
      },
      {
        code: "NO",
        name: "North",
        subdivision: null,
      },
      {
        code: "NW",
        name: "North-West",
        subdivision: null,
      },
      {
        code: "SU",
        name: "South",
        subdivision: null,
      },
      {
        code: "SW",
        name: "South-West",
        subdivision: null,
      },
      {
        code: "OU",
        name: "West",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CA",
    code3: "CAN",
    name: "Canada",
    capital: "Ottawa",
    region: "Americas",
    subregion: "Northern America",
    states: [
      {
        code: "AB",
        name: "Alberta",
        subdivision: "province",
      },
      {
        code: "BC",
        name: "British Columbia",
        subdivision: "province",
      },
      {
        code: "MB",
        name: "Manitoba",
        subdivision: "province",
      },
      {
        code: "NB",
        name: "New Brunswick",
        subdivision: "province",
      },
      {
        code: "NL",
        name: "Newfoundland and Labrador",
        subdivision: "province",
      },
      {
        code: "NS",
        name: "Nova Scotia",
        subdivision: "province",
      },
      {
        code: "ON",
        name: "Ontario",
        subdivision: "province",
      },
      {
        code: "PE",
        name: "Prince Edward Island",
        subdivision: "province",
      },
      {
        code: "QC",
        name: "Quebec",
        subdivision: "province",
      },
      {
        code: "SK",
        name: "Saskatchewan",
        subdivision: "province",
      },
      {
        code: "NT",
        name: "Northwest Territories",
        subdivision: "territory",
      },
      {
        code: "NU",
        name: "Nunavut",
        subdivision: "territory",
      },
      {
        code: "YT",
        name: "Yukon",
        subdivision: "territory",
      },
    ],
  },
  {
    code2: "CV",
    code3: "CPV",
    name: "Cape Verde",
    capital: "Praia",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "B",
        name: "Ilhas de Barlavento",
        subdivision: null,
      },
      {
        code: "S",
        name: "Ilhas de Sotavento",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KY",
    code3: "CYM",
    name: "Cayman Islands",
    capital: "George Town",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "CF",
    code3: "CAF",
    name: "Central African Republic",
    capital: "Bangui",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "BB",
        name: "Bamingui-Bangoran",
        subdivision: null,
      },
      {
        code: "BGF",
        name: "Bangui",
        subdivision: null,
      },
      {
        code: "BK",
        name: "Basse-Kotto",
        subdivision: null,
      },
      {
        code: "KB",
        name: "Gribingui",
        subdivision: null,
      },
      {
        code: "HM",
        name: "Haut-Mbomou",
        subdivision: null,
      },
      {
        code: "HK",
        name: "Haute-Kotto",
        subdivision: null,
      },
      {
        code: "HS",
        name: "Haute-Sangha / Mambéré-Kadéï",
        subdivision: null,
      },
      {
        code: "KG",
        name: "Kémo-Gribingui",
        subdivision: null,
      },
      {
        code: "LB",
        name: "Lobaye",
        subdivision: null,
      },
      {
        code: "MB",
        name: "Mbomou",
        subdivision: null,
      },
      {
        code: "NM",
        name: "Nana-Mambéré",
        subdivision: null,
      },
      {
        code: "MP",
        name: "Ombella-Mpoko",
        subdivision: null,
      },
      {
        code: "UK",
        name: "Ouaka",
        subdivision: null,
      },
      {
        code: "AC",
        name: "Ouham",
        subdivision: null,
      },
      {
        code: "OP",
        name: "Ouham-Pendé",
        subdivision: null,
      },
      {
        code: "SE",
        name: "Sangha",
        subdivision: null,
      },
      {
        code: "VK",
        name: "Vakaga",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TD",
    code3: "TCD",
    name: "Chad",
    capital: "N'Djamena",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "BA",
        name: "Al Baṭḩah",
        subdivision: null,
      },
      {
        code: "LC",
        name: "Al Buḩayrah",
        subdivision: null,
      },
      {
        code: "BG",
        name: "Baḩr al Ghazāl",
        subdivision: null,
      },
      {
        code: "BO",
        name: "Būrkū",
        subdivision: null,
      },
      {
        code: "EN",
        name: "Innīdī",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Kānim",
        subdivision: null,
      },
      {
        code: "LO",
        name: "Lūqūn al Gharbī",
        subdivision: null,
      },
      {
        code: "LR",
        name: "Lūqūn ash Sharqī",
        subdivision: null,
      },
      {
        code: "ND",
        name: "Madīnat Injamīnā",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Māndūl",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Māyū Kībbī al Gharbī",
        subdivision: null,
      },
      {
        code: "ME",
        name: "Māyū Kībbī ash Sharqī",
        subdivision: null,
      },
      {
        code: "GR",
        name: "Qīrā",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Salāmāt",
        subdivision: null,
      },
      {
        code: "CB",
        name: "Shārī Bāqirmī",
        subdivision: null,
      },
      {
        code: "MC",
        name: "Shārī al Awsaṭ",
        subdivision: null,
      },
      {
        code: "SI",
        name: "Sīlā",
        subdivision: null,
      },
      {
        code: "TI",
        name: "Tibastī",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tānjilī",
        subdivision: null,
      },
      {
        code: "OD",
        name: "Waddāy",
        subdivision: null,
      },
      {
        code: "WF",
        name: "Wādī Fīrā",
        subdivision: null,
      },
      {
        code: "HL",
        name: "Ḥajjar Lamīs",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CL",
    code3: "CHL",
    name: "Chile",
    capital: "Santiago",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "AI",
        name: "Aisén del General Carlos Ibañez del Campo",
        subdivision: null,
      },
      {
        code: "AN",
        name: "Antofagasta",
        subdivision: null,
      },
      {
        code: "AR",
        name: "Araucanía",
        subdivision: null,
      },
      {
        code: "AP",
        name: "Arica y Parinacota",
        subdivision: null,
      },
      {
        code: "AT",
        name: "Atacama",
        subdivision: null,
      },
      {
        code: "BI",
        name: "Bío-Bío",
        subdivision: null,
      },
      {
        code: "CO",
        name: "Coquimbo",
        subdivision: null,
      },
      {
        code: "LI",
        name: "Libertador General Bernardo O'Higgins",
        subdivision: null,
      },
      {
        code: "LL",
        name: "Los Lagos",
        subdivision: null,
      },
      {
        code: "LR",
        name: "Los Ríos",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Magallanes",
        subdivision: null,
      },
      {
        code: "ML",
        name: "Maule",
        subdivision: null,
      },
      {
        code: "RM",
        name: "Región Metropolitana de Santiago",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tarapacá",
        subdivision: null,
      },
      {
        code: "VS",
        name: "Valparaíso",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CN",
    code3: "CHN",
    name: "China",
    capital: "Beijing",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [
      {
        code: "45",
        name: "Guangxi",
        subdivision: "Autonomous region",
      },
      {
        code: "15",
        name: "Nei Mongol",
        subdivision: "Autonomous region",
      },
      {
        code: "64",
        name: "Ningxia",
        subdivision: "Autonomous region",
      },
      {
        code: "65",
        name: "Xinjiang",
        subdivision: "Autonomous region",
      },
      {
        code: "54",
        name: "Xizang",
        subdivision: "Autonomous region",
      },
      {
        code: "11",
        name: "Beijing",
        subdivision: "Municipality",
      },
      {
        code: "50",
        name: "Chongqing",
        subdivision: "Municipality",
      },
      {
        code: "31",
        name: "Shanghai",
        subdivision: "Municipality",
      },
      {
        code: "12",
        name: "Tianjin",
        subdivision: "Municipality",
      },
      {
        code: "34",
        name: "Anhui",
        subdivision: "Province",
      },
      {
        code: "35",
        name: "Fujian",
        subdivision: "Province",
      },
      {
        code: "62",
        name: "Gansu",
        subdivision: "Province",
      },
      {
        code: "44",
        name: "Guangdong",
        subdivision: "Province",
      },
      {
        code: "52",
        name: "Guizhou",
        subdivision: "Province",
      },
      {
        code: "46",
        name: "Hainan",
        subdivision: "Province",
      },
      {
        code: "13",
        name: "Hebei",
        subdivision: "Province",
      },
      {
        code: "23",
        name: "Heilongjiang",
        subdivision: "Province",
      },
      {
        code: "41",
        name: "Henan",
        subdivision: "Province",
      },
      {
        code: "42",
        name: "Hubei",
        subdivision: "Province",
      },
      {
        code: "43",
        name: "Hunan",
        subdivision: "Province",
      },
      {
        code: "32",
        name: "Jiangsu",
        subdivision: "Province",
      },
      {
        code: "36",
        name: "Jiangxi",
        subdivision: "Province",
      },
      {
        code: "22",
        name: "Jilin",
        subdivision: "Province",
      },
      {
        code: "21",
        name: "Liaoning",
        subdivision: "Province",
      },
      {
        code: "63",
        name: "Qinghai",
        subdivision: "Province",
      },
      {
        code: "61",
        name: "Shaanxi",
        subdivision: "Province",
      },
      {
        code: "37",
        name: "Shandong",
        subdivision: "Province",
      },
      {
        code: "14",
        name: "Shanxi",
        subdivision: "Province",
      },
      {
        code: "51",
        name: "Sichuan",
        subdivision: "Province",
      },
      {
        code: "71",
        name: "Taiwan",
        subdivision: "Province",
      },
      {
        code: "53",
        name: "Yunnan",
        subdivision: "Province",
      },
      {
        code: "33",
        name: "Zhejiang",
        subdivision: "Province",
      },
      {
        code: "91",
        name: "Hong Kong",
        subdivision: "Special administrative region",
      },
      {
        code: "92",
        name: "Macao",
        subdivision: "Special administrative region",
      },
      {
        code: "",
        name: "Hong Kong Island",
        subdivision: "Special administrative region",
      },
      {
        code: "KOWLOON",
        name: "Kowloon",
        subdivision: "Special administrative region",
      },
      {
        code: "NEW TERRITORIES",
        name: "New Territories",
        subdivision: "Special administrative region",
      },
    ],
  },
  {
    code2: "CX",
    code3: "CXR",
    name: "Christmas Island",
    capital: "Flying Fish Cove",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    states: [],
  },
  {
    code2: "CC",
    code3: "CCK",
    name: "Cocos (Keeling) Islands",
    capital: "West Island",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    states: [],
  },
  {
    code2: "CO",
    code3: "COL",
    name: "Colombia",
    capital: "Bogotá",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "AMA",
        name: "Amazonas",
        subdivision: null,
      },
      {
        code: "ANT",
        name: "Antioquia",
        subdivision: null,
      },
      {
        code: "ARA",
        name: "Arauca",
        subdivision: null,
      },
      {
        code: "ATL",
        name: "Atlántico",
        subdivision: null,
      },
      {
        code: "BOL",
        name: "Bolívar",
        subdivision: null,
      },
      {
        code: "BOY",
        name: "Boyacá",
        subdivision: null,
      },
      {
        code: "CAL",
        name: "Caldas",
        subdivision: null,
      },
      {
        code: "CAQ",
        name: "Caquetá",
        subdivision: null,
      },
      {
        code: "CAS",
        name: "Casanare",
        subdivision: null,
      },
      {
        code: "CAU",
        name: "Cauca",
        subdivision: null,
      },
      {
        code: "CES",
        name: "Cesar",
        subdivision: null,
      },
      {
        code: "CHO",
        name: "Chocó",
        subdivision: null,
      },
      {
        code: "CUN",
        name: "Cundinamarca",
        subdivision: null,
      },
      {
        code: "COR",
        name: "Córdoba",
        subdivision: null,
      },
      {
        code: "DC",
        name: "Distrito Capital de Bogotá",
        subdivision: null,
      },
      {
        code: "GUA",
        name: "Guainía",
        subdivision: null,
      },
      {
        code: "GUV",
        name: "Guaviare",
        subdivision: null,
      },
      {
        code: "HUI",
        name: "Huila",
        subdivision: null,
      },
      {
        code: "LAG",
        name: "La Guajira",
        subdivision: null,
      },
      {
        code: "MAG",
        name: "Magdalena",
        subdivision: null,
      },
      {
        code: "MET",
        name: "Meta",
        subdivision: null,
      },
      {
        code: "NAR",
        name: "Nariño",
        subdivision: null,
      },
      {
        code: "NSA",
        name: "Norte de Santander",
        subdivision: null,
      },
      {
        code: "PUT",
        name: "Putumayo",
        subdivision: null,
      },
      {
        code: "QUI",
        name: "Quindío",
        subdivision: null,
      },
      {
        code: "RIS",
        name: "Risaralda",
        subdivision: null,
      },
      {
        code: "SAP",
        name: "San Andrés, Providencia y Santa Catalina",
        subdivision: null,
      },
      {
        code: "SAN",
        name: "Santander",
        subdivision: null,
      },
      {
        code: "SUC",
        name: "Sucre",
        subdivision: null,
      },
      {
        code: "TOL",
        name: "Tolima",
        subdivision: null,
      },
      {
        code: "VAC",
        name: "Valle del Cauca",
        subdivision: null,
      },
      {
        code: "VAU",
        name: "Vaupés",
        subdivision: null,
      },
      {
        code: "VID",
        name: "Vichada",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KM",
    code3: "COM",
    name: "Comoros",
    capital: "Moroni",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "A",
        name: "Anjouan",
        subdivision: null,
      },
      {
        code: "G",
        name: "Grande Comore",
        subdivision: null,
      },
      {
        code: "M",
        name: "Mohéli",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CG",
    code3: "COG",
    name: "Republic of the Congo",
    capital: "Brazzaville",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "11",
        name: "Bouenza",
        subdivision: null,
      },
      {
        code: "BZV",
        name: "Brazzaville",
        subdivision: null,
      },
      {
        code: "8",
        name: "Cuvette",
        subdivision: null,
      },
      {
        code: "15",
        name: "Cuvette-Ouest",
        subdivision: null,
      },
      {
        code: "5",
        name: "Kouilou",
        subdivision: null,
      },
      {
        code: "7",
        name: "Likouala",
        subdivision: null,
      },
      {
        code: "2",
        name: "Lékoumou",
        subdivision: null,
      },
      {
        code: "9",
        name: "Niari",
        subdivision: null,
      },
      {
        code: "14",
        name: "Plateaux",
        subdivision: null,
      },
      {
        code: "16",
        name: "Pointe-Noire",
        subdivision: null,
      },
      {
        code: "12",
        name: "Pool",
        subdivision: null,
      },
      {
        code: "13",
        name: "Sangha",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CD",
    code3: "COD",
    name: "Democratic Republic of the Congo",
    capital: "Kinshasa",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "BN",
        name: "Bandundu",
        subdivision: null,
      },
      {
        code: "BC",
        name: "Bas-Congo",
        subdivision: null,
      },
      {
        code: "KW",
        name: "Kasai-Occidental",
        subdivision: null,
      },
      {
        code: "KE",
        name: "Kasai-Oriental",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Katanga",
        subdivision: null,
      },
      {
        code: "KN",
        name: "Kinshasa",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Maniema",
        subdivision: null,
      },
      {
        code: "NK",
        name: "Nord-Kivu",
        subdivision: null,
      },
      {
        code: "OR",
        name: "Orientale",
        subdivision: null,
      },
      {
        code: "SK",
        name: "Sud-Kivu",
        subdivision: null,
      },
      {
        code: "EQ",
        name: "Équateur",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CK",
    code3: "COK",
    name: "Cook Islands",
    capital: "Avarua",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "CR",
    code3: "CRI",
    name: "Costa Rica",
    capital: "San José",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "A",
        name: "Alajuela",
        subdivision: null,
      },
      {
        code: "C",
        name: "Cartago",
        subdivision: null,
      },
      {
        code: "G",
        name: "Guanacaste",
        subdivision: null,
      },
      {
        code: "H",
        name: "Heredia",
        subdivision: null,
      },
      {
        code: "L",
        name: "Limón",
        subdivision: null,
      },
      {
        code: "P",
        name: "Puntarenas",
        subdivision: null,
      },
      {
        code: "SJ",
        name: "San José",
        subdivision: null,
      },
    ],
  },
  {
    code2: "HR",
    code3: "HRV",
    name: "Croatia",
    capital: "Zagreb",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "07",
        name: "Bjelovarsko-bilogorska županija",
        subdivision: null,
      },
      {
        code: "12",
        name: "Brodsko-posavska županija",
        subdivision: null,
      },
      {
        code: "19",
        name: "Dubrovačko-neretvanska županija",
        subdivision: null,
      },
      {
        code: "21",
        name: "Grad Zagreb",
        subdivision: null,
      },
      {
        code: "18",
        name: "Istarska županija",
        subdivision: null,
      },
      {
        code: "04",
        name: "Karlovačka županija",
        subdivision: null,
      },
      {
        code: "06",
        name: "Koprivničko-križevačka županija",
        subdivision: null,
      },
      {
        code: "02",
        name: "Krapinsko-zagorska županija",
        subdivision: null,
      },
      {
        code: "09",
        name: "Ličko-senjska županija",
        subdivision: null,
      },
      {
        code: "20",
        name: "Međimurska županija",
        subdivision: null,
      },
      {
        code: "14",
        name: "Osječko-baranjska županija",
        subdivision: null,
      },
      {
        code: "11",
        name: "Požeško-slavonska županija",
        subdivision: null,
      },
      {
        code: "08",
        name: "Primorsko-goranska županija",
        subdivision: null,
      },
      {
        code: "03",
        name: "Sisačko-moslavačka županija",
        subdivision: null,
      },
      {
        code: "17",
        name: "Splitsko-dalmatinska županija",
        subdivision: null,
      },
      {
        code: "05",
        name: "Varaždinska županija",
        subdivision: null,
      },
      {
        code: "10",
        name: "Virovitičko-podravska županija",
        subdivision: null,
      },
      {
        code: "16",
        name: "Vukovarsko-srijemska županija",
        subdivision: null,
      },
      {
        code: "13",
        name: "Zadarska županija",
        subdivision: null,
      },
      {
        code: "01",
        name: "Zagrebačka županija",
        subdivision: null,
      },
      {
        code: "15",
        name: "Šibensko-kninska županija",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CU",
    code3: "CUB",
    name: "Cuba",
    capital: "Havana",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "15",
        name: "Artemisa",
        subdivision: null,
      },
      {
        code: "09",
        name: "Camagüey",
        subdivision: null,
      },
      {
        code: "08",
        name: "Ciego de Ávila",
        subdivision: null,
      },
      {
        code: "06",
        name: "Cienfuegos",
        subdivision: null,
      },
      {
        code: "12",
        name: "Granma",
        subdivision: null,
      },
      {
        code: "14",
        name: "Guantánamo",
        subdivision: null,
      },
      {
        code: "11",
        name: "Holguín",
        subdivision: null,
      },
      {
        code: "99",
        name: "Isla de la Juventud",
        subdivision: null,
      },
      {
        code: "03",
        name: "La Habana",
        subdivision: null,
      },
      {
        code: "10",
        name: "Las Tunas",
        subdivision: null,
      },
      {
        code: "04",
        name: "Matanzas",
        subdivision: null,
      },
      {
        code: "16",
        name: "Mayabeque",
        subdivision: null,
      },
      {
        code: "01",
        name: "Pinar del Río",
        subdivision: null,
      },
      {
        code: "07",
        name: "Sancti Spíritus",
        subdivision: null,
      },
      {
        code: "13",
        name: "Santiago de Cuba",
        subdivision: null,
      },
      {
        code: "05",
        name: "Villa Clara",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CW",
    code3: "CUW",
    name: "Curaçao",
    capital: "Willemstad",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "CY",
    code3: "CYP",
    name: "Cyprus",
    capital: "Nicosia",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "04",
        name: "Ammochostos",
        subdivision: null,
      },
      {
        code: "06",
        name: "Keryneia",
        subdivision: null,
      },
      {
        code: "03",
        name: "Larnaka",
        subdivision: null,
      },
      {
        code: "01",
        name: "Lefkosia",
        subdivision: null,
      },
      {
        code: "02",
        name: "Lemesos",
        subdivision: null,
      },
      {
        code: "05",
        name: "Pafos",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CZ",
    code3: "CZE",
    name: "Czech Republic",
    capital: "Prague",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "JM",
        name: "Jihomoravský kraj",
        subdivision: null,
      },
      {
        code: "JC",
        name: "Jihočeský kraj",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Karlovarský kraj",
        subdivision: null,
      },
      {
        code: "KR",
        name: "Královéhradecký kraj",
        subdivision: null,
      },
      {
        code: "LI",
        name: "Liberecký kraj",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Moravskoslezský kraj",
        subdivision: null,
      },
      {
        code: "OL",
        name: "Olomoucký kraj",
        subdivision: null,
      },
      {
        code: "PA",
        name: "Pardubický kraj",
        subdivision: null,
      },
      {
        code: "PL",
        name: "Plzeňský kraj",
        subdivision: null,
      },
      {
        code: "PR",
        name: "Praha, hlavní město",
        subdivision: null,
      },
      {
        code: "ST",
        name: "Středočeský kraj",
        subdivision: null,
      },
      {
        code: "VY",
        name: "Vysočina",
        subdivision: null,
      },
      {
        code: "ZL",
        name: "Zlínský kraj",
        subdivision: null,
      },
      {
        code: "US",
        name: "Ústecký kraj",
        subdivision: null,
      },
    ],
  },
  {
    code2: "DK",
    code3: "DNK",
    name: "Denmark",
    capital: "Copenhagen",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "84",
        name: "Hovedstaden",
        subdivision: null,
      },
      {
        code: "82",
        name: "Midtjylland",
        subdivision: null,
      },
      {
        code: "81",
        name: "Nordjylland",
        subdivision: null,
      },
      {
        code: "85",
        name: "Sjælland",
        subdivision: null,
      },
      {
        code: "83",
        name: "Syddanmark",
        subdivision: null,
      },
    ],
  },
  {
    code2: "DJ",
    code3: "DJI",
    name: "Djibouti",
    capital: "Djibouti",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "AS",
        name: "Ali Sabieh",
        subdivision: null,
      },
      {
        code: "AR",
        name: "Arta",
        subdivision: null,
      },
      {
        code: "DI",
        name: "Dikhil",
        subdivision: null,
      },
      {
        code: "DJ",
        name: "Djibouti",
        subdivision: null,
      },
      {
        code: "OB",
        name: "Obock",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tadjourah",
        subdivision: null,
      },
    ],
  },
  {
    code2: "DM",
    code3: "DMA",
    name: "Dominica",
    capital: "Roseau",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "02",
        name: "Saint Andrew",
        subdivision: null,
      },
      {
        code: "03",
        name: "Saint David",
        subdivision: null,
      },
      {
        code: "04",
        name: "Saint George",
        subdivision: null,
      },
      {
        code: "05",
        name: "Saint John",
        subdivision: null,
      },
      {
        code: "06",
        name: "Saint Joseph",
        subdivision: null,
      },
      {
        code: "07",
        name: "Saint Luke",
        subdivision: null,
      },
      {
        code: "08",
        name: "Saint Mark",
        subdivision: null,
      },
      {
        code: "09",
        name: "Saint Patrick",
        subdivision: null,
      },
      {
        code: "10",
        name: "Saint Paul",
        subdivision: null,
      },
      {
        code: "11",
        name: "Saint Peter",
        subdivision: null,
      },
    ],
  },
  {
    code2: "DO",
    code3: "DOM",
    name: "Dominican Republic",
    capital: "Santo Domingo",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "33",
        name: "Cibao Nordeste",
        subdivision: null,
      },
      {
        code: "34",
        name: "Cibao Noroeste",
        subdivision: null,
      },
      {
        code: "35",
        name: "Cibao Norte",
        subdivision: null,
      },
      {
        code: "36",
        name: "Cibao Sur",
        subdivision: null,
      },
      {
        code: "37",
        name: "El Valle",
        subdivision: null,
      },
      {
        code: "38",
        name: "Enriquillo",
        subdivision: null,
      },
      {
        code: "39",
        name: "Higuamo",
        subdivision: null,
      },
      {
        code: "40",
        name: "Ozama",
        subdivision: null,
      },
      {
        code: "41",
        name: "Valdesia",
        subdivision: null,
      },
      {
        code: "42",
        name: "Yuma",
        subdivision: null,
      },
    ],
  },
  {
    code2: "EC",
    code3: "ECU",
    name: "Ecuador",
    capital: "Quito",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "A",
        name: "Azuay",
        subdivision: null,
      },
      {
        code: "B",
        name: "Bolívar",
        subdivision: null,
      },
      {
        code: "C",
        name: "Carchi",
        subdivision: null,
      },
      {
        code: "F",
        name: "Cañar",
        subdivision: null,
      },
      {
        code: "H",
        name: "Chimborazo",
        subdivision: null,
      },
      {
        code: "X",
        name: "Cotopaxi",
        subdivision: null,
      },
      {
        code: "O",
        name: "El Oro",
        subdivision: null,
      },
      {
        code: "E",
        name: "Esmeraldas",
        subdivision: null,
      },
      {
        code: "W",
        name: "Galápagos",
        subdivision: null,
      },
      {
        code: "G",
        name: "Guayas",
        subdivision: null,
      },
      {
        code: "I",
        name: "Imbabura",
        subdivision: null,
      },
      {
        code: "L",
        name: "Loja",
        subdivision: null,
      },
      {
        code: "R",
        name: "Los Ríos",
        subdivision: null,
      },
      {
        code: "M",
        name: "Manabí",
        subdivision: null,
      },
      {
        code: "S",
        name: "Morona-Santiago",
        subdivision: null,
      },
      {
        code: "N",
        name: "Napo",
        subdivision: null,
      },
      {
        code: "D",
        name: "Orellana",
        subdivision: null,
      },
      {
        code: "Y",
        name: "Pastaza",
        subdivision: null,
      },
      {
        code: "P",
        name: "Pichincha",
        subdivision: null,
      },
      {
        code: "SE",
        name: "Santa Elena",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Santo Domingo de los Tsáchilas",
        subdivision: null,
      },
      {
        code: "U",
        name: "Sucumbíos",
        subdivision: null,
      },
      {
        code: "T",
        name: "Tungurahua",
        subdivision: null,
      },
      {
        code: "Z",
        name: "Zamora-Chinchipe",
        subdivision: null,
      },
    ],
  },
  {
    code2: "EG",
    code3: "EGY",
    name: "Egypt",
    capital: "Cairo",
    region: "Africa",
    subregion: "Northern Africa",
    states: [
      {
        code: "DK",
        name: "Ad Daqahlīyah",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Al Baḩr al Aḩmar",
        subdivision: null,
      },
      {
        code: "BH",
        name: "Al Buḩayrah",
        subdivision: null,
      },
      {
        code: "FYM",
        name: "Al Fayyūm",
        subdivision: null,
      },
      {
        code: "GH",
        name: "Al Gharbīyah",
        subdivision: null,
      },
      {
        code: "ALX",
        name: "Al Iskandarīyah",
        subdivision: null,
      },
      {
        code: "IS",
        name: "Al Ismāٰīlīyah",
        subdivision: null,
      },
      {
        code: "GZ",
        name: "Al Jīzah",
        subdivision: null,
      },
      {
        code: "MN",
        name: "Al Minyā",
        subdivision: null,
      },
      {
        code: "MNF",
        name: "Al Minūfīyah",
        subdivision: null,
      },
      {
        code: "KB",
        name: "Al Qalyūbīyah",
        subdivision: null,
      },
      {
        code: "C",
        name: "Al Qāhirah",
        subdivision: null,
      },
      {
        code: "LX",
        name: "Al Uqşur",
        subdivision: null,
      },
      {
        code: "WAD",
        name: "Al Wādī al Jadīd",
        subdivision: null,
      },
      {
        code: "SUZ",
        name: "As Suways",
        subdivision: null,
      },
      {
        code: "SU",
        name: "As Sādis min Uktūbar",
        subdivision: null,
      },
      {
        code: "SHR",
        name: "Ash Sharqīyah",
        subdivision: null,
      },
      {
        code: "ASN",
        name: "Aswān",
        subdivision: null,
      },
      {
        code: "AST",
        name: "Asyūţ",
        subdivision: null,
      },
      {
        code: "BNS",
        name: "Banī Suwayf",
        subdivision: null,
      },
      {
        code: "PTS",
        name: "Būr Saٰīd",
        subdivision: null,
      },
      {
        code: "DT",
        name: "Dumyāţ",
        subdivision: null,
      },
      {
        code: "JS",
        name: "Janūb Sīnā'",
        subdivision: null,
      },
      {
        code: "KFS",
        name: "Kafr ash Shaykh",
        subdivision: null,
      },
      {
        code: "MT",
        name: "Maţrūḩ",
        subdivision: null,
      },
      {
        code: "KN",
        name: "Qinā",
        subdivision: null,
      },
      {
        code: "SIN",
        name: "Shamāl Sīnā'",
        subdivision: null,
      },
      {
        code: "SHG",
        name: "Sūhāj",
        subdivision: null,
      },
      {
        code: "HU",
        name: "Ḩulwān",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SV",
    code3: "SLV",
    name: "El Salvador",
    capital: "San Salvador",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "AH",
        name: "Ahuachapán",
        subdivision: null,
      },
      {
        code: "CA",
        name: "Cabañas",
        subdivision: null,
      },
      {
        code: "CH",
        name: "Chalatenango",
        subdivision: null,
      },
      {
        code: "CU",
        name: "Cuscatlán",
        subdivision: null,
      },
      {
        code: "LI",
        name: "La Libertad",
        subdivision: null,
      },
      {
        code: "PA",
        name: "La Paz",
        subdivision: null,
      },
      {
        code: "UN",
        name: "La Unión",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Morazán",
        subdivision: null,
      },
      {
        code: "SM",
        name: "San Miguel",
        subdivision: null,
      },
      {
        code: "SS",
        name: "San Salvador",
        subdivision: null,
      },
      {
        code: "SV",
        name: "San Vicente",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Santa Ana",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Sonsonate",
        subdivision: null,
      },
      {
        code: "US",
        name: "Usulután",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GQ",
    code3: "GNQ",
    name: "Equatorial Guinea",
    capital: "Malabo",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "C",
        name: "Región Continental",
        subdivision: null,
      },
      {
        code: "I",
        name: "Región Insular",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ER",
    code3: "ERI",
    name: "Eritrea",
    capital: "Asmara",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "MA",
        name: "Al Awsaţ",
        subdivision: null,
      },
      {
        code: "DU",
        name: "Al Janūbĩ",
        subdivision: null,
      },
      {
        code: "AN",
        name: "Ansabā",
        subdivision: null,
      },
      {
        code: "DK",
        name: "Janūbī al Baḩrī al Aḩmar",
        subdivision: null,
      },
      {
        code: "GB",
        name: "Qāsh-Barkah",
        subdivision: null,
      },
      {
        code: "SK",
        name: "Shimālī al Baḩrī al Aḩmar",
        subdivision: null,
      },
    ],
  },
  {
    code2: "EE",
    code3: "EST",
    name: "Estonia",
    capital: "Tallinn",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "37",
        name: "Harjumaa",
        subdivision: null,
      },
      {
        code: "39",
        name: "Hiiumaa",
        subdivision: null,
      },
      {
        code: "44",
        name: "Ida-Virumaa",
        subdivision: null,
      },
      {
        code: "51",
        name: "Järvamaa",
        subdivision: null,
      },
      {
        code: "49",
        name: "Jõgevamaa",
        subdivision: null,
      },
      {
        code: "59",
        name: "Lääne-Virumaa",
        subdivision: null,
      },
      {
        code: "57",
        name: "Läänemaa",
        subdivision: null,
      },
      {
        code: "67",
        name: "Pärnumaa",
        subdivision: null,
      },
      {
        code: "65",
        name: "Põlvamaa",
        subdivision: null,
      },
      {
        code: "70",
        name: "Raplamaa",
        subdivision: null,
      },
      {
        code: "74",
        name: "Saaremaa",
        subdivision: null,
      },
      {
        code: "78",
        name: "Tartumaa",
        subdivision: null,
      },
      {
        code: "82",
        name: "Valgamaa",
        subdivision: null,
      },
      {
        code: "84",
        name: "Viljandimaa",
        subdivision: null,
      },
      {
        code: "86",
        name: "Võrumaa",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ET",
    code3: "ETH",
    name: "Ethiopia",
    capital: "Addis Ababa",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "BE",
        name: "Bīnshangul Gumuz",
        subdivision: null,
      },
      {
        code: "DD",
        name: "Dirē Dawa",
        subdivision: null,
      },
      {
        code: "GA",
        name: "Gambēla Hizboch",
        subdivision: null,
      },
      {
        code: "HA",
        name: "Hārerī Hizb",
        subdivision: null,
      },
      {
        code: "OR",
        name: "Oromīya",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Sumalē",
        subdivision: null,
      },
      {
        code: "TI",
        name: "Tigray",
        subdivision: null,
      },
      {
        code: "SN",
        name: "YeDebub Bihēroch Bihēreseboch na Hizboch",
        subdivision: null,
      },
      {
        code: "AA",
        name: "Ādīs Ābeba",
        subdivision: null,
      },
      {
        code: "AF",
        name: "Āfar",
        subdivision: null,
      },
      {
        code: "AM",
        name: "Āmara",
        subdivision: null,
      },
    ],
  },
  {
    code2: "FK",
    code3: "FLK",
    name: "Falkland Islands",
    capital: "Stanley",
    region: "Americas",
    subregion: "South America",
    states: [],
  },
  {
    code2: "FO",
    code3: "FRO",
    name: "Faroe Islands",
    capital: "Tórshavn",
    region: "Europe",
    subregion: "Northern Europe",
    states: [],
  },
  {
    code2: "FJ",
    code3: "FJI",
    name: "Fiji",
    capital: "Suva",
    region: "Oceania",
    subregion: "Melanesia",
    states: [
      {
        code: "C",
        name: "Central",
        subdivision: null,
      },
      {
        code: "E",
        name: "Eastern",
        subdivision: null,
      },
      {
        code: "N",
        name: "Northern",
        subdivision: null,
      },
      {
        code: "R",
        name: "Rotuma",
        subdivision: null,
      },
      {
        code: "W",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "FI",
    code3: "FIN",
    name: "Finland",
    capital: "Helsinki",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "01",
        name: "Ahvenanmaan maakunta",
        subdivision: null,
      },
      {
        code: "02",
        name: "Etelä-Karjala",
        subdivision: null,
      },
      {
        code: "03",
        name: "Etelä-Pohjanmaa",
        subdivision: null,
      },
      {
        code: "04",
        name: "Etelä-Savo",
        subdivision: null,
      },
      {
        code: "05",
        name: "Kainuu",
        subdivision: null,
      },
      {
        code: "06",
        name: "Kanta-Häme",
        subdivision: null,
      },
      {
        code: "07",
        name: "Keski-Pohjanmaa",
        subdivision: null,
      },
      {
        code: "08",
        name: "Keski-Suomi",
        subdivision: null,
      },
      {
        code: "09",
        name: "Kymenlaakso",
        subdivision: null,
      },
      {
        code: "10",
        name: "Lappi",
        subdivision: null,
      },
      {
        code: "11",
        name: "Pirkanmaa",
        subdivision: null,
      },
      {
        code: "12",
        name: "Pohjanmaa",
        subdivision: null,
      },
      {
        code: "13",
        name: "Pohjois-Karjala",
        subdivision: null,
      },
      {
        code: "14",
        name: "Pohjois-Pohjanmaa",
        subdivision: null,
      },
      {
        code: "15",
        name: "Pohjois-Savo",
        subdivision: null,
      },
      {
        code: "16",
        name: "Päijät-Häme",
        subdivision: null,
      },
      {
        code: "17",
        name: "Satakunta",
        subdivision: null,
      },
      {
        code: "18",
        name: "Uusimaa",
        subdivision: null,
      },
      {
        code: "19",
        name: "Varsinais-Suomi",
        subdivision: null,
      },
    ],
  },
  {
    code2: "FR",
    code3: "FRA",
    name: "France",
    capital: "Paris",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "A",
        name: "Alsace",
        subdivision: "Metropolitan region",
      },
      {
        code: "B",
        name: "Aquitaine",
        subdivision: "Metropolitan region",
      },
      {
        code: "C",
        name: "Auvergne",
        subdivision: "Metropolitan region",
      },
      {
        code: "E",
        name: "Brittany",
        subdivision: "Metropolitan region",
      },
      {
        code: "D",
        name: "Burgundy",
        subdivision: "Metropolitan region",
      },
      {
        code: "F",
        name: "Centre-Val de Loire",
        subdivision: "Metropolitan region",
      },
      {
        code: "G",
        name: "Champagne-Ardenne",
        subdivision: "Metropolitan region",
      },
      {
        code: "H",
        name: "Corsica",
        subdivision: "Metropolitan region",
      },
      {
        code: "I",
        name: "Franche-Comté",
        subdivision: "Metropolitan region",
      },
      {
        code: "K",
        name: "Languedoc-Roussillon",
        subdivision: "Metropolitan region",
      },
      {
        code: "L",
        name: "Limousin",
        subdivision: "Metropolitan region",
      },
      {
        code: "M",
        name: "Lorraine",
        subdivision: "Metropolitan region",
      },
      {
        code: "P",
        name: "Lower Normandy",
        subdivision: "Metropolitan region",
      },
      {
        code: "N",
        name: "Midi-Pyrénées",
        subdivision: "Metropolitan region",
      },
      {
        code: "O",
        name: "Nord-Pas-de-Calais",
        subdivision: "Metropolitan region",
      },
      {
        code: "R",
        name: "Pays de la Loire",
        subdivision: "Metropolitan region",
      },
      {
        code: "S",
        name: "Picardy",
        subdivision: "Metropolitan region",
      },
      {
        code: "T",
        name: "Poitou-Charentes",
        subdivision: "Metropolitan region",
      },
      {
        code: "U",
        name: "Provence-Alpes-Côte d'Azur",
        subdivision: "Metropolitan region",
      },
      {
        code: "V",
        name: "Rhône-Alpes",
        subdivision: "Metropolitan region",
      },
      {
        code: "Q",
        name: "Upper Normandy",
        subdivision: "Metropolitan region",
      },
      {
        code: "J",
        name: "Île-de-France",
        subdivision: "Metropolitan region",
      },
    ],
  },
  {
    code2: "GF",
    code3: "GUF",
    name: "French Guiana",
    capital: "Cayenne",
    region: "Americas",
    subregion: "South America",
    states: [],
  },
  {
    code2: "PF",
    code3: "PYF",
    name: "French Polynesia",
    capital: "Papeetē",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "TF",
    code3: "ATF",
    name: "French Southern and Antarctic Lands",
    capital: "Port-aux-Français",
    region: "Africa",
    subregion: "Southern Africa",
    states: [],
  },
  {
    code2: "GA",
    code3: "GAB",
    name: "Gabon",
    capital: "Libreville",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "1",
        name: "Estuaire",
        subdivision: null,
      },
      {
        code: "2",
        name: "Haut-Ogooué",
        subdivision: null,
      },
      {
        code: "3",
        name: "Moyen-Ogooué",
        subdivision: null,
      },
      {
        code: "4",
        name: "Ngounié",
        subdivision: null,
      },
      {
        code: "5",
        name: "Nyanga",
        subdivision: null,
      },
      {
        code: "6",
        name: "Ogooué-Ivindo",
        subdivision: null,
      },
      {
        code: "7",
        name: "Ogooué-Lolo",
        subdivision: null,
      },
      {
        code: "8",
        name: "Ogooué-Maritime",
        subdivision: null,
      },
      {
        code: "9",
        name: "Woleu-Ntem",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GM",
    code3: "GMB",
    name: "The Gambia",
    capital: "Banjul",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "B",
        name: "Banjul",
        subdivision: null,
      },
      {
        code: "M",
        name: "Central River",
        subdivision: null,
      },
      {
        code: "L",
        name: "Lower River",
        subdivision: null,
      },
      {
        code: "N",
        name: "North Bank",
        subdivision: null,
      },
      {
        code: "U",
        name: "Upper River",
        subdivision: null,
      },
      {
        code: "W",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GE",
    code3: "GEO",
    name: "Georgia",
    capital: "Tbilisi",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AB",
        name: "Abkhazia",
        subdivision: null,
      },
      {
        code: "AJ",
        name: "Ajaria",
        subdivision: null,
      },
      {
        code: "GU",
        name: "Guria",
        subdivision: null,
      },
      {
        code: "IM",
        name: "Imereti",
        subdivision: null,
      },
      {
        code: "KA",
        name: "K'akheti",
        subdivision: null,
      },
      {
        code: "KK",
        name: "Kvemo Kartli",
        subdivision: null,
      },
      {
        code: "MM",
        name: "Mtskheta-Mtianeti",
        subdivision: null,
      },
      {
        code: "RL",
        name: "Rach'a-Lechkhumi-Kvemo Svaneti",
        subdivision: null,
      },
      {
        code: "SZ",
        name: "Samegrelo-Zemo Svaneti",
        subdivision: null,
      },
      {
        code: "SJ",
        name: "Samtskhe-Javakheti",
        subdivision: null,
      },
      {
        code: "SK",
        name: "Shida Kartli",
        subdivision: null,
      },
      {
        code: "TB",
        name: "Tbilisi",
        subdivision: null,
      },
    ],
  },
  {
    code2: "DE",
    code3: "DEU",
    name: "Germany",
    capital: "Berlin",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "BW",
        name: "Baden-Württemberg",
        subdivision: null,
      },
      {
        code: "BY",
        name: "Bayern",
        subdivision: null,
      },
      {
        code: "BE",
        name: "Berlin",
        subdivision: null,
      },
      {
        code: "BB",
        name: "Brandenburg",
        subdivision: null,
      },
      {
        code: "HB",
        name: "Bremen",
        subdivision: null,
      },
      {
        code: "HH",
        name: "Hamburg",
        subdivision: null,
      },
      {
        code: "HE",
        name: "Hessen",
        subdivision: null,
      },
      {
        code: "MV",
        name: "Mecklenburg-Vorpommern",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Niedersachsen",
        subdivision: null,
      },
      {
        code: "NW",
        name: "Nordrhein-Westfalen",
        subdivision: null,
      },
      {
        code: "RP",
        name: "Rheinland-Pfalz",
        subdivision: null,
      },
      {
        code: "SL",
        name: "Saarland",
        subdivision: null,
      },
      {
        code: "SN",
        name: "Sachsen",
        subdivision: null,
      },
      {
        code: "ST",
        name: "Sachsen-Anhalt",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Schleswig-Holstein",
        subdivision: null,
      },
      {
        code: "TH",
        name: "Thüringen",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GH",
    code3: "GHA",
    name: "Ghana",
    capital: "Accra",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "AH",
        name: "Ashanti",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Brong-Ahafo",
        subdivision: null,
      },
      {
        code: "CP",
        name: "Central",
        subdivision: null,
      },
      {
        code: "EP",
        name: "Eastern",
        subdivision: null,
      },
      {
        code: "AA",
        name: "Greater Accra",
        subdivision: null,
      },
      {
        code: "NP",
        name: "Northern",
        subdivision: null,
      },
      {
        code: "UE",
        name: "Upper East",
        subdivision: null,
      },
      {
        code: "UW",
        name: "Upper West",
        subdivision: null,
      },
      {
        code: "TV",
        name: "Volta",
        subdivision: null,
      },
      {
        code: "WP",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GI",
    code3: "GIB",
    name: "Gibraltar",
    capital: "Gibraltar",
    region: "Europe",
    subregion: "Southern Europe",
    states: [],
  },
  {
    code2: "GR",
    code3: "GRC",
    name: "Greece",
    capital: "Athens",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "A",
        name: "Anatoliki Makedonia kai Thraki",
        subdivision: null,
      },
      {
        code: "I",
        name: "Attiki",
        subdivision: null,
      },
      {
        code: "G",
        name: "Dytiki Ellada",
        subdivision: null,
      },
      {
        code: "C",
        name: "Dytiki Makedonia",
        subdivision: null,
      },
      {
        code: "F",
        name: "Ionia Nisia",
        subdivision: null,
      },
      {
        code: "D",
        name: "Ipeiros",
        subdivision: null,
      },
      {
        code: "B",
        name: "Kentriki Makedonia",
        subdivision: null,
      },
      {
        code: "M",
        name: "Kriti",
        subdivision: null,
      },
      {
        code: "L",
        name: "Notio Aigaio",
        subdivision: null,
      },
      {
        code: "J",
        name: "Peloponnisos",
        subdivision: null,
      },
      {
        code: "H",
        name: "Sterea Ellada",
        subdivision: null,
      },
      {
        code: "E",
        name: "Thessalia",
        subdivision: null,
      },
      {
        code: "K",
        name: "Voreio Aigaio",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GL",
    code3: "GRL",
    name: "Greenland",
    capital: "Nuuk",
    region: "Americas",
    subregion: "Northern America",
    states: [
      {
        code: "KU",
        name: "Kommune Kujalleq",
        subdivision: null,
      },
      {
        code: "SM",
        name: "Kommuneqarfik Sermersooq",
        subdivision: null,
      },
      {
        code: "QA",
        name: "Qaasuitsup Kommunia",
        subdivision: null,
      },
      {
        code: "QE",
        name: "Qeqqata Kommunia",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GD",
    code3: "GRD",
    name: "Grenada",
    capital: "St. George's",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "01",
        name: "Saint Andrew",
        subdivision: null,
      },
      {
        code: "02",
        name: "Saint David",
        subdivision: null,
      },
      {
        code: "03",
        name: "Saint George",
        subdivision: null,
      },
      {
        code: "04",
        name: "Saint John",
        subdivision: null,
      },
      {
        code: "05",
        name: "Saint Mark",
        subdivision: null,
      },
      {
        code: "06",
        name: "Saint Patrick",
        subdivision: null,
      },
      {
        code: "10",
        name: "Southern Grenadine Islands",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GP",
    code3: "GLP",
    name: "Guadeloupe",
    capital: "Basse-Terre",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "GU",
    code3: "GUM",
    name: "Guam",
    capital: "Hagåtña",
    region: "Oceania",
    subregion: "Micronesia",
    states: [],
  },
  {
    code2: "GT",
    code3: "GTM",
    name: "Guatemala",
    capital: "Guatemala City",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "AV",
        name: "Alta Verapaz",
        subdivision: null,
      },
      {
        code: "BV",
        name: "Baja Verapaz",
        subdivision: null,
      },
      {
        code: "CM",
        name: "Chimaltenango",
        subdivision: null,
      },
      {
        code: "CQ",
        name: "Chiquimula",
        subdivision: null,
      },
      {
        code: "PR",
        name: "El Progreso",
        subdivision: null,
      },
      {
        code: "ES",
        name: "Escuintla",
        subdivision: null,
      },
      {
        code: "GU",
        name: "Guatemala",
        subdivision: null,
      },
      {
        code: "HU",
        name: "Huehuetenango",
        subdivision: null,
      },
      {
        code: "IZ",
        name: "Izabal",
        subdivision: null,
      },
      {
        code: "JA",
        name: "Jalapa",
        subdivision: null,
      },
      {
        code: "JU",
        name: "Jutiapa",
        subdivision: null,
      },
      {
        code: "PE",
        name: "Petén",
        subdivision: null,
      },
      {
        code: "QZ",
        name: "Quetzaltenango",
        subdivision: null,
      },
      {
        code: "QC",
        name: "Quiché",
        subdivision: null,
      },
      {
        code: "RE",
        name: "Retalhuleu",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Sacatepéquez",
        subdivision: null,
      },
      {
        code: "SM",
        name: "San Marcos",
        subdivision: null,
      },
      {
        code: "SR",
        name: "Santa Rosa",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Sololá",
        subdivision: null,
      },
      {
        code: "SU",
        name: "Suchitepéquez",
        subdivision: null,
      },
      {
        code: "TO",
        name: "Totonicapán",
        subdivision: null,
      },
      {
        code: "ZA",
        name: "Zacapa",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GG",
    code3: "GGY",
    name: "Guernsey",
    capital: "St. Peter Port",
    region: "Europe",
    subregion: "Northern Europe",
    states: [],
  },
  {
    code2: "GN",
    code3: "GIN",
    name: "Guinea",
    capital: "Conakry",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "B",
        name: "Boké",
        subdivision: null,
      },
      {
        code: "C",
        name: "Conakry",
        subdivision: null,
      },
      {
        code: "F",
        name: "Faranah",
        subdivision: null,
      },
      {
        code: "K",
        name: "Kankan",
        subdivision: null,
      },
      {
        code: "D",
        name: "Kindia",
        subdivision: null,
      },
      {
        code: "L",
        name: "Labé",
        subdivision: null,
      },
      {
        code: "M",
        name: "Mamou",
        subdivision: null,
      },
      {
        code: "N",
        name: "Nzérékoré",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GW",
    code3: "GNB",
    name: "Guinea-Bissau",
    capital: "Bissau",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "L",
        name: "Leste",
        subdivision: null,
      },
      {
        code: "N",
        name: "Norte",
        subdivision: null,
      },
      {
        code: "S",
        name: "Sul",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GY",
    code3: "GUY",
    name: "Guyana",
    capital: "Georgetown",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "BA",
        name: "Barima-Waini",
        subdivision: null,
      },
      {
        code: "CU",
        name: "Cuyuni-Mazaruni",
        subdivision: null,
      },
      {
        code: "DE",
        name: "Demerara-Mahaica",
        subdivision: null,
      },
      {
        code: "EB",
        name: "East Berbice-Corentyne",
        subdivision: null,
      },
      {
        code: "ES",
        name: "Essequibo Islands-West Demerara",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Mahaica-Berbice",
        subdivision: null,
      },
      {
        code: "PM",
        name: "Pomeroon-Supenaam",
        subdivision: null,
      },
      {
        code: "PT",
        name: "Potaro-Siparuni",
        subdivision: null,
      },
      {
        code: "UD",
        name: "Upper Demerara-Berbice",
        subdivision: null,
      },
      {
        code: "UT",
        name: "Upper Takutu-Upper Essequibo",
        subdivision: null,
      },
    ],
  },
  {
    code2: "HT",
    code3: "HTI",
    name: "Haiti",
    capital: "Port-au-Prince",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "AR",
        name: "Artibonite",
        subdivision: null,
      },
      {
        code: "CE",
        name: "Centre",
        subdivision: null,
      },
      {
        code: "GA",
        name: "Grande-Anse",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Nippes",
        subdivision: null,
      },
      {
        code: "ND",
        name: "Nord",
        subdivision: null,
      },
      {
        code: "NE",
        name: "Nord-Est",
        subdivision: null,
      },
      {
        code: "NO",
        name: "Nord-Ouest",
        subdivision: null,
      },
      {
        code: "OU",
        name: "Ouest",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Sud",
        subdivision: null,
      },
      {
        code: "SE",
        name: "Sud-Est",
        subdivision: null,
      },
    ],
  },
  {
    code2: "HM",
    code3: "HMD",
    name: "Heard Island and McDonald Islands",
    capital: "",
    region: "",
    subregion: "",
    states: [],
  },
  {
    code2: "VA",
    code3: "VAT",
    name: "Holy See",
    capital: "Rome",
    region: "Europe",
    subregion: "Southern Europe",
    states: [],
  },
  {
    code2: "HN",
    code3: "HND",
    name: "Honduras",
    capital: "Tegucigalpa",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "AT",
        name: "Atlántida",
        subdivision: null,
      },
      {
        code: "CH",
        name: "Choluteca",
        subdivision: null,
      },
      {
        code: "CL",
        name: "Colón",
        subdivision: null,
      },
      {
        code: "CM",
        name: "Comayagua",
        subdivision: null,
      },
      {
        code: "CP",
        name: "Copán",
        subdivision: null,
      },
      {
        code: "CR",
        name: "Cortés",
        subdivision: null,
      },
      {
        code: "EP",
        name: "El Paraíso",
        subdivision: null,
      },
      {
        code: "FM",
        name: "Francisco Morazán",
        subdivision: null,
      },
      {
        code: "GD",
        name: "Gracias a Dios",
        subdivision: null,
      },
      {
        code: "IN",
        name: "Intibucá",
        subdivision: null,
      },
      {
        code: "IB",
        name: "Islas de la Bahía",
        subdivision: null,
      },
      {
        code: "LP",
        name: "La Paz",
        subdivision: null,
      },
      {
        code: "LE",
        name: "Lempira",
        subdivision: null,
      },
      {
        code: "OC",
        name: "Ocotepeque",
        subdivision: null,
      },
      {
        code: "OL",
        name: "Olancho",
        subdivision: null,
      },
      {
        code: "SB",
        name: "Santa Bárbara",
        subdivision: null,
      },
      {
        code: "VA",
        name: "Valle",
        subdivision: null,
      },
      {
        code: "YO",
        name: "Yoro",
        subdivision: null,
      },
    ],
  },
  {
    code2: "HK",
    code3: "HKG",
    name: "Hong Kong",
    capital: "City of Victoria",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [],
  },
  {
    code2: "HU",
    code3: "HUN",
    name: "Hungary",
    capital: "Budapest",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "BA",
        name: "Baranya",
        subdivision: null,
      },
      {
        code: "BZ",
        name: "Borsod-Abaúj-Zemplén",
        subdivision: null,
      },
      {
        code: "BU",
        name: "Budapest",
        subdivision: null,
      },
      {
        code: "BK",
        name: "Bács-Kiskun",
        subdivision: null,
      },
      {
        code: "BE",
        name: "Békés",
        subdivision: null,
      },
      {
        code: "BC",
        name: "Békéscsaba",
        subdivision: null,
      },
      {
        code: "CS",
        name: "Csongrád",
        subdivision: null,
      },
      {
        code: "DE",
        name: "Debrecen",
        subdivision: null,
      },
      {
        code: "DU",
        name: "Dunaújváros",
        subdivision: null,
      },
      {
        code: "EG",
        name: "Eger",
        subdivision: null,
      },
      {
        code: "FE",
        name: "Fejér",
        subdivision: null,
      },
      {
        code: "GY",
        name: "Győr",
        subdivision: null,
      },
      {
        code: "GS",
        name: "Győr-Moson-Sopron",
        subdivision: null,
      },
      {
        code: "HB",
        name: "Hajdú-Bihar",
        subdivision: null,
      },
      {
        code: "HE",
        name: "Heves",
        subdivision: null,
      },
      {
        code: "HV",
        name: "Hódmezővásárhely",
        subdivision: null,
      },
      {
        code: "JN",
        name: "Jász-Nagykun-Szolnok",
        subdivision: null,
      },
      {
        code: "KV",
        name: "Kaposvár",
        subdivision: null,
      },
      {
        code: "KM",
        name: "Kecskemét",
        subdivision: null,
      },
      {
        code: "KE",
        name: "Komárom-Esztergom",
        subdivision: null,
      },
      {
        code: "MI",
        name: "Miskolc",
        subdivision: null,
      },
      {
        code: "NK",
        name: "Nagykanizsa",
        subdivision: null,
      },
      {
        code: "NY",
        name: "Nyíregyháza",
        subdivision: null,
      },
      {
        code: "NO",
        name: "Nógrád",
        subdivision: null,
      },
      {
        code: "PE",
        name: "Pest",
        subdivision: null,
      },
      {
        code: "PS",
        name: "Pécs",
        subdivision: null,
      },
      {
        code: "ST",
        name: "Salgótarján",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Somogy",
        subdivision: null,
      },
      {
        code: "SN",
        name: "Sopron",
        subdivision: null,
      },
      {
        code: "SZ",
        name: "Szabolcs-Szatmár-Bereg",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Szeged",
        subdivision: null,
      },
      {
        code: "SS",
        name: "Szekszárd",
        subdivision: null,
      },
      {
        code: "SK",
        name: "Szolnok",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Szombathely",
        subdivision: null,
      },
      {
        code: "SF",
        name: "Székesfehérvár",
        subdivision: null,
      },
      {
        code: "TB",
        name: "Tatabánya",
        subdivision: null,
      },
      {
        code: "TO",
        name: "Tolna",
        subdivision: null,
      },
      {
        code: "VA",
        name: "Vas",
        subdivision: null,
      },
      {
        code: "VE",
        name: "Veszprém",
        subdivision: null,
      },
      {
        code: "VM",
        name: "Veszprém",
        subdivision: null,
      },
      {
        code: "ZA",
        name: "Zala",
        subdivision: null,
      },
      {
        code: "ZE",
        name: "Zalaegerszeg",
        subdivision: null,
      },
      {
        code: "ER",
        name: "Érd",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IS",
    code3: "ISL",
    name: "Iceland",
    capital: "Reykjavík",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "7",
        name: "Austurland",
        subdivision: null,
      },
      {
        code: "1",
        name: "Höfuðborgarsvæði utan Reykjavíkur",
        subdivision: null,
      },
      {
        code: "6",
        name: "Norðurland eystra",
        subdivision: null,
      },
      {
        code: "5",
        name: "Norðurland vestra",
        subdivision: null,
      },
      {
        code: "0",
        name: "Reykjavík",
        subdivision: null,
      },
      {
        code: "8",
        name: "Suðurland",
        subdivision: null,
      },
      {
        code: "2",
        name: "Suðurnes",
        subdivision: null,
      },
      {
        code: "4",
        name: "Vestfirðir",
        subdivision: null,
      },
      {
        code: "3",
        name: "Vesturland",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IN",
    code3: "IND",
    name: "India",
    capital: "New Delhi",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "AN",
        name: "Andaman and Nicobar Islands",
        subdivision: "Union territory",
      },
      {
        code: "CH",
        name: "Chandigarh",
        subdivision: "Union territory",
      },
      {
        code: "DN",
        name: "Dadra and Nagar Haveli",
        subdivision: "Union territory",
      },
      {
        code: "DD",
        name: "Daman and Diu",
        subdivision: "Union territory",
      },
      {
        code: "DL",
        name: "Delhi",
        subdivision: "Union territory",
      },
      {
        code: "LD",
        name: "Lakshadweep",
        subdivision: "Union territory",
      },
      {
        code: "PY",
        name: "Puducherry",
        subdivision: "Union territory",
      },
      {
        code: "AP",
        name: "Andhra Pradesh",
        subdivision: "state",
      },
      {
        code: "AR",
        name: "Arunachal Pradesh",
        subdivision: "state",
      },
      {
        code: "AS",
        name: "Assam",
        subdivision: "state",
      },
      {
        code: "BR",
        name: "Bihar",
        subdivision: "state",
      },
      {
        code: "CT",
        name: "Chhattisgarh",
        subdivision: "state",
      },
      {
        code: "GA",
        name: "Goa",
        subdivision: "state",
      },
      {
        code: "GJ",
        name: "Gujarat",
        subdivision: "state",
      },
      {
        code: "HR",
        name: "Haryana",
        subdivision: "state",
      },
      {
        code: "HP",
        name: "Himachal Pradesh",
        subdivision: "state",
      },
      {
        code: "JK",
        name: "Jammu and Kashmir",
        subdivision: "state",
      },
      {
        code: "JH",
        name: "Jharkhand",
        subdivision: "state",
      },
      {
        code: "KA",
        name: "Karnataka",
        subdivision: "state",
      },
      {
        code: "KL",
        name: "Kerala",
        subdivision: "state",
      },
      {
        code: "MP",
        name: "Madhya Pradesh",
        subdivision: "state",
      },
      {
        code: "MH",
        name: "Maharashtra",
        subdivision: "state",
      },
      {
        code: "MN",
        name: "Manipur",
        subdivision: "state",
      },
      {
        code: "ML",
        name: "Meghalaya",
        subdivision: "state",
      },
      {
        code: "MZ",
        name: "Mizoram",
        subdivision: "state",
      },
      {
        code: "NL",
        name: "Nagaland",
        subdivision: "state",
      },
      {
        code: "OR",
        name: "Odisha",
        subdivision: "state",
      },
      {
        code: "PB",
        name: "Punjab",
        subdivision: "state",
      },
      {
        code: "RJ",
        name: "Rajasthan",
        subdivision: "state",
      },
      {
        code: "SK",
        name: "Sikkim",
        subdivision: "state",
      },
      {
        code: "TN",
        name: "Tamil Nadu",
        subdivision: "state",
      },
      {
        code: "TG",
        name: "Telangana",
        subdivision: "state",
      },
      {
        code: "TR",
        name: "Tripura",
        subdivision: "state",
      },
      {
        code: "UP",
        name: "Uttar Pradesh",
        subdivision: "state",
      },
      {
        code: "UT",
        name: "Uttarakhand",
        subdivision: "state",
      },
      {
        code: "WB",
        name: "West Bengal",
        subdivision: "state",
      },
    ],
  },
  {
    code2: "ID",
    code3: "IDN",
    name: "Indonesia",
    capital: "Jakarta",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "JW",
        name: "Jawa",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Kalimantan",
        subdivision: null,
      },
      {
        code: "ML",
        name: "Maluku",
        subdivision: null,
      },
      {
        code: "NU",
        name: "Nusa Tenggara",
        subdivision: null,
      },
      {
        code: "PP",
        name: "Papua",
        subdivision: null,
      },
      {
        code: "SL",
        name: "Sulawesi",
        subdivision: null,
      },
      {
        code: "SM",
        name: "Sumatera",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CI",
    code3: "CIV",
    name: "Ivory Coast",
    capital: "Yamoussoukro",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "06",
        name: "18 Montagnes",
        subdivision: null,
      },
      {
        code: "16",
        name: "Agnébi",
        subdivision: null,
      },
      {
        code: "17",
        name: "Bafing",
        subdivision: null,
      },
      {
        code: "09",
        name: "Bas-Sassandra",
        subdivision: null,
      },
      {
        code: "10",
        name: "Denguélé",
        subdivision: null,
      },
      {
        code: "18",
        name: "Fromager",
        subdivision: null,
      },
      {
        code: "02",
        name: "Haut-Sassandra",
        subdivision: null,
      },
      {
        code: "07",
        name: "Lacs",
        subdivision: null,
      },
      {
        code: "01",
        name: "Lagunes",
        subdivision: null,
      },
      {
        code: "12",
        name: "Marahoué",
        subdivision: null,
      },
      {
        code: "19",
        name: "Moyen-Cavally",
        subdivision: null,
      },
      {
        code: "05",
        name: "Moyen-Comoé",
        subdivision: null,
      },
      {
        code: "11",
        name: "Nzi-Comoé",
        subdivision: null,
      },
      {
        code: "03",
        name: "Savanes",
        subdivision: null,
      },
      {
        code: "15",
        name: "Sud-Bandama",
        subdivision: null,
      },
      {
        code: "13",
        name: "Sud-Comoé",
        subdivision: null,
      },
      {
        code: "04",
        name: "Vallée du Bandama",
        subdivision: null,
      },
      {
        code: "14",
        name: "Worodougou",
        subdivision: null,
      },
      {
        code: "08",
        name: "Zanzan",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IR",
    code3: "IRN",
    name: "Iran",
    capital: "Tehran",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "32",
        name: "Alborz",
        subdivision: null,
      },
      {
        code: "03",
        name: "Ardabīl",
        subdivision: null,
      },
      {
        code: "06",
        name: "Būshehr",
        subdivision: null,
      },
      {
        code: "08",
        name: "Chahār Maḩāll va Bakhtīārī",
        subdivision: null,
      },
      {
        code: "04",
        name: "Eşfahān",
        subdivision: null,
      },
      {
        code: "14",
        name: "Fārs",
        subdivision: null,
      },
      {
        code: "27",
        name: "Golestān",
        subdivision: null,
      },
      {
        code: "19",
        name: "Gīlān",
        subdivision: null,
      },
      {
        code: "24",
        name: "Hamadān",
        subdivision: null,
      },
      {
        code: "23",
        name: "Hormozgān",
        subdivision: null,
      },
      {
        code: "15",
        name: "Kermān",
        subdivision: null,
      },
      {
        code: "17",
        name: "Kermānshāh",
        subdivision: null,
      },
      {
        code: "29",
        name: "Khorāsān-e Janūbī",
        subdivision: null,
      },
      {
        code: "30",
        name: "Khorāsān-e Razavī",
        subdivision: null,
      },
      {
        code: "31",
        name: "Khorāsān-e Shemālī",
        subdivision: null,
      },
      {
        code: "10",
        name: "Khūzestān",
        subdivision: null,
      },
      {
        code: "18",
        name: "Kohgīlūyeh va Būyer Aḩmad",
        subdivision: null,
      },
      {
        code: "16",
        name: "Kordestān",
        subdivision: null,
      },
      {
        code: "20",
        name: "Lorestān",
        subdivision: null,
      },
      {
        code: "22",
        name: "Markazī",
        subdivision: null,
      },
      {
        code: "21",
        name: "Māzandarān",
        subdivision: null,
      },
      {
        code: "28",
        name: "Qazvīn",
        subdivision: null,
      },
      {
        code: "26",
        name: "Qom",
        subdivision: null,
      },
      {
        code: "12",
        name: "Semnān",
        subdivision: null,
      },
      {
        code: "13",
        name: "Sīstān va Balūchestān",
        subdivision: null,
      },
      {
        code: "07",
        name: "Tehrān",
        subdivision: null,
      },
      {
        code: "25",
        name: "Yazd",
        subdivision: null,
      },
      {
        code: "11",
        name: "Zanjān",
        subdivision: null,
      },
      {
        code: "02",
        name: "Āz̄arbāyjān-e Gharbī",
        subdivision: null,
      },
      {
        code: "01",
        name: "Āz̄arbāyjān-e Sharqī",
        subdivision: null,
      },
      {
        code: "05",
        name: "Īlām",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IQ",
    code3: "IRQ",
    name: "Iraq",
    capital: "Baghdad",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AN",
        name: "Al Anbār",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Al Başrah",
        subdivision: null,
      },
      {
        code: "MU",
        name: "Al Muthanná",
        subdivision: null,
      },
      {
        code: "QA",
        name: "Al Qādisīyah",
        subdivision: null,
      },
      {
        code: "NA",
        name: "An Najaf",
        subdivision: null,
      },
      {
        code: "AR",
        name: "Arbīl",
        subdivision: null,
      },
      {
        code: "SU",
        name: "As Sulaymānīyah",
        subdivision: null,
      },
      {
        code: "TS",
        name: "At Ta'mīm",
        subdivision: null,
      },
      {
        code: "BG",
        name: "Baghdād",
        subdivision: null,
      },
      {
        code: "BB",
        name: "Bābil",
        subdivision: null,
      },
      {
        code: "DA",
        name: "Dahūk",
        subdivision: null,
      },
      {
        code: "DQ",
        name: "Dhī Qār",
        subdivision: null,
      },
      {
        code: "DI",
        name: "Diyālá",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Karbalā'",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Maysān",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Nīnawá",
        subdivision: null,
      },
      {
        code: "WA",
        name: "Wāsiţ",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Şalāḩ ad Dīn",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IE",
    code3: "IRL",
    name: "Republic of Ireland",
    capital: "Dublin",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "C",
        name: "Connaught",
        subdivision: null,
      },
      {
        code: "L",
        name: "Leinster",
        subdivision: null,
      },
      {
        code: "M",
        name: "Munster",
        subdivision: null,
      },
      {
        code: "U",
        name: "Ulster",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IM",
    code3: "IMN",
    name: "Isle of Man",
    capital: "Douglas",
    region: "Europe",
    subregion: "Northern Europe",
    states: [],
  },
  {
    code2: "IL",
    code3: "ISR",
    name: "Israel",
    capital: "Jerusalem",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "D",
        name: "HaDarom",
        subdivision: null,
      },
      {
        code: "M",
        name: "HaMerkaz",
        subdivision: null,
      },
      {
        code: "Z",
        name: "HaTsafon",
        subdivision: null,
      },
      {
        code: "HA",
        name: "H̱efa",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tel-Aviv",
        subdivision: null,
      },
      {
        code: "JM",
        name: "Yerushalayim",
        subdivision: null,
      },
    ],
  },
  {
    code2: "IT",
    code3: "ITA",
    name: "Italy",
    capital: "Rome",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "65",
        name: "Abruzzo",
        subdivision: null,
      },
      {
        code: "77",
        name: "Basilicata",
        subdivision: null,
      },
      {
        code: "78",
        name: "Calabria",
        subdivision: null,
      },
      {
        code: "72",
        name: "Campania",
        subdivision: null,
      },
      {
        code: "45",
        name: "Emilia-Romagna",
        subdivision: null,
      },
      {
        code: "36",
        name: "Friuli-Venezia Giulia",
        subdivision: null,
      },
      {
        code: "62",
        name: "Lazio",
        subdivision: null,
      },
      {
        code: "42",
        name: "Liguria",
        subdivision: null,
      },
      {
        code: "25",
        name: "Lombardia",
        subdivision: null,
      },
      {
        code: "57",
        name: "Marche",
        subdivision: null,
      },
      {
        code: "67",
        name: "Molise",
        subdivision: null,
      },
      {
        code: "21",
        name: "Piemonte",
        subdivision: null,
      },
      {
        code: "75",
        name: "Puglia",
        subdivision: null,
      },
      {
        code: "88",
        name: "Sardegna",
        subdivision: null,
      },
      {
        code: "82",
        name: "Sicilia",
        subdivision: null,
      },
      {
        code: "52",
        name: "Toscana",
        subdivision: null,
      },
      {
        code: "32",
        name: "Trentino-Alto Adige",
        subdivision: null,
      },
      {
        code: "55",
        name: "Umbria",
        subdivision: null,
      },
      {
        code: "23",
        name: "Valle d'Aosta",
        subdivision: null,
      },
      {
        code: "34",
        name: "Veneto",
        subdivision: null,
      },
    ],
  },
  {
    code2: "JM",
    code3: "JAM",
    name: "Jamaica",
    capital: "Kingston",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "13",
        name: "Clarendon",
        subdivision: null,
      },
      {
        code: "09",
        name: "Hanover",
        subdivision: null,
      },
      {
        code: "01",
        name: "Kingston",
        subdivision: null,
      },
      {
        code: "12",
        name: "Manchester",
        subdivision: null,
      },
      {
        code: "04",
        name: "Portland",
        subdivision: null,
      },
      {
        code: "02",
        name: "Saint Andrew",
        subdivision: null,
      },
      {
        code: "06",
        name: "Saint Ann",
        subdivision: null,
      },
      {
        code: "14",
        name: "Saint Catherine",
        subdivision: null,
      },
      {
        code: "11",
        name: "Saint Elizabeth",
        subdivision: null,
      },
      {
        code: "08",
        name: "Saint James",
        subdivision: null,
      },
      {
        code: "05",
        name: "Saint Mary",
        subdivision: null,
      },
      {
        code: "03",
        name: "Saint Thomas",
        subdivision: null,
      },
      {
        code: "07",
        name: "Trelawny",
        subdivision: null,
      },
      {
        code: "10",
        name: "Westmoreland",
        subdivision: null,
      },
    ],
  },
  {
    code2: "JP",
    code3: "JPN",
    name: "Japan",
    capital: "Tokyo",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [
      {
        code: "23",
        name: "Aiti",
        subdivision: null,
      },
      {
        code: "05",
        name: "Akita",
        subdivision: null,
      },
      {
        code: "02",
        name: "Aomori",
        subdivision: null,
      },
      {
        code: "38",
        name: "Ehime",
        subdivision: null,
      },
      {
        code: "21",
        name: "Gihu",
        subdivision: null,
      },
      {
        code: "10",
        name: "Gunma",
        subdivision: null,
      },
      {
        code: "34",
        name: "Hirosima",
        subdivision: null,
      },
      {
        code: "01",
        name: "Hokkaidô",
        subdivision: null,
      },
      {
        code: "18",
        name: "Hukui",
        subdivision: null,
      },
      {
        code: "40",
        name: "Hukuoka",
        subdivision: null,
      },
      {
        code: "07",
        name: "Hukusima",
        subdivision: null,
      },
      {
        code: "28",
        name: "Hyôgo",
        subdivision: null,
      },
      {
        code: "08",
        name: "Ibaraki",
        subdivision: null,
      },
      {
        code: "17",
        name: "Isikawa",
        subdivision: null,
      },
      {
        code: "03",
        name: "Iwate",
        subdivision: null,
      },
      {
        code: "37",
        name: "Kagawa",
        subdivision: null,
      },
      {
        code: "46",
        name: "Kagosima",
        subdivision: null,
      },
      {
        code: "14",
        name: "Kanagawa",
        subdivision: null,
      },
      {
        code: "43",
        name: "Kumamoto",
        subdivision: null,
      },
      {
        code: "26",
        name: "Kyôto",
        subdivision: null,
      },
      {
        code: "39",
        name: "Kôti",
        subdivision: null,
      },
      {
        code: "24",
        name: "Mie",
        subdivision: null,
      },
      {
        code: "04",
        name: "Miyagi",
        subdivision: null,
      },
      {
        code: "45",
        name: "Miyazaki",
        subdivision: null,
      },
      {
        code: "20",
        name: "Nagano",
        subdivision: null,
      },
      {
        code: "42",
        name: "Nagasaki",
        subdivision: null,
      },
      {
        code: "29",
        name: "Nara",
        subdivision: null,
      },
      {
        code: "15",
        name: "Niigata",
        subdivision: null,
      },
      {
        code: "33",
        name: "Okayama",
        subdivision: null,
      },
      {
        code: "47",
        name: "Okinawa",
        subdivision: null,
      },
      {
        code: "41",
        name: "Saga",
        subdivision: null,
      },
      {
        code: "11",
        name: "Saitama",
        subdivision: null,
      },
      {
        code: "25",
        name: "Siga",
        subdivision: null,
      },
      {
        code: "32",
        name: "Simane",
        subdivision: null,
      },
      {
        code: "22",
        name: "Sizuoka",
        subdivision: null,
      },
      {
        code: "12",
        name: "Tiba",
        subdivision: null,
      },
      {
        code: "36",
        name: "Tokusima",
        subdivision: null,
      },
      {
        code: "09",
        name: "Totigi",
        subdivision: null,
      },
      {
        code: "31",
        name: "Tottori",
        subdivision: null,
      },
      {
        code: "16",
        name: "Toyama",
        subdivision: null,
      },
      {
        code: "13",
        name: "Tôkyô",
        subdivision: null,
      },
      {
        code: "30",
        name: "Wakayama",
        subdivision: null,
      },
      {
        code: "06",
        name: "Yamagata",
        subdivision: null,
      },
      {
        code: "35",
        name: "Yamaguti",
        subdivision: null,
      },
      {
        code: "19",
        name: "Yamanasi",
        subdivision: null,
      },
      {
        code: "44",
        name: "Ôita",
        subdivision: null,
      },
      {
        code: "27",
        name: "Ôsaka",
        subdivision: null,
      },
    ],
  },
  {
    code2: "JE",
    code3: "JEY",
    name: "Jersey",
    capital: "Saint Helier",
    region: "Europe",
    subregion: "Northern Europe",
    states: [],
  },
  {
    code2: "JO",
    code3: "JOR",
    name: "Jordan",
    capital: "Amman",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "BA",
        name: "Al Balqā'",
        subdivision: null,
      },
      {
        code: "AQ",
        name: "Al ʽAqabah",
        subdivision: null,
      },
      {
        code: "AZ",
        name: "Az Zarqā'",
        subdivision: null,
      },
      {
        code: "AT",
        name: "Aţ Ţafīlah",
        subdivision: null,
      },
      {
        code: "IR",
        name: "Irbid",
        subdivision: null,
      },
      {
        code: "JA",
        name: "Jerash",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Karak",
        subdivision: null,
      },
      {
        code: "MN",
        name: "Ma'ān",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Mafraq",
        subdivision: null,
      },
      {
        code: "MD",
        name: "Mādabā",
        subdivision: null,
      },
      {
        code: "AJ",
        name: "ʽAjlūn",
        subdivision: null,
      },
      {
        code: "AM",
        name: "‘Ammān",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KZ",
    code3: "KAZ",
    name: "Kazakhstan",
    capital: "Astana",
    region: "Asia",
    subregion: "Central Asia",
    states: [
      {
        code: "ALA",
        name: "Almaty",
        subdivision: null,
      },
      {
        code: "ALM",
        name: "Almaty oblysy",
        subdivision: null,
      },
      {
        code: "AKM",
        name: "Aqmola oblysy",
        subdivision: null,
      },
      {
        code: "AKT",
        name: "Aqtöbe oblysy",
        subdivision: null,
      },
      {
        code: "AST",
        name: "Astana",
        subdivision: null,
      },
      {
        code: "ATY",
        name: "Atyraū oblysy",
        subdivision: null,
      },
      {
        code: "ZAP",
        name: "Batys Qazaqstan oblysy",
        subdivision: null,
      },
      {
        code: "MAN",
        name: "Mangghystaū oblysy",
        subdivision: null,
      },
      {
        code: "YUZ",
        name: "Ongtüstik Qazaqstan oblysy",
        subdivision: null,
      },
      {
        code: "PAV",
        name: "Pavlodar oblysy",
        subdivision: null,
      },
      {
        code: "KAR",
        name: "Qaraghandy oblysy",
        subdivision: null,
      },
      {
        code: "KUS",
        name: "Qostanay oblysy",
        subdivision: null,
      },
      {
        code: "KZY",
        name: "Qyzylorda oblysy",
        subdivision: null,
      },
      {
        code: "VOS",
        name: "Shyghys Qazaqstan oblysy",
        subdivision: null,
      },
      {
        code: "SEV",
        name: "Soltüstik Qazaqstan oblysy",
        subdivision: null,
      },
      {
        code: "ZHA",
        name: "Zhambyl oblysy",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KE",
    code3: "KEN",
    name: "Kenya",
    capital: "Nairobi",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "200",
        name: "Central",
        subdivision: null,
      },
      {
        code: "300",
        name: "Coast",
        subdivision: null,
      },
      {
        code: "400",
        name: "Eastern",
        subdivision: null,
      },
      {
        code: "110",
        name: "Nairobi",
        subdivision: null,
      },
      {
        code: "500",
        name: "North-Eastern",
        subdivision: null,
      },
      {
        code: "600",
        name: "Nyanza",
        subdivision: null,
      },
      {
        code: "700",
        name: "Rift Valley",
        subdivision: null,
      },
      {
        code: "800",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KI",
    code3: "KIR",
    name: "Kiribati",
    capital: "South Tarawa",
    region: "Oceania",
    subregion: "Micronesia",
    states: [
      {
        code: "G",
        name: "Gilbert Islands",
        subdivision: null,
      },
      {
        code: "L",
        name: "Line Islands",
        subdivision: null,
      },
      {
        code: "P",
        name: "Phoenix Islands",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KW",
    code3: "KWT",
    name: "Kuwait",
    capital: "Kuwait City",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AH",
        name: "Al Aḩmadi",
        subdivision: null,
      },
      {
        code: "FA",
        name: "Al Farwānīyah",
        subdivision: null,
      },
      {
        code: "JA",
        name: "Al Jahrā’",
        subdivision: null,
      },
      {
        code: "KU",
        name: "Al Kuwayt",
        subdivision: null,
      },
      {
        code: "MU",
        name: "Mubārak al Kabīr",
        subdivision: null,
      },
      {
        code: "HA",
        name: "Ḩawallī",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KG",
    code3: "KGZ",
    name: "Kyrgyzstan",
    capital: "Bishkek",
    region: "Asia",
    subregion: "Central Asia",
    states: [
      {
        code: "B",
        name: "Batken",
        subdivision: null,
      },
      {
        code: "GB",
        name: "Bishkek",
        subdivision: null,
      },
      {
        code: "C",
        name: "Chü",
        subdivision: null,
      },
      {
        code: "J",
        name: "Jalal-Abad",
        subdivision: null,
      },
      {
        code: "N",
        name: "Naryn",
        subdivision: null,
      },
      {
        code: "O",
        name: "Osh",
        subdivision: null,
      },
      {
        code: "T",
        name: "Talas",
        subdivision: null,
      },
      {
        code: "Y",
        name: "Ysyk-Köl",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LA",
    code3: "LAO",
    name: "Laos",
    capital: "Vientiane",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "AT",
        name: "Attapu",
        subdivision: null,
      },
      {
        code: "BK",
        name: "Bokèo",
        subdivision: null,
      },
      {
        code: "BL",
        name: "Bolikhamxai",
        subdivision: null,
      },
      {
        code: "CH",
        name: "Champasak",
        subdivision: null,
      },
      {
        code: "HO",
        name: "Houaphan",
        subdivision: null,
      },
      {
        code: "KH",
        name: "Khammouan",
        subdivision: null,
      },
      {
        code: "LM",
        name: "Louang Namtha",
        subdivision: null,
      },
      {
        code: "LP",
        name: "Louangphabang",
        subdivision: null,
      },
      {
        code: "OU",
        name: "Oudômxai",
        subdivision: null,
      },
      {
        code: "PH",
        name: "Phôngsali",
        subdivision: null,
      },
      {
        code: "SL",
        name: "Salavan",
        subdivision: null,
      },
      {
        code: "SV",
        name: "Savannakhét",
        subdivision: null,
      },
      {
        code: "VT",
        name: "Vientiane",
        subdivision: null,
      },
      {
        code: "VI",
        name: "Vientiane",
        subdivision: null,
      },
      {
        code: "XA",
        name: "Xaignabouli",
        subdivision: null,
      },
      {
        code: "XN",
        name: "Xaisômboun",
        subdivision: null,
      },
      {
        code: "XI",
        name: "Xiangkhoang",
        subdivision: null,
      },
      {
        code: "XE",
        name: "Xékong",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LV",
    code3: "LVA",
    name: "Latvia",
    capital: "Riga",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "001",
        name: "Aglonas novads",
        subdivision: null,
      },
      {
        code: "002",
        name: "Aizkraukles novads",
        subdivision: null,
      },
      {
        code: "003",
        name: "Aizputes novads",
        subdivision: null,
      },
      {
        code: "004",
        name: "Aknīstes novads",
        subdivision: null,
      },
      {
        code: "005",
        name: "Alojas novads",
        subdivision: null,
      },
      {
        code: "006",
        name: "Alsungas novads",
        subdivision: null,
      },
      {
        code: "007",
        name: "Alūksnes novads",
        subdivision: null,
      },
      {
        code: "008",
        name: "Amatas novads",
        subdivision: null,
      },
      {
        code: "009",
        name: "Apes novads",
        subdivision: null,
      },
      {
        code: "010",
        name: "Auces novads",
        subdivision: null,
      },
      {
        code: "012",
        name: "Babītes novads",
        subdivision: null,
      },
      {
        code: "013",
        name: "Baldones novads",
        subdivision: null,
      },
      {
        code: "014",
        name: "Baltinavas novads",
        subdivision: null,
      },
      {
        code: "015",
        name: "Balvu novads",
        subdivision: null,
      },
      {
        code: "016",
        name: "Bauskas novads",
        subdivision: null,
      },
      {
        code: "017",
        name: "Beverīnas novads",
        subdivision: null,
      },
      {
        code: "018",
        name: "Brocēnu novads",
        subdivision: null,
      },
      {
        code: "019",
        name: "Burtnieku novads",
        subdivision: null,
      },
      {
        code: "020",
        name: "Carnikavas novads",
        subdivision: null,
      },
      {
        code: "021",
        name: "Cesvaines novads",
        subdivision: null,
      },
      {
        code: "023",
        name: "Ciblas novads",
        subdivision: null,
      },
      {
        code: "022",
        name: "Cēsu novads",
        subdivision: null,
      },
      {
        code: "024",
        name: "Dagdas novads",
        subdivision: null,
      },
      {
        code: "DGV",
        name: "Daugavpils",
        subdivision: null,
      },
      {
        code: "025",
        name: "Daugavpils novads",
        subdivision: null,
      },
      {
        code: "026",
        name: "Dobeles novads",
        subdivision: null,
      },
      {
        code: "027",
        name: "Dundagas novads",
        subdivision: null,
      },
      {
        code: "028",
        name: "Durbes novads",
        subdivision: null,
      },
      {
        code: "029",
        name: "Engures novads",
        subdivision: null,
      },
      {
        code: "031",
        name: "Garkalnes novads",
        subdivision: null,
      },
      {
        code: "032",
        name: "Grobiņas novads",
        subdivision: null,
      },
      {
        code: "033",
        name: "Gulbenes novads",
        subdivision: null,
      },
      {
        code: "034",
        name: "Iecavas novads",
        subdivision: null,
      },
      {
        code: "035",
        name: "Ikšķiles novads",
        subdivision: null,
      },
      {
        code: "036",
        name: "Ilūkstes novads",
        subdivision: null,
      },
      {
        code: "037",
        name: "Inčukalna novads",
        subdivision: null,
      },
      {
        code: "038",
        name: "Jaunjelgavas novads",
        subdivision: null,
      },
      {
        code: "039",
        name: "Jaunpiebalgas novads",
        subdivision: null,
      },
      {
        code: "040",
        name: "Jaunpils novads",
        subdivision: null,
      },
      {
        code: "JEL",
        name: "Jelgava",
        subdivision: null,
      },
      {
        code: "041",
        name: "Jelgavas novads",
        subdivision: null,
      },
      {
        code: "JKB",
        name: "Jēkabpils",
        subdivision: null,
      },
      {
        code: "042",
        name: "Jēkabpils novads",
        subdivision: null,
      },
      {
        code: "JUR",
        name: "Jūrmala",
        subdivision: null,
      },
      {
        code: "043",
        name: "Kandavas novads",
        subdivision: null,
      },
      {
        code: "045",
        name: "Kocēnu novads",
        subdivision: null,
      },
      {
        code: "046",
        name: "Kokneses novads",
        subdivision: null,
      },
      {
        code: "048",
        name: "Krimuldas novads",
        subdivision: null,
      },
      {
        code: "049",
        name: "Krustpils novads",
        subdivision: null,
      },
      {
        code: "047",
        name: "Krāslavas novads",
        subdivision: null,
      },
      {
        code: "050",
        name: "Kuldīgas novads",
        subdivision: null,
      },
      {
        code: "044",
        name: "Kārsavas novads",
        subdivision: null,
      },
      {
        code: "053",
        name: "Lielvārdes novads",
        subdivision: null,
      },
      {
        code: "LPX",
        name: "Liepāja",
        subdivision: null,
      },
      {
        code: "054",
        name: "Limbažu novads",
        subdivision: null,
      },
      {
        code: "057",
        name: "Lubānas novads",
        subdivision: null,
      },
      {
        code: "058",
        name: "Ludzas novads",
        subdivision: null,
      },
      {
        code: "055",
        name: "Līgatnes novads",
        subdivision: null,
      },
      {
        code: "056",
        name: "Līvānu novads",
        subdivision: null,
      },
      {
        code: "059",
        name: "Madonas novads",
        subdivision: null,
      },
      {
        code: "060",
        name: "Mazsalacas novads",
        subdivision: null,
      },
      {
        code: "061",
        name: "Mālpils novads",
        subdivision: null,
      },
      {
        code: "062",
        name: "Mārupes novads",
        subdivision: null,
      },
      {
        code: "063",
        name: "Mērsraga novads",
        subdivision: null,
      },
      {
        code: "064",
        name: "Naukšēnu novads",
        subdivision: null,
      },
      {
        code: "065",
        name: "Neretas novads",
        subdivision: null,
      },
      {
        code: "066",
        name: "Nīcas novads",
        subdivision: null,
      },
      {
        code: "067",
        name: "Ogres novads",
        subdivision: null,
      },
      {
        code: "068",
        name: "Olaines novads",
        subdivision: null,
      },
      {
        code: "069",
        name: "Ozolnieku novads",
        subdivision: null,
      },
      {
        code: "073",
        name: "Preiļu novads",
        subdivision: null,
      },
      {
        code: "074",
        name: "Priekules novads",
        subdivision: null,
      },
      {
        code: "075",
        name: "Priekuļu novads",
        subdivision: null,
      },
      {
        code: "070",
        name: "Pārgaujas novads",
        subdivision: null,
      },
      {
        code: "071",
        name: "Pāvilostas novads",
        subdivision: null,
      },
      {
        code: "072",
        name: "Pļaviņu novads",
        subdivision: null,
      },
      {
        code: "076",
        name: "Raunas novads",
        subdivision: null,
      },
      {
        code: "078",
        name: "Riebiņu novads",
        subdivision: null,
      },
      {
        code: "079",
        name: "Rojas novads",
        subdivision: null,
      },
      {
        code: "080",
        name: "Ropažu novads",
        subdivision: null,
      },
      {
        code: "081",
        name: "Rucavas novads",
        subdivision: null,
      },
      {
        code: "082",
        name: "Rugāju novads",
        subdivision: null,
      },
      {
        code: "083",
        name: "Rundāles novads",
        subdivision: null,
      },
      {
        code: "REZ",
        name: "Rēzekne",
        subdivision: null,
      },
      {
        code: "077",
        name: "Rēzeknes novads",
        subdivision: null,
      },
      {
        code: "RIX",
        name: "Rīga",
        subdivision: null,
      },
      {
        code: "084",
        name: "Rūjienas novads",
        subdivision: null,
      },
      {
        code: "086",
        name: "Salacgrīvas novads",
        subdivision: null,
      },
      {
        code: "085",
        name: "Salas novads",
        subdivision: null,
      },
      {
        code: "087",
        name: "Salaspils novads",
        subdivision: null,
      },
      {
        code: "088",
        name: "Saldus novads",
        subdivision: null,
      },
      {
        code: "089",
        name: "Saulkrastu novads",
        subdivision: null,
      },
      {
        code: "091",
        name: "Siguldas novads",
        subdivision: null,
      },
      {
        code: "093",
        name: "Skrundas novads",
        subdivision: null,
      },
      {
        code: "092",
        name: "Skrīveru novads",
        subdivision: null,
      },
      {
        code: "094",
        name: "Smiltenes novads",
        subdivision: null,
      },
      {
        code: "095",
        name: "Stopiņu novads",
        subdivision: null,
      },
      {
        code: "096",
        name: "Strenču novads",
        subdivision: null,
      },
      {
        code: "090",
        name: "Sējas novads",
        subdivision: null,
      },
      {
        code: "097",
        name: "Talsu novads",
        subdivision: null,
      },
      {
        code: "099",
        name: "Tukuma novads",
        subdivision: null,
      },
      {
        code: "098",
        name: "Tērvetes novads",
        subdivision: null,
      },
      {
        code: "100",
        name: "Vaiņodes novads",
        subdivision: null,
      },
      {
        code: "101",
        name: "Valkas novads",
        subdivision: null,
      },
      {
        code: "VMR",
        name: "Valmiera",
        subdivision: null,
      },
      {
        code: "102",
        name: "Varakļānu novads",
        subdivision: null,
      },
      {
        code: "104",
        name: "Vecpiebalgas novads",
        subdivision: null,
      },
      {
        code: "105",
        name: "Vecumnieku novads",
        subdivision: null,
      },
      {
        code: "VEN",
        name: "Ventspils",
        subdivision: null,
      },
      {
        code: "106",
        name: "Ventspils novads",
        subdivision: null,
      },
      {
        code: "107",
        name: "Viesītes novads",
        subdivision: null,
      },
      {
        code: "108",
        name: "Viļakas novads",
        subdivision: null,
      },
      {
        code: "109",
        name: "Viļānu novads",
        subdivision: null,
      },
      {
        code: "103",
        name: "Vārkavas novads",
        subdivision: null,
      },
      {
        code: "110",
        name: "Zilupes novads",
        subdivision: null,
      },
      {
        code: "011",
        name: "Ādažu novads",
        subdivision: null,
      },
      {
        code: "030",
        name: "Ērgļu novads",
        subdivision: null,
      },
      {
        code: "051",
        name: "Ķeguma novads",
        subdivision: null,
      },
      {
        code: "052",
        name: "Ķekavas novads",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LB",
    code3: "LBN",
    name: "Lebanon",
    capital: "Beirut",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AK",
        name: "Aakkâr",
        subdivision: null,
      },
      {
        code: "BH",
        name: "Baalbek-Hermel",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Beyrouth",
        subdivision: null,
      },
      {
        code: "BI",
        name: "Béqaa",
        subdivision: null,
      },
      {
        code: "AS",
        name: "Liban-Nord",
        subdivision: null,
      },
      {
        code: "JA",
        name: "Liban-Sud",
        subdivision: null,
      },
      {
        code: "JL",
        name: "Mont-Liban",
        subdivision: null,
      },
      {
        code: "NA",
        name: "Nabatîyé",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LS",
    code3: "LSO",
    name: "Lesotho",
    capital: "Maseru",
    region: "Africa",
    subregion: "Southern Africa",
    states: [
      {
        code: "D",
        name: "Berea",
        subdivision: null,
      },
      {
        code: "B",
        name: "Butha-Buthe",
        subdivision: null,
      },
      {
        code: "C",
        name: "Leribe",
        subdivision: null,
      },
      {
        code: "E",
        name: "Mafeteng",
        subdivision: null,
      },
      {
        code: "A",
        name: "Maseru",
        subdivision: null,
      },
      {
        code: "F",
        name: "Mohale's Hoek",
        subdivision: null,
      },
      {
        code: "J",
        name: "Mokhotlong",
        subdivision: null,
      },
      {
        code: "H",
        name: "Qacha's Nek",
        subdivision: null,
      },
      {
        code: "G",
        name: "Quthing",
        subdivision: null,
      },
      {
        code: "K",
        name: "Thaba-Tseka",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LR",
    code3: "LBR",
    name: "Liberia",
    capital: "Monrovia",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "BM",
        name: "Bomi",
        subdivision: null,
      },
      {
        code: "BG",
        name: "Bong",
        subdivision: null,
      },
      {
        code: "GP",
        name: "Gbarpolu",
        subdivision: null,
      },
      {
        code: "GB",
        name: "Grand Bassa",
        subdivision: null,
      },
      {
        code: "CM",
        name: "Grand Cape Mount",
        subdivision: null,
      },
      {
        code: "GG",
        name: "Grand Gedeh",
        subdivision: null,
      },
      {
        code: "GK",
        name: "Grand Kru",
        subdivision: null,
      },
      {
        code: "LO",
        name: "Lofa",
        subdivision: null,
      },
      {
        code: "MG",
        name: "Margibi",
        subdivision: null,
      },
      {
        code: "MY",
        name: "Maryland",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Montserrado",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Nimba",
        subdivision: null,
      },
      {
        code: "RG",
        name: "River Gee",
        subdivision: null,
      },
      {
        code: "RI",
        name: "Rivercess",
        subdivision: null,
      },
      {
        code: "SI",
        name: "Sinoe",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LY",
    code3: "LBY",
    name: "Libya",
    capital: "Tripoli",
    region: "Africa",
    subregion: "Northern Africa",
    states: [
      {
        code: "BU",
        name: "Al Buţnān",
        subdivision: null,
      },
      {
        code: "JA",
        name: "Al Jabal al Akhḑar",
        subdivision: null,
      },
      {
        code: "JG",
        name: "Al Jabal al Gharbī",
        subdivision: null,
      },
      {
        code: "JI",
        name: "Al Jifārah",
        subdivision: null,
      },
      {
        code: "JU",
        name: "Al Jufrah",
        subdivision: null,
      },
      {
        code: "KF",
        name: "Al Kufrah",
        subdivision: null,
      },
      {
        code: "MJ",
        name: "Al Marj",
        subdivision: null,
      },
      {
        code: "MB",
        name: "Al Marqab",
        subdivision: null,
      },
      {
        code: "WA",
        name: "Al Wāḩāt",
        subdivision: null,
      },
      {
        code: "NQ",
        name: "An Nuqaţ al Khams",
        subdivision: null,
      },
      {
        code: "ZA",
        name: "Az Zāwiyah",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Banghāzī",
        subdivision: null,
      },
      {
        code: "DR",
        name: "Darnah",
        subdivision: null,
      },
      {
        code: "GT",
        name: "Ghāt",
        subdivision: null,
      },
      {
        code: "MI",
        name: "Mişrātah",
        subdivision: null,
      },
      {
        code: "MQ",
        name: "Murzuq",
        subdivision: null,
      },
      {
        code: "NL",
        name: "Nālūt",
        subdivision: null,
      },
      {
        code: "SB",
        name: "Sabhā",
        subdivision: null,
      },
      {
        code: "SR",
        name: "Surt",
        subdivision: null,
      },
      {
        code: "WD",
        name: "Wādī al Ḩayāt",
        subdivision: null,
      },
      {
        code: "WS",
        name: "Wādī ash Shāţiʾ",
        subdivision: null,
      },
      {
        code: "TB",
        name: "Ţarābulus",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LI",
    code3: "LIE",
    name: "Liechtenstein",
    capital: "Vaduz",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "01",
        name: "Balzers",
        subdivision: null,
      },
      {
        code: "02",
        name: "Eschen",
        subdivision: null,
      },
      {
        code: "03",
        name: "Gamprin",
        subdivision: null,
      },
      {
        code: "04",
        name: "Mauren",
        subdivision: null,
      },
      {
        code: "05",
        name: "Planken",
        subdivision: null,
      },
      {
        code: "06",
        name: "Ruggell",
        subdivision: null,
      },
      {
        code: "07",
        name: "Schaan",
        subdivision: null,
      },
      {
        code: "08",
        name: "Schellenberg",
        subdivision: null,
      },
      {
        code: "09",
        name: "Triesen",
        subdivision: null,
      },
      {
        code: "10",
        name: "Triesenberg",
        subdivision: null,
      },
      {
        code: "11",
        name: "Vaduz",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LT",
    code3: "LTU",
    name: "Lithuania",
    capital: "Vilnius",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "AL",
        name: "Alytaus Apskritis",
        subdivision: null,
      },
      {
        code: "KU",
        name: "Kauno Apskritis",
        subdivision: null,
      },
      {
        code: "KL",
        name: "Klaipėdos Apskritis",
        subdivision: null,
      },
      {
        code: "MR",
        name: "Marijampolės Apskritis",
        subdivision: null,
      },
      {
        code: "PN",
        name: "Panevėžio Apskritis",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tauragės Apskritis",
        subdivision: null,
      },
      {
        code: "TE",
        name: "Telšių Apskritis",
        subdivision: null,
      },
      {
        code: "UT",
        name: "Utenos Apskritis",
        subdivision: null,
      },
      {
        code: "VL",
        name: "Vilniaus Apskritis",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Šiaulių Apskritis",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LU",
    code3: "LUX",
    name: "Luxembourg",
    capital: "Luxembourg",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "D",
        name: "Diekirch",
        subdivision: null,
      },
      {
        code: "G",
        name: "Grevenmacher",
        subdivision: null,
      },
      {
        code: "L",
        name: "Luxembourg",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MO",
    code3: "MAC",
    name: "Macau",
    capital: "",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [],
  },
  {
    code2: "MK",
    code3: "MKD",
    name: "Republic of Macedonia",
    capital: "Skopje",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "01",
        name: "Aerodrom",
        subdivision: null,
      },
      {
        code: "02",
        name: "Aračinovo",
        subdivision: null,
      },
      {
        code: "03",
        name: "Berovo",
        subdivision: null,
      },
      {
        code: "04",
        name: "Bitola",
        subdivision: null,
      },
      {
        code: "05",
        name: "Bogdanci",
        subdivision: null,
      },
      {
        code: "06",
        name: "Bogovinje",
        subdivision: null,
      },
      {
        code: "07",
        name: "Bosilovo",
        subdivision: null,
      },
      {
        code: "08",
        name: "Brvenica",
        subdivision: null,
      },
      {
        code: "09",
        name: "Butel",
        subdivision: null,
      },
      {
        code: "77",
        name: "Centar",
        subdivision: null,
      },
      {
        code: "78",
        name: "Centar Župa",
        subdivision: null,
      },
      {
        code: "21",
        name: "Debar",
        subdivision: null,
      },
      {
        code: "22",
        name: "Debarca",
        subdivision: null,
      },
      {
        code: "23",
        name: "Delčevo",
        subdivision: null,
      },
      {
        code: "25",
        name: "Demir Hisar",
        subdivision: null,
      },
      {
        code: "24",
        name: "Demir Kapija",
        subdivision: null,
      },
      {
        code: "26",
        name: "Dojran",
        subdivision: null,
      },
      {
        code: "27",
        name: "Dolneni",
        subdivision: null,
      },
      {
        code: "28",
        name: "Drugovo",
        subdivision: null,
      },
      {
        code: "17",
        name: "Gazi Baba",
        subdivision: null,
      },
      {
        code: "18",
        name: "Gevgelija",
        subdivision: null,
      },
      {
        code: "29",
        name: "Gjorče Petrov",
        subdivision: null,
      },
      {
        code: "19",
        name: "Gostivar",
        subdivision: null,
      },
      {
        code: "20",
        name: "Gradsko",
        subdivision: null,
      },
      {
        code: "34",
        name: "Ilinden",
        subdivision: null,
      },
      {
        code: "35",
        name: "Jegunovce",
        subdivision: null,
      },
      {
        code: "37",
        name: "Karbinci",
        subdivision: null,
      },
      {
        code: "38",
        name: "Karpoš",
        subdivision: null,
      },
      {
        code: "36",
        name: "Kavadarci",
        subdivision: null,
      },
      {
        code: "39",
        name: "Kisela Voda",
        subdivision: null,
      },
      {
        code: "40",
        name: "Kičevo",
        subdivision: null,
      },
      {
        code: "41",
        name: "Konče",
        subdivision: null,
      },
      {
        code: "42",
        name: "Kočani",
        subdivision: null,
      },
      {
        code: "43",
        name: "Kratovo",
        subdivision: null,
      },
      {
        code: "44",
        name: "Kriva Palanka",
        subdivision: null,
      },
      {
        code: "45",
        name: "Krivogaštani",
        subdivision: null,
      },
      {
        code: "46",
        name: "Kruševo",
        subdivision: null,
      },
      {
        code: "47",
        name: "Kumanovo",
        subdivision: null,
      },
      {
        code: "48",
        name: "Lipkovo",
        subdivision: null,
      },
      {
        code: "49",
        name: "Lozovo",
        subdivision: null,
      },
      {
        code: "51",
        name: "Makedonska Kamenica",
        subdivision: null,
      },
      {
        code: "52",
        name: "Makedonski Brod",
        subdivision: null,
      },
      {
        code: "50",
        name: "Mavrovo i Rostuša",
        subdivision: null,
      },
      {
        code: "53",
        name: "Mogila",
        subdivision: null,
      },
      {
        code: "54",
        name: "Negotino",
        subdivision: null,
      },
      {
        code: "55",
        name: "Novaci",
        subdivision: null,
      },
      {
        code: "56",
        name: "Novo Selo",
        subdivision: null,
      },
      {
        code: "58",
        name: "Ohrid",
        subdivision: null,
      },
      {
        code: "57",
        name: "Oslomej",
        subdivision: null,
      },
      {
        code: "60",
        name: "Pehčevo",
        subdivision: null,
      },
      {
        code: "59",
        name: "Petrovec",
        subdivision: null,
      },
      {
        code: "61",
        name: "Plasnica",
        subdivision: null,
      },
      {
        code: "62",
        name: "Prilep",
        subdivision: null,
      },
      {
        code: "63",
        name: "Probištip",
        subdivision: null,
      },
      {
        code: "64",
        name: "Radoviš",
        subdivision: null,
      },
      {
        code: "65",
        name: "Rankovce",
        subdivision: null,
      },
      {
        code: "66",
        name: "Resen",
        subdivision: null,
      },
      {
        code: "67",
        name: "Rosoman",
        subdivision: null,
      },
      {
        code: "68",
        name: "Saraj",
        subdivision: null,
      },
      {
        code: "70",
        name: "Sopište",
        subdivision: null,
      },
      {
        code: "71",
        name: "Staro Nagoričane",
        subdivision: null,
      },
      {
        code: "72",
        name: "Struga",
        subdivision: null,
      },
      {
        code: "73",
        name: "Strumica",
        subdivision: null,
      },
      {
        code: "74",
        name: "Studeničani",
        subdivision: null,
      },
      {
        code: "69",
        name: "Sveti Nikole",
        subdivision: null,
      },
      {
        code: "75",
        name: "Tearce",
        subdivision: null,
      },
      {
        code: "76",
        name: "Tetovo",
        subdivision: null,
      },
      {
        code: "10",
        name: "Valandovo",
        subdivision: null,
      },
      {
        code: "11",
        name: "Vasilevo",
        subdivision: null,
      },
      {
        code: "13",
        name: "Veles",
        subdivision: null,
      },
      {
        code: "12",
        name: "Vevčani",
        subdivision: null,
      },
      {
        code: "14",
        name: "Vinica",
        subdivision: null,
      },
      {
        code: "15",
        name: "Vraneštica",
        subdivision: null,
      },
      {
        code: "16",
        name: "Vrapčište",
        subdivision: null,
      },
      {
        code: "31",
        name: "Zajas",
        subdivision: null,
      },
      {
        code: "32",
        name: "Zelenikovo",
        subdivision: null,
      },
      {
        code: "33",
        name: "Zrnovci",
        subdivision: null,
      },
      {
        code: "79",
        name: "Čair",
        subdivision: null,
      },
      {
        code: "80",
        name: "Čaška",
        subdivision: null,
      },
      {
        code: "81",
        name: "Češinovo-Obleševo",
        subdivision: null,
      },
      {
        code: "82",
        name: "Čučer Sandevo",
        subdivision: null,
      },
      {
        code: "83",
        name: "Štip",
        subdivision: null,
      },
      {
        code: "84",
        name: "Šuto Orizari",
        subdivision: null,
      },
      {
        code: "30",
        name: "Želino",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MG",
    code3: "MDG",
    name: "Madagascar",
    capital: "Antananarivo",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "T",
        name: "Antananarivo",
        subdivision: null,
      },
      {
        code: "D",
        name: "Antsiranana",
        subdivision: null,
      },
      {
        code: "F",
        name: "Fianarantsoa",
        subdivision: null,
      },
      {
        code: "M",
        name: "Mahajanga",
        subdivision: null,
      },
      {
        code: "A",
        name: "Toamasina",
        subdivision: null,
      },
      {
        code: "U",
        name: "Toliara",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MW",
    code3: "MWI",
    name: "Malawi",
    capital: "Lilongwe",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "C",
        name: "Central Region",
        subdivision: null,
      },
      {
        code: "N",
        name: "Northern Region",
        subdivision: null,
      },
      {
        code: "S",
        name: "Southern Region",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MY",
    code3: "MYS",
    name: "Malaysia",
    capital: "Kuala Lumpur",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "14",
        name: "Wilayah Persekutuan Kuala Lumpur",
        subdivision: "federal territory",
      },
      {
        code: "15",
        name: "Wilayah Persekutuan Labuan",
        subdivision: "federal territory",
      },
      {
        code: "16",
        name: "Wilayah Persekutuan Putrajaya",
        subdivision: "federal territory",
      },
      {
        code: "01",
        name: "Johor",
        subdivision: "state",
      },
      {
        code: "02",
        name: "Kedah",
        subdivision: "state",
      },
      {
        code: "03",
        name: "Kelantan",
        subdivision: "state",
      },
      {
        code: "04",
        name: "Melaka",
        subdivision: "state",
      },
      {
        code: "05",
        name: "Negeri Sembilan",
        subdivision: "state",
      },
      {
        code: "06",
        name: "Pahang",
        subdivision: "state",
      },
      {
        code: "08",
        name: "Perak",
        subdivision: "state",
      },
      {
        code: "09",
        name: "Perlis",
        subdivision: "state",
      },
      {
        code: "07",
        name: "Pulau Pinang",
        subdivision: "state",
      },
      {
        code: "12",
        name: "Sabah",
        subdivision: "state",
      },
      {
        code: "13",
        name: "Sarawak",
        subdivision: "state",
      },
      {
        code: "10",
        name: "Selangor",
        subdivision: "state",
      },
      {
        code: "11",
        name: "Terengganu",
        subdivision: "state",
      },
    ],
  },
  {
    code2: "MV",
    code3: "MDV",
    name: "Maldives",
    capital: "Malé",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "CE",
        name: "Central",
        subdivision: null,
      },
      {
        code: "MLE",
        name: "Male",
        subdivision: null,
      },
      {
        code: "NO",
        name: "North",
        subdivision: null,
      },
      {
        code: "NC",
        name: "North Central",
        subdivision: null,
      },
      {
        code: "SU",
        name: "South",
        subdivision: null,
      },
      {
        code: "SC",
        name: "South Central",
        subdivision: null,
      },
      {
        code: "UN",
        name: "Upper North",
        subdivision: null,
      },
      {
        code: "US",
        name: "Upper South",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ML",
    code3: "MLI",
    name: "Mali",
    capital: "Bamako",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "BKO",
        name: "Bamako",
        subdivision: null,
      },
      {
        code: "7",
        name: "Gao",
        subdivision: null,
      },
      {
        code: "1",
        name: "Kayes",
        subdivision: null,
      },
      {
        code: "8",
        name: "Kidal",
        subdivision: null,
      },
      {
        code: "2",
        name: "Koulikoro",
        subdivision: null,
      },
      {
        code: "5",
        name: "Mopti",
        subdivision: null,
      },
      {
        code: "3",
        name: "Sikasso",
        subdivision: null,
      },
      {
        code: "4",
        name: "Ségou",
        subdivision: null,
      },
      {
        code: "6",
        name: "Tombouctou",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MT",
    code3: "MLT",
    name: "Malta",
    capital: "Valletta",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "01",
        name: "Attard",
        subdivision: null,
      },
      {
        code: "02",
        name: "Balzan",
        subdivision: null,
      },
      {
        code: "03",
        name: "Birgu",
        subdivision: null,
      },
      {
        code: "04",
        name: "Birkirkara",
        subdivision: null,
      },
      {
        code: "05",
        name: "Birżebbuġa",
        subdivision: null,
      },
      {
        code: "06",
        name: "Bormla",
        subdivision: null,
      },
      {
        code: "07",
        name: "Dingli",
        subdivision: null,
      },
      {
        code: "08",
        name: "Fgura",
        subdivision: null,
      },
      {
        code: "09",
        name: "Floriana",
        subdivision: null,
      },
      {
        code: "10",
        name: "Fontana",
        subdivision: null,
      },
      {
        code: "11",
        name: "Gudja",
        subdivision: null,
      },
      {
        code: "13",
        name: "Għajnsielem",
        subdivision: null,
      },
      {
        code: "14",
        name: "Għarb",
        subdivision: null,
      },
      {
        code: "15",
        name: "Għargħur",
        subdivision: null,
      },
      {
        code: "16",
        name: "Għasri",
        subdivision: null,
      },
      {
        code: "17",
        name: "Għaxaq",
        subdivision: null,
      },
      {
        code: "12",
        name: "Gżira",
        subdivision: null,
      },
      {
        code: "19",
        name: "Iklin",
        subdivision: null,
      },
      {
        code: "20",
        name: "Isla",
        subdivision: null,
      },
      {
        code: "21",
        name: "Kalkara",
        subdivision: null,
      },
      {
        code: "22",
        name: "Kerċem",
        subdivision: null,
      },
      {
        code: "23",
        name: "Kirkop",
        subdivision: null,
      },
      {
        code: "24",
        name: "Lija",
        subdivision: null,
      },
      {
        code: "25",
        name: "Luqa",
        subdivision: null,
      },
      {
        code: "26",
        name: "Marsa",
        subdivision: null,
      },
      {
        code: "27",
        name: "Marsaskala",
        subdivision: null,
      },
      {
        code: "28",
        name: "Marsaxlokk",
        subdivision: null,
      },
      {
        code: "29",
        name: "Mdina",
        subdivision: null,
      },
      {
        code: "30",
        name: "Mellieħa",
        subdivision: null,
      },
      {
        code: "32",
        name: "Mosta",
        subdivision: null,
      },
      {
        code: "33",
        name: "Mqabba",
        subdivision: null,
      },
      {
        code: "34",
        name: "Msida",
        subdivision: null,
      },
      {
        code: "35",
        name: "Mtarfa",
        subdivision: null,
      },
      {
        code: "36",
        name: "Munxar",
        subdivision: null,
      },
      {
        code: "31",
        name: "Mġarr",
        subdivision: null,
      },
      {
        code: "37",
        name: "Nadur",
        subdivision: null,
      },
      {
        code: "38",
        name: "Naxxar",
        subdivision: null,
      },
      {
        code: "39",
        name: "Paola",
        subdivision: null,
      },
      {
        code: "40",
        name: "Pembroke",
        subdivision: null,
      },
      {
        code: "41",
        name: "Pietà",
        subdivision: null,
      },
      {
        code: "42",
        name: "Qala",
        subdivision: null,
      },
      {
        code: "43",
        name: "Qormi",
        subdivision: null,
      },
      {
        code: "44",
        name: "Qrendi",
        subdivision: null,
      },
      {
        code: "45",
        name: "Rabat Għawdex",
        subdivision: null,
      },
      {
        code: "46",
        name: "Rabat Malta",
        subdivision: null,
      },
      {
        code: "47",
        name: "Safi",
        subdivision: null,
      },
      {
        code: "50",
        name: "San Lawrenz",
        subdivision: null,
      },
      {
        code: "51",
        name: "San Pawl il-Baħar",
        subdivision: null,
      },
      {
        code: "48",
        name: "San Ġiljan",
        subdivision: null,
      },
      {
        code: "49",
        name: "San Ġwann",
        subdivision: null,
      },
      {
        code: "52",
        name: "Sannat",
        subdivision: null,
      },
      {
        code: "53",
        name: "Santa Luċija",
        subdivision: null,
      },
      {
        code: "54",
        name: "Santa Venera",
        subdivision: null,
      },
      {
        code: "55",
        name: "Siġġiewi",
        subdivision: null,
      },
      {
        code: "56",
        name: "Sliema",
        subdivision: null,
      },
      {
        code: "57",
        name: "Swieqi",
        subdivision: null,
      },
      {
        code: "58",
        name: "Ta' Xbiex",
        subdivision: null,
      },
      {
        code: "59",
        name: "Tarxien",
        subdivision: null,
      },
      {
        code: "60",
        name: "Valletta",
        subdivision: null,
      },
      {
        code: "61",
        name: "Xagħra",
        subdivision: null,
      },
      {
        code: "62",
        name: "Xewkija",
        subdivision: null,
      },
      {
        code: "63",
        name: "Xgħajra",
        subdivision: null,
      },
      {
        code: "18",
        name: "Ħamrun",
        subdivision: null,
      },
      {
        code: "64",
        name: "Żabbar",
        subdivision: null,
      },
      {
        code: "65",
        name: "Żebbuġ Għawdex",
        subdivision: null,
      },
      {
        code: "66",
        name: "Żebbuġ Malta",
        subdivision: null,
      },
      {
        code: "67",
        name: "Żejtun",
        subdivision: null,
      },
      {
        code: "68",
        name: "Żurrieq",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MH",
    code3: "MHL",
    name: "Marshall Islands",
    capital: "Majuro",
    region: "Oceania",
    subregion: "Micronesia",
    states: [
      {
        code: "L",
        name: "Ralik chain",
        subdivision: null,
      },
      {
        code: "T",
        name: "Ratak chain",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MQ",
    code3: "MTQ",
    name: "Martinique",
    capital: "Fort-de-France",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "MR",
    code3: "MRT",
    name: "Mauritania",
    capital: "Nouakchott",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "07",
        name: "Adrar",
        subdivision: null,
      },
      {
        code: "03",
        name: "Assaba",
        subdivision: null,
      },
      {
        code: "05",
        name: "Brakna",
        subdivision: null,
      },
      {
        code: "08",
        name: "Dakhlet Nouâdhibou",
        subdivision: null,
      },
      {
        code: "04",
        name: "Gorgol",
        subdivision: null,
      },
      {
        code: "10",
        name: "Guidimaka",
        subdivision: null,
      },
      {
        code: "01",
        name: "Hodh ech Chargui",
        subdivision: null,
      },
      {
        code: "02",
        name: "Hodh el Gharbi",
        subdivision: null,
      },
      {
        code: "12",
        name: "Inchiri",
        subdivision: null,
      },
      {
        code: "NKC",
        name: "Nouakchott",
        subdivision: null,
      },
      {
        code: "09",
        name: "Tagant",
        subdivision: null,
      },
      {
        code: "11",
        name: "Tiris Zemmour",
        subdivision: null,
      },
      {
        code: "06",
        name: "Trarza",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MU",
    code3: "MUS",
    name: "Mauritius",
    capital: "Port Louis",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "AG",
        name: "Agalega Islands",
        subdivision: null,
      },
      {
        code: "BR",
        name: "Beau Bassin-Rose Hill",
        subdivision: null,
      },
      {
        code: "BL",
        name: "Black River",
        subdivision: null,
      },
      {
        code: "CC",
        name: "Cargados Carajos Shoals",
        subdivision: null,
      },
      {
        code: "CU",
        name: "Curepipe",
        subdivision: null,
      },
      {
        code: "FL",
        name: "Flacq",
        subdivision: null,
      },
      {
        code: "GP",
        name: "Grand Port",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Moka",
        subdivision: null,
      },
      {
        code: "PA",
        name: "Pamplemousses",
        subdivision: null,
      },
      {
        code: "PW",
        name: "Plaines Wilhems",
        subdivision: null,
      },
      {
        code: "PL",
        name: "Port Louis",
        subdivision: null,
      },
      {
        code: "PU",
        name: "Port Louis",
        subdivision: null,
      },
      {
        code: "QB",
        name: "Quatre Bornes",
        subdivision: null,
      },
      {
        code: "RR",
        name: "Rivière du Rempart",
        subdivision: null,
      },
      {
        code: "RO",
        name: "Rodrigues Island",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Savanne",
        subdivision: null,
      },
      {
        code: "VP",
        name: "Vacoas-Phoenix",
        subdivision: null,
      },
    ],
  },
  {
    code2: "YT",
    code3: "MYT",
    name: "Mayotte",
    capital: "Mamoudzou",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [],
  },
  {
    code2: "MX",
    code3: "MEX",
    name: "Mexico",
    capital: "Mexico City",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "DIF",
        name: "Distrito Federal",
        subdivision: "federal district",
      },
      {
        code: "AGU",
        name: "Aguascalientes",
        subdivision: "state",
      },
      {
        code: "BCN",
        name: "Baja California",
        subdivision: "state",
      },
      {
        code: "BCS",
        name: "Baja California Sur",
        subdivision: "state",
      },
      {
        code: "CAM",
        name: "Campeche",
        subdivision: "state",
      },
      {
        code: "CHP",
        name: "Chiapas",
        subdivision: "state",
      },
      {
        code: "CHH",
        name: "Chihuahua",
        subdivision: "state",
      },
      {
        code: "COA",
        name: "Coahuila",
        subdivision: "state",
      },
      {
        code: "COL",
        name: "Colima",
        subdivision: "state",
      },
      {
        code: "DUR",
        name: "Durango",
        subdivision: "state",
      },
      {
        code: "GUA",
        name: "Guanajuato",
        subdivision: "state",
      },
      {
        code: "GRO",
        name: "Guerrero",
        subdivision: "state",
      },
      {
        code: "HID",
        name: "Hidalgo",
        subdivision: "state",
      },
      {
        code: "JAL",
        name: "Jalisco",
        subdivision: "state",
      },
      {
        code: "MIC",
        name: "Michoacán",
        subdivision: "state",
      },
      {
        code: "MOR",
        name: "Morelos",
        subdivision: "state",
      },
      {
        code: "MEX",
        name: "México",
        subdivision: "state",
      },
      {
        code: "NAY",
        name: "Nayarit",
        subdivision: "state",
      },
      {
        code: "NLE",
        name: "Nuevo León",
        subdivision: "state",
      },
      {
        code: "OAX",
        name: "Oaxaca",
        subdivision: "state",
      },
      {
        code: "PUE",
        name: "Puebla",
        subdivision: "state",
      },
      {
        code: "QUE",
        name: "Querétaro",
        subdivision: "state",
      },
      {
        code: "ROO",
        name: "Quintana Roo",
        subdivision: "state",
      },
      {
        code: "SLP",
        name: "San Luis Potosí",
        subdivision: "state",
      },
      {
        code: "SIN",
        name: "Sinaloa",
        subdivision: "state",
      },
      {
        code: "SON",
        name: "Sonora",
        subdivision: "state",
      },
      {
        code: "TAB",
        name: "Tabasco",
        subdivision: "state",
      },
      {
        code: "TAM",
        name: "Tamaulipas",
        subdivision: "state",
      },
      {
        code: "TLA",
        name: "Tlaxcala",
        subdivision: "state",
      },
      {
        code: "VER",
        name: "Veracruz",
        subdivision: "state",
      },
      {
        code: "YUC",
        name: "Yucatán",
        subdivision: "state",
      },
      {
        code: "ZAC",
        name: "Zacatecas",
        subdivision: "state",
      },
    ],
  },
  {
    code2: "FM",
    code3: "FSM",
    name: "Federated States of Micronesia",
    capital: "Palikir",
    region: "Oceania",
    subregion: "Micronesia",
    states: [
      {
        code: "TRK",
        name: "Chuuk",
        subdivision: null,
      },
      {
        code: "KSA",
        name: "Kosrae",
        subdivision: null,
      },
      {
        code: "PNI",
        name: "Pohnpei",
        subdivision: null,
      },
      {
        code: "YAP",
        name: "Yap",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MD",
    code3: "MDA",
    name: "Moldova",
    capital: "Chișinău",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "AN",
        name: "Anenii Noi",
        subdivision: null,
      },
      {
        code: "BS",
        name: "Basarabeasca",
        subdivision: null,
      },
      {
        code: "BR",
        name: "Briceni",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Bălţi",
        subdivision: null,
      },
      {
        code: "CA",
        name: "Cahul",
        subdivision: null,
      },
      {
        code: "CT",
        name: "Cantemir",
        subdivision: null,
      },
      {
        code: "CU",
        name: "Chişinău",
        subdivision: null,
      },
      {
        code: "CM",
        name: "Cimişlia",
        subdivision: null,
      },
      {
        code: "CR",
        name: "Criuleni",
        subdivision: null,
      },
      {
        code: "CL",
        name: "Călăraşi",
        subdivision: null,
      },
      {
        code: "CS",
        name: "Căuşeni",
        subdivision: null,
      },
      {
        code: "DO",
        name: "Donduşeni",
        subdivision: null,
      },
      {
        code: "DR",
        name: "Drochia",
        subdivision: null,
      },
      {
        code: "DU",
        name: "Dubăsari",
        subdivision: null,
      },
      {
        code: "ED",
        name: "Edineţ",
        subdivision: null,
      },
      {
        code: "FL",
        name: "Floreşti",
        subdivision: null,
      },
      {
        code: "FA",
        name: "Făleşti",
        subdivision: null,
      },
      {
        code: "GL",
        name: "Glodeni",
        subdivision: null,
      },
      {
        code: "GA",
        name: "Găgăuzia, Unitatea teritorială autonomă",
        subdivision: null,
      },
      {
        code: "HI",
        name: "Hînceşti",
        subdivision: null,
      },
      {
        code: "IA",
        name: "Ialoveni",
        subdivision: null,
      },
      {
        code: "LE",
        name: "Leova",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Nisporeni",
        subdivision: null,
      },
      {
        code: "OC",
        name: "Ocniţa",
        subdivision: null,
      },
      {
        code: "OR",
        name: "Orhei",
        subdivision: null,
      },
      {
        code: "RE",
        name: "Rezina",
        subdivision: null,
      },
      {
        code: "RI",
        name: "Rîşcani",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Soroca",
        subdivision: null,
      },
      {
        code: "ST",
        name: "Străşeni",
        subdivision: null,
      },
      {
        code: "SN",
        name: "Stînga Nistrului, unitatea teritorială din",
        subdivision: null,
      },
      {
        code: "SI",
        name: "Sîngerei",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Taraclia",
        subdivision: null,
      },
      {
        code: "TE",
        name: "Teleneşti",
        subdivision: null,
      },
      {
        code: "BD",
        name: "Tighina",
        subdivision: null,
      },
      {
        code: "UN",
        name: "Ungheni",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Şoldăneşti",
        subdivision: null,
      },
      {
        code: "SV",
        name: "Ştefan Vodă",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MC",
    code3: "MCO",
    name: "Monaco",
    capital: "Monaco",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "FO",
        name: "Fontvieille",
        subdivision: null,
      },
      {
        code: "JE",
        name: "Jardin Exotique",
        subdivision: null,
      },
      {
        code: "CL",
        name: "La Colle",
        subdivision: null,
      },
      {
        code: "CO",
        name: "La Condamine",
        subdivision: null,
      },
      {
        code: "GA",
        name: "La Gare",
        subdivision: null,
      },
      {
        code: "SO",
        name: "La Source",
        subdivision: null,
      },
      {
        code: "LA",
        name: "Larvotto",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Malbousquet",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Monaco-Ville",
        subdivision: null,
      },
      {
        code: "MG",
        name: "Moneghetti",
        subdivision: null,
      },
      {
        code: "MC",
        name: "Monte-Carlo",
        subdivision: null,
      },
      {
        code: "MU",
        name: "Moulins",
        subdivision: null,
      },
      {
        code: "PH",
        name: "Port-Hercule",
        subdivision: null,
      },
      {
        code: "SR",
        name: "Saint-Roman",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Sainte-Dévote",
        subdivision: null,
      },
      {
        code: "SP",
        name: "Spélugues",
        subdivision: null,
      },
      {
        code: "VR",
        name: "Vallon de la Rousse",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MN",
    code3: "MNG",
    name: "Mongolia",
    capital: "Ulan Bator",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [
      {
        code: "073",
        name: "Arhangay",
        subdivision: null,
      },
      {
        code: "071",
        name: "Bayan-Ölgiy",
        subdivision: null,
      },
      {
        code: "069",
        name: "Bayanhongor",
        subdivision: null,
      },
      {
        code: "067",
        name: "Bulgan",
        subdivision: null,
      },
      {
        code: "037",
        name: "Darhan uul",
        subdivision: null,
      },
      {
        code: "061",
        name: "Dornod",
        subdivision: null,
      },
      {
        code: "063",
        name: "Dornogovĭ",
        subdivision: null,
      },
      {
        code: "059",
        name: "Dundgovĭ",
        subdivision: null,
      },
      {
        code: "057",
        name: "Dzavhan",
        subdivision: null,
      },
      {
        code: "065",
        name: "Govĭ-Altay",
        subdivision: null,
      },
      {
        code: "064",
        name: "Govĭ-Sümber",
        subdivision: null,
      },
      {
        code: "039",
        name: "Hentiy",
        subdivision: null,
      },
      {
        code: "043",
        name: "Hovd",
        subdivision: null,
      },
      {
        code: "041",
        name: "Hövsgöl",
        subdivision: null,
      },
      {
        code: "035",
        name: "Orhon",
        subdivision: null,
      },
      {
        code: "049",
        name: "Selenge",
        subdivision: null,
      },
      {
        code: "051",
        name: "Sühbaatar",
        subdivision: null,
      },
      {
        code: "047",
        name: "Töv",
        subdivision: null,
      },
      {
        code: "1",
        name: "Ulaanbaatar",
        subdivision: null,
      },
      {
        code: "046",
        name: "Uvs",
        subdivision: null,
      },
      {
        code: "053",
        name: "Ömnögovĭ",
        subdivision: null,
      },
      {
        code: "055",
        name: "Övörhangay",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ME",
    code3: "MNE",
    name: "Montenegro",
    capital: "Podgorica",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "01",
        name: "Andrijevica",
        subdivision: null,
      },
      {
        code: "02",
        name: "Bar",
        subdivision: null,
      },
      {
        code: "03",
        name: "Berane",
        subdivision: null,
      },
      {
        code: "04",
        name: "Bijelo Polje",
        subdivision: null,
      },
      {
        code: "05",
        name: "Budva",
        subdivision: null,
      },
      {
        code: "06",
        name: "Cetinje",
        subdivision: null,
      },
      {
        code: "07",
        name: "Danilovgrad",
        subdivision: null,
      },
      {
        code: "22",
        name: "Gusinje",
        subdivision: null,
      },
      {
        code: "08",
        name: "Herceg-Novi",
        subdivision: null,
      },
      {
        code: "09",
        name: "Kolašin",
        subdivision: null,
      },
      {
        code: "10",
        name: "Kotor",
        subdivision: null,
      },
      {
        code: "11",
        name: "Mojkovac",
        subdivision: null,
      },
      {
        code: "12",
        name: "Nikšić",
        subdivision: null,
      },
      {
        code: "23",
        name: "Petnjica",
        subdivision: null,
      },
      {
        code: "13",
        name: "Plav",
        subdivision: null,
      },
      {
        code: "14",
        name: "Pljevlja",
        subdivision: null,
      },
      {
        code: "15",
        name: "Plužine",
        subdivision: null,
      },
      {
        code: "16",
        name: "Podgorica",
        subdivision: null,
      },
      {
        code: "17",
        name: "Rožaje",
        subdivision: null,
      },
      {
        code: "19",
        name: "Tivat",
        subdivision: null,
      },
      {
        code: "20",
        name: "Ulcinj",
        subdivision: null,
      },
      {
        code: "18",
        name: "Šavnik",
        subdivision: null,
      },
      {
        code: "21",
        name: "Žabljak",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MS",
    code3: "MSR",
    name: "Montserrat",
    capital: "Plymouth",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "MA",
    code3: "MAR",
    name: "Morocco",
    capital: "Rabat",
    region: "Africa",
    subregion: "Northern Africa",
    states: [
      {
        code: "09",
        name: "Chaouia-Ouardigha",
        subdivision: null,
      },
      {
        code: "10",
        name: "Doukhala-Abda",
        subdivision: null,
      },
      {
        code: "05",
        name: "Fès-Boulemane",
        subdivision: null,
      },
      {
        code: "02",
        name: "Gharb-Chrarda-Beni Hssen",
        subdivision: null,
      },
      {
        code: "08",
        name: "Grand Casablanca",
        subdivision: null,
      },
      {
        code: "14",
        name: "Guelmim-Es Smara",
        subdivision: null,
      },
      {
        code: "04",
        name: "L'Oriental",
        subdivision: null,
      },
      {
        code: "15",
        name: "Laâyoune-Boujdour-Sakia el Hamra",
        subdivision: null,
      },
      {
        code: "11",
        name: "Marrakech-Tensift-Al Haouz",
        subdivision: null,
      },
      {
        code: "06",
        name: "Meknès-Tafilalet",
        subdivision: null,
      },
      {
        code: "16",
        name: "Oued ed Dahab-Lagouira",
        subdivision: null,
      },
      {
        code: "07",
        name: "Rabat-Salé-Zemmour-Zaer",
        subdivision: null,
      },
      {
        code: "13",
        name: "Souss-Massa-Drâa",
        subdivision: null,
      },
      {
        code: "12",
        name: "Tadla-Azilal",
        subdivision: null,
      },
      {
        code: "01",
        name: "Tanger-Tétouan",
        subdivision: null,
      },
      {
        code: "03",
        name: "Taza-Al Hoceima-Taounate",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MZ",
    code3: "MOZ",
    name: "Mozambique",
    capital: "Maputo",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "P",
        name: "Cabo Delgado",
        subdivision: null,
      },
      {
        code: "G",
        name: "Gaza",
        subdivision: null,
      },
      {
        code: "I",
        name: "Inhambane",
        subdivision: null,
      },
      {
        code: "B",
        name: "Manica",
        subdivision: null,
      },
      {
        code: "MPM",
        name: "Maputo",
        subdivision: null,
      },
      {
        code: "L",
        name: "Maputo",
        subdivision: null,
      },
      {
        code: "N",
        name: "Nampula",
        subdivision: null,
      },
      {
        code: "A",
        name: "Niassa",
        subdivision: null,
      },
      {
        code: "S",
        name: "Sofala",
        subdivision: null,
      },
      {
        code: "T",
        name: "Tete",
        subdivision: null,
      },
      {
        code: "Q",
        name: "Zambézia",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MM",
    code3: "MMR",
    name: "Myanmar",
    capital: "Naypyidaw",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "07",
        name: "Ayeyarwady",
        subdivision: null,
      },
      {
        code: "02",
        name: "Bago",
        subdivision: null,
      },
      {
        code: "14",
        name: "Chin",
        subdivision: null,
      },
      {
        code: "11",
        name: "Kachin",
        subdivision: null,
      },
      {
        code: "12",
        name: "Kayah",
        subdivision: null,
      },
      {
        code: "13",
        name: "Kayin",
        subdivision: null,
      },
      {
        code: "03",
        name: "Magway",
        subdivision: null,
      },
      {
        code: "04",
        name: "Mandalay",
        subdivision: null,
      },
      {
        code: "15",
        name: "Mon",
        subdivision: null,
      },
      {
        code: "16",
        name: "Rakhine",
        subdivision: null,
      },
      {
        code: "01",
        name: "Sagaing",
        subdivision: null,
      },
      {
        code: "17",
        name: "Shan",
        subdivision: null,
      },
      {
        code: "05",
        name: "Tanintharyi",
        subdivision: null,
      },
      {
        code: "06",
        name: "Yangon",
        subdivision: null,
      },
    ],
  },
  {
    code2: "NA",
    code3: "NAM",
    name: "Namibia",
    capital: "Windhoek",
    region: "Africa",
    subregion: "Southern Africa",
    states: [
      {
        code: "ER",
        name: "Erongo",
        subdivision: null,
      },
      {
        code: "HA",
        name: "Hardap",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Karas",
        subdivision: null,
      },
      {
        code: "KE",
        name: "Kavango East",
        subdivision: null,
      },
      {
        code: "KW",
        name: "Kavango West",
        subdivision: null,
      },
      {
        code: "KH",
        name: "Khomas",
        subdivision: null,
      },
      {
        code: "KU",
        name: "Kunene",
        subdivision: null,
      },
      {
        code: "OW",
        name: "Ohangwena",
        subdivision: null,
      },
      {
        code: "OH",
        name: "Omaheke",
        subdivision: null,
      },
      {
        code: "OS",
        name: "Omusati",
        subdivision: null,
      },
      {
        code: "ON",
        name: "Oshana",
        subdivision: null,
      },
      {
        code: "OT",
        name: "Oshikoto",
        subdivision: null,
      },
      {
        code: "OD",
        name: "Otjozondjupa",
        subdivision: null,
      },
      {
        code: "CA",
        name: "Zambezi",
        subdivision: null,
      },
    ],
  },
  {
    code2: "NR",
    code3: "NRU",
    name: "Nauru",
    capital: "Yaren",
    region: "Oceania",
    subregion: "Micronesia",
    states: [
      {
        code: "01",
        name: "Aiwo",
        subdivision: null,
      },
      {
        code: "02",
        name: "Anabar",
        subdivision: null,
      },
      {
        code: "03",
        name: "Anetan",
        subdivision: null,
      },
      {
        code: "04",
        name: "Anibare",
        subdivision: null,
      },
      {
        code: "05",
        name: "Baiti",
        subdivision: null,
      },
      {
        code: "06",
        name: "Boe",
        subdivision: null,
      },
      {
        code: "07",
        name: "Buada",
        subdivision: null,
      },
      {
        code: "08",
        name: "Denigomodu",
        subdivision: null,
      },
      {
        code: "09",
        name: "Ewa",
        subdivision: null,
      },
      {
        code: "10",
        name: "Ijuw",
        subdivision: null,
      },
      {
        code: "11",
        name: "Meneng",
        subdivision: null,
      },
      {
        code: "12",
        name: "Nibok",
        subdivision: null,
      },
      {
        code: "13",
        name: "Uaboe",
        subdivision: null,
      },
      {
        code: "14",
        name: "Yaren",
        subdivision: null,
      },
    ],
  },
  {
    code2: "NP",
    code3: "NPL",
    name: "Nepal",
    capital: "Kathmandu",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "2",
        name: "Madhya Pashchimanchal",
        subdivision: null,
      },
      {
        code: "1",
        name: "Madhyamanchal",
        subdivision: null,
      },
      {
        code: "3",
        name: "Pashchimanchal",
        subdivision: null,
      },
      {
        code: "4",
        name: "Purwanchal",
        subdivision: null,
      },
      {
        code: "5",
        name: "Sudur Pashchimanchal",
        subdivision: null,
      },
    ],
  },
  {
    code2: "NL",
    code3: "NLD",
    name: "Netherlands",
    capital: "Amsterdam",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "DR",
        name: "Drenthe",
        subdivision: "Province",
      },
      {
        code: "FL",
        name: "Flevoland",
        subdivision: "Province",
      },
      {
        code: "FR",
        name: "Fryslân",
        subdivision: "Province",
      },
      {
        code: "GE",
        name: "Gelderland",
        subdivision: "Province",
      },
      {
        code: "GR",
        name: "Groningen",
        subdivision: "Province",
      },
      {
        code: "LI",
        name: "Limburg",
        subdivision: "Province",
      },
      {
        code: "NB",
        name: "Noord-Brabant",
        subdivision: "Province",
      },
      {
        code: "NH",
        name: "Noord-Holland",
        subdivision: "Province",
      },
      {
        code: "OV",
        name: "Overijssel",
        subdivision: "Province",
      },
      {
        code: "UT",
        name: "Utrecht",
        subdivision: "Province",
      },
      {
        code: "ZE",
        name: "Zeeland",
        subdivision: "Province",
      },
      {
        code: "ZH",
        name: "Zuid-Holland",
        subdivision: "Province",
      },
      {
        code: "AW",
        name: "Aruba",
        subdivision: "country",
      },
      {
        code: "CW",
        name: "Curaçao",
        subdivision: "country",
      },
      {
        code: "SX",
        name: "Sint Maarten",
        subdivision: "country",
      },
      {
        code: "BQ1",
        name: "Bonaire",
        subdivision: "special municipality",
      },
      {
        code: "BQ2",
        name: "Saba",
        subdivision: "special municipality",
      },
      {
        code: "BQ3",
        name: "Sint Eustatius",
        subdivision: "special municipality",
      },
    ],
  },
  {
    code2: "NC",
    code3: "NCL",
    name: "New Caledonia",
    capital: "Nouméa",
    region: "Oceania",
    subregion: "Melanesia",
    states: [],
  },
  {
    code2: "NZ",
    code3: "NZL",
    name: "New Zealand",
    capital: "Wellington",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    states: [
      {
        code: "N",
        name: "North Island",
        subdivision: "Island",
      },
      {
        code: "S",
        name: "South Island",
        subdivision: "Island",
      },
      {
        code: "AUK",
        name: "Auckland",
        subdivision: "regional council",
      },
      {
        code: "BOP",
        name: "Bay of Plenty",
        subdivision: "regional council",
      },
      {
        code: "CAN",
        name: "Canterbury",
        subdivision: "regional council",
      },
      {
        code: "HKB",
        name: "Hawke's Bay",
        subdivision: "regional council",
      },
      {
        code: "MWT",
        name: "Manawatu-Wanganui",
        subdivision: "regional council",
      },
      {
        code: "NTL",
        name: "Northland",
        subdivision: "regional council",
      },
      {
        code: "OTA",
        name: "Otago",
        subdivision: "regional council",
      },
      {
        code: "STL",
        name: "Southland",
        subdivision: "regional council",
      },
      {
        code: "TKI",
        name: "Taranaki",
        subdivision: "regional council",
      },
      {
        code: "WKO",
        name: "Waikato",
        subdivision: "regional council",
      },
      {
        code: "WGN",
        name: "Wellington",
        subdivision: "regional council",
      },
      {
        code: "WTC",
        name: "West Coast",
        subdivision: "regional council",
      },
      {
        code: "CIT",
        name: "Chatham Islands Territory",
        subdivision: "special island authority",
      },
      {
        code: "GIS",
        name: "Gisborne District",
        subdivision: "unitary authority",
      },
      {
        code: "MBH",
        name: "Marlborough District",
        subdivision: "unitary authority",
      },
      {
        code: "NSN",
        name: "Nelson City",
        subdivision: "unitary authority",
      },
      {
        code: "TAS",
        name: "Tasman District",
        subdivision: "unitary authority",
      },
    ],
  },
  {
    code2: "NI",
    code3: "NIC",
    name: "Nicaragua",
    capital: "Managua",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "AN",
        name: "Atlántico Norte",
        subdivision: null,
      },
      {
        code: "AS",
        name: "Atlántico Sur",
        subdivision: null,
      },
      {
        code: "BO",
        name: "Boaco",
        subdivision: null,
      },
      {
        code: "CA",
        name: "Carazo",
        subdivision: null,
      },
      {
        code: "CI",
        name: "Chinandega",
        subdivision: null,
      },
      {
        code: "CO",
        name: "Chontales",
        subdivision: null,
      },
      {
        code: "ES",
        name: "Estelí",
        subdivision: null,
      },
      {
        code: "GR",
        name: "Granada",
        subdivision: null,
      },
      {
        code: "JI",
        name: "Jinotega",
        subdivision: null,
      },
      {
        code: "LE",
        name: "León",
        subdivision: null,
      },
      {
        code: "MD",
        name: "Madriz",
        subdivision: null,
      },
      {
        code: "MN",
        name: "Managua",
        subdivision: null,
      },
      {
        code: "MS",
        name: "Masaya",
        subdivision: null,
      },
      {
        code: "MT",
        name: "Matagalpa",
        subdivision: null,
      },
      {
        code: "NS",
        name: "Nueva Segovia",
        subdivision: null,
      },
      {
        code: "RI",
        name: "Rivas",
        subdivision: null,
      },
      {
        code: "SJ",
        name: "Río San Juan",
        subdivision: null,
      },
    ],
  },
  {
    code2: "NE",
    code3: "NER",
    name: "Niger",
    capital: "Niamey",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "1",
        name: "Agadez",
        subdivision: null,
      },
      {
        code: "2",
        name: "Diffa",
        subdivision: null,
      },
      {
        code: "3",
        name: "Dosso",
        subdivision: null,
      },
      {
        code: "4",
        name: "Maradi",
        subdivision: null,
      },
      {
        code: "8",
        name: "Niamey",
        subdivision: null,
      },
      {
        code: "5",
        name: "Tahoua",
        subdivision: null,
      },
      {
        code: "6",
        name: "Tillabéri",
        subdivision: null,
      },
      {
        code: "7",
        name: "Zinder",
        subdivision: null,
      },
    ],
  },
  {
    code2: "NG",
    code3: "NGA",
    name: "Nigeria",
    capital: "Abuja",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "AB",
        name: "Abia",
        subdivision: [
          "Aba North",
          "Aba South",
          "Arochukwu",
          "Bende",
          "Ikwuano",
          "Isiala-Ngwa North",
          "Isiala-Ngwa South",
          "Isuikwato",
          "Obi Nwa",
          "Ohafia",
          "Osisioma",
          "Ngwa",
          "Ugwunagbo",
          "Ukwa East",
          "Ukwa West",
          "Umuahia North",
          "Umuahia South",
          "Umu-Neochi",
        ],
      },
      {
        code: "FC",
        name: "Abuja Federal Capital Territory",
        subdivision: [
          "Abaji",
          "Abuja Municipal",
          "Bwari",
          "Gwagwalada",
          "Kuje",
          "Kwali",
        ],
      },
      {
        code: "AD",
        name: "Adamawa",
        subdivision: [
          "Demsa",
          "Fufore",
          "Ganaye",
          "Gireri",
          "Gombi",
          "Guyuk",
          "Hong",
          "Jada",
          "Lamurde",
          "Madagali",
          "Maiha",
          "Mayo-Belwa",
          "Michika",
          "Mubi North",
          "Mubi South",
          "Numan",
          "Shelleng",
          "Song",
          "Toungo",
          "Yola North",
          "Yola South",
        ],
      },
      {
        code: "AK",
        name: "Akwa Ibom",
        subdivision: [
          "Abak",
          "Eastern Obolo",
          "Eket",
          "Esit Eket",
          "Essien Udim",
          "Etim Ekpo",
          "Etinan",
          "Ibeno",
          "Ibesikpo Asutan",
          "Ibiono Ibom",
          "Ika",
          "Ikono",
          "Ikot Abasi",
          "Ikot Ekpene",
          "Ini",
          "Itu",
          "Mbo",
          "Mkpat Enin",
          "Nsit Atai",
          "Nsit Ibom",
          "Nsit Ubium",
          "Obot Akara",
          "Okobo",
          "Onna",
          "Oron",
          "Oruk Anam",
          "Udung Uko",
          "Ukanafun",
          "Uruan",
          "Urue-Offong/Oruko ",
          "Uyo",
        ],
      },
      {
        code: "AN",
        name: "Anambra",
        subdivision: [
          "Aguata",
          "Anambra East",
          "Anambra West",
          "Anaocha",
          "Awka North",
          "Awka South",
          "Ayamelum",
          "Dunukofia",
          "Ekwusigo",
          "Idemili North",
          "Idemili south",
          "Ihiala",
          "Njikoka",
          "Nnewi North",
          "Nnewi South",
          "Ogbaru",
          "Onitsha North",
          "Onitsha South",
          "Orumba North",
          "Orumba South",
          "Oyi",
        ],
      },
      {
        code: "BA",
        name: "Bauchi",
        subdivision: [
          "Alkaleri",
          "Bauchi",
          "Bogoro",
          "Damban",
          "Darazo",
          "Dass",
          "Ganjuwa",
          "Giade",
          "Itas/Gadau",
          "Jama'are",
          "Katagum",
          "Kirfi",
          "Misau",
          "Ningi",
          "Shira",
          "Tafawa-Balewa",
          "Toro",
          "Warji",
          "Zaki",
        ],
      },
      {
        code: "BY",
        name: "Bayelsa",
        subdivision: [
          "Brass",
          "Ekeremor",
          "Kolokuma/Opokuma",
          "Nembe",
          "Ogbia",
          "Sagbama",
          "Southern Jaw",
          "Yenegoa",
        ],
      },
      {
        code: "BE",
        name: "Benue",
        subdivision: [
          "Ado",
          "Agatu",
          "Apa",
          "Buruku",
          "Gboko",
          "Guma",
          "Gwer East",
          "Gwer West",
          "Katsina-Ala",
          "Konshisha",
          "Kwande",
          "Logo",
          "Makurdi",
          "Obi",
          "Ogbadibo",
          "Oju",
          "Okpokwu",
          "Ohimini",
          "Oturkpo",
          "Tarka",
          "Ukum",
          "Ushongo",
          "Vandeikya",
        ],
      },
      {
        code: "BO",
        name: "Borno",
        subdivision: [
          "Abadam",
          "Askira/Uba",
          "Bama",
          "Bayo",
          "Biu",
          "Chibok",
          "Damboa",
          "Dikwa",
          "Gubio",
          "Guzamala",
          "Gwoza",
          "Hawul",
          "Jere",
          "Kaga",
          "Kala/Balge",
          "Konduga",
          "Kukawa",
          "Kwaya Kusar",
          "Mafa",
          "Magumeri",
          "Maiduguri",
          "Marte",
          "Mobbar",
          "Monguno",
          "Ngala",
          "Nganzai",
          "Shani",
        ],
      },
      {
        code: "CR",
        name: "Cross River",
        subdivision: [
          "Akpabuyo",
          "Odukpani",
          "Akamkpa",
          "Biase",
          "Abi",
          "Ikom",
          "Yarkur",
          "Odubra",
          "Boki",
          "Ogoja",
          "Yala",
          "Obanliku",
          "Obudu",
          "Calabar South",
          "Etung",
          "Bekwara",
          "Bakassi",
          "Calabar Municipality",
        ],
      },
      {
        code: "DE",
        name: "Delta",
        subdivision: [
          "Oshimili",
          "Aniocha",
          "Aniocha South",
          "Ika South",
          "Ika North-East",
          "Ndokwa West",
          "Ndokwa East",
          "Isoko south",
          "Isoko North",
          "Bomadi",
          "Burutu",
          "Ughelli South",
          "Ughelli North",
          "Ethiope West",
          "Ethiope East",
          "Sapele",
          "Okpe",
          "Warri North",
          "Warri South",
          "Uvwie",
          "Udu",
          "Warri Central",
          "Ukwani",
          "Oshimili North",
          "Patani",
        ],
      },
      {
        code: "EB",
        name: "Ebonyi",
        subdivision: [
          "Edda",
          "Afikpo",
          "Onicha",
          "Ohaozara",
          "Abakaliki",
          "Ishielu",
          "lkwo",
          "Ezza",
          "Ezza South",
          "Ohaukwu",
          "Ebonyi",
          "Ivo",
        ],
      },
      {
        code: "ED",
        name: "Edo",
        subdivision: [
          "Esan North-East",
          "Esan Central",
          "Esan West",
          "Egor",
          "Ukpoba",
          "Central",
          "Etsako Central",
          "Igueben",
          "Oredo",
          "Ovia SouthWest",
          "Ovia South-East",
          "Orhionwon",
          "Uhunmwonde",
          "Etsako East",
          "Esan South-East",
        ],
      },
      {
        code: "EK",
        name: "Ekiti",
        subdivision: [
          "Ado",
          "Ekiti-East",
          "Ekiti-West",
          "Emure/Ise/Orun",
          "Ekiti South-West",
          "Ikere",
          "Irepodun",
          "Ijero,",
          "Ido/Osi",
          "Oye",
          "Ikole",
          "Moba",
          "Gbonyin",
          "Efon",
          "Ise/Orun",
          "Ilejemeje.",
        ],
      },
      {
        code: "EN",
        name: "Enugu",
        subdivision: [
          "Enugu South,",
          "Igbo-Eze South",
          "Enugu North",
          "Nkanu",
          "Udi Agwu",
          "Oji-River",
          "Ezeagu",
          "IgboEze North",
          "Isi-Uzo",
          "Nsukka",
          "Igbo-Ekiti",
          "Uzo-Uwani",
          "Enugu Eas",
          "Aninri",
          "Nkanu East",
          "Udenu.",
        ],
      },
      {
        code: "GO",
        name: "Gombe",
        subdivision: [
          "Akko",
          "Balanga",
          "Billiri",
          "Dukku",
          "Kaltungo",
          "Kwami",
          "Shomgom",
          "Funakaye",
          "Gombe",
          "Nafada/Bajoga",
          "Yamaltu/Delta.",
        ],
      },
      {
        code: "IM",
        name: "Imo",
        subdivision: [
          "Aboh-Mbaise",
          "Ahiazu-Mbaise",
          "Ehime-Mbano",
          "Ezinihitte",
          "Ideato North",
          "Ideato South",
          "Ihitte/Uboma",
          "Ikeduru",
          "Isiala Mbano",
          "Isu",
          "Mbaitoli",
          "Mbaitoli",
          "Ngor-Okpala",
          "Njaba",
          "Nwangele",
          "Nkwerre",
          "Obowo",
          "Oguta",
          "Ohaji/Egbema",
          "Okigwe",
          "Orlu",
          "Orsu",
          "Oru East",
          "Oru West",
          "Owerri-Municipal",
          "Owerri North",
          "Owerri West",
        ],
      },
      {
        code: "JI",
        name: "Jigawa",
        subdivision: [
          "Auyo",
          "Babura",
          "Birni Kudu",
          "Biriniwa",
          "Buji",
          "Dutse",
          "Gagarawa",
          "Garki",
          "Gumel",
          "Guri",
          "Gwaram",
          "Gwiwa",
          "Hadejia",
          "Jahun",
          "Kafin Hausa",
          "Kaugama Kazaure",
          "Kiri Kasamma",
          "Kiyawa",
          "Maigatari",
          "Malam Madori",
          "Miga",
          "Ringim",
          "Roni",
          "Sule-Tankarkar",
          "Taura",
          "Yankwashi",
        ],
      },
      {
        code: "KD",
        name: "Kaduna",
        subdivision: [
          "Birni-Gwari",
          "Chikun",
          "Giwa",
          "Igabi",
          "Ikara",
          "jaba",
          "Jema'a",
          "Kachia",
          "Kaduna North",
          "Kaduna South",
          "Kagarko",
          "Kajuru",
          "Kaura",
          "Kauru",
          "Kubau",
          "Kudan",
          "Lere",
          "Makarfi",
          "Sabon-Gari",
          "Sanga",
          "Soba",
          "Zango-Kataf",
          "Zaria",
        ],
      },
      {
        code: "KN",
        name: "Kano",
        subdivision: [
          "Ajingi",
          "Albasu",
          "Bagwai",
          "Bebeji",
          "Bichi",
          "Bunkure",
          "Dala",
          "Dambatta",
          "Dawakin Kudu",
          "Dawakin Tofa",
          "Doguwa",
          "Fagge",
          "Gabasawa",
          "Garko",
          "Garum",
          "Mallam",
          "Gaya",
          "Gezawa",
          "Gwale",
          "Gwarzo",
          "Kabo",
          "Kano Municipal",
          "Karaye",
          "Kibiya",
          "Kiru",
          "kumbotso",
          "Ghari",
          "Kura",
          "Madobi",
          "Makoda",
          "Minjibir",
          "Nasarawa",
          "Rano",
          "Rimin Gado",
          "Rogo",
          "Shanono",
          "Sumaila",
          "Takali",
          "Tarauni",
          "Tofa",
          "Tsanyawa",
          "Tudun Wada",
          "Ungogo",
          "Warawa",
          "Wudil",
        ],
      },
      {
        code: "KT",
        name: "Katsina",
        subdivision: [
          "Bakori",
          "Batagarawa",
          "Batsari",
          "Baure",
          "Bindawa",
          "Charanchi",
          "Dandume",
          "Danja",
          "Dan Musa",
          "Daura",
          "Dutsi",
          "Dutsin-Ma",
          "Faskari",
          "Funtua",
          "Ingawa",
          "Jibia",
          "Kafur",
          "Kaita",
          "Kankara",
          "Kankia",
          "Katsina",
          "Kurfi",
          "Kusada",
          "Mai'Adua",
          "Malumfashi",
          "Mani",
          "Mashi",
          "Matazuu",
          "Musawa",
          "Rimi",
          "Sabuwa",
          "Safana",
          "Sandamu",
          "Zango",
        ],
      },
      {
        code: "KE",
        name: "Kebbi",
        subdivision: [
          "Aleiro",
          "Arewa-Dandi",
          "Argungu",
          "Augie",
          "Bagudo",
          "Birnin Kebbi",
          "Bunza",
          "Dandi",
          "Fakai",
          "Gwandu",
          "Jega",
          "Kalgo",
          "Koko/Besse",
          "Maiyama",
          "Ngaski",
          "Sakaba",
          "Shanga",
          "Suru",
          "Wasagu/Danko",
          "Yauri",
          "Zuru",
        ],
      },
      {
        code: "KO",
        name: "Kogi",
        subdivision: [
          "Adavi",
          "Ajaokuta",
          "Ankpa",
          "Bassa",
          "Dekina",
          "Ibaji",
          "Idah",
          "Igalamela-Odolu",
          "Ijumu",
          "Kabba/Bunu",
          "Kogi",
          "Lokoja",
          "Mopa-Muro",
          "Ofu",
          "Ogori/Mangongo",
          "Okehi",
          "Okene",
          "Olamabolo",
          "Omala",
          "Yagba East",
          "Yagba West",
        ],
      },
      {
        code: "KW",
        name: "Kwara",
        subdivision: [
          "Asa",
          "Baruten",
          "Edu",
          "Ekiti",
          "Ifelodun",
          "Ilorin East",
          "Ilorin West",
          "Irepodun",
          "Isin",
          "Kaiama",
          "Moro",
          "Offa",
          "Oke-Ero",
          "Oyun",
          "Pategi",
        ],
      },
      {
        code: "LA",
        name: "Lagos",
        subdivision: [
          "Agege",
          "Ajeromi-Ifelodun",
          "Alimosho",
          "Amuwo-Odofin",
          "Apapa",
          "Badagry",
          "Epe",
          "Eti-Osa",
          "Ibeju/Lekki",
          "Ifako-Ijaye",
          "Ikeja",
          "Ikorodu",
          "Kosofe",
          "Lagos Island",
          "Lagos Mainland",
          "Mushin",
          "Ojo",
          "Oshodi-Isolo",
          "Shomolu",
          "Surulere",
        ],
      },
      {
        code: "NA",
        name: "Nassarawa",
        subdivision: [
          "Akwanga",
          "Awe",
          "Doma",
          "Karu",
          "Keana",
          "Keffi",
          "Kokona",
          "Lafia",
          "Nasarawa",
          "Nasarawa-Eggon",
          "Obi",
          "Toto",
          "Wamba",
        ],
      },
      {
        code: "NI",
        name: "Niger",
        subdivision: [
          "Agaie",
          "Agwara",
          "Bida",
          "Borgu",
          "Bosso",
          "Chanchaga",
          "Edati",
          "Gbako",
          "Gurara",
          "Katcha",
          "Kontagora",
          "Lapai",
          "Lavun",
          "Magama",
          "Mariga",
          "Mashegu",
          "Mokwa",
          "Muya",
          "Pailoro",
          "Rafi",
          "Rijau",
          "Shiroro",
          "Suleja",
          "Tafa",
          "Wushishi",
        ],
      },
      {
        code: "OG",
        name: "Ogun",
        subdivision: [
          "Abeokuta North",
          "Abeokuta South",
          "Ado-Odo/Ota",
          "Yewa North",
          "Yewa South",
          "Ewekoro",
          "Ifo",
          "Ijebu East",
          "Ijebu North",
          "Ijebu North East",
          "Ijebu Ode",
          "Ikenne",
          "Imeko-Afon",
          "Ipokia",
          "Obafemi-Owode",
          "Ogun Waterside",
          "Odeda",
          "Odogbolu",
          "Remo North",
          "Shagamu",
        ],
      },
      {
        code: "ON",
        name: "Ondo",
        subdivision: [
          "Akoko North East",
          "Akoko North West",
          "Akoko South Akure East",
          "Akoko South West",
          "Akure North",
          "Akure South",
          "Ese-Odo",
          "Idanre",
          "Ifedore",
          "Ilaje",
          "Ile-Oluji",
          "Okeigbo",
          "Irele",
          "Odigbo",
          "Okitipupa",
          "Ondo East",
          "Ondo West",
          "Ose",
          "Owo",
        ],
      },
      {
        code: "OS",
        name: "Osun",
        subdivision: [
          "Aiyedade",
          "Aiyedire",
          "Atakumosa East",
          "Atakumosa West",
          "Boluwaduro",
          "Boripe",
          "Ede North",
          "Ede South",
          "Egbedore",
          "Ejigbo",
          "Ife Central",
          "Ife East",
          "Ife North",
          "Ife South",
          "Ifedayo",
          "Ifelodun",
          "Ila",
          "Ilesha East",
          "Ilesha West",
          "Irepodun",
          "Irewole",
          "Isokan",
          "Iwo",
          "Obokun",
          "Odo-Otin",
          "Ola-Oluwa",
          "Olorunda",
          "Oriade",
          "Orolu",
          "Osogbo",
        ],
      },
      {
        code: "OY",
        name: "Oyo",
        subdivision: [
          "Afijio",
          "Akinyele",
          "Atiba",
          "Atisbo",
          "Egbeda",
          "Ibadan Central",
          "Ibadan North",
          "Ibadan North West",
          "Ibadan South East",
          "Ibadan South West",
          "Ibarapa Central",
          "Ibarapa East",
          "Ibarapa North",
          "Ido",
          "Irepo",
          "Iseyin",
          "Itesiwaju",
          "Iwajowa",
          "Kajola",
          "Lagelu Ogbomosho North",
          "Ogbomosho South",
          "Ogo Oluwa",
          "Olorunsogo",
          "Oluyole",
          "Ona-Ara",
          "Orelope",
          "Ori Ire",
          "Oyo East",
          "Oyo West",
          "Saki East",
          "Saki West",
          "Surulere",
        ],
      },
      {
        code: "PL",
        name: "Plateau",
        subdivision: [
          "Barikin Ladi",
          "Bassa",
          "Bokkos",
          "Jos East",
          "Jos North",
          "Jos South",
          "Kanam",
          "Kanke",
          "Langtang North",
          "Langtang South",
          "Mangu",
          "Mikang",
          "Pankshin",
          "Qua'an Pan",
          "Riyom",
          "Shendam",
          "Wase",
        ],
      },
      {
        code: "RI",
        name: "Rivers",
        subdivision: [
          "Abua/Odual",
          "Ahoada East",
          "Ahoada West",
          "Akuku Toru",
          "Andoni",
          "Asari-Toru",
          "Bonny",
          "Degema",
          "Emohua",
          "Eleme",
          "Etche",
          "Gokana",
          "Ikwerre",
          "Khana",
          "Obio/Akpor",
          "Ogba/Egbema/Ndoni",
          "Ogu/Bolo",
          "Okrika",
          "Omumma",
          "Opobo/Nkoro",
          "Oyigbo",
          "Port-Harcourt",
          "Tai",
        ],
      },
      {
        code: "SO",
        name: "Sokoto",
        subdivision: [
          "Binji",
          "Bodinga",
          "Dange-shnsi",
          "Gada",
          "Goronyo",
          "Gudu",
          "Gawabawa",
          "Illela",
          "Isa",
          "Kware",
          "kebbe",
          "Rabah",
          "Sabon birni",
          "Shagari",
          "Silame",
          "Sokoto North",
          "Sokoto South",
          "Tambuwal",
          "Tqngaza",
          "Tureta",
          "Wamako",
          "Wurno",
          "Yabo",
        ],
      },
      {
        code: "TA",
        name: "Taraba",
        subdivision: [
          "Ardo-kola",
          "Bali",
          "Donga",
          "Gashaka",
          "Cassol",
          "Ibi",
          "Jalingo",
          "Karin-Lamido",
          "Kurmi",
          "Lau",
          "Sardauna",
          "Takum",
          "Ussa",
          "Wukari",
          "Yorro",
          "Zing",
        ],
      },
      {
        code: "YO",
        name: "Yobe",
        subdivision: [
          "Bade",
          "Bursari",
          "Damaturu",
          "Fika",
          "Fune",
          "Geidam",
          "Gujba",
          "Gulani",
          "Jakusko",
          "Karasuwa",
          "Karawa",
          "Machina",
          "Nangere",
          "Nguru Potiskum",
          "Tarmua",
          "Yunusari",
          "Yusufari",
        ],
      },
      {
        code: "ZA",
        name: "Zamfara",
        subdivision: [
          "Anka",
          "Bakura",
          "Birnin Magaji",
          "Bukkuyum",
          "Bungudu",
          "Gummi",
          "Gusau",
          "Kaura",
          "Namoda",
          "Maradun",
          "Maru",
          "Shinkafi",
          "Talata Mafara",
          "Tsafe",
          "Zurmi",
        ],
      },
    ],
  },
  {
    code2: "NU",
    code3: "NIU",
    name: "Niue",
    capital: "Alofi",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "NF",
    code3: "NFK",
    name: "Norfolk Island",
    capital: "Kingston",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    states: [],
  },
  {
    code2: "KP",
    code3: "PRK",
    name: "North Korea",
    capital: "Pyongyang",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [
      {
        code: "04",
        name: "Chagang",
        subdivision: null,
      },
      {
        code: "07",
        name: "Kangwon",
        subdivision: null,
      },
      {
        code: "09",
        name: "North Hamgyong",
        subdivision: null,
      },
      {
        code: "06",
        name: "North Hwanghae",
        subdivision: null,
      },
      {
        code: "03",
        name: "North Pyongan",
        subdivision: null,
      },
      {
        code: "01",
        name: "Pyongyang",
        subdivision: null,
      },
      {
        code: "13",
        name: "Rason",
        subdivision: null,
      },
      {
        code: "10",
        name: "Ryanggang",
        subdivision: null,
      },
      {
        code: "08",
        name: "South Hamgyong",
        subdivision: null,
      },
      {
        code: "05",
        name: "South Hwanghae",
        subdivision: null,
      },
      {
        code: "02",
        name: "South Pyongan",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MP",
    code3: "MNP",
    name: "Northern Mariana Islands",
    capital: "Saipan",
    region: "Oceania",
    subregion: "Micronesia",
    states: [],
  },
  {
    code2: "NO",
    code3: "NOR",
    name: "Norway",
    capital: "Oslo",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "02",
        name: "Akershus",
        subdivision: null,
      },
      {
        code: "09",
        name: "Aust-Agder",
        subdivision: null,
      },
      {
        code: "06",
        name: "Buskerud",
        subdivision: null,
      },
      {
        code: "20",
        name: "Finnmark",
        subdivision: null,
      },
      {
        code: "04",
        name: "Hedmark",
        subdivision: null,
      },
      {
        code: "12",
        name: "Hordaland",
        subdivision: null,
      },
      {
        code: "22",
        name: "Jan Mayen",
        subdivision: null,
      },
      {
        code: "15",
        name: "Møre og Romsdal",
        subdivision: null,
      },
      {
        code: "17",
        name: "Nord-Trøndelag",
        subdivision: null,
      },
      {
        code: "18",
        name: "Nordland",
        subdivision: null,
      },
      {
        code: "05",
        name: "Oppland",
        subdivision: null,
      },
      {
        code: "03",
        name: "Oslo",
        subdivision: null,
      },
      {
        code: "11",
        name: "Rogaland",
        subdivision: null,
      },
      {
        code: "14",
        name: "Sogn og Fjordane",
        subdivision: null,
      },
      {
        code: "21",
        name: "Svalbard",
        subdivision: null,
      },
      {
        code: "16",
        name: "Sør-Trøndelag",
        subdivision: null,
      },
      {
        code: "08",
        name: "Telemark",
        subdivision: null,
      },
      {
        code: "19",
        name: "Troms",
        subdivision: null,
      },
      {
        code: "10",
        name: "Vest-Agder",
        subdivision: null,
      },
      {
        code: "07",
        name: "Vestfold",
        subdivision: null,
      },
      {
        code: "01",
        name: "Østfold",
        subdivision: null,
      },
    ],
  },
  {
    code2: "OM",
    code3: "OMN",
    name: "Oman",
    capital: "Muscat",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "DA",
        name: "Ad Dākhilīyah",
        subdivision: null,
      },
      {
        code: "BU",
        name: "Al Buraymī",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Al Bāţinah",
        subdivision: null,
      },
      {
        code: "WU",
        name: "Al Wusţá",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Ash Sharqīyah",
        subdivision: null,
      },
      {
        code: "ZA",
        name: "Az̧ Z̧āhirah",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Masqaţ",
        subdivision: null,
      },
      {
        code: "MU",
        name: "Musandam",
        subdivision: null,
      },
      {
        code: "ZU",
        name: "Z̧ufār",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PK",
    code3: "PAK",
    name: "Pakistan",
    capital: "Islamabad",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "JK",
        name: "Azad Kashmir",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Balochistan",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Federally Administered Tribal Areas",
        subdivision: null,
      },
      {
        code: "GB",
        name: "Gilgit-Baltistan",
        subdivision: null,
      },
      {
        code: "IS",
        name: "Islamabad",
        subdivision: null,
      },
      {
        code: "KP",
        name: "Khyber Pakhtunkhwa",
        subdivision: null,
      },
      {
        code: "PB",
        name: "Punjab",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Sindh",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PW",
    code3: "PLW",
    name: "Palau",
    capital: "Ngerulmud",
    region: "Oceania",
    subregion: "Micronesia",
    states: [
      {
        code: "002",
        name: "Aimeliik",
        subdivision: null,
      },
      {
        code: "004",
        name: "Airai",
        subdivision: null,
      },
      {
        code: "010",
        name: "Angaur",
        subdivision: null,
      },
      {
        code: "050",
        name: "Hatobohei",
        subdivision: null,
      },
      {
        code: "100",
        name: "Kayangel",
        subdivision: null,
      },
      {
        code: "150",
        name: "Koror",
        subdivision: null,
      },
      {
        code: "212",
        name: "Melekeok",
        subdivision: null,
      },
      {
        code: "214",
        name: "Ngaraard",
        subdivision: null,
      },
      {
        code: "218",
        name: "Ngarchelong",
        subdivision: null,
      },
      {
        code: "222",
        name: "Ngardmau",
        subdivision: null,
      },
      {
        code: "224",
        name: "Ngatpang",
        subdivision: null,
      },
      {
        code: "226",
        name: "Ngchesar",
        subdivision: null,
      },
      {
        code: "227",
        name: "Ngeremlengui",
        subdivision: null,
      },
      {
        code: "228",
        name: "Ngiwal",
        subdivision: null,
      },
      {
        code: "350",
        name: "Peleliu",
        subdivision: null,
      },
      {
        code: "370",
        name: "Sonsorol",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PS",
    code3: "PSE",
    name: "Palestine",
    capital: "Ramallah",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "BTH",
        name: "Bethlehem",
        subdivision: null,
      },
      {
        code: "DEB",
        name: "Deir El Balah",
        subdivision: null,
      },
      {
        code: "GZA",
        name: "Gaza",
        subdivision: null,
      },
      {
        code: "HBN",
        name: "Hebron",
        subdivision: null,
      },
      {
        code: "JEN",
        name: "Jenin",
        subdivision: null,
      },
      {
        code: "JRH",
        name: "Jericho – Al Aghwar",
        subdivision: null,
      },
      {
        code: "JEM",
        name: "Jerusalem",
        subdivision: null,
      },
      {
        code: "KYS",
        name: "Khan Yunis",
        subdivision: null,
      },
      {
        code: "NBS",
        name: "Nablus",
        subdivision: null,
      },
      {
        code: "NGZ",
        name: "North Gaza",
        subdivision: null,
      },
      {
        code: "QQA",
        name: "Qalqilya",
        subdivision: null,
      },
      {
        code: "RFH",
        name: "Rafah",
        subdivision: null,
      },
      {
        code: "RBH",
        name: "Ramallah",
        subdivision: null,
      },
      {
        code: "SLT",
        name: "Salfit",
        subdivision: null,
      },
      {
        code: "TBS",
        name: "Tubas",
        subdivision: null,
      },
      {
        code: "TKM",
        name: "Tulkarm",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PA",
    code3: "PAN",
    name: "Panama",
    capital: "Panama City",
    region: "Americas",
    subregion: "Central America",
    states: [
      {
        code: "1",
        name: "Bocas del Toro",
        subdivision: null,
      },
      {
        code: "4",
        name: "Chiriquí",
        subdivision: null,
      },
      {
        code: "2",
        name: "Coclé",
        subdivision: null,
      },
      {
        code: "3",
        name: "Colón",
        subdivision: null,
      },
      {
        code: "5",
        name: "Darién",
        subdivision: null,
      },
      {
        code: "EM",
        name: "Emberá",
        subdivision: null,
      },
      {
        code: "6",
        name: "Herrera",
        subdivision: null,
      },
      {
        code: "KY",
        name: "Kuna Yala",
        subdivision: null,
      },
      {
        code: "7",
        name: "Los Santos",
        subdivision: null,
      },
      {
        code: "NB",
        name: "Ngöbe-Buglé",
        subdivision: null,
      },
      {
        code: "8",
        name: "Panamá",
        subdivision: null,
      },
      {
        code: "10",
        name: "Panamá Oeste",
        subdivision: null,
      },
      {
        code: "9",
        name: "Veraguas",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PG",
    code3: "PNG",
    name: "Papua New Guinea",
    capital: "Port Moresby",
    region: "Oceania",
    subregion: "Melanesia",
    states: [
      {
        code: "NSB",
        name: "Bougainville",
        subdivision: null,
      },
      {
        code: "CPM",
        name: "Central",
        subdivision: null,
      },
      {
        code: "CPK",
        name: "Chimbu",
        subdivision: null,
      },
      {
        code: "EBR",
        name: "East New Britain",
        subdivision: null,
      },
      {
        code: "ESW",
        name: "East Sepik",
        subdivision: null,
      },
      {
        code: "EHG",
        name: "Eastern Highlands",
        subdivision: null,
      },
      {
        code: "EPW",
        name: "Enga",
        subdivision: null,
      },
      {
        code: "GPK",
        name: "Gulf",
        subdivision: null,
      },
      {
        code: "MPM",
        name: "Madang",
        subdivision: null,
      },
      {
        code: "MRL",
        name: "Manus",
        subdivision: null,
      },
      {
        code: "MBA",
        name: "Milne Bay",
        subdivision: null,
      },
      {
        code: "MPL",
        name: "Morobe",
        subdivision: null,
      },
      {
        code: "NCD",
        name: "National Capital District",
        subdivision: null,
      },
      {
        code: "NIK",
        name: "New Ireland",
        subdivision: null,
      },
      {
        code: "NPP",
        name: "Northern",
        subdivision: null,
      },
      {
        code: "SAN",
        name: "Sandaun",
        subdivision: null,
      },
      {
        code: "SHM",
        name: "Southern Highlands",
        subdivision: null,
      },
      {
        code: "WBK",
        name: "West New Britain",
        subdivision: null,
      },
      {
        code: "WPD",
        name: "Western",
        subdivision: null,
      },
      {
        code: "WHM",
        name: "Western Highlands",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PY",
    code3: "PRY",
    name: "Paraguay",
    capital: "Asunción",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "16",
        name: "Alto Paraguay",
        subdivision: null,
      },
      {
        code: "10",
        name: "Alto Paraná",
        subdivision: null,
      },
      {
        code: "13",
        name: "Amambay",
        subdivision: null,
      },
      {
        code: "ASU",
        name: "Asunción",
        subdivision: null,
      },
      {
        code: "19",
        name: "Boquerón",
        subdivision: null,
      },
      {
        code: "5",
        name: "Caaguazú",
        subdivision: null,
      },
      {
        code: "6",
        name: "Caazapá",
        subdivision: null,
      },
      {
        code: "14",
        name: "Canindeyú",
        subdivision: null,
      },
      {
        code: "11",
        name: "Central",
        subdivision: null,
      },
      {
        code: "1",
        name: "Concepción",
        subdivision: null,
      },
      {
        code: "3",
        name: "Cordillera",
        subdivision: null,
      },
      {
        code: "4",
        name: "Guairá",
        subdivision: null,
      },
      {
        code: "7",
        name: "Itapúa",
        subdivision: null,
      },
      {
        code: "8",
        name: "Misiones",
        subdivision: null,
      },
      {
        code: "9",
        name: "Paraguarí",
        subdivision: null,
      },
      {
        code: "15",
        name: "Presidente Hayes",
        subdivision: null,
      },
      {
        code: "2",
        name: "San Pedro",
        subdivision: null,
      },
      {
        code: "12",
        name: "Ñeembucú",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PE",
    code3: "PER",
    name: "Peru",
    capital: "Lima",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "AMA",
        name: "Amazonas",
        subdivision: null,
      },
      {
        code: "ANC",
        name: "Ancash",
        subdivision: null,
      },
      {
        code: "APU",
        name: "Apurímac",
        subdivision: null,
      },
      {
        code: "ARE",
        name: "Arequipa",
        subdivision: null,
      },
      {
        code: "AYA",
        name: "Ayacucho",
        subdivision: null,
      },
      {
        code: "CAJ",
        name: "Cajamarca",
        subdivision: null,
      },
      {
        code: "CUS",
        name: "Cusco",
        subdivision: null,
      },
      {
        code: "CAL",
        name: "El Callao",
        subdivision: null,
      },
      {
        code: "HUV",
        name: "Huancavelica",
        subdivision: null,
      },
      {
        code: "HUC",
        name: "Huánuco",
        subdivision: null,
      },
      {
        code: "ICA",
        name: "Ica",
        subdivision: null,
      },
      {
        code: "JUN",
        name: "Junín",
        subdivision: null,
      },
      {
        code: "LAL",
        name: "La Libertad",
        subdivision: null,
      },
      {
        code: "LAM",
        name: "Lambayeque",
        subdivision: null,
      },
      {
        code: "LIM",
        name: "Lima",
        subdivision: null,
      },
      {
        code: "LOR",
        name: "Loreto",
        subdivision: null,
      },
      {
        code: "MDD",
        name: "Madre de Dios",
        subdivision: null,
      },
      {
        code: "MOQ",
        name: "Moquegua",
        subdivision: null,
      },
      {
        code: "LMA",
        name: "Municipalidad Metropolitana de Lima",
        subdivision: null,
      },
      {
        code: "PAS",
        name: "Pasco",
        subdivision: null,
      },
      {
        code: "PIU",
        name: "Piura",
        subdivision: null,
      },
      {
        code: "PUN",
        name: "Puno",
        subdivision: null,
      },
      {
        code: "SAM",
        name: "San Martín",
        subdivision: null,
      },
      {
        code: "TAC",
        name: "Tacna",
        subdivision: null,
      },
      {
        code: "TUM",
        name: "Tumbes",
        subdivision: null,
      },
      {
        code: "UCA",
        name: "Ucayali",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PH",
    code3: "PHL",
    name: "Philippines",
    capital: "Manila",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "14",
        name: "Autonomous Region in Muslim Mindanao",
        subdivision: null,
      },
      {
        code: "05",
        name: "Bicol",
        subdivision: null,
      },
      {
        code: "02",
        name: "Cagayan Valley",
        subdivision: null,
      },
      {
        code: "40",
        name: "Calabarzon",
        subdivision: null,
      },
      {
        code: "13",
        name: "Caraga",
        subdivision: null,
      },
      {
        code: "03",
        name: "Central Luzon",
        subdivision: null,
      },
      {
        code: "07",
        name: "Central Visayas",
        subdivision: null,
      },
      {
        code: "15",
        name: "Cordillera Administrative Region",
        subdivision: null,
      },
      {
        code: "11",
        name: "Davao",
        subdivision: null,
      },
      {
        code: "08",
        name: "Eastern Visayas",
        subdivision: null,
      },
      {
        code: "01",
        name: "Ilocos",
        subdivision: null,
      },
      {
        code: "41",
        name: "Mimaropa",
        subdivision: null,
      },
      {
        code: "00",
        name: "National Capital Region",
        subdivision: null,
      },
      {
        code: "10",
        name: "Northern Mindanao",
        subdivision: null,
      },
      {
        code: "12",
        name: "Soccsksargen",
        subdivision: null,
      },
      {
        code: "06",
        name: "Western Visayas",
        subdivision: null,
      },
      {
        code: "09",
        name: "Zamboanga Peninsula",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PN",
    code3: "PCN",
    name: "Pitcairn Islands",
    capital: "Adamstown",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "PL",
    code3: "POL",
    name: "Poland",
    capital: "Warsaw",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "DS",
        name: "Dolnośląskie",
        subdivision: null,
      },
      {
        code: "KP",
        name: "Kujawsko-pomorskie",
        subdivision: null,
      },
      {
        code: "LU",
        name: "Lubelskie",
        subdivision: null,
      },
      {
        code: "LB",
        name: "Lubuskie",
        subdivision: null,
      },
      {
        code: "MZ",
        name: "Mazowieckie",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Małopolskie",
        subdivision: null,
      },
      {
        code: "OP",
        name: "Opolskie",
        subdivision: null,
      },
      {
        code: "PK",
        name: "Podkarpackie",
        subdivision: null,
      },
      {
        code: "PD",
        name: "Podlaskie",
        subdivision: null,
      },
      {
        code: "PM",
        name: "Pomorskie",
        subdivision: null,
      },
      {
        code: "WN",
        name: "Warmińsko-mazurskie",
        subdivision: null,
      },
      {
        code: "WP",
        name: "Wielkopolskie",
        subdivision: null,
      },
      {
        code: "ZP",
        name: "Zachodniopomorskie",
        subdivision: null,
      },
      {
        code: "LD",
        name: "Łódzkie",
        subdivision: null,
      },
      {
        code: "SL",
        name: "Śląskie",
        subdivision: null,
      },
      {
        code: "SK",
        name: "Świętokrzyskie",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PT",
    code3: "PRT",
    name: "Portugal",
    capital: "Lisbon",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "01",
        name: "Aveiro",
        subdivision: null,
      },
      {
        code: "02",
        name: "Beja",
        subdivision: null,
      },
      {
        code: "03",
        name: "Braga",
        subdivision: null,
      },
      {
        code: "04",
        name: "Bragança",
        subdivision: null,
      },
      {
        code: "05",
        name: "Castelo Branco",
        subdivision: null,
      },
      {
        code: "06",
        name: "Coimbra",
        subdivision: null,
      },
      {
        code: "08",
        name: "Faro",
        subdivision: null,
      },
      {
        code: "09",
        name: "Guarda",
        subdivision: null,
      },
      {
        code: "10",
        name: "Leiria",
        subdivision: null,
      },
      {
        code: "11",
        name: "Lisboa",
        subdivision: null,
      },
      {
        code: "12",
        name: "Portalegre",
        subdivision: null,
      },
      {
        code: "13",
        name: "Porto",
        subdivision: null,
      },
      {
        code: "30",
        name: "Região Autónoma da Madeira",
        subdivision: null,
      },
      {
        code: "20",
        name: "Região Autónoma dos Açores",
        subdivision: null,
      },
      {
        code: "14",
        name: "Santarém",
        subdivision: null,
      },
      {
        code: "15",
        name: "Setúbal",
        subdivision: null,
      },
      {
        code: "16",
        name: "Viana do Castelo",
        subdivision: null,
      },
      {
        code: "17",
        name: "Vila Real",
        subdivision: null,
      },
      {
        code: "18",
        name: "Viseu",
        subdivision: null,
      },
      {
        code: "07",
        name: "Évora",
        subdivision: null,
      },
    ],
  },
  {
    code2: "PR",
    code3: "PRI",
    name: "Puerto Rico",
    capital: "San Juan",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "QA",
    code3: "QAT",
    name: "Qatar",
    capital: "Doha",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "DA",
        name: "Ad Dawḩah",
        subdivision: null,
      },
      {
        code: "KH",
        name: "Al Khawr wa adh Dhakhīrah",
        subdivision: null,
      },
      {
        code: "WA",
        name: "Al Wakrah",
        subdivision: null,
      },
      {
        code: "RA",
        name: "Ar Rayyān",
        subdivision: null,
      },
      {
        code: "MS",
        name: "Ash Shamāl",
        subdivision: null,
      },
      {
        code: "ZA",
        name: "Az̧ Za̧`āyin",
        subdivision: null,
      },
      {
        code: "US",
        name: "Umm Şalāl",
        subdivision: null,
      },
    ],
  },
  {
    code2: "XK",
    code3: "KOS",
    name: "Republic of Kosovo",
    capital: "Pristina",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [],
  },
  {
    code2: "RE",
    code3: "REU",
    name: "Réunion",
    capital: "Saint-Denis",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [],
  },
  {
    code2: "RO",
    code3: "ROU",
    name: "Romania",
    capital: "Bucharest",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "AB",
        name: "Alba",
        subdivision: null,
      },
      {
        code: "AR",
        name: "Arad",
        subdivision: null,
      },
      {
        code: "AG",
        name: "Argeș",
        subdivision: null,
      },
      {
        code: "BC",
        name: "Bacău",
        subdivision: null,
      },
      {
        code: "BH",
        name: "Bihor",
        subdivision: null,
      },
      {
        code: "BN",
        name: "Bistrița-Năsăud",
        subdivision: null,
      },
      {
        code: "BT",
        name: "Botoșani",
        subdivision: null,
      },
      {
        code: "BV",
        name: "Brașov",
        subdivision: null,
      },
      {
        code: "BR",
        name: "Brăila",
        subdivision: null,
      },
      {
        code: "B",
        name: "București",
        subdivision: null,
      },
      {
        code: "BZ",
        name: "Buzău",
        subdivision: null,
      },
      {
        code: "CS",
        name: "Caraș-Severin",
        subdivision: null,
      },
      {
        code: "CJ",
        name: "Cluj",
        subdivision: null,
      },
      {
        code: "CT",
        name: "Constanța",
        subdivision: null,
      },
      {
        code: "CV",
        name: "Covasna",
        subdivision: null,
      },
      {
        code: "CL",
        name: "Călărași",
        subdivision: null,
      },
      {
        code: "DJ",
        name: "Dolj",
        subdivision: null,
      },
      {
        code: "DB",
        name: "Dâmbovița",
        subdivision: null,
      },
      {
        code: "GL",
        name: "Galați",
        subdivision: null,
      },
      {
        code: "GR",
        name: "Giurgiu",
        subdivision: null,
      },
      {
        code: "GJ",
        name: "Gorj",
        subdivision: null,
      },
      {
        code: "HR",
        name: "Harghita",
        subdivision: null,
      },
      {
        code: "HD",
        name: "Hunedoara",
        subdivision: null,
      },
      {
        code: "IL",
        name: "Ialomița",
        subdivision: null,
      },
      {
        code: "IS",
        name: "Iași",
        subdivision: null,
      },
      {
        code: "IF",
        name: "Ilfov",
        subdivision: null,
      },
      {
        code: "MM",
        name: "Maramureș",
        subdivision: null,
      },
      {
        code: "MH",
        name: "Mehedinți",
        subdivision: null,
      },
      {
        code: "MS",
        name: "Mureș",
        subdivision: null,
      },
      {
        code: "NT",
        name: "Neamț",
        subdivision: null,
      },
      {
        code: "OT",
        name: "Olt",
        subdivision: null,
      },
      {
        code: "PH",
        name: "Prahova",
        subdivision: null,
      },
      {
        code: "SM",
        name: "Satu Mare",
        subdivision: null,
      },
      {
        code: "SB",
        name: "Sibiu",
        subdivision: null,
      },
      {
        code: "SV",
        name: "Suceava",
        subdivision: null,
      },
      {
        code: "SJ",
        name: "Sălaj",
        subdivision: null,
      },
      {
        code: "TR",
        name: "Teleorman",
        subdivision: null,
      },
      {
        code: "TM",
        name: "Timiș",
        subdivision: null,
      },
      {
        code: "TL",
        name: "Tulcea",
        subdivision: null,
      },
      {
        code: "VS",
        name: "Vaslui",
        subdivision: null,
      },
      {
        code: "VN",
        name: "Vrancea",
        subdivision: null,
      },
      {
        code: "VL",
        name: "Vâlcea",
        subdivision: null,
      },
    ],
  },
  {
    code2: "RU",
    code3: "RUS",
    name: "Russia",
    capital: "Moscow",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "AMU",
        name: "Amurskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "ARK",
        name: "Arkhangel'skaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "AST",
        name: "Astrakhanskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "BEL",
        name: "Belgorodskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "BRY",
        name: "Bryanskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "CHE",
        name: "Chelyabinskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "IRK",
        name: "Irkutskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "IVA",
        name: "Ivanovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KGD",
        name: "Kaliningradskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KLU",
        name: "Kaluzhskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KEM",
        name: "Kemerovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KIR",
        name: "Kirovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KOS",
        name: "Kostromskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KGN",
        name: "Kurganskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "KRS",
        name: "Kurskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "LEN",
        name: "Leningradskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "LIP",
        name: "Lipetskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "MAG",
        name: "Magadanskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "MOS",
        name: "Moskovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "MUR",
        name: "Murmanskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "NIZ",
        name: "Nizhegorodskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "NGR",
        name: "Novgorodskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "NVS",
        name: "Novosibirskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "OMS",
        name: "Omskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "ORE",
        name: "Orenburgskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "ORL",
        name: "Orlovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "PNZ",
        name: "Penzenskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "PSK",
        name: "Pskovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "ROS",
        name: "Rostovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "RYA",
        name: "Ryazanskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "SAK",
        name: "Sakhalinskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "SAM",
        name: "Samarskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "SAR",
        name: "Saratovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "SMO",
        name: "Smolenskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "SVE",
        name: "Sverdlovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "TAM",
        name: "Tambovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "TOM",
        name: "Tomskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "TUL",
        name: "Tul'skaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "TVE",
        name: "Tverskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "TYU",
        name: "Tyumenskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "ULY",
        name: "Ul'yanovskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "VLA",
        name: "Vladimirskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "VGG",
        name: "Volgogradskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "VLG",
        name: "Vologodskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "VOR",
        name: "Voronezhskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "YAR",
        name: "Yaroslavskaya oblast'",
        subdivision: "administrative region",
      },
      {
        code: "ALT",
        name: "Altayskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "KAM",
        name: "Kamchatskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "KHA",
        name: "Khabarovskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "KDA",
        name: "Krasnodarskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "KYA",
        name: "Krasnoyarskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "PER",
        name: "Permskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "PRI",
        name: "Primorskiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "STA",
        name: "Stavropol'skiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "ZAB",
        name: "Zabaykal'skiy kray",
        subdivision: "administrative territory",
      },
      {
        code: "MOW",
        name: "Moskva",
        subdivision: "autonomous city",
      },
      {
        code: "SPE",
        name: "Sankt-Peterburg",
        subdivision: "autonomous city",
      },
      {
        code: "CHU",
        name: "Chukotskiy avtonomnyy okrug",
        subdivision: "autonomous district",
      },
      {
        code: "KHM",
        name: "Khanty-Mansiyskiy avtonomnyy okrug-Yugra",
        subdivision: "autonomous district",
      },
      {
        code: "NEN",
        name: "Nenetskiy avtonomnyy okrug",
        subdivision: "autonomous district",
      },
      {
        code: "YAN",
        name: "Yamalo-Nenetskiy avtonomnyy okrug",
        subdivision: "autonomous district",
      },
      {
        code: "YEV",
        name: "Yevreyskaya avtonomnaya oblast'",
        subdivision: "autonomous region",
      },
      {
        code: "AD",
        name: "Adygeya, Respublika",
        subdivision: "republic",
      },
      {
        code: "AL",
        name: "Altay, Respublika",
        subdivision: "republic",
      },
      {
        code: "BA",
        name: "Bashkortostan, Respublika",
        subdivision: "republic",
      },
      {
        code: "BU",
        name: "Buryatiya, Respublika",
        subdivision: "republic",
      },
      {
        code: "CE",
        name: "Chechenskaya Respublika",
        subdivision: "republic",
      },
      {
        code: "CU",
        name: "Chuvashskaya Respublika",
        subdivision: "republic",
      },
      {
        code: "DA",
        name: "Dagestan, Respublika",
        subdivision: "republic",
      },
      {
        code: "IN",
        name: "Ingushetiya, Respublika",
        subdivision: "republic",
      },
      {
        code: "KB",
        name: "Kabardino-Balkarskaya Respublika",
        subdivision: "republic",
      },
      {
        code: "KL",
        name: "Kalmykiya, Respublika",
        subdivision: "republic",
      },
      {
        code: "KC",
        name: "Karachayevo-Cherkesskaya Respublika",
        subdivision: "republic",
      },
      {
        code: "KR",
        name: "Kareliya, Respublika",
        subdivision: "republic",
      },
      {
        code: "KK",
        name: "Khakasiya, Respublika",
        subdivision: "republic",
      },
      {
        code: "KO",
        name: "Komi, Respublika",
        subdivision: "republic",
      },
      {
        code: "ME",
        name: "Mariy El, Respublika",
        subdivision: "republic",
      },
      {
        code: "MO",
        name: "Mordoviya, Respublika",
        subdivision: "republic",
      },
      {
        code: "SA",
        name: "Sakha, Respublika",
        subdivision: "republic",
      },
      {
        code: "SE",
        name: "Severnaya Osetiya-Alaniya, Respublika",
        subdivision: "republic",
      },
      {
        code: "TA",
        name: "Tatarstan, Respublika",
        subdivision: "republic",
      },
      {
        code: "TY",
        name: "Tyva, Respublika",
        subdivision: "republic",
      },
      {
        code: "UD",
        name: "Udmurtskaya Respublika",
        subdivision: "republic",
      },
    ],
  },
  {
    code2: "RW",
    code3: "RWA",
    name: "Rwanda",
    capital: "Kigali",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "02",
        name: "Est",
        subdivision: null,
      },
      {
        code: "03",
        name: "Nord",
        subdivision: null,
      },
      {
        code: "04",
        name: "Ouest",
        subdivision: null,
      },
      {
        code: "05",
        name: "Sud",
        subdivision: null,
      },
      {
        code: "01",
        name: "Ville de Kigali",
        subdivision: null,
      },
    ],
  },
  {
    code2: "BL",
    code3: "BLM",
    name: "Saint Barthélemy",
    capital: "Gustavia",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "SH",
    code3: "SHN",
    name: "Saint Helena",
    capital: "Jamestown",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "AC",
        name: "Ascension",
        subdivision: null,
      },
      {
        code: "HL",
        name: "Saint Helena",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tristan da Cunha",
        subdivision: null,
      },
    ],
  },
  {
    code2: "KN",
    code3: "KNA",
    name: "Saint Kitts and Nevis",
    capital: "Basseterre",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "N",
        name: "Nevis",
        subdivision: null,
      },
      {
        code: "K",
        name: "Saint Kitts",
        subdivision: null,
      },
    ],
  },
  {
    code2: "LC",
    code3: "LCA",
    name: "Saint Lucia",
    capital: "Castries",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "01",
        name: "Anse la Raye",
        subdivision: null,
      },
      {
        code: "02",
        name: "Castries",
        subdivision: null,
      },
      {
        code: "03",
        name: "Choiseul",
        subdivision: null,
      },
      {
        code: "04",
        name: "Dauphin",
        subdivision: null,
      },
      {
        code: "05",
        name: "Dennery",
        subdivision: null,
      },
      {
        code: "06",
        name: "Gros Islet",
        subdivision: null,
      },
      {
        code: "07",
        name: "Laborie",
        subdivision: null,
      },
      {
        code: "08",
        name: "Micoud",
        subdivision: null,
      },
      {
        code: "09",
        name: "Praslin",
        subdivision: null,
      },
      {
        code: "10",
        name: "Soufrière",
        subdivision: null,
      },
      {
        code: "11",
        name: "Vieux Fort",
        subdivision: null,
      },
    ],
  },
  {
    code2: "MF",
    code3: "MAF",
    name: "Saint Martin",
    capital: "Marigot",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "PM",
    code3: "SPM",
    name: "Saint Pierre and Miquelon",
    capital: "Saint-Pierre",
    region: "Americas",
    subregion: "Northern America",
    states: [],
  },
  {
    code2: "VC",
    code3: "VCT",
    name: "Saint Vincent and the Grenadines",
    capital: "Kingstown",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "01",
        name: "Charlotte",
        subdivision: null,
      },
      {
        code: "06",
        name: "Grenadines",
        subdivision: null,
      },
      {
        code: "02",
        name: "Saint Andrew",
        subdivision: null,
      },
      {
        code: "03",
        name: "Saint David",
        subdivision: null,
      },
      {
        code: "04",
        name: "Saint George",
        subdivision: null,
      },
      {
        code: "05",
        name: "Saint Patrick",
        subdivision: null,
      },
    ],
  },
  {
    code2: "WS",
    code3: "WSM",
    name: "Samoa",
    capital: "Apia",
    region: "Oceania",
    subregion: "Polynesia",
    states: [
      {
        code: "AA",
        name: "A'ana",
        subdivision: null,
      },
      {
        code: "AL",
        name: "Aiga-i-le-Tai",
        subdivision: null,
      },
      {
        code: "AT",
        name: "Atua",
        subdivision: null,
      },
      {
        code: "FA",
        name: "Fa'asaleleaga",
        subdivision: null,
      },
      {
        code: "GE",
        name: "Gaga'emauga",
        subdivision: null,
      },
      {
        code: "GI",
        name: "Gagaifomauga",
        subdivision: null,
      },
      {
        code: "PA",
        name: "Palauli",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Satupa'itea",
        subdivision: null,
      },
      {
        code: "TU",
        name: "Tuamasaga",
        subdivision: null,
      },
      {
        code: "VF",
        name: "Va'a-o-Fonoti",
        subdivision: null,
      },
      {
        code: "VS",
        name: "Vaisigano",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SM",
    code3: "SMR",
    name: "San Marino",
    capital: "City of San Marino",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "01",
        name: "Acquaviva",
        subdivision: null,
      },
      {
        code: "06",
        name: "Borgo Maggiore",
        subdivision: null,
      },
      {
        code: "02",
        name: "Chiesanuova",
        subdivision: null,
      },
      {
        code: "03",
        name: "Domagnano",
        subdivision: null,
      },
      {
        code: "04",
        name: "Faetano",
        subdivision: null,
      },
      {
        code: "05",
        name: "Fiorentino",
        subdivision: null,
      },
      {
        code: "08",
        name: "Montegiardino",
        subdivision: null,
      },
      {
        code: "07",
        name: "San Marino",
        subdivision: null,
      },
      {
        code: "09",
        name: "Serravalle",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ST",
    code3: "STP",
    name: "São Tomé and Príncipe",
    capital: "São Tomé",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "P",
        name: "Príncipe",
        subdivision: null,
      },
      {
        code: "S",
        name: "São Tomé",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SA",
    code3: "SAU",
    name: "Saudi Arabia",
    capital: "Riyadh",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "11",
        name: "Al Bāḩah",
        subdivision: null,
      },
      {
        code: "12",
        name: "Al Jawf",
        subdivision: null,
      },
      {
        code: "03",
        name: "Al Madīnah",
        subdivision: null,
      },
      {
        code: "05",
        name: "Al Qaşīm",
        subdivision: null,
      },
      {
        code: "08",
        name: "Al Ḩudūd ash Shamālīyah",
        subdivision: null,
      },
      {
        code: "01",
        name: "Ar Riyāḑ",
        subdivision: null,
      },
      {
        code: "04",
        name: "Ash Sharqīyah",
        subdivision: null,
      },
      {
        code: "09",
        name: "Jīzān",
        subdivision: null,
      },
      {
        code: "02",
        name: "Makkah",
        subdivision: null,
      },
      {
        code: "10",
        name: "Najrān",
        subdivision: null,
      },
      {
        code: "07",
        name: "Tabūk",
        subdivision: null,
      },
      {
        code: "14",
        name: "ٰĀsīr",
        subdivision: null,
      },
      {
        code: "06",
        name: "Ḩā'il",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SN",
    code3: "SEN",
    name: "Senegal",
    capital: "Dakar",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "DK",
        name: "Dakar",
        subdivision: null,
      },
      {
        code: "DB",
        name: "Diourbel",
        subdivision: null,
      },
      {
        code: "FK",
        name: "Fatick",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Kaffrine",
        subdivision: null,
      },
      {
        code: "KL",
        name: "Kaolack",
        subdivision: null,
      },
      {
        code: "KD",
        name: "Kolda",
        subdivision: null,
      },
      {
        code: "KE",
        name: "Kédougou",
        subdivision: null,
      },
      {
        code: "LG",
        name: "Louga",
        subdivision: null,
      },
      {
        code: "MT",
        name: "Matam",
        subdivision: null,
      },
      {
        code: "SL",
        name: "Saint-Louis",
        subdivision: null,
      },
      {
        code: "SE",
        name: "Sédhiou",
        subdivision: null,
      },
      {
        code: "TC",
        name: "Tambacounda",
        subdivision: null,
      },
      {
        code: "TH",
        name: "Thiès",
        subdivision: null,
      },
      {
        code: "ZG",
        name: "Ziguinchor",
        subdivision: null,
      },
    ],
  },
  {
    code2: "RS",
    code3: "SRB",
    name: "Serbia",
    capital: "Belgrade",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "KM",
        name: "Kosovo-Metohija",
        subdivision: null,
      },
      {
        code: "VO",
        name: "Vojvodina",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SC",
    code3: "SYC",
    name: "Seychelles",
    capital: "Victoria",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "02",
        name: "Anse Boileau",
        subdivision: null,
      },
      {
        code: "03",
        name: "Anse Etoile",
        subdivision: null,
      },
      {
        code: "05",
        name: "Anse Royale",
        subdivision: null,
      },
      {
        code: "01",
        name: "Anse aux Pins",
        subdivision: null,
      },
      {
        code: "04",
        name: "Au Cap",
        subdivision: null,
      },
      {
        code: "06",
        name: "Baie Lazare",
        subdivision: null,
      },
      {
        code: "07",
        name: "Baie Sainte Anne",
        subdivision: null,
      },
      {
        code: "08",
        name: "Beau Vallon",
        subdivision: null,
      },
      {
        code: "09",
        name: "Bel Air",
        subdivision: null,
      },
      {
        code: "10",
        name: "Bel Ombre",
        subdivision: null,
      },
      {
        code: "11",
        name: "Cascade",
        subdivision: null,
      },
      {
        code: "16",
        name: "English River",
        subdivision: null,
      },
      {
        code: "12",
        name: "Glacis",
        subdivision: null,
      },
      {
        code: "13",
        name: "Grand Anse Mahe",
        subdivision: null,
      },
      {
        code: "14",
        name: "Grand Anse Praslin",
        subdivision: null,
      },
      {
        code: "15",
        name: "La Digue",
        subdivision: null,
      },
      {
        code: "24",
        name: "Les Mamelles",
        subdivision: null,
      },
      {
        code: "17",
        name: "Mont Buxton",
        subdivision: null,
      },
      {
        code: "18",
        name: "Mont Fleuri",
        subdivision: null,
      },
      {
        code: "19",
        name: "Plaisance",
        subdivision: null,
      },
      {
        code: "20",
        name: "Pointe Larue",
        subdivision: null,
      },
      {
        code: "21",
        name: "Port Glaud",
        subdivision: null,
      },
      {
        code: "25",
        name: "Roche Caiman",
        subdivision: null,
      },
      {
        code: "22",
        name: "Saint Louis",
        subdivision: null,
      },
      {
        code: "23",
        name: "Takamaka",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SL",
    code3: "SLE",
    name: "Sierra Leone",
    capital: "Freetown",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "E",
        name: "Eastern",
        subdivision: null,
      },
      {
        code: "N",
        name: "Northern",
        subdivision: null,
      },
      {
        code: "S",
        name: "Southern",
        subdivision: null,
      },
      {
        code: "W",
        name: "Western Area",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SG",
    code3: "SGP",
    name: "Singapore",
    capital: "Singapore",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "01",
        name: "Central Singapore",
        subdivision: null,
      },
      {
        code: "02",
        name: "North East",
        subdivision: null,
      },
      {
        code: "03",
        name: "North West",
        subdivision: null,
      },
      {
        code: "04",
        name: "South East",
        subdivision: null,
      },
      {
        code: "05",
        name: "South West",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SX",
    code3: "SXM",
    name: "Sint Maarten",
    capital: "Philipsburg",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "SK",
    code3: "SVK",
    name: "Slovakia",
    capital: "Bratislava",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "BC",
        name: "Banskobystrický kraj",
        subdivision: null,
      },
      {
        code: "BL",
        name: "Bratislavský kraj",
        subdivision: null,
      },
      {
        code: "KI",
        name: "Košický kraj",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Nitriansky kraj",
        subdivision: null,
      },
      {
        code: "PV",
        name: "Prešovský kraj",
        subdivision: null,
      },
      {
        code: "TC",
        name: "Trenčiansky kraj",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Trnavský kraj",
        subdivision: null,
      },
      {
        code: "ZI",
        name: "Žilinský kraj",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SI",
    code3: "SVN",
    name: "Slovenia",
    capital: "Ljubljana",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "001",
        name: "Ajdovščina",
        subdivision: null,
      },
      {
        code: "195",
        name: "Apače",
        subdivision: null,
      },
      {
        code: "002",
        name: "Beltinci",
        subdivision: null,
      },
      {
        code: "148",
        name: "Benedikt",
        subdivision: null,
      },
      {
        code: "149",
        name: "Bistrica ob Sotli",
        subdivision: null,
      },
      {
        code: "003",
        name: "Bled",
        subdivision: null,
      },
      {
        code: "150",
        name: "Bloke",
        subdivision: null,
      },
      {
        code: "004",
        name: "Bohinj",
        subdivision: null,
      },
      {
        code: "005",
        name: "Borovnica",
        subdivision: null,
      },
      {
        code: "006",
        name: "Bovec",
        subdivision: null,
      },
      {
        code: "151",
        name: "Braslovče",
        subdivision: null,
      },
      {
        code: "007",
        name: "Brda",
        subdivision: null,
      },
      {
        code: "008",
        name: "Brezovica",
        subdivision: null,
      },
      {
        code: "009",
        name: "Brežice",
        subdivision: null,
      },
      {
        code: "152",
        name: "Cankova",
        subdivision: null,
      },
      {
        code: "011",
        name: "Celje",
        subdivision: null,
      },
      {
        code: "012",
        name: "Cerklje na Gorenjskem",
        subdivision: null,
      },
      {
        code: "013",
        name: "Cerknica",
        subdivision: null,
      },
      {
        code: "014",
        name: "Cerkno",
        subdivision: null,
      },
      {
        code: "153",
        name: "Cerkvenjak",
        subdivision: null,
      },
      {
        code: "196",
        name: "Cirkulane",
        subdivision: null,
      },
      {
        code: "018",
        name: "Destrnik",
        subdivision: null,
      },
      {
        code: "019",
        name: "Divača",
        subdivision: null,
      },
      {
        code: "154",
        name: "Dobje",
        subdivision: null,
      },
      {
        code: "020",
        name: "Dobrepolje",
        subdivision: null,
      },
      {
        code: "155",
        name: "Dobrna",
        subdivision: null,
      },
      {
        code: "021",
        name: "Dobrova–Polhov Gradec",
        subdivision: null,
      },
      {
        code: "156",
        name: "Dobrovnik",
        subdivision: null,
      },
      {
        code: "022",
        name: "Dol pri Ljubljani",
        subdivision: null,
      },
      {
        code: "157",
        name: "Dolenjske Toplice",
        subdivision: null,
      },
      {
        code: "023",
        name: "Domžale",
        subdivision: null,
      },
      {
        code: "024",
        name: "Dornava",
        subdivision: null,
      },
      {
        code: "025",
        name: "Dravograd",
        subdivision: null,
      },
      {
        code: "026",
        name: "Duplek",
        subdivision: null,
      },
      {
        code: "027",
        name: "Gorenja vas–Poljane",
        subdivision: null,
      },
      {
        code: "028",
        name: "Gorišnica",
        subdivision: null,
      },
      {
        code: "207",
        name: "Gorje",
        subdivision: null,
      },
      {
        code: "029",
        name: "Gornja Radgona",
        subdivision: null,
      },
      {
        code: "030",
        name: "Gornji Grad",
        subdivision: null,
      },
      {
        code: "031",
        name: "Gornji Petrovci",
        subdivision: null,
      },
      {
        code: "158",
        name: "Grad",
        subdivision: null,
      },
      {
        code: "032",
        name: "Grosuplje",
        subdivision: null,
      },
      {
        code: "159",
        name: "Hajdina",
        subdivision: null,
      },
      {
        code: "161",
        name: "Hodoš",
        subdivision: null,
      },
      {
        code: "162",
        name: "Horjul",
        subdivision: null,
      },
      {
        code: "160",
        name: "Hoče–Slivnica",
        subdivision: null,
      },
      {
        code: "034",
        name: "Hrastnik",
        subdivision: null,
      },
      {
        code: "035",
        name: "Hrpelje-Kozina",
        subdivision: null,
      },
      {
        code: "036",
        name: "Idrija",
        subdivision: null,
      },
      {
        code: "037",
        name: "Ig",
        subdivision: null,
      },
      {
        code: "038",
        name: "Ilirska Bistrica",
        subdivision: null,
      },
      {
        code: "039",
        name: "Ivančna Gorica",
        subdivision: null,
      },
      {
        code: "040",
        name: "Izola",
        subdivision: null,
      },
      {
        code: "041",
        name: "Jesenice",
        subdivision: null,
      },
      {
        code: "163",
        name: "Jezersko",
        subdivision: null,
      },
      {
        code: "042",
        name: "Juršinci",
        subdivision: null,
      },
      {
        code: "043",
        name: "Kamnik",
        subdivision: null,
      },
      {
        code: "044",
        name: "Kanal",
        subdivision: null,
      },
      {
        code: "045",
        name: "Kidričevo",
        subdivision: null,
      },
      {
        code: "046",
        name: "Kobarid",
        subdivision: null,
      },
      {
        code: "047",
        name: "Kobilje",
        subdivision: null,
      },
      {
        code: "049",
        name: "Komen",
        subdivision: null,
      },
      {
        code: "164",
        name: "Komenda",
        subdivision: null,
      },
      {
        code: "050",
        name: "Koper",
        subdivision: null,
      },
      {
        code: "197",
        name: "Kosanjevica na Krki",
        subdivision: null,
      },
      {
        code: "165",
        name: "Kostel",
        subdivision: null,
      },
      {
        code: "051",
        name: "Kozje",
        subdivision: null,
      },
      {
        code: "048",
        name: "Kočevje",
        subdivision: null,
      },
      {
        code: "052",
        name: "Kranj",
        subdivision: null,
      },
      {
        code: "053",
        name: "Kranjska Gora",
        subdivision: null,
      },
      {
        code: "166",
        name: "Križevci",
        subdivision: null,
      },
      {
        code: "054",
        name: "Krško",
        subdivision: null,
      },
      {
        code: "055",
        name: "Kungota",
        subdivision: null,
      },
      {
        code: "056",
        name: "Kuzma",
        subdivision: null,
      },
      {
        code: "057",
        name: "Laško",
        subdivision: null,
      },
      {
        code: "058",
        name: "Lenart",
        subdivision: null,
      },
      {
        code: "059",
        name: "Lendava",
        subdivision: null,
      },
      {
        code: "060",
        name: "Litija",
        subdivision: null,
      },
      {
        code: "061",
        name: "Ljubljana",
        subdivision: null,
      },
      {
        code: "062",
        name: "Ljubno",
        subdivision: null,
      },
      {
        code: "063",
        name: "Ljutomer",
        subdivision: null,
      },
      {
        code: "208",
        name: "Log-Dragomer",
        subdivision: null,
      },
      {
        code: "064",
        name: "Logatec",
        subdivision: null,
      },
      {
        code: "167",
        name: "Lovrenc na Pohorju",
        subdivision: null,
      },
      {
        code: "065",
        name: "Loška Dolina",
        subdivision: null,
      },
      {
        code: "066",
        name: "Loški Potok",
        subdivision: null,
      },
      {
        code: "068",
        name: "Lukovica",
        subdivision: null,
      },
      {
        code: "067",
        name: "Luče",
        subdivision: null,
      },
      {
        code: "069",
        name: "Majšperk",
        subdivision: null,
      },
      {
        code: "198",
        name: "Makole",
        subdivision: null,
      },
      {
        code: "070",
        name: "Maribor",
        subdivision: null,
      },
      {
        code: "168",
        name: "Markovci",
        subdivision: null,
      },
      {
        code: "071",
        name: "Medvode",
        subdivision: null,
      },
      {
        code: "072",
        name: "Mengeš",
        subdivision: null,
      },
      {
        code: "073",
        name: "Metlika",
        subdivision: null,
      },
      {
        code: "074",
        name: "Mežica",
        subdivision: null,
      },
      {
        code: "169",
        name: "Miklavž na Dravskem Polju",
        subdivision: null,
      },
      {
        code: "075",
        name: "Miren–Kostanjevica",
        subdivision: null,
      },
      {
        code: "170",
        name: "Mirna Peč",
        subdivision: null,
      },
      {
        code: "076",
        name: "Mislinja",
        subdivision: null,
      },
      {
        code: "199",
        name: "Mokronog–Trebelno",
        subdivision: null,
      },
      {
        code: "078",
        name: "Moravske Toplice",
        subdivision: null,
      },
      {
        code: "077",
        name: "Moravče",
        subdivision: null,
      },
      {
        code: "079",
        name: "Mozirje",
        subdivision: null,
      },
      {
        code: "080",
        name: "Murska Sobota",
        subdivision: null,
      },
      {
        code: "081",
        name: "Muta",
        subdivision: null,
      },
      {
        code: "082",
        name: "Naklo",
        subdivision: null,
      },
      {
        code: "083",
        name: "Nazarje",
        subdivision: null,
      },
      {
        code: "084",
        name: "Nova Gorica",
        subdivision: null,
      },
      {
        code: "085",
        name: "Novo Mesto",
        subdivision: null,
      },
      {
        code: "086",
        name: "Odranci",
        subdivision: null,
      },
      {
        code: "171",
        name: "Oplotnica",
        subdivision: null,
      },
      {
        code: "087",
        name: "Ormož",
        subdivision: null,
      },
      {
        code: "088",
        name: "Osilnica",
        subdivision: null,
      },
      {
        code: "089",
        name: "Pesnica",
        subdivision: null,
      },
      {
        code: "090",
        name: "Piran",
        subdivision: null,
      },
      {
        code: "091",
        name: "Pivka",
        subdivision: null,
      },
      {
        code: "172",
        name: "Podlehnik",
        subdivision: null,
      },
      {
        code: "093",
        name: "Podvelka",
        subdivision: null,
      },
      {
        code: "092",
        name: "Podčetrtek",
        subdivision: null,
      },
      {
        code: "200",
        name: "Poljčane",
        subdivision: null,
      },
      {
        code: "173",
        name: "Polzela",
        subdivision: null,
      },
      {
        code: "094",
        name: "Postojna",
        subdivision: null,
      },
      {
        code: "174",
        name: "Prebold",
        subdivision: null,
      },
      {
        code: "095",
        name: "Preddvor",
        subdivision: null,
      },
      {
        code: "175",
        name: "Prevalje",
        subdivision: null,
      },
      {
        code: "096",
        name: "Ptuj",
        subdivision: null,
      },
      {
        code: "097",
        name: "Puconci",
        subdivision: null,
      },
      {
        code: "100",
        name: "Radenci",
        subdivision: null,
      },
      {
        code: "099",
        name: "Radeče",
        subdivision: null,
      },
      {
        code: "101",
        name: "Radlje ob Dravi",
        subdivision: null,
      },
      {
        code: "102",
        name: "Radovljica",
        subdivision: null,
      },
      {
        code: "103",
        name: "Ravne na Koroškem",
        subdivision: null,
      },
      {
        code: "176",
        name: "Razkrižje",
        subdivision: null,
      },
      {
        code: "098",
        name: "Rače–Fram",
        subdivision: null,
      },
      {
        code: "201",
        name: "Renče-Vogrsko",
        subdivision: null,
      },
      {
        code: "209",
        name: "Rečica ob Savinji",
        subdivision: null,
      },
      {
        code: "104",
        name: "Ribnica",
        subdivision: null,
      },
      {
        code: "177",
        name: "Ribnica na Pohorju",
        subdivision: null,
      },
      {
        code: "107",
        name: "Rogatec",
        subdivision: null,
      },
      {
        code: "106",
        name: "Rogaška Slatina",
        subdivision: null,
      },
      {
        code: "105",
        name: "Rogašovci",
        subdivision: null,
      },
      {
        code: "108",
        name: "Ruše",
        subdivision: null,
      },
      {
        code: "178",
        name: "Selnica ob Dravi",
        subdivision: null,
      },
      {
        code: "109",
        name: "Semič",
        subdivision: null,
      },
      {
        code: "110",
        name: "Sevnica",
        subdivision: null,
      },
      {
        code: "111",
        name: "Sežana",
        subdivision: null,
      },
      {
        code: "112",
        name: "Slovenj Gradec",
        subdivision: null,
      },
      {
        code: "113",
        name: "Slovenska Bistrica",
        subdivision: null,
      },
      {
        code: "114",
        name: "Slovenske Konjice",
        subdivision: null,
      },
      {
        code: "179",
        name: "Sodražica",
        subdivision: null,
      },
      {
        code: "180",
        name: "Solčava",
        subdivision: null,
      },
      {
        code: "202",
        name: "Središče ob Dravi",
        subdivision: null,
      },
      {
        code: "115",
        name: "Starše",
        subdivision: null,
      },
      {
        code: "203",
        name: "Straža",
        subdivision: null,
      },
      {
        code: "181",
        name: "Sveta Ana",
        subdivision: null,
      },
      {
        code: "204",
        name: "Sveta Trojica v Slovenskih Goricah",
        subdivision: null,
      },
      {
        code: "182",
        name: "Sveti Andraž v Slovenskih Goricah",
        subdivision: null,
      },
      {
        code: "116",
        name: "Sveti Jurij",
        subdivision: null,
      },
      {
        code: "210",
        name: "Sveti Jurij v Slovenskih Goricah",
        subdivision: null,
      },
      {
        code: "205",
        name: "Sveti Tomaž",
        subdivision: null,
      },
      {
        code: "184",
        name: "Tabor",
        subdivision: null,
      },
      {
        code: "010",
        name: "Tišina",
        subdivision: null,
      },
      {
        code: "128",
        name: "Tolmin",
        subdivision: null,
      },
      {
        code: "129",
        name: "Trbovlje",
        subdivision: null,
      },
      {
        code: "130",
        name: "Trebnje",
        subdivision: null,
      },
      {
        code: "185",
        name: "Trnovska Vas",
        subdivision: null,
      },
      {
        code: "186",
        name: "Trzin",
        subdivision: null,
      },
      {
        code: "131",
        name: "Tržič",
        subdivision: null,
      },
      {
        code: "132",
        name: "Turnišče",
        subdivision: null,
      },
      {
        code: "133",
        name: "Velenje",
        subdivision: null,
      },
      {
        code: "187",
        name: "Velika Polana",
        subdivision: null,
      },
      {
        code: "134",
        name: "Velike Lašče",
        subdivision: null,
      },
      {
        code: "188",
        name: "Veržej",
        subdivision: null,
      },
      {
        code: "135",
        name: "Videm",
        subdivision: null,
      },
      {
        code: "136",
        name: "Vipava",
        subdivision: null,
      },
      {
        code: "137",
        name: "Vitanje",
        subdivision: null,
      },
      {
        code: "138",
        name: "Vodice",
        subdivision: null,
      },
      {
        code: "139",
        name: "Vojnik",
        subdivision: null,
      },
      {
        code: "189",
        name: "Vransko",
        subdivision: null,
      },
      {
        code: "140",
        name: "Vrhnika",
        subdivision: null,
      },
      {
        code: "141",
        name: "Vuzenica",
        subdivision: null,
      },
      {
        code: "142",
        name: "Zagorje ob Savi",
        subdivision: null,
      },
      {
        code: "143",
        name: "Zavrč",
        subdivision: null,
      },
      {
        code: "144",
        name: "Zreče",
        subdivision: null,
      },
      {
        code: "015",
        name: "Črenšovci",
        subdivision: null,
      },
      {
        code: "016",
        name: "Črna na Koroškem",
        subdivision: null,
      },
      {
        code: "017",
        name: "Črnomelj",
        subdivision: null,
      },
      {
        code: "033",
        name: "Šalovci",
        subdivision: null,
      },
      {
        code: "183",
        name: "Šempeter–Vrtojba",
        subdivision: null,
      },
      {
        code: "118",
        name: "Šentilj",
        subdivision: null,
      },
      {
        code: "119",
        name: "Šentjernej",
        subdivision: null,
      },
      {
        code: "120",
        name: "Šentjur",
        subdivision: null,
      },
      {
        code: "211",
        name: "Šentrupert",
        subdivision: null,
      },
      {
        code: "117",
        name: "Šenčur",
        subdivision: null,
      },
      {
        code: "121",
        name: "Škocjan",
        subdivision: null,
      },
      {
        code: "122",
        name: "Škofja Loka",
        subdivision: null,
      },
      {
        code: "123",
        name: "Škofljica",
        subdivision: null,
      },
      {
        code: "124",
        name: "Šmarje pri Jelšah",
        subdivision: null,
      },
      {
        code: "206",
        name: "Šmarješke Toplice",
        subdivision: null,
      },
      {
        code: "125",
        name: "Šmartno ob Paki",
        subdivision: null,
      },
      {
        code: "194",
        name: "Šmartno pri Litiji",
        subdivision: null,
      },
      {
        code: "126",
        name: "Šoštanj",
        subdivision: null,
      },
      {
        code: "127",
        name: "Štore",
        subdivision: null,
      },
      {
        code: "190",
        name: "Žalec",
        subdivision: null,
      },
      {
        code: "146",
        name: "Železniki",
        subdivision: null,
      },
      {
        code: "191",
        name: "Žetale",
        subdivision: null,
      },
      {
        code: "147",
        name: "Žiri",
        subdivision: null,
      },
      {
        code: "192",
        name: "Žirovnica",
        subdivision: null,
      },
      {
        code: "193",
        name: "Žužemberk",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SB",
    code3: "SLB",
    name: "Solomon Islands",
    capital: "Honiara",
    region: "Oceania",
    subregion: "Melanesia",
    states: [
      {
        code: "CT",
        name: "Capital Territory",
        subdivision: null,
      },
      {
        code: "CE",
        name: "Central",
        subdivision: null,
      },
      {
        code: "CH",
        name: "Choiseul",
        subdivision: null,
      },
      {
        code: "GU",
        name: "Guadalcanal",
        subdivision: null,
      },
      {
        code: "IS",
        name: "Isabel",
        subdivision: null,
      },
      {
        code: "MK",
        name: "Makira-Ulawa",
        subdivision: null,
      },
      {
        code: "ML",
        name: "Malaita",
        subdivision: null,
      },
      {
        code: "RB",
        name: "Rennell and Bellona",
        subdivision: null,
      },
      {
        code: "TE",
        name: "Temotu",
        subdivision: null,
      },
      {
        code: "WE",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SO",
    code3: "SOM",
    name: "Somalia",
    capital: "Mogadishu",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "AW",
        name: "Awdal",
        subdivision: null,
      },
      {
        code: "BK",
        name: "Bakool",
        subdivision: null,
      },
      {
        code: "BN",
        name: "Banaadir",
        subdivision: null,
      },
      {
        code: "BR",
        name: "Bari",
        subdivision: null,
      },
      {
        code: "BY",
        name: "Bay",
        subdivision: null,
      },
      {
        code: "GA",
        name: "Galguduud",
        subdivision: null,
      },
      {
        code: "GE",
        name: "Gedo",
        subdivision: null,
      },
      {
        code: "HI",
        name: "Hiiraan",
        subdivision: null,
      },
      {
        code: "JD",
        name: "Jubbada Dhexe",
        subdivision: null,
      },
      {
        code: "JH",
        name: "Jubbada Hoose",
        subdivision: null,
      },
      {
        code: "MU",
        name: "Mudug",
        subdivision: null,
      },
      {
        code: "NU",
        name: "Nugaal",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Sanaag",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Shabeellaha Dhexe",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Shabeellaha Hoose",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Sool",
        subdivision: null,
      },
      {
        code: "TO",
        name: "Togdheer",
        subdivision: null,
      },
      {
        code: "WO",
        name: "Woqooyi Galbeed",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ZA",
    code3: "ZAF",
    name: "South Africa",
    capital: "Pretoria",
    region: "Africa",
    subregion: "Southern Africa",
    states: [
      {
        code: "EC",
        name: "Eastern Cape",
        subdivision: null,
      },
      {
        code: "FS",
        name: "Free State",
        subdivision: null,
      },
      {
        code: "GT",
        name: "Gauteng",
        subdivision: null,
      },
      {
        code: "NL",
        name: "KwaZulu-Natal",
        subdivision: null,
      },
      {
        code: "LP",
        name: "Limpopo",
        subdivision: null,
      },
      {
        code: "MP",
        name: "Mpumalanga",
        subdivision: null,
      },
      {
        code: "NW",
        name: "North West",
        subdivision: null,
      },
      {
        code: "NC",
        name: "Northern Cape",
        subdivision: null,
      },
      {
        code: "WC",
        name: "Western Cape",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GS",
    code3: "SGS",
    name: "South Georgia",
    capital: "King Edward Point",
    region: "Americas",
    subregion: "South America",
    states: [],
  },
  {
    code2: "KR",
    code3: "KOR",
    name: "South Korea",
    capital: "Seoul",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [
      {
        code: "26",
        name: "Busan-gwangyeoksi",
        subdivision: null,
      },
      {
        code: "43",
        name: "Chungcheongbuk-do",
        subdivision: null,
      },
      {
        code: "44",
        name: "Chungcheongnam-do",
        subdivision: null,
      },
      {
        code: "27",
        name: "Daegu-gwangyeoksi",
        subdivision: null,
      },
      {
        code: "30",
        name: "Daejeon-gwangyeoksi",
        subdivision: null,
      },
      {
        code: "42",
        name: "Gangwon-do",
        subdivision: null,
      },
      {
        code: "29",
        name: "Gwangju-gwangyeoksi",
        subdivision: null,
      },
      {
        code: "41",
        name: "Gyeonggi-do",
        subdivision: null,
      },
      {
        code: "47",
        name: "Gyeongsangbuk-do",
        subdivision: null,
      },
      {
        code: "48",
        name: "Gyeongsangnam-do",
        subdivision: null,
      },
      {
        code: "28",
        name: "Incheon-gwangyeoksi",
        subdivision: null,
      },
      {
        code: "49",
        name: "Jeju-teukbyeoljachido",
        subdivision: null,
      },
      {
        code: "45",
        name: "Jeollabuk-do",
        subdivision: null,
      },
      {
        code: "46",
        name: "Jeollanam-do",
        subdivision: null,
      },
      {
        code: "50",
        name: "Sejong",
        subdivision: null,
      },
      {
        code: "11",
        name: "Seoul-teukbyeolsi",
        subdivision: null,
      },
      {
        code: "31",
        name: "Ulsan-gwangyeoksi",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SS",
    code3: "SSD",
    name: "South Sudan",
    capital: "Juba",
    region: "Africa",
    subregion: "Middle Africa",
    states: [
      {
        code: "EC",
        name: "Central Equatoria",
        subdivision: null,
      },
      {
        code: "EE",
        name: "Eastern Equatoria",
        subdivision: null,
      },
      {
        code: "JG",
        name: "Jonglei",
        subdivision: null,
      },
      {
        code: "LK",
        name: "Lakes",
        subdivision: null,
      },
      {
        code: "BN",
        name: "Northern Bahr el Ghazal",
        subdivision: null,
      },
      {
        code: "UY",
        name: "Unity",
        subdivision: null,
      },
      {
        code: "NU",
        name: "Upper Nile",
        subdivision: null,
      },
      {
        code: "WR",
        name: "Warrap",
        subdivision: null,
      },
      {
        code: "BW",
        name: "Western Bahr el Ghazal",
        subdivision: null,
      },
      {
        code: "EW",
        name: "Western Equatoria",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ES",
    code3: "ESP",
    name: "Spain",
    capital: "Madrid",
    region: "Europe",
    subregion: "Southern Europe",
    states: [
      {
        code: "C",
        name: "A Coruña",
        subdivision: "Province",
      },
      {
        code: "AB",
        name: "Albacete",
        subdivision: "Province",
      },
      {
        code: "A",
        name: "Alicante",
        subdivision: "Province",
      },
      {
        code: "AL",
        name: "Almería",
        subdivision: "Province",
      },
      {
        code: "O",
        name: "Asturias",
        subdivision: "Province",
      },
      {
        code: "BA",
        name: "Badajoz",
        subdivision: "Province",
      },
      {
        code: "PM",
        name: "Balears",
        subdivision: "Province",
      },
      {
        code: "B",
        name: "Barcelona",
        subdivision: "Province",
      },
      {
        code: "BU",
        name: "Burgos",
        subdivision: "Province",
      },
      {
        code: "S",
        name: "Cantabria",
        subdivision: "Province",
      },
      {
        code: "CS",
        name: "Castellón",
        subdivision: "Province",
      },
      {
        code: "CR",
        name: "Ciudad Real",
        subdivision: "Province",
      },
      {
        code: "CU",
        name: "Cuenca",
        subdivision: "Province",
      },
      {
        code: "CC",
        name: "Cáceres",
        subdivision: "Province",
      },
      {
        code: "CA",
        name: "Cádiz",
        subdivision: "Province",
      },
      {
        code: "CO",
        name: "Córdoba",
        subdivision: "Province",
      },
      {
        code: "GI",
        name: "Girona",
        subdivision: "Province",
      },
      {
        code: "GR",
        name: "Granada",
        subdivision: "Province",
      },
      {
        code: "GU",
        name: "Guadalajara",
        subdivision: "Province",
      },
      {
        code: "SS",
        name: "Guipúzcoa",
        subdivision: "Province",
      },
      {
        code: "H",
        name: "Huelva",
        subdivision: "Province",
      },
      {
        code: "HU",
        name: "Huesca",
        subdivision: "Province",
      },
      {
        code: "J",
        name: "Jaén",
        subdivision: "Province",
      },
      {
        code: "LO",
        name: "La Rioja",
        subdivision: "Province",
      },
      {
        code: "GC",
        name: "Las Palmas",
        subdivision: "Province",
      },
      {
        code: "LE",
        name: "León",
        subdivision: "Province",
      },
      {
        code: "L",
        name: "Lleida",
        subdivision: "Province",
      },
      {
        code: "LU",
        name: "Lugo",
        subdivision: "Province",
      },
      {
        code: "M",
        name: "Madrid",
        subdivision: "Province",
      },
      {
        code: "MU",
        name: "Murcia",
        subdivision: "Province",
      },
      {
        code: "MA",
        name: "Málaga",
        subdivision: "Province",
      },
      {
        code: "NA",
        name: "Navarra",
        subdivision: "Province",
      },
      {
        code: "OR",
        name: "Ourense",
        subdivision: "Province",
      },
      {
        code: "P",
        name: "Palencia",
        subdivision: "Province",
      },
      {
        code: "PO",
        name: "Pontevedra",
        subdivision: "Province",
      },
      {
        code: "SA",
        name: "Salamanca",
        subdivision: "Province",
      },
      {
        code: "TF",
        name: "Santa Cruz de Tenerife",
        subdivision: "Province",
      },
      {
        code: "SG",
        name: "Segovia",
        subdivision: "Province",
      },
      {
        code: "SE",
        name: "Sevilla",
        subdivision: "Province",
      },
      {
        code: "SO",
        name: "Soria",
        subdivision: "Province",
      },
      {
        code: "T",
        name: "Tarragona",
        subdivision: "Province",
      },
      {
        code: "TE",
        name: "Teruel",
        subdivision: "Province",
      },
      {
        code: "TO",
        name: "Toledo",
        subdivision: "Province",
      },
      {
        code: "V",
        name: "Valencia",
        subdivision: "Province",
      },
      {
        code: "VA",
        name: "Valladolid",
        subdivision: "Province",
      },
      {
        code: "BI",
        name: "Vizcaya",
        subdivision: "Province",
      },
      {
        code: "ZA",
        name: "Zamora",
        subdivision: "Province",
      },
      {
        code: "Z",
        name: "Zaragoza",
        subdivision: "Province",
      },
      {
        code: "VI",
        name: "Álava",
        subdivision: "Province",
      },
      {
        code: "AV",
        name: "Ávila",
        subdivision: "Province",
      },
      {
        code: "CE",
        name: "Ceuta",
        subdivision: "autonomous city in North Africa",
      },
      {
        code: "ML",
        name: "Melilla",
        subdivision: "autonomous city in North Africa",
      },
      {
        code: "AN",
        name: "Andalucía",
        subdivision: "autonomous community",
      },
      {
        code: "AR",
        name: "Aragón",
        subdivision: "autonomous community",
      },
      {
        code: "AS",
        name: "Asturias, Principado de",
        subdivision: "autonomous community",
      },
      {
        code: "CN",
        name: "Canarias",
        subdivision: "autonomous community",
      },
      {
        code: "CB",
        name: "Cantabria",
        subdivision: "autonomous community",
      },
      {
        code: "CL",
        name: "Castilla y León",
        subdivision: "autonomous community",
      },
      {
        code: "CM",
        name: "Castilla-La Mancha",
        subdivision: "autonomous community",
      },
      {
        code: "CT",
        name: "Catalunya",
        subdivision: "autonomous community",
      },
      {
        code: "EX",
        name: "Extremadura",
        subdivision: "autonomous community",
      },
      {
        code: "GA",
        name: "Galicia",
        subdivision: "autonomous community",
      },
      {
        code: "IB",
        name: "Illes Balears",
        subdivision: "autonomous community",
      },
      {
        code: "RI",
        name: "La Rioja",
        subdivision: "autonomous community",
      },
      {
        code: "MD",
        name: "Madrid, Comunidad de",
        subdivision: "autonomous community",
      },
      {
        code: "MC",
        name: "Murcia, Región de",
        subdivision: "autonomous community",
      },
      {
        code: "NC",
        name: "Navarra, Comunidad Foral de",
        subdivision: "autonomous community",
      },
      {
        code: "PV",
        name: "País Vasco",
        subdivision: "autonomous community",
      },
      {
        code: "VC",
        name: "Valenciana, Comunidad",
        subdivision: "autonomous community",
      },
    ],
  },
  {
    code2: "LK",
    code3: "LKA",
    name: "Sri Lanka",
    capital: "Colombo",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "2",
        name: "Central Province",
        subdivision: null,
      },
      {
        code: "5",
        name: "Eastern Province",
        subdivision: null,
      },
      {
        code: "7",
        name: "North Central Province",
        subdivision: null,
      },
      {
        code: "6",
        name: "North Western Province",
        subdivision: null,
      },
      {
        code: "4",
        name: "Northern Province",
        subdivision: null,
      },
      {
        code: "9",
        name: "Sabaragamuwa Province",
        subdivision: null,
      },
      {
        code: "3",
        name: "Southern Province",
        subdivision: null,
      },
      {
        code: "8",
        name: "Uva Province",
        subdivision: null,
      },
      {
        code: "1",
        name: "Western Province",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SD",
    code3: "SDN",
    name: "Sudan",
    capital: "Khartoum",
    region: "Africa",
    subregion: "Northern Africa",
    states: [
      {
        code: "RS",
        name: "Al Baḩr al Aḩmar",
        subdivision: null,
      },
      {
        code: "GZ",
        name: "Al Jazīrah",
        subdivision: null,
      },
      {
        code: "KH",
        name: "Al Kharţūm",
        subdivision: null,
      },
      {
        code: "GD",
        name: "Al Qaḑārif",
        subdivision: null,
      },
      {
        code: "NR",
        name: "An Nīl",
        subdivision: null,
      },
      {
        code: "NW",
        name: "An Nīl al Abyaḑ",
        subdivision: null,
      },
      {
        code: "NB",
        name: "An Nīl al Azraq",
        subdivision: null,
      },
      {
        code: "NO",
        name: "Ash Shamālīyah",
        subdivision: null,
      },
      {
        code: "DW",
        name: "Gharb Dārfūr",
        subdivision: null,
      },
      {
        code: "DS",
        name: "Janūb Dārfūr",
        subdivision: null,
      },
      {
        code: "KS",
        name: "Janūb Kurdufān",
        subdivision: null,
      },
      {
        code: "KA",
        name: "Kassalā",
        subdivision: null,
      },
      {
        code: "DN",
        name: "Shamāl Dārfūr",
        subdivision: null,
      },
      {
        code: "KN",
        name: "Shamāl Kurdufān",
        subdivision: null,
      },
      {
        code: "DE",
        name: "Sharq Dārfūr",
        subdivision: null,
      },
      {
        code: "SI",
        name: "Sinnār",
        subdivision: null,
      },
      {
        code: "DC",
        name: "Zalingei",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SR",
    code3: "SUR",
    name: "Suriname",
    capital: "Paramaribo",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "BR",
        name: "Brokopondo",
        subdivision: null,
      },
      {
        code: "CM",
        name: "Commewijne",
        subdivision: null,
      },
      {
        code: "CR",
        name: "Coronie",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Marowijne",
        subdivision: null,
      },
      {
        code: "NI",
        name: "Nickerie",
        subdivision: null,
      },
      {
        code: "PR",
        name: "Para",
        subdivision: null,
      },
      {
        code: "PM",
        name: "Paramaribo",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Saramacca",
        subdivision: null,
      },
      {
        code: "SI",
        name: "Sipaliwini",
        subdivision: null,
      },
      {
        code: "WA",
        name: "Wanica",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SJ",
    code3: "SJM",
    name: "Svalbard and Jan Mayen",
    capital: "Longyearbyen",
    region: "Europe",
    subregion: "Northern Europe",
    states: [],
  },
  {
    code2: "SZ",
    code3: "SWZ",
    name: "Swaziland",
    capital: "Lobamba",
    region: "Africa",
    subregion: "Southern Africa",
    states: [
      {
        code: "HH",
        name: "Hhohho",
        subdivision: null,
      },
      {
        code: "LU",
        name: "Lubombo",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Manzini",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Shiselweni",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SE",
    code3: "SWE",
    name: "Sweden",
    capital: "Stockholm",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "K",
        name: "Blekinge län",
        subdivision: null,
      },
      {
        code: "W",
        name: "Dalarnas län",
        subdivision: null,
      },
      {
        code: "I",
        name: "Gotlands län",
        subdivision: null,
      },
      {
        code: "X",
        name: "Gävleborgs län",
        subdivision: null,
      },
      {
        code: "N",
        name: "Hallands län",
        subdivision: null,
      },
      {
        code: "Z",
        name: "Jämtlands län",
        subdivision: null,
      },
      {
        code: "F",
        name: "Jönköpings län",
        subdivision: null,
      },
      {
        code: "H",
        name: "Kalmar län",
        subdivision: null,
      },
      {
        code: "G",
        name: "Kronobergs län",
        subdivision: null,
      },
      {
        code: "BD",
        name: "Norrbottens län",
        subdivision: null,
      },
      {
        code: "M",
        name: "Skåne län",
        subdivision: null,
      },
      {
        code: "AB",
        name: "Stockholms län",
        subdivision: null,
      },
      {
        code: "D",
        name: "Södermanlands län",
        subdivision: null,
      },
      {
        code: "C",
        name: "Uppsala län",
        subdivision: null,
      },
      {
        code: "S",
        name: "Värmlands län",
        subdivision: null,
      },
      {
        code: "AC",
        name: "Västerbottens län",
        subdivision: null,
      },
      {
        code: "Y",
        name: "Västernorrlands län",
        subdivision: null,
      },
      {
        code: "U",
        name: "Västmanlands län",
        subdivision: null,
      },
      {
        code: "O",
        name: "Västra Götalands län",
        subdivision: null,
      },
      {
        code: "T",
        name: "Örebro län",
        subdivision: null,
      },
      {
        code: "E",
        name: "Östergötlands län",
        subdivision: null,
      },
    ],
  },
  {
    code2: "CH",
    code3: "CHE",
    name: "Switzerland",
    capital: "Bern",
    region: "Europe",
    subregion: "Western Europe",
    states: [
      {
        code: "AG",
        name: "Aargau",
        subdivision: null,
      },
      {
        code: "AR",
        name: "Appenzell Ausserrhoden",
        subdivision: null,
      },
      {
        code: "AI",
        name: "Appenzell Innerrhoden",
        subdivision: null,
      },
      {
        code: "BL",
        name: "Basel-Landschaft",
        subdivision: null,
      },
      {
        code: "BS",
        name: "Basel-Stadt",
        subdivision: null,
      },
      {
        code: "BE",
        name: "Bern",
        subdivision: null,
      },
      {
        code: "FR",
        name: "Fribourg",
        subdivision: null,
      },
      {
        code: "GE",
        name: "Genève",
        subdivision: null,
      },
      {
        code: "GL",
        name: "Glarus",
        subdivision: null,
      },
      {
        code: "GR",
        name: "Graubünden",
        subdivision: null,
      },
      {
        code: "JU",
        name: "Jura",
        subdivision: null,
      },
      {
        code: "LU",
        name: "Luzern",
        subdivision: null,
      },
      {
        code: "NE",
        name: "Neuchâtel",
        subdivision: null,
      },
      {
        code: "NW",
        name: "Nidwalden",
        subdivision: null,
      },
      {
        code: "OW",
        name: "Obwalden",
        subdivision: null,
      },
      {
        code: "SG",
        name: "Sankt Gallen",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Schaffhausen",
        subdivision: null,
      },
      {
        code: "SZ",
        name: "Schwyz",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Solothurn",
        subdivision: null,
      },
      {
        code: "TG",
        name: "Thurgau",
        subdivision: null,
      },
      {
        code: "TI",
        name: "Ticino",
        subdivision: null,
      },
      {
        code: "UR",
        name: "Uri",
        subdivision: null,
      },
      {
        code: "VS",
        name: "Valais",
        subdivision: null,
      },
      {
        code: "VD",
        name: "Vaud",
        subdivision: null,
      },
      {
        code: "ZG",
        name: "Zug",
        subdivision: null,
      },
      {
        code: "ZH",
        name: "Zürich",
        subdivision: null,
      },
    ],
  },
  {
    code2: "SY",
    code3: "SYR",
    name: "Syria",
    capital: "Damascus",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "LA",
        name: "Al Lādhiqīyah",
        subdivision: null,
      },
      {
        code: "QU",
        name: "Al Qunayţirah",
        subdivision: null,
      },
      {
        code: "HA",
        name: "Al Ḩasakah",
        subdivision: null,
      },
      {
        code: "RA",
        name: "Ar Raqqah",
        subdivision: null,
      },
      {
        code: "SU",
        name: "As Suwaydā'",
        subdivision: null,
      },
      {
        code: "DR",
        name: "Darٰā",
        subdivision: null,
      },
      {
        code: "DY",
        name: "Dayr az Zawr",
        subdivision: null,
      },
      {
        code: "DI",
        name: "Dimashq",
        subdivision: null,
      },
      {
        code: "ID",
        name: "Idlib",
        subdivision: null,
      },
      {
        code: "RD",
        name: "Rīf Dimashq",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Ţarţūs",
        subdivision: null,
      },
      {
        code: "HL",
        name: "Ḩalab",
        subdivision: null,
      },
      {
        code: "HM",
        name: "Ḩamāh",
        subdivision: null,
      },
      {
        code: "HI",
        name: "Ḩimş",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TW",
    code3: "TWN",
    name: "Taiwan",
    capital: "Taipei",
    region: "Asia",
    subregion: "Eastern Asia",
    states: [
      {
        code: "CHA",
        name: "Changhua",
        subdivision: null,
      },
      {
        code: "CYQ",
        name: "Chiayi",
        subdivision: null,
      },
      {
        code: "CYI",
        name: "Chiayi",
        subdivision: null,
      },
      {
        code: "HSZ",
        name: "Hsinchu",
        subdivision: null,
      },
      {
        code: "HSQ",
        name: "Hsinchu",
        subdivision: null,
      },
      {
        code: "HUA",
        name: "Hualien",
        subdivision: null,
      },
      {
        code: "ILA",
        name: "Ilan",
        subdivision: null,
      },
      {
        code: "KHQ",
        name: "Kaohsiung",
        subdivision: null,
      },
      {
        code: "KHH",
        name: "Kaohsiung",
        subdivision: null,
      },
      {
        code: "KEE",
        name: "Keelung",
        subdivision: null,
      },
      {
        code: "MIA",
        name: "Miaoli",
        subdivision: null,
      },
      {
        code: "NAN",
        name: "Nantou",
        subdivision: null,
      },
      {
        code: "PEN",
        name: "Penghu",
        subdivision: null,
      },
      {
        code: "PIF",
        name: "Pingtung",
        subdivision: null,
      },
      {
        code: "TXG",
        name: "Taichung",
        subdivision: null,
      },
      {
        code: "TXQ",
        name: "Taichung",
        subdivision: null,
      },
      {
        code: "TNN",
        name: "Tainan",
        subdivision: null,
      },
      {
        code: "TNQ",
        name: "Tainan",
        subdivision: null,
      },
      {
        code: "TPE",
        name: "Taipei",
        subdivision: null,
      },
      {
        code: "TPQ",
        name: "Taipei",
        subdivision: null,
      },
      {
        code: "TTT",
        name: "Taitung",
        subdivision: null,
      },
      {
        code: "TAO",
        name: "Taoyuan",
        subdivision: null,
      },
      {
        code: "YUN",
        name: "Yunlin",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TJ",
    code3: "TJK",
    name: "Tajikistan",
    capital: "Dushanbe",
    region: "Asia",
    subregion: "Central Asia",
    states: [
      {
        code: "DU",
        name: "Dushanbe",
        subdivision: null,
      },
      {
        code: "KT",
        name: "Khatlon",
        subdivision: null,
      },
      {
        code: "GB",
        name: "Kŭhistoni Badakhshon",
        subdivision: null,
      },
      {
        code: "SU",
        name: "Sughd",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TZ",
    code3: "TZA",
    name: "Tanzania",
    capital: "Dodoma",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "01",
        name: "Arusha",
        subdivision: null,
      },
      {
        code: "02",
        name: "Dar es Salaam",
        subdivision: null,
      },
      {
        code: "03",
        name: "Dodoma",
        subdivision: null,
      },
      {
        code: "04",
        name: "Iringa",
        subdivision: null,
      },
      {
        code: "05",
        name: "Kagera",
        subdivision: null,
      },
      {
        code: "06",
        name: "Kaskazini Pemba",
        subdivision: null,
      },
      {
        code: "07",
        name: "Kaskazini Unguja",
        subdivision: null,
      },
      {
        code: "08",
        name: "Kigoma",
        subdivision: null,
      },
      {
        code: "09",
        name: "Kilimanjaro",
        subdivision: null,
      },
      {
        code: "10",
        name: "Kusini Pemba",
        subdivision: null,
      },
      {
        code: "11",
        name: "Kusini Unguja",
        subdivision: null,
      },
      {
        code: "12",
        name: "Lindi",
        subdivision: null,
      },
      {
        code: "26",
        name: "Manyara",
        subdivision: null,
      },
      {
        code: "13",
        name: "Mara",
        subdivision: null,
      },
      {
        code: "14",
        name: "Mbeya",
        subdivision: null,
      },
      {
        code: "15",
        name: "Mjini Magharibi",
        subdivision: null,
      },
      {
        code: "16",
        name: "Morogoro",
        subdivision: null,
      },
      {
        code: "17",
        name: "Mtwara",
        subdivision: null,
      },
      {
        code: "18",
        name: "Mwanza",
        subdivision: null,
      },
      {
        code: "19",
        name: "Pwani",
        subdivision: null,
      },
      {
        code: "20",
        name: "Rukwa",
        subdivision: null,
      },
      {
        code: "21",
        name: "Ruvuma",
        subdivision: null,
      },
      {
        code: "22",
        name: "Shinyanga",
        subdivision: null,
      },
      {
        code: "23",
        name: "Singida",
        subdivision: null,
      },
      {
        code: "24",
        name: "Tabora",
        subdivision: null,
      },
      {
        code: "25",
        name: "Tanga",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TH",
    code3: "THA",
    name: "Thailand",
    capital: "Bangkok",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "37",
        name: "Amnat Charoen",
        subdivision: null,
      },
      {
        code: "15",
        name: "Ang Thong",
        subdivision: null,
      },
      {
        code: "38",
        name: "Bueng Kan",
        subdivision: null,
      },
      {
        code: "31",
        name: "Buri Ram",
        subdivision: null,
      },
      {
        code: "24",
        name: "Chachoengsao",
        subdivision: null,
      },
      {
        code: "18",
        name: "Chai Nat",
        subdivision: null,
      },
      {
        code: "36",
        name: "Chaiyaphum",
        subdivision: null,
      },
      {
        code: "22",
        name: "Chanthaburi",
        subdivision: null,
      },
      {
        code: "50",
        name: "Chiang Mai",
        subdivision: null,
      },
      {
        code: "57",
        name: "Chiang Rai",
        subdivision: null,
      },
      {
        code: "20",
        name: "Chon Buri",
        subdivision: null,
      },
      {
        code: "86",
        name: "Chumphon",
        subdivision: null,
      },
      {
        code: "46",
        name: "Kalasin",
        subdivision: null,
      },
      {
        code: "62",
        name: "Kamphaeng Phet",
        subdivision: null,
      },
      {
        code: "71",
        name: "Kanchanaburi",
        subdivision: null,
      },
      {
        code: "40",
        name: "Khon Kaen",
        subdivision: null,
      },
      {
        code: "81",
        name: "Krabi",
        subdivision: null,
      },
      {
        code: "10",
        name: "Krung Thep Maha Nakhon",
        subdivision: null,
      },
      {
        code: "52",
        name: "Lampang",
        subdivision: null,
      },
      {
        code: "51",
        name: "Lamphun",
        subdivision: null,
      },
      {
        code: "42",
        name: "Loei",
        subdivision: null,
      },
      {
        code: "16",
        name: "Lop Buri",
        subdivision: null,
      },
      {
        code: "58",
        name: "Mae Hong Son",
        subdivision: null,
      },
      {
        code: "44",
        name: "Maha Sarakham",
        subdivision: null,
      },
      {
        code: "49",
        name: "Mukdahan",
        subdivision: null,
      },
      {
        code: "26",
        name: "Nakhon Nayok",
        subdivision: null,
      },
      {
        code: "73",
        name: "Nakhon Pathom",
        subdivision: null,
      },
      {
        code: "48",
        name: "Nakhon Phanom",
        subdivision: null,
      },
      {
        code: "30",
        name: "Nakhon Ratchasima",
        subdivision: null,
      },
      {
        code: "60",
        name: "Nakhon Sawan",
        subdivision: null,
      },
      {
        code: "80",
        name: "Nakhon Si Thammarat",
        subdivision: null,
      },
      {
        code: "55",
        name: "Nan",
        subdivision: null,
      },
      {
        code: "96",
        name: "Narathiwat",
        subdivision: null,
      },
      {
        code: "39",
        name: "Nong Bua Lam Phu",
        subdivision: null,
      },
      {
        code: "43",
        name: "Nong Khai",
        subdivision: null,
      },
      {
        code: "12",
        name: "Nonthaburi",
        subdivision: null,
      },
      {
        code: "13",
        name: "Pathum Thani",
        subdivision: null,
      },
      {
        code: "94",
        name: "Pattani",
        subdivision: null,
      },
      {
        code: "82",
        name: "Phangnga",
        subdivision: null,
      },
      {
        code: "93",
        name: "Phatthalung",
        subdivision: null,
      },
      {
        code: "S",
        name: "Phatthaya",
        subdivision: null,
      },
      {
        code: "56",
        name: "Phayao",
        subdivision: null,
      },
      {
        code: "67",
        name: "Phetchabun",
        subdivision: null,
      },
      {
        code: "76",
        name: "Phetchaburi",
        subdivision: null,
      },
      {
        code: "66",
        name: "Phichit",
        subdivision: null,
      },
      {
        code: "65",
        name: "Phitsanulok",
        subdivision: null,
      },
      {
        code: "14",
        name: "Phra Nakhon Si Ayutthaya",
        subdivision: null,
      },
      {
        code: "54",
        name: "Phrae",
        subdivision: null,
      },
      {
        code: "83",
        name: "Phuket",
        subdivision: null,
      },
      {
        code: "25",
        name: "Prachin Buri",
        subdivision: null,
      },
      {
        code: "77",
        name: "Prachuap Khiri Khan",
        subdivision: null,
      },
      {
        code: "85",
        name: "Ranong",
        subdivision: null,
      },
      {
        code: "70",
        name: "Ratchaburi",
        subdivision: null,
      },
      {
        code: "21",
        name: "Rayong",
        subdivision: null,
      },
      {
        code: "45",
        name: "Roi Et",
        subdivision: null,
      },
      {
        code: "27",
        name: "Sa Kaeo",
        subdivision: null,
      },
      {
        code: "47",
        name: "Sakon Nakhon",
        subdivision: null,
      },
      {
        code: "11",
        name: "Samut Prakan",
        subdivision: null,
      },
      {
        code: "74",
        name: "Samut Sakhon",
        subdivision: null,
      },
      {
        code: "75",
        name: "Samut Songkhram",
        subdivision: null,
      },
      {
        code: "19",
        name: "Saraburi",
        subdivision: null,
      },
      {
        code: "91",
        name: "Satun",
        subdivision: null,
      },
      {
        code: "33",
        name: "Si Sa Ket",
        subdivision: null,
      },
      {
        code: "17",
        name: "Sing Buri",
        subdivision: null,
      },
      {
        code: "90",
        name: "Songkhla",
        subdivision: null,
      },
      {
        code: "64",
        name: "Sukhothai",
        subdivision: null,
      },
      {
        code: "72",
        name: "Suphan Buri",
        subdivision: null,
      },
      {
        code: "84",
        name: "Surat Thani",
        subdivision: null,
      },
      {
        code: "32",
        name: "Surin",
        subdivision: null,
      },
      {
        code: "63",
        name: "Tak",
        subdivision: null,
      },
      {
        code: "92",
        name: "Trang",
        subdivision: null,
      },
      {
        code: "23",
        name: "Trat",
        subdivision: null,
      },
      {
        code: "34",
        name: "Ubon Ratchathani",
        subdivision: null,
      },
      {
        code: "41",
        name: "Udon Thani",
        subdivision: null,
      },
      {
        code: "61",
        name: "Uthai Thani",
        subdivision: null,
      },
      {
        code: "53",
        name: "Uttaradit",
        subdivision: null,
      },
      {
        code: "95",
        name: "Yala",
        subdivision: null,
      },
      {
        code: "35",
        name: "Yasothon",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TL",
    code3: "TLS",
    name: "East Timor",
    capital: "Dili",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "AL",
        name: "Aileu",
        subdivision: null,
      },
      {
        code: "AN",
        name: "Ainaro",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Baucau",
        subdivision: null,
      },
      {
        code: "BO",
        name: "Bobonaro",
        subdivision: null,
      },
      {
        code: "CO",
        name: "Cova Lima",
        subdivision: null,
      },
      {
        code: "DI",
        name: "Díli",
        subdivision: null,
      },
      {
        code: "ER",
        name: "Ermera",
        subdivision: null,
      },
      {
        code: "LA",
        name: "Lautem",
        subdivision: null,
      },
      {
        code: "LI",
        name: "Liquiça",
        subdivision: null,
      },
      {
        code: "MT",
        name: "Manatuto",
        subdivision: null,
      },
      {
        code: "MF",
        name: "Manufahi",
        subdivision: null,
      },
      {
        code: "OE",
        name: "Oecussi",
        subdivision: null,
      },
      {
        code: "VI",
        name: "Viqueque",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TG",
    code3: "TGO",
    name: "Togo",
    capital: "Lomé",
    region: "Africa",
    subregion: "Western Africa",
    states: [
      {
        code: "C",
        name: "Centre",
        subdivision: null,
      },
      {
        code: "K",
        name: "Kara",
        subdivision: null,
      },
      {
        code: "M",
        name: "Maritime",
        subdivision: null,
      },
      {
        code: "P",
        name: "Plateaux",
        subdivision: null,
      },
      {
        code: "S",
        name: "Savannes",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TK",
    code3: "TKL",
    name: "Tokelau",
    capital: "Fakaofo",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "TO",
    code3: "TON",
    name: "Tonga",
    capital: "Nuku'alofa",
    region: "Oceania",
    subregion: "Polynesia",
    states: [
      {
        code: "01",
        name: "'Eua",
        subdivision: null,
      },
      {
        code: "02",
        name: "Ha'apai",
        subdivision: null,
      },
      {
        code: "03",
        name: "Niuas",
        subdivision: null,
      },
      {
        code: "04",
        name: "Tongatapu",
        subdivision: null,
      },
      {
        code: "05",
        name: "Vava'u",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TT",
    code3: "TTO",
    name: "Trinidad and Tobago",
    capital: "Port of Spain",
    region: "Americas",
    subregion: "Caribbean",
    states: [
      {
        code: "ARI",
        name: "Arima",
        subdivision: null,
      },
      {
        code: "CHA",
        name: "Chaguanas",
        subdivision: null,
      },
      {
        code: "CTT",
        name: "Couva-Tabaquite-Talparo",
        subdivision: null,
      },
      {
        code: "DMN",
        name: "Diego Martin",
        subdivision: null,
      },
      {
        code: "ETO",
        name: "Eastern Tobago",
        subdivision: null,
      },
      {
        code: "PED",
        name: "Penal-Debe",
        subdivision: null,
      },
      {
        code: "PTF",
        name: "Point Fortin",
        subdivision: null,
      },
      {
        code: "POS",
        name: "Port of Spain",
        subdivision: null,
      },
      {
        code: "PRT",
        name: "Princes Town",
        subdivision: null,
      },
      {
        code: "RCM",
        name: "Rio Claro-Mayaro",
        subdivision: null,
      },
      {
        code: "SFO",
        name: "San Fernando",
        subdivision: null,
      },
      {
        code: "SJL",
        name: "San Juan-Laventille",
        subdivision: null,
      },
      {
        code: "SGE",
        name: "Sangre Grande",
        subdivision: null,
      },
      {
        code: "SIP",
        name: "Siparia",
        subdivision: null,
      },
      {
        code: "TUP",
        name: "Tunapuna-Piarco",
        subdivision: null,
      },
      {
        code: "WTO",
        name: "Western Tobago",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TN",
    code3: "TUN",
    name: "Tunisia",
    capital: "Tunis",
    region: "Africa",
    subregion: "Northern Africa",
    states: [
      {
        code: "12",
        name: "Ariana",
        subdivision: null,
      },
      {
        code: "13",
        name: "Ben Arous",
        subdivision: null,
      },
      {
        code: "23",
        name: "Bizerte",
        subdivision: null,
      },
      {
        code: "31",
        name: "Béja",
        subdivision: null,
      },
      {
        code: "81",
        name: "Gabès",
        subdivision: null,
      },
      {
        code: "71",
        name: "Gafsa",
        subdivision: null,
      },
      {
        code: "32",
        name: "Jendouba",
        subdivision: null,
      },
      {
        code: "41",
        name: "Kairouan",
        subdivision: null,
      },
      {
        code: "42",
        name: "Kasserine",
        subdivision: null,
      },
      {
        code: "73",
        name: "Kebili",
        subdivision: null,
      },
      {
        code: "14",
        name: "La Manouba",
        subdivision: null,
      },
      {
        code: "33",
        name: "Le Kef",
        subdivision: null,
      },
      {
        code: "53",
        name: "Mahdia",
        subdivision: null,
      },
      {
        code: "82",
        name: "Medenine",
        subdivision: null,
      },
      {
        code: "52",
        name: "Monastir",
        subdivision: null,
      },
      {
        code: "21",
        name: "Nabeul",
        subdivision: null,
      },
      {
        code: "61",
        name: "Sfax",
        subdivision: null,
      },
      {
        code: "43",
        name: "Sidi Bouzid",
        subdivision: null,
      },
      {
        code: "34",
        name: "Siliana",
        subdivision: null,
      },
      {
        code: "51",
        name: "Sousse",
        subdivision: null,
      },
      {
        code: "83",
        name: "Tataouine",
        subdivision: null,
      },
      {
        code: "72",
        name: "Tozeur",
        subdivision: null,
      },
      {
        code: "11",
        name: "Tunis",
        subdivision: null,
      },
      {
        code: "22",
        name: "Zaghouan",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TR",
    code3: "TUR",
    name: "Turkey",
    capital: "Ankara",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "01",
        name: "Adana",
        subdivision: null,
      },
      {
        code: "02",
        name: "Adıyaman",
        subdivision: null,
      },
      {
        code: "03",
        name: "Afyonkarahisar",
        subdivision: null,
      },
      {
        code: "68",
        name: "Aksaray",
        subdivision: null,
      },
      {
        code: "05",
        name: "Amasya",
        subdivision: null,
      },
      {
        code: "06",
        name: "Ankara",
        subdivision: null,
      },
      {
        code: "07",
        name: "Antalya",
        subdivision: null,
      },
      {
        code: "75",
        name: "Ardahan",
        subdivision: null,
      },
      {
        code: "08",
        name: "Artvin",
        subdivision: null,
      },
      {
        code: "09",
        name: "Aydın",
        subdivision: null,
      },
      {
        code: "04",
        name: "Ağrı",
        subdivision: null,
      },
      {
        code: "10",
        name: "Balıkesir",
        subdivision: null,
      },
      {
        code: "74",
        name: "Bartın",
        subdivision: null,
      },
      {
        code: "72",
        name: "Batman",
        subdivision: null,
      },
      {
        code: "69",
        name: "Bayburt",
        subdivision: null,
      },
      {
        code: "11",
        name: "Bilecik",
        subdivision: null,
      },
      {
        code: "12",
        name: "Bingöl",
        subdivision: null,
      },
      {
        code: "13",
        name: "Bitlis",
        subdivision: null,
      },
      {
        code: "14",
        name: "Bolu",
        subdivision: null,
      },
      {
        code: "15",
        name: "Burdur",
        subdivision: null,
      },
      {
        code: "16",
        name: "Bursa",
        subdivision: null,
      },
      {
        code: "20",
        name: "Denizli",
        subdivision: null,
      },
      {
        code: "21",
        name: "Diyarbakır",
        subdivision: null,
      },
      {
        code: "81",
        name: "Düzce",
        subdivision: null,
      },
      {
        code: "22",
        name: "Edirne",
        subdivision: null,
      },
      {
        code: "23",
        name: "Elazığ",
        subdivision: null,
      },
      {
        code: "24",
        name: "Erzincan",
        subdivision: null,
      },
      {
        code: "25",
        name: "Erzurum",
        subdivision: null,
      },
      {
        code: "26",
        name: "Eskişehir",
        subdivision: null,
      },
      {
        code: "27",
        name: "Gaziantep",
        subdivision: null,
      },
      {
        code: "28",
        name: "Giresun",
        subdivision: null,
      },
      {
        code: "29",
        name: "Gümüşhane",
        subdivision: null,
      },
      {
        code: "30",
        name: "Hakkâri",
        subdivision: null,
      },
      {
        code: "31",
        name: "Hatay",
        subdivision: null,
      },
      {
        code: "32",
        name: "Isparta",
        subdivision: null,
      },
      {
        code: "76",
        name: "Iğdır",
        subdivision: null,
      },
      {
        code: "46",
        name: "Kahramanmaraş",
        subdivision: null,
      },
      {
        code: "78",
        name: "Karabük",
        subdivision: null,
      },
      {
        code: "70",
        name: "Karaman",
        subdivision: null,
      },
      {
        code: "36",
        name: "Kars",
        subdivision: null,
      },
      {
        code: "37",
        name: "Kastamonu",
        subdivision: null,
      },
      {
        code: "38",
        name: "Kayseri",
        subdivision: null,
      },
      {
        code: "79",
        name: "Kilis",
        subdivision: null,
      },
      {
        code: "41",
        name: "Kocaeli",
        subdivision: null,
      },
      {
        code: "42",
        name: "Konya",
        subdivision: null,
      },
      {
        code: "43",
        name: "Kütahya",
        subdivision: null,
      },
      {
        code: "39",
        name: "Kırklareli",
        subdivision: null,
      },
      {
        code: "71",
        name: "Kırıkkale",
        subdivision: null,
      },
      {
        code: "40",
        name: "Kırşehir",
        subdivision: null,
      },
      {
        code: "44",
        name: "Malatya",
        subdivision: null,
      },
      {
        code: "45",
        name: "Manisa",
        subdivision: null,
      },
      {
        code: "47",
        name: "Mardin",
        subdivision: null,
      },
      {
        code: "33",
        name: "Mersin",
        subdivision: null,
      },
      {
        code: "48",
        name: "Muğla",
        subdivision: null,
      },
      {
        code: "49",
        name: "Muş",
        subdivision: null,
      },
      {
        code: "50",
        name: "Nevşehir",
        subdivision: null,
      },
      {
        code: "51",
        name: "Niğde",
        subdivision: null,
      },
      {
        code: "52",
        name: "Ordu",
        subdivision: null,
      },
      {
        code: "80",
        name: "Osmaniye",
        subdivision: null,
      },
      {
        code: "53",
        name: "Rize",
        subdivision: null,
      },
      {
        code: "54",
        name: "Sakarya",
        subdivision: null,
      },
      {
        code: "55",
        name: "Samsun",
        subdivision: null,
      },
      {
        code: "56",
        name: "Siirt",
        subdivision: null,
      },
      {
        code: "57",
        name: "Sinop",
        subdivision: null,
      },
      {
        code: "58",
        name: "Sivas",
        subdivision: null,
      },
      {
        code: "59",
        name: "Tekirdağ",
        subdivision: null,
      },
      {
        code: "60",
        name: "Tokat",
        subdivision: null,
      },
      {
        code: "61",
        name: "Trabzon",
        subdivision: null,
      },
      {
        code: "62",
        name: "Tunceli",
        subdivision: null,
      },
      {
        code: "64",
        name: "Uşak",
        subdivision: null,
      },
      {
        code: "65",
        name: "Van",
        subdivision: null,
      },
      {
        code: "77",
        name: "Yalova",
        subdivision: null,
      },
      {
        code: "66",
        name: "Yozgat",
        subdivision: null,
      },
      {
        code: "67",
        name: "Zonguldak",
        subdivision: null,
      },
      {
        code: "17",
        name: "Çanakkale",
        subdivision: null,
      },
      {
        code: "18",
        name: "Çankırı",
        subdivision: null,
      },
      {
        code: "19",
        name: "Çorum",
        subdivision: null,
      },
      {
        code: "34",
        name: "İstanbul",
        subdivision: null,
      },
      {
        code: "35",
        name: "İzmir",
        subdivision: null,
      },
      {
        code: "63",
        name: "Şanlıurfa",
        subdivision: null,
      },
      {
        code: "73",
        name: "Şırnak",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TM",
    code3: "TKM",
    name: "Turkmenistan",
    capital: "Ashgabat",
    region: "Asia",
    subregion: "Central Asia",
    states: [
      {
        code: "A",
        name: "Ahal",
        subdivision: null,
      },
      {
        code: "S",
        name: "Aşgabat",
        subdivision: null,
      },
      {
        code: "B",
        name: "Balkan",
        subdivision: null,
      },
      {
        code: "D",
        name: "Daşoguz",
        subdivision: null,
      },
      {
        code: "L",
        name: "Lebap",
        subdivision: null,
      },
      {
        code: "M",
        name: "Mary",
        subdivision: null,
      },
    ],
  },
  {
    code2: "TC",
    code3: "TCA",
    name: "Turks and Caicos Islands",
    capital: "Cockburn Town",
    region: "Americas",
    subregion: "Caribbean",
    states: [],
  },
  {
    code2: "TV",
    code3: "TUV",
    name: "Tuvalu",
    capital: "Funafuti",
    region: "Oceania",
    subregion: "Polynesia",
    states: [
      {
        code: "FUN",
        name: "Funafuti",
        subdivision: null,
      },
      {
        code: "NMG",
        name: "Nanumanga",
        subdivision: null,
      },
      {
        code: "NMA",
        name: "Nanumea",
        subdivision: null,
      },
      {
        code: "NIT",
        name: "Niutao",
        subdivision: null,
      },
      {
        code: "NUI",
        name: "Nui",
        subdivision: null,
      },
      {
        code: "NKF",
        name: "Nukufetau",
        subdivision: null,
      },
      {
        code: "NKL",
        name: "Nukulaelae",
        subdivision: null,
      },
      {
        code: "VAI",
        name: "Vaitupu",
        subdivision: null,
      },
    ],
  },
  {
    code2: "UG",
    code3: "UGA",
    name: "Uganda",
    capital: "Kampala",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "C",
        name: "Central",
        subdivision: null,
      },
      {
        code: "E",
        name: "Eastern",
        subdivision: null,
      },
      {
        code: "N",
        name: "Northern",
        subdivision: null,
      },
      {
        code: "W",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "UA",
    code3: "UKR",
    name: "Ukraine",
    capital: "Kiev",
    region: "Europe",
    subregion: "Eastern Europe",
    states: [
      {
        code: "43",
        name: "Avtonomna Respublika Krym",
        subdivision: null,
      },
      {
        code: "71",
        name: "Cherkas'ka Oblast'",
        subdivision: null,
      },
      {
        code: "74",
        name: "Chernihivs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "77",
        name: "Chernivets'ka Oblast'",
        subdivision: null,
      },
      {
        code: "12",
        name: "Dnipropetrovs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "14",
        name: "Donets'ka Oblast'",
        subdivision: null,
      },
      {
        code: "26",
        name: "Ivano-Frankivs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "63",
        name: "Kharkivs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "65",
        name: "Khersons'ka Oblast'",
        subdivision: null,
      },
      {
        code: "68",
        name: "Khmel'nyts'ka Oblast'",
        subdivision: null,
      },
      {
        code: "35",
        name: "Kirovohrads'ka Oblast'",
        subdivision: null,
      },
      {
        code: "30",
        name: "Kyïv",
        subdivision: null,
      },
      {
        code: "32",
        name: "Kyïvs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "46",
        name: "L'vivs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "09",
        name: "Luhans'ka Oblast'",
        subdivision: null,
      },
      {
        code: "48",
        name: "Mykolaïvs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "51",
        name: "Odes'ka Oblast'",
        subdivision: null,
      },
      {
        code: "53",
        name: "Poltavs'ka Oblast'",
        subdivision: null,
      },
      {
        code: "56",
        name: "Rivnens'ka Oblast'",
        subdivision: null,
      },
      {
        code: "40",
        name: "Sevastopol'",
        subdivision: null,
      },
      {
        code: "59",
        name: "Sums'ka Oblast'",
        subdivision: null,
      },
      {
        code: "61",
        name: "Ternopil's'ka Oblast'",
        subdivision: null,
      },
      {
        code: "05",
        name: "Vinnyts'ka Oblast'",
        subdivision: null,
      },
      {
        code: "07",
        name: "Volyns'ka Oblast'",
        subdivision: null,
      },
      {
        code: "21",
        name: "Zakarpats'ka Oblast'",
        subdivision: null,
      },
      {
        code: "23",
        name: "Zaporiz'ka Oblast'",
        subdivision: null,
      },
      {
        code: "18",
        name: "Zhytomyrs'ka Oblast'",
        subdivision: null,
      },
    ],
  },
  {
    code2: "AE",
    code3: "ARE",
    name: "United Arab Emirates",
    capital: "Abu Dhabi",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AJ",
        name: "'Ajmān",
        subdivision: null,
      },
      {
        code: "AZ",
        name: "Abū Z̧aby",
        subdivision: null,
      },
      {
        code: "FU",
        name: "Al Fujayrah",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Ash Shāriqah",
        subdivision: null,
      },
      {
        code: "DU",
        name: "Dubayy",
        subdivision: null,
      },
      {
        code: "RK",
        name: "Ra's al Khaymah",
        subdivision: null,
      },
      {
        code: "UQ",
        name: "Umm al Qaywayn",
        subdivision: null,
      },
    ],
  },
  {
    code2: "GB",
    code3: "GBR",
    name: "United Kingdom",
    capital: "London",
    region: "Europe",
    subregion: "Northern Europe",
    states: [
      {
        code: "BDG",
        name: "Barking and Dagenham",
        subdivision: "London borough",
      },
      {
        code: "BNE",
        name: "Barnet",
        subdivision: "London borough",
      },
      {
        code: "BEX",
        name: "Bexley",
        subdivision: "London borough",
      },
      {
        code: "BEN",
        name: "Brent",
        subdivision: "London borough",
      },
      {
        code: "BRY",
        name: "Bromley",
        subdivision: "London borough",
      },
      {
        code: "CMD",
        name: "Camden",
        subdivision: "London borough",
      },
      {
        code: "CRY",
        name: "Croydon",
        subdivision: "London borough",
      },
      {
        code: "EAL",
        name: "Ealing",
        subdivision: "London borough",
      },
      {
        code: "ENF",
        name: "Enfield",
        subdivision: "London borough",
      },
      {
        code: "GRE",
        name: "Greenwich",
        subdivision: "London borough",
      },
      {
        code: "HCK",
        name: "Hackney",
        subdivision: "London borough",
      },
      {
        code: "HMF",
        name: "Hammersmith and Fulham",
        subdivision: "London borough",
      },
      {
        code: "HRY",
        name: "Haringey",
        subdivision: "London borough",
      },
      {
        code: "HRW",
        name: "Harrow",
        subdivision: "London borough",
      },
      {
        code: "HAV",
        name: "Havering",
        subdivision: "London borough",
      },
      {
        code: "HIL",
        name: "Hillingdon",
        subdivision: "London borough",
      },
      {
        code: "HNS",
        name: "Hounslow",
        subdivision: "London borough",
      },
      {
        code: "ISL",
        name: "Islington",
        subdivision: "London borough",
      },
      {
        code: "KEC",
        name: "Kensington and Chelsea",
        subdivision: "London borough",
      },
      {
        code: "KTT",
        name: "Kingston upon Thames",
        subdivision: "London borough",
      },
      {
        code: "LBH",
        name: "Lambeth",
        subdivision: "London borough",
      },
      {
        code: "LEW",
        name: "Lewisham",
        subdivision: "London borough",
      },
      {
        code: "MRT",
        name: "Merton",
        subdivision: "London borough",
      },
      {
        code: "NWM",
        name: "Newham",
        subdivision: "London borough",
      },
      {
        code: "RDB",
        name: "Redbridge",
        subdivision: "London borough",
      },
      {
        code: "RIC",
        name: "Richmond upon Thames",
        subdivision: "London borough",
      },
      {
        code: "SWK",
        name: "Southwark",
        subdivision: "London borough",
      },
      {
        code: "STN",
        name: "Sutton",
        subdivision: "London borough",
      },
      {
        code: "TWH",
        name: "Tower Hamlets",
        subdivision: "London borough",
      },
      {
        code: "WFT",
        name: "Waltham Forest",
        subdivision: "London borough",
      },
      {
        code: "WND",
        name: "Wandsworth",
        subdivision: "London borough",
      },
      {
        code: "WSM",
        name: "Westminster",
        subdivision: "London borough",
      },
      {
        code: "EAW",
        name: "England and Wales",
        subdivision: "Nation",
      },
      {
        code: "GBN",
        name: "Great Britain",
        subdivision: "Nation",
      },
      {
        code: "UKM",
        name: "United Kingdom",
        subdivision: "Nation",
      },
      {
        code: "LND",
        name: "London, City of",
        subdivision: "city corporation",
      },
      {
        code: "ABE",
        name: "Aberdeen City",
        subdivision: "council area",
      },
      {
        code: "ABD",
        name: "Aberdeenshire",
        subdivision: "council area",
      },
      {
        code: "ANS",
        name: "Angus",
        subdivision: "council area",
      },
      {
        code: "AGB",
        name: "Argyll and Bute",
        subdivision: "council area",
      },
      {
        code: "CLK",
        name: "Clackmannanshire",
        subdivision: "council area",
      },
      {
        code: "DGY",
        name: "Dumfries and Galloway",
        subdivision: "council area",
      },
      {
        code: "DND",
        name: "Dundee City",
        subdivision: "council area",
      },
      {
        code: "EAY",
        name: "East Ayrshire",
        subdivision: "council area",
      },
      {
        code: "EDU",
        name: "East Dunbartonshire",
        subdivision: "council area",
      },
      {
        code: "ELN",
        name: "East Lothian",
        subdivision: "council area",
      },
      {
        code: "ERW",
        name: "East Renfrewshire",
        subdivision: "council area",
      },
      {
        code: "EDH",
        name: "Edinburgh, City of",
        subdivision: "council area",
      },
      {
        code: "ELS",
        name: "Eilean Siar",
        subdivision: "council area",
      },
      {
        code: "FAL",
        name: "Falkirk",
        subdivision: "council area",
      },
      {
        code: "FIF",
        name: "Fife",
        subdivision: "council area",
      },
      {
        code: "GLG",
        name: "Glasgow City",
        subdivision: "council area",
      },
      {
        code: "HLD",
        name: "Highland",
        subdivision: "council area",
      },
      {
        code: "IVC",
        name: "Inverclyde",
        subdivision: "council area",
      },
      {
        code: "MLN",
        name: "Midlothian",
        subdivision: "council area",
      },
      {
        code: "MRY",
        name: "Moray",
        subdivision: "council area",
      },
      {
        code: "NAY",
        name: "North Ayrshire",
        subdivision: "council area",
      },
      {
        code: "NLK",
        name: "North Lanarkshire",
        subdivision: "council area",
      },
      {
        code: "ORK",
        name: "Orkney Islands",
        subdivision: "council area",
      },
      {
        code: "PKN",
        name: "Perth and Kinross",
        subdivision: "council area",
      },
      {
        code: "RFW",
        name: "Renfrewshire",
        subdivision: "council area",
      },
      {
        code: "SCB",
        name: "Scottish Borders, The",
        subdivision: "council area",
      },
      {
        code: "ZET",
        name: "Shetland Islands",
        subdivision: "council area",
      },
      {
        code: "SAY",
        name: "South Ayrshire",
        subdivision: "council area",
      },
      {
        code: "SLK",
        name: "South Lanarkshire",
        subdivision: "council area",
      },
      {
        code: "STG",
        name: "Stirling",
        subdivision: "council area",
      },
      {
        code: "WDU",
        name: "West Dunbartonshire",
        subdivision: "council area",
      },
      {
        code: "WLN",
        name: "West Lothian",
        subdivision: "council area",
      },
      {
        code: "ENG",
        name: "England",
        subdivision: "country",
      },
      {
        code: "SCT",
        name: "Scotland",
        subdivision: "country",
      },
      {
        code: "WLS",
        name: "Wales",
        subdivision: "country",
      },
      {
        code: "ANT",
        name: "Antrim",
        subdivision: "district council area",
      },
      {
        code: "ARD",
        name: "Ards",
        subdivision: "district council area",
      },
      {
        code: "ARM",
        name: "Armagh",
        subdivision: "district council area",
      },
      {
        code: "BLA",
        name: "Ballymena",
        subdivision: "district council area",
      },
      {
        code: "BLY",
        name: "Ballymoney",
        subdivision: "district council area",
      },
      {
        code: "BNB",
        name: "Banbridge",
        subdivision: "district council area",
      },
      {
        code: "BFS",
        name: "Belfast",
        subdivision: "district council area",
      },
      {
        code: "CKF",
        name: "Carrickfergus",
        subdivision: "district council area",
      },
      {
        code: "CSR",
        name: "Castlereagh",
        subdivision: "district council area",
      },
      {
        code: "CLR",
        name: "Coleraine",
        subdivision: "district council area",
      },
      {
        code: "CKT",
        name: "Cookstown",
        subdivision: "district council area",
      },
      {
        code: "CGV",
        name: "Craigavon",
        subdivision: "district council area",
      },
      {
        code: "DRY",
        name: "Derry",
        subdivision: "district council area",
      },
      {
        code: "DOW",
        name: "Down",
        subdivision: "district council area",
      },
      {
        code: "DGN",
        name: "Dungannon and South Tyrone",
        subdivision: "district council area",
      },
      {
        code: "FER",
        name: "Fermanagh",
        subdivision: "district council area",
      },
      {
        code: "LRN",
        name: "Larne",
        subdivision: "district council area",
      },
      {
        code: "LMV",
        name: "Limavady",
        subdivision: "district council area",
      },
      {
        code: "LSB",
        name: "Lisburn",
        subdivision: "district council area",
      },
      {
        code: "MFT",
        name: "Magherafelt",
        subdivision: "district council area",
      },
      {
        code: "MYL",
        name: "Moyle",
        subdivision: "district council area",
      },
      {
        code: "NYM",
        name: "Newry and Mourne District",
        subdivision: "district council area",
      },
      {
        code: "NTA",
        name: "Newtownabbey",
        subdivision: "district council area",
      },
      {
        code: "NDN",
        name: "North Down",
        subdivision: "district council area",
      },
      {
        code: "OMH",
        name: "Omagh",
        subdivision: "district council area",
      },
      {
        code: "STB",
        name: "Strabane",
        subdivision: "district council area",
      },
      {
        code: "BNS",
        name: "Barnsley",
        subdivision: "metropolitan district",
      },
      {
        code: "BIR",
        name: "Birmingham",
        subdivision: "metropolitan district",
      },
      {
        code: "BOL",
        name: "Bolton",
        subdivision: "metropolitan district",
      },
      {
        code: "BRD",
        name: "Bradford",
        subdivision: "metropolitan district",
      },
      {
        code: "BUR",
        name: "Bury",
        subdivision: "metropolitan district",
      },
      {
        code: "CLD",
        name: "Calderdale",
        subdivision: "metropolitan district",
      },
      {
        code: "COV",
        name: "Coventry",
        subdivision: "metropolitan district",
      },
      {
        code: "DNC",
        name: "Doncaster",
        subdivision: "metropolitan district",
      },
      {
        code: "DUD",
        name: "Dudley",
        subdivision: "metropolitan district",
      },
      {
        code: "GAT",
        name: "Gateshead",
        subdivision: "metropolitan district",
      },
      {
        code: "KIR",
        name: "Kirklees",
        subdivision: "metropolitan district",
      },
      {
        code: "KWL",
        name: "Knowsley",
        subdivision: "metropolitan district",
      },
      {
        code: "LDS",
        name: "Leeds",
        subdivision: "metropolitan district",
      },
      {
        code: "LIV",
        name: "Liverpool",
        subdivision: "metropolitan district",
      },
      {
        code: "MAN",
        name: "Manchester",
        subdivision: "metropolitan district",
      },
      {
        code: "NET",
        name: "Newcastle upon Tyne",
        subdivision: "metropolitan district",
      },
      {
        code: "NTY",
        name: "North Tyneside",
        subdivision: "metropolitan district",
      },
      {
        code: "OLD",
        name: "Oldham",
        subdivision: "metropolitan district",
      },
      {
        code: "RCH",
        name: "Rochdale",
        subdivision: "metropolitan district",
      },
      {
        code: "ROT",
        name: "Rotherham",
        subdivision: "metropolitan district",
      },
      {
        code: "SLF",
        name: "Salford",
        subdivision: "metropolitan district",
      },
      {
        code: "SAW",
        name: "Sandwell",
        subdivision: "metropolitan district",
      },
      {
        code: "SFT",
        name: "Sefton",
        subdivision: "metropolitan district",
      },
      {
        code: "SHF",
        name: "Sheffield",
        subdivision: "metropolitan district",
      },
      {
        code: "SOL",
        name: "Solihull",
        subdivision: "metropolitan district",
      },
      {
        code: "STY",
        name: "South Tyneside",
        subdivision: "metropolitan district",
      },
      {
        code: "SHN",
        name: "St. Helens",
        subdivision: "metropolitan district",
      },
      {
        code: "SKP",
        name: "Stockport",
        subdivision: "metropolitan district",
      },
      {
        code: "SND",
        name: "Sunderland",
        subdivision: "metropolitan district",
      },
      {
        code: "TAM",
        name: "Tameside",
        subdivision: "metropolitan district",
      },
      {
        code: "TRF",
        name: "Trafford",
        subdivision: "metropolitan district",
      },
      {
        code: "WKF",
        name: "Wakefield",
        subdivision: "metropolitan district",
      },
      {
        code: "WLL",
        name: "Walsall",
        subdivision: "metropolitan district",
      },
      {
        code: "WGN",
        name: "Wigan",
        subdivision: "metropolitan district",
      },
      {
        code: "WRL",
        name: "Wirral",
        subdivision: "metropolitan district",
      },
      {
        code: "WLV",
        name: "Wolverhampton",
        subdivision: "metropolitan district",
      },
      {
        code: "NIR",
        name: "Northern Ireland",
        subdivision: "province",
      },
      {
        code: "BKM",
        name: "Buckinghamshire",
        subdivision: "two-tier county",
      },
      {
        code: "CAM",
        name: "Cambridgeshire",
        subdivision: "two-tier county",
      },
      {
        code: "CMA",
        name: "Cumbria",
        subdivision: "two-tier county",
      },
      {
        code: "DBY",
        name: "Derbyshire",
        subdivision: "two-tier county",
      },
      {
        code: "DEV",
        name: "Devon",
        subdivision: "two-tier county",
      },
      {
        code: "DOR",
        name: "Dorset",
        subdivision: "two-tier county",
      },
      {
        code: "ESX",
        name: "East Sussex",
        subdivision: "two-tier county",
      },
      {
        code: "ESS",
        name: "Essex",
        subdivision: "two-tier county",
      },
      {
        code: "GLS",
        name: "Gloucestershire",
        subdivision: "two-tier county",
      },
      {
        code: "HAM",
        name: "Hampshire",
        subdivision: "two-tier county",
      },
      {
        code: "HRT",
        name: "Hertfordshire",
        subdivision: "two-tier county",
      },
      {
        code: "KEN",
        name: "Kent",
        subdivision: "two-tier county",
      },
      {
        code: "LAN",
        name: "Lancashire",
        subdivision: "two-tier county",
      },
      {
        code: "LEC",
        name: "Leicestershire",
        subdivision: "two-tier county",
      },
      {
        code: "LIN",
        name: "Lincolnshire",
        subdivision: "two-tier county",
      },
      {
        code: "NFK",
        name: "Norfolk",
        subdivision: "two-tier county",
      },
      {
        code: "NYK",
        name: "North Yorkshire",
        subdivision: "two-tier county",
      },
      {
        code: "NTH",
        name: "Northamptonshire",
        subdivision: "two-tier county",
      },
      {
        code: "NTT",
        name: "Nottinghamshire",
        subdivision: "two-tier county",
      },
      {
        code: "OXF",
        name: "Oxfordshire",
        subdivision: "two-tier county",
      },
      {
        code: "SOM",
        name: "Somerset",
        subdivision: "two-tier county",
      },
      {
        code: "STS",
        name: "Staffordshire",
        subdivision: "two-tier county",
      },
      {
        code: "SFK",
        name: "Suffolk",
        subdivision: "two-tier county",
      },
      {
        code: "SRY",
        name: "Surrey",
        subdivision: "two-tier county",
      },
      {
        code: "WAR",
        name: "Warwickshire",
        subdivision: "two-tier county",
      },
      {
        code: "WSX",
        name: "West Sussex",
        subdivision: "two-tier county",
      },
      {
        code: "WOR",
        name: "Worcestershire",
        subdivision: "two-tier county",
      },
      {
        code: "BAS",
        name: "Bath and North East Somerset",
        subdivision: "unitary authority",
      },
      {
        code: "BDF",
        name: "Bedford",
        subdivision: "unitary authority",
      },
      {
        code: "BBD",
        name: "Blackburn with Darwen",
        subdivision: "unitary authority",
      },
      {
        code: "BPL",
        name: "Blackpool",
        subdivision: "unitary authority",
      },
      {
        code: "BGW",
        name: "Blaenau Gwent",
        subdivision: "unitary authority",
      },
      {
        code: "BMH",
        name: "Bournemouth",
        subdivision: "unitary authority",
      },
      {
        code: "BRC",
        name: "Bracknell Forest",
        subdivision: "unitary authority",
      },
      {
        code: "BGE",
        name: "Bridgend",
        subdivision: "unitary authority",
      },
      {
        code: "BNH",
        name: "Brighton and Hove",
        subdivision: "unitary authority",
      },
      {
        code: "BST",
        name: "Bristol, City of",
        subdivision: "unitary authority",
      },
      {
        code: "CAY",
        name: "Caerphilly",
        subdivision: "unitary authority",
      },
      {
        code: "CRF",
        name: "Cardiff",
        subdivision: "unitary authority",
      },
      {
        code: "CMN",
        name: "Carmarthenshire",
        subdivision: "unitary authority",
      },
      {
        code: "CBF",
        name: "Central Bedfordshire",
        subdivision: "unitary authority",
      },
      {
        code: "CGN",
        name: "Ceredigion",
        subdivision: "unitary authority",
      },
      {
        code: "CHE",
        name: "Cheshire East",
        subdivision: "unitary authority",
      },
      {
        code: "CHW",
        name: "Cheshire West and Chester",
        subdivision: "unitary authority",
      },
      {
        code: "CWY",
        name: "Conwy",
        subdivision: "unitary authority",
      },
      {
        code: "CON",
        name: "Cornwall",
        subdivision: "unitary authority",
      },
      {
        code: "DAL",
        name: "Darlington",
        subdivision: "unitary authority",
      },
      {
        code: "DEN",
        name: "Denbighshire",
        subdivision: "unitary authority",
      },
      {
        code: "DER",
        name: "Derby",
        subdivision: "unitary authority",
      },
      {
        code: "DUR",
        name: "Durham, County",
        subdivision: "unitary authority",
      },
      {
        code: "ERY",
        name: "East Riding of Yorkshire",
        subdivision: "unitary authority",
      },
      {
        code: "FLN",
        name: "Flintshire",
        subdivision: "unitary authority",
      },
      {
        code: "GWN",
        name: "Gwynedd",
        subdivision: "unitary authority",
      },
      {
        code: "HAL",
        name: "Halton",
        subdivision: "unitary authority",
      },
      {
        code: "HPL",
        name: "Hartlepool",
        subdivision: "unitary authority",
      },
      {
        code: "HEF",
        name: "Herefordshire",
        subdivision: "unitary authority",
      },
      {
        code: "AGY",
        name: "Isle of Anglesey",
        subdivision: "unitary authority",
      },
      {
        code: "IOW",
        name: "Isle of Wight",
        subdivision: "unitary authority",
      },
      {
        code: "IOS",
        name: "Isles of Scilly",
        subdivision: "unitary authority",
      },
      {
        code: "KHL",
        name: "Kingston upon Hull",
        subdivision: "unitary authority",
      },
      {
        code: "LCE",
        name: "Leicester",
        subdivision: "unitary authority",
      },
      {
        code: "LUT",
        name: "Luton",
        subdivision: "unitary authority",
      },
      {
        code: "MDW",
        name: "Medway",
        subdivision: "unitary authority",
      },
      {
        code: "MTY",
        name: "Merthyr Tydfil",
        subdivision: "unitary authority",
      },
      {
        code: "MDB",
        name: "Middlesbrough",
        subdivision: "unitary authority",
      },
      {
        code: "MIK",
        name: "Milton Keynes",
        subdivision: "unitary authority",
      },
      {
        code: "MON",
        name: "Monmouthshire",
        subdivision: "unitary authority",
      },
      {
        code: "NTL",
        name: "Neath Port Talbot",
        subdivision: "unitary authority",
      },
      {
        code: "NWP",
        name: "Newport",
        subdivision: "unitary authority",
      },
      {
        code: "NEL",
        name: "North East Lincolnshire",
        subdivision: "unitary authority",
      },
      {
        code: "NLN",
        name: "North Lincolnshire",
        subdivision: "unitary authority",
      },
      {
        code: "NSM",
        name: "North Somerset",
        subdivision: "unitary authority",
      },
      {
        code: "NBL",
        name: "Northumberland",
        subdivision: "unitary authority",
      },
      {
        code: "NGM",
        name: "Nottingham",
        subdivision: "unitary authority",
      },
      {
        code: "PEM",
        name: "Pembrokeshire",
        subdivision: "unitary authority",
      },
      {
        code: "PTE",
        name: "Peterborough",
        subdivision: "unitary authority",
      },
      {
        code: "PLY",
        name: "Plymouth",
        subdivision: "unitary authority",
      },
      {
        code: "POL",
        name: "Poole",
        subdivision: "unitary authority",
      },
      {
        code: "POR",
        name: "Portsmouth",
        subdivision: "unitary authority",
      },
      {
        code: "POW",
        name: "Powys",
        subdivision: "unitary authority",
      },
      {
        code: "RDG",
        name: "Reading",
        subdivision: "unitary authority",
      },
      {
        code: "RCC",
        name: "Redcar and Cleveland",
        subdivision: "unitary authority",
      },
      {
        code: "RCT",
        name: "Rhondda, Cynon, Taff",
        subdivision: "unitary authority",
      },
      {
        code: "RUT",
        name: "Rutland",
        subdivision: "unitary authority",
      },
      {
        code: "SHR",
        name: "Shropshire",
        subdivision: "unitary authority",
      },
      {
        code: "SLG",
        name: "Slough",
        subdivision: "unitary authority",
      },
      {
        code: "SGC",
        name: "South Gloucestershire",
        subdivision: "unitary authority",
      },
      {
        code: "STH",
        name: "Southampton",
        subdivision: "unitary authority",
      },
      {
        code: "SOS",
        name: "Southend-on-Sea",
        subdivision: "unitary authority",
      },
      {
        code: "STT",
        name: "Stockton-on-Tees",
        subdivision: "unitary authority",
      },
      {
        code: "STE",
        name: "Stoke-on-Trent",
        subdivision: "unitary authority",
      },
      {
        code: "SWA",
        name: "Swansea",
        subdivision: "unitary authority",
      },
      {
        code: "SWD",
        name: "Swindon",
        subdivision: "unitary authority",
      },
      {
        code: "TFW",
        name: "Telford and Wrekin",
        subdivision: "unitary authority",
      },
      {
        code: "THR",
        name: "Thurrock",
        subdivision: "unitary authority",
      },
      {
        code: "TOB",
        name: "Torbay",
        subdivision: "unitary authority",
      },
      {
        code: "TOF",
        name: "Torfaen",
        subdivision: "unitary authority",
      },
      {
        code: "VGL",
        name: "Vale of Glamorgan, The",
        subdivision: "unitary authority",
      },
      {
        code: "WRT",
        name: "Warrington",
        subdivision: "unitary authority",
      },
      {
        code: "WBK",
        name: "West Berkshire",
        subdivision: "unitary authority",
      },
      {
        code: "WIL",
        name: "Wiltshire",
        subdivision: "unitary authority",
      },
      {
        code: "WNM",
        name: "Windsor and Maidenhead",
        subdivision: "unitary authority",
      },
      {
        code: "WOK",
        name: "Wokingham",
        subdivision: "unitary authority",
      },
      {
        code: "WRX",
        name: "Wrexham",
        subdivision: "unitary authority",
      },
      {
        code: "YOR",
        name: "York",
        subdivision: "unitary authority",
      },
    ],
  },
  {
    code2: "US",
    code3: "USA",
    name: "United States",
    capital: "Washington, D.C.",
    region: "Americas",
    subregion: "Northern America",
    states: [
      {
        code: "DC",
        name: "District of Columbia",
        subdivision: "district",
      },
      {
        code: "AS",
        name: "American Samoa",
        subdivision: "outlying territory",
      },
      {
        code: "GU",
        name: "Guam",
        subdivision: "outlying territory",
      },
      {
        code: "MP",
        name: "Northern Mariana Islands",
        subdivision: "outlying territory",
      },
      {
        code: "PR",
        name: "Puerto Rico",
        subdivision: "outlying territory",
      },
      {
        code: "UM",
        name: "United States Minor Outlying Islands",
        subdivision: "outlying territory",
      },
      {
        code: "VI",
        name: "Virgin Islands, U.S.",
        subdivision: "outlying territory",
      },
      {
        code: "AL",
        name: "Alabama",
        subdivision: "state",
      },
      {
        code: "AK",
        name: "Alaska",
        subdivision: "state",
      },
      {
        code: "AZ",
        name: "Arizona",
        subdivision: "state",
      },
      {
        code: "AR",
        name: "Arkansas",
        subdivision: "state",
      },
      {
        code: "CA",
        name: "California",
        subdivision: "state",
      },
      {
        code: "CO",
        name: "Colorado",
        subdivision: "state",
      },
      {
        code: "CT",
        name: "Connecticut",
        subdivision: "state",
      },
      {
        code: "DE",
        name: "Delaware",
        subdivision: "state",
      },
      {
        code: "FL",
        name: "Florida",
        subdivision: "state",
      },
      {
        code: "GA",
        name: "Georgia",
        subdivision: "state",
      },
      {
        code: "HI",
        name: "Hawaii",
        subdivision: "state",
      },
      {
        code: "ID",
        name: "Idaho",
        subdivision: "state",
      },
      {
        code: "IL",
        name: "Illinois",
        subdivision: "state",
      },
      {
        code: "IN",
        name: "Indiana",
        subdivision: "state",
      },
      {
        code: "IA",
        name: "Iowa",
        subdivision: "state",
      },
      {
        code: "KS",
        name: "Kansas",
        subdivision: "state",
      },
      {
        code: "KY",
        name: "Kentucky",
        subdivision: "state",
      },
      {
        code: "LA",
        name: "Louisiana",
        subdivision: "state",
      },
      {
        code: "ME",
        name: "Maine",
        subdivision: "state",
      },
      {
        code: "MD",
        name: "Maryland",
        subdivision: "state",
      },
      {
        code: "MA",
        name: "Massachusetts",
        subdivision: "state",
      },
      {
        code: "MI",
        name: "Michigan",
        subdivision: "state",
      },
      {
        code: "MN",
        name: "Minnesota",
        subdivision: "state",
      },
      {
        code: "MS",
        name: "Mississippi",
        subdivision: "state",
      },
      {
        code: "MO",
        name: "Missouri",
        subdivision: "state",
      },
      {
        code: "MT",
        name: "Montana",
        subdivision: "state",
      },
      {
        code: "NE",
        name: "Nebraska",
        subdivision: "state",
      },
      {
        code: "NV",
        name: "Nevada",
        subdivision: "state",
      },
      {
        code: "NH",
        name: "New Hampshire",
        subdivision: "state",
      },
      {
        code: "NJ",
        name: "New Jersey",
        subdivision: "state",
      },
      {
        code: "NM",
        name: "New Mexico",
        subdivision: "state",
      },
      {
        code: "NY",
        name: "New York",
        subdivision: "state",
      },
      {
        code: "NC",
        name: "North Carolina",
        subdivision: "state",
      },
      {
        code: "ND",
        name: "North Dakota",
        subdivision: "state",
      },
      {
        code: "OH",
        name: "Ohio",
        subdivision: "state",
      },
      {
        code: "OK",
        name: "Oklahoma",
        subdivision: "state",
      },
      {
        code: "OR",
        name: "Oregon",
        subdivision: "state",
      },
      {
        code: "PA",
        name: "Pennsylvania",
        subdivision: "state",
      },
      {
        code: "RI",
        name: "Rhode Island",
        subdivision: "state",
      },
      {
        code: "SC",
        name: "South Carolina",
        subdivision: "state",
      },
      {
        code: "SD",
        name: "South Dakota",
        subdivision: "state",
      },
      {
        code: "TN",
        name: "Tennessee",
        subdivision: "state",
      },
      {
        code: "TX",
        name: "Texas",
        subdivision: "state",
      },
      {
        code: "UT",
        name: "Utah",
        subdivision: "state",
      },
      {
        code: "VT",
        name: "Vermont",
        subdivision: "state",
      },
      {
        code: "VA",
        name: "Virginia",
        subdivision: "state",
      },
      {
        code: "WA",
        name: "Washington",
        subdivision: "state",
      },
      {
        code: "WV",
        name: "West Virginia",
        subdivision: "state",
      },
      {
        code: "WI",
        name: "Wisconsin",
        subdivision: "state",
      },
      {
        code: "WY",
        name: "Wyoming",
        subdivision: "state",
      },
    ],
  },
  {
    code2: "UY",
    code3: "URY",
    name: "Uruguay",
    capital: "Montevideo",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "AR",
        name: "Artigas",
        subdivision: null,
      },
      {
        code: "CA",
        name: "Canelones",
        subdivision: null,
      },
      {
        code: "CL",
        name: "Cerro Largo",
        subdivision: null,
      },
      {
        code: "CO",
        name: "Colonia",
        subdivision: null,
      },
      {
        code: "DU",
        name: "Durazno",
        subdivision: null,
      },
      {
        code: "FS",
        name: "Flores",
        subdivision: null,
      },
      {
        code: "FD",
        name: "Florida",
        subdivision: null,
      },
      {
        code: "LA",
        name: "Lavalleja",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Maldonado",
        subdivision: null,
      },
      {
        code: "MO",
        name: "Montevideo",
        subdivision: null,
      },
      {
        code: "PA",
        name: "Paysandú",
        subdivision: null,
      },
      {
        code: "RV",
        name: "Rivera",
        subdivision: null,
      },
      {
        code: "RO",
        name: "Rocha",
        subdivision: null,
      },
      {
        code: "RN",
        name: "Río Negro",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Salto",
        subdivision: null,
      },
      {
        code: "SJ",
        name: "San José",
        subdivision: null,
      },
      {
        code: "SO",
        name: "Soriano",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tacuarembó",
        subdivision: null,
      },
      {
        code: "TT",
        name: "Treinta y Tres",
        subdivision: null,
      },
    ],
  },
  {
    code2: "UZ",
    code3: "UZB",
    name: "Uzbekistan",
    capital: "Tashkent",
    region: "Asia",
    subregion: "Central Asia",
    states: [
      {
        code: "AN",
        name: "Andijon",
        subdivision: null,
      },
      {
        code: "BU",
        name: "Buxoro",
        subdivision: null,
      },
      {
        code: "FA",
        name: "Farg‘ona",
        subdivision: null,
      },
      {
        code: "JI",
        name: "Jizzax",
        subdivision: null,
      },
      {
        code: "NG",
        name: "Namangan",
        subdivision: null,
      },
      {
        code: "NW",
        name: "Navoiy",
        subdivision: null,
      },
      {
        code: "QA",
        name: "Qashqadaryo",
        subdivision: null,
      },
      {
        code: "QR",
        name: "Qoraqalpog‘iston Respublikasi",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Samarqand",
        subdivision: null,
      },
      {
        code: "SI",
        name: "Sirdaryo",
        subdivision: null,
      },
      {
        code: "SU",
        name: "Surxondaryo",
        subdivision: null,
      },
      {
        code: "TO",
        name: "Toshkent",
        subdivision: null,
      },
      {
        code: "TK",
        name: "Toshkent",
        subdivision: null,
      },
      {
        code: "XO",
        name: "Xorazm",
        subdivision: null,
      },
    ],
  },
  {
    code2: "VU",
    code3: "VUT",
    name: "Vanuatu",
    capital: "Port Vila",
    region: "Oceania",
    subregion: "Melanesia",
    states: [
      {
        code: "MAP",
        name: "Malampa",
        subdivision: null,
      },
      {
        code: "PAM",
        name: "Pénama",
        subdivision: null,
      },
      {
        code: "SAM",
        name: "Sanma",
        subdivision: null,
      },
      {
        code: "SEE",
        name: "Shéfa",
        subdivision: null,
      },
      {
        code: "TAE",
        name: "Taféa",
        subdivision: null,
      },
      {
        code: "TOB",
        name: "Torba",
        subdivision: null,
      },
    ],
  },
  {
    code2: "VE",
    code3: "VEN",
    name: "Venezuela",
    capital: "Caracas",
    region: "Americas",
    subregion: "South America",
    states: [
      {
        code: "Z",
        name: "Amazonas",
        subdivision: null,
      },
      {
        code: "B",
        name: "Anzoátegui",
        subdivision: null,
      },
      {
        code: "C",
        name: "Apure",
        subdivision: null,
      },
      {
        code: "D",
        name: "Aragua",
        subdivision: null,
      },
      {
        code: "E",
        name: "Barinas",
        subdivision: null,
      },
      {
        code: "F",
        name: "Bolívar",
        subdivision: null,
      },
      {
        code: "G",
        name: "Carabobo",
        subdivision: null,
      },
      {
        code: "H",
        name: "Cojedes",
        subdivision: null,
      },
      {
        code: "Y",
        name: "Delta Amacuro",
        subdivision: null,
      },
      {
        code: "W",
        name: "Dependencias Federales",
        subdivision: null,
      },
      {
        code: "A",
        name: "Distrito Capital",
        subdivision: null,
      },
      {
        code: "I",
        name: "Falcón",
        subdivision: null,
      },
      {
        code: "J",
        name: "Guárico",
        subdivision: null,
      },
      {
        code: "K",
        name: "Lara",
        subdivision: null,
      },
      {
        code: "M",
        name: "Miranda",
        subdivision: null,
      },
      {
        code: "N",
        name: "Monagas",
        subdivision: null,
      },
      {
        code: "L",
        name: "Mérida",
        subdivision: null,
      },
      {
        code: "O",
        name: "Nueva Esparta",
        subdivision: null,
      },
      {
        code: "P",
        name: "Portuguesa",
        subdivision: null,
      },
      {
        code: "R",
        name: "Sucre",
        subdivision: null,
      },
      {
        code: "T",
        name: "Trujillo",
        subdivision: null,
      },
      {
        code: "S",
        name: "Táchira",
        subdivision: null,
      },
      {
        code: "X",
        name: "Vargas",
        subdivision: null,
      },
      {
        code: "U",
        name: "Yaracuy",
        subdivision: null,
      },
      {
        code: "V",
        name: "Zulia",
        subdivision: null,
      },
    ],
  },
  {
    code2: "VN",
    code3: "VNM",
    name: "Vietnam",
    capital: "Hanoi",
    region: "Asia",
    subregion: "South-Eastern Asia",
    states: [
      {
        code: "44",
        name: "An Giang",
        subdivision: null,
      },
      {
        code: "43",
        name: "Bà Rịa–Vũng Tàu",
        subdivision: null,
      },
      {
        code: "57",
        name: "Bình Dương",
        subdivision: null,
      },
      {
        code: "58",
        name: "Bình Phước",
        subdivision: null,
      },
      {
        code: "40",
        name: "Bình Thuận",
        subdivision: null,
      },
      {
        code: "31",
        name: "Bình Định",
        subdivision: null,
      },
      {
        code: "55",
        name: "Bạc Liêu",
        subdivision: null,
      },
      {
        code: "54",
        name: "Bắc Giang",
        subdivision: null,
      },
      {
        code: "53",
        name: "Bắc Kạn",
        subdivision: null,
      },
      {
        code: "56",
        name: "Bắc Ninh",
        subdivision: null,
      },
      {
        code: "50",
        name: "Bến Tre",
        subdivision: null,
      },
      {
        code: "04",
        name: "Cao Bằng",
        subdivision: null,
      },
      {
        code: "59",
        name: "Cà Mau",
        subdivision: null,
      },
      {
        code: "CT",
        name: "Cần Thơ",
        subdivision: null,
      },
      {
        code: "30",
        name: "Gia Lai",
        subdivision: null,
      },
      {
        code: "03",
        name: "Hà Giang",
        subdivision: null,
      },
      {
        code: "63",
        name: "Hà Nam",
        subdivision: null,
      },
      {
        code: "HN",
        name: "Hà Nội",
        subdivision: null,
      },
      {
        code: "15",
        name: "Hà Tây",
        subdivision: null,
      },
      {
        code: "23",
        name: "Hà Tĩnh",
        subdivision: null,
      },
      {
        code: "14",
        name: "Hòa Bình",
        subdivision: null,
      },
      {
        code: "66",
        name: "Hưng Yên",
        subdivision: null,
      },
      {
        code: "61",
        name: "Hải Dương",
        subdivision: null,
      },
      {
        code: "HP",
        name: "Hải Phòng",
        subdivision: null,
      },
      {
        code: "73",
        name: "Hậu Giang",
        subdivision: null,
      },
      {
        code: "SG",
        name: "Hồ Chí Minh",
        subdivision: null,
      },
      {
        code: "34",
        name: "Khánh Hòa",
        subdivision: null,
      },
      {
        code: "47",
        name: "Kiên Giang",
        subdivision: null,
      },
      {
        code: "28",
        name: "Kon Tum",
        subdivision: null,
      },
      {
        code: "01",
        name: "Lai Châu",
        subdivision: null,
      },
      {
        code: "41",
        name: "Long An",
        subdivision: null,
      },
      {
        code: "02",
        name: "Lào Cai",
        subdivision: null,
      },
      {
        code: "35",
        name: "Lâm Đồng",
        subdivision: null,
      },
      {
        code: "09",
        name: "Lạng Sơn",
        subdivision: null,
      },
      {
        code: "67",
        name: "Nam Định",
        subdivision: null,
      },
      {
        code: "22",
        name: "Nghệ An",
        subdivision: null,
      },
      {
        code: "18",
        name: "Ninh Bình",
        subdivision: null,
      },
      {
        code: "36",
        name: "Ninh Thuận",
        subdivision: null,
      },
      {
        code: "68",
        name: "Phú Thọ",
        subdivision: null,
      },
      {
        code: "32",
        name: "Phú Yên",
        subdivision: null,
      },
      {
        code: "24",
        name: "Quảng Bình",
        subdivision: null,
      },
      {
        code: "27",
        name: "Quảng Nam",
        subdivision: null,
      },
      {
        code: "29",
        name: "Quảng Ngãi",
        subdivision: null,
      },
      {
        code: "13",
        name: "Quảng Ninh",
        subdivision: null,
      },
      {
        code: "25",
        name: "Quảng Trị",
        subdivision: null,
      },
      {
        code: "52",
        name: "Sóc Trăng",
        subdivision: null,
      },
      {
        code: "05",
        name: "Sơn La",
        subdivision: null,
      },
      {
        code: "21",
        name: "Thanh Hóa",
        subdivision: null,
      },
      {
        code: "20",
        name: "Thái Bình",
        subdivision: null,
      },
      {
        code: "69",
        name: "Thái Nguyên",
        subdivision: null,
      },
      {
        code: "26",
        name: "Thừa Thiên–Huế",
        subdivision: null,
      },
      {
        code: "46",
        name: "Tiền Giang",
        subdivision: null,
      },
      {
        code: "51",
        name: "Trà Vinh",
        subdivision: null,
      },
      {
        code: "07",
        name: "Tuyên Quang",
        subdivision: null,
      },
      {
        code: "37",
        name: "Tây Ninh",
        subdivision: null,
      },
      {
        code: "49",
        name: "Vĩnh Long",
        subdivision: null,
      },
      {
        code: "70",
        name: "Vĩnh Phúc",
        subdivision: null,
      },
      {
        code: "06",
        name: "Yên Bái",
        subdivision: null,
      },
      {
        code: "71",
        name: "Điện Biên",
        subdivision: null,
      },
      {
        code: "DN",
        name: "Đà Nẵng",
        subdivision: null,
      },
      {
        code: "33",
        name: "Đắk Lắk",
        subdivision: null,
      },
      {
        code: "72",
        name: "Đắk Nông",
        subdivision: null,
      },
      {
        code: "39",
        name: "Đồng Nai",
        subdivision: null,
      },
      {
        code: "45",
        name: "Đồng Tháp",
        subdivision: null,
      },
    ],
  },
  {
    code2: "WF",
    code3: "WLF",
    name: "Wallis and Futuna",
    capital: "Mata-Utu",
    region: "Oceania",
    subregion: "Polynesia",
    states: [],
  },
  {
    code2: "EH",
    code3: "ESH",
    name: "Western Sahara",
    capital: "El Aaiún",
    region: "Africa",
    subregion: "Northern Africa",
    states: [],
  },
  {
    code2: "YE",
    code3: "YEM",
    name: "Yemen",
    capital: "Sana'a",
    region: "Asia",
    subregion: "Western Asia",
    states: [
      {
        code: "AD",
        name: "'Adan",
        subdivision: null,
      },
      {
        code: "AM",
        name: "'Amrān",
        subdivision: null,
      },
      {
        code: "AB",
        name: "Abyān",
        subdivision: null,
      },
      {
        code: "BA",
        name: "Al Bayḑā'",
        subdivision: null,
      },
      {
        code: "JA",
        name: "Al Jawf",
        subdivision: null,
      },
      {
        code: "MR",
        name: "Al Mahrah",
        subdivision: null,
      },
      {
        code: "MW",
        name: "Al Maḩwīt",
        subdivision: null,
      },
      {
        code: "HU",
        name: "Al Ḩudaydah",
        subdivision: null,
      },
      {
        code: "DA",
        name: "Aḑ Ḑāli'",
        subdivision: null,
      },
      {
        code: "DH",
        name: "Dhamār",
        subdivision: null,
      },
      {
        code: "IB",
        name: "Ibb",
        subdivision: null,
      },
      {
        code: "LA",
        name: "Laḩij",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Ma'rib",
        subdivision: null,
      },
      {
        code: "RA",
        name: "Raymah",
        subdivision: null,
      },
      {
        code: "SH",
        name: "Shabwah",
        subdivision: null,
      },
      {
        code: "TA",
        name: "Tā‘izz",
        subdivision: null,
      },
      {
        code: "SA",
        name: "Şan‘ā'",
        subdivision: null,
      },
      {
        code: "SN",
        name: "Şan‘ā'",
        subdivision: null,
      },
      {
        code: "SD",
        name: "Şā‘dah",
        subdivision: null,
      },
      {
        code: "HJ",
        name: "Ḩajjah",
        subdivision: null,
      },
      {
        code: "HD",
        name: "Ḩaḑramawt",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ZM",
    code3: "ZMB",
    name: "Zambia",
    capital: "Lusaka",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "02",
        name: "Central",
        subdivision: null,
      },
      {
        code: "08",
        name: "Copperbelt",
        subdivision: null,
      },
      {
        code: "03",
        name: "Eastern",
        subdivision: null,
      },
      {
        code: "04",
        name: "Luapula",
        subdivision: null,
      },
      {
        code: "09",
        name: "Lusaka",
        subdivision: null,
      },
      {
        code: "06",
        name: "North-Western",
        subdivision: null,
      },
      {
        code: "05",
        name: "Northern",
        subdivision: null,
      },
      {
        code: "07",
        name: "Southern",
        subdivision: null,
      },
      {
        code: "01",
        name: "Western",
        subdivision: null,
      },
    ],
  },
  {
    code2: "ZW",
    code3: "ZWE",
    name: "Zimbabwe",
    capital: "Harare",
    region: "Africa",
    subregion: "Eastern Africa",
    states: [
      {
        code: "BU",
        name: "Bulawayo",
        subdivision: null,
      },
      {
        code: "HA",
        name: "Harare",
        subdivision: null,
      },
      {
        code: "MA",
        name: "Manicaland",
        subdivision: null,
      },
      {
        code: "MC",
        name: "Mashonaland Central",
        subdivision: null,
      },
      {
        code: "ME",
        name: "Mashonaland East",
        subdivision: null,
      },
      {
        code: "MW",
        name: "Mashonaland West",
        subdivision: null,
      },
      {
        code: "MV",
        name: "Masvingo",
        subdivision: null,
      },
      {
        code: "MN",
        name: "Matabeleland North",
        subdivision: null,
      },
      {
        code: "MS",
        name: "Matabeleland South",
        subdivision: null,
      },
      {
        code: "MI",
        name: "Midlands",
        subdivision: null,
      },
    ],
  },
];
