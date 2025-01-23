"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useLogin } from "@/store/login";
import { RxCross2 } from "react-icons/rx";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Goodpopup from "@/components/goodPopup/goodPopup";
import ErrorPopup from "@/components/errorPopup/errorPopup";
import publicEmailDomains from "@/components/emailData";
import { tags } from "@/store/course";
import Confetti from "@/components/confetti/confetti";

const Page = () => {
  const router = useRouter(); // Initialize useRouter
  const [trainer, setTrainer] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [blogger, setBlogger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenP, setIsOpenp] = useState(false);
  const [showPasscode, setShowpasscode] = useState(false);
  const [confet, setConfet] = useState(false);
  // const [msg, setMsg] = useState("");
  // const handleClose = () => {
  //   setIsOpenp(false);
  // };
  const { tagline, setTagline } = tags((state) => ({
    tagline: state.tagline,
    setTagline: state.setTagline,
  }));
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState("1");
  const [forgetpasswordPopup, setforgetpasswordPopup] = useState(false);
  const {
    identity,
    login,
    setAllowProfile,
    login_Credential,
    user_ID,
    set_User_info,
    rename,
  } = useLogin((state) => ({
    identity: state.identity,
    login: state.login,
    login_Credential: state.login_Credential,
    user_ID: state.user_ID,
    set_User_info: state.set_User_info,
    rename: state.rename,
    setAllowProfile: state.setAllowProfile,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    setIsOpenp(false);
  };
  const [role, setrole] = useState();
  const [placeholder, setplaceholder] = useState("Email");
  const [isLogin, setIsLogin] = useState(false);
  const [fullname, setfullname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [trainerof, setTrainerOf] = useState("");
  const [organizationname, setOrganizationname] = useState("");
  const [auth, setAuth] = useState("");
  const [otp, setOTP] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [forgetpasswordpopupbutton, setforgetPasswordPopupButton] =
    useState("Send OTP");

  useEffect(() => {
    console.log("login status updated:", login);
    if (identity === "candidate") {
      setCandidate(true);
      setplaceholder("Email");
      if (blogger) setBlogger(false);
    }

    if (identity === "blogger") {
      setBlogger(true);
      setplaceholder("Email");
      if (recruiter) setRecruiter(false);
      if (candidate) setCandidate(false);
      if (trainer) setTrainer(false);
    }

    if (identity === "trainer") {
      setTrainer(true);
      setplaceholder("Email");
      if (recruiter) setRecruiter(false);
      if (candidate) setCandidate(false);
      if (blogger) setBlogger(false);
    }
    console.log(identity);

    if (identity === "recruiter") {
      setRecruiter(true);
      setplaceholder("Organization Email");
      if (trainer) setTrainer(false);
      if (candidate) setCandidate(false);
      if (blogger) setBlogger(false);
    }
  }, [identity, login]);

  const change = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    console.log(role);
    setSpinner(true);
    try {
      if (role === undefined) {
        setIsLoading(false);
        alert("please select a role");
        return;
      } else {
        console.log(otp, auth, isLogin);

        if (otp == auth && !isLogin) {
          console.log("running if opt else");
          let user;
          if (blogger) {
            user = { fullname, email, password, identity };
          } else if (trainerof) {
            user = {
              firstname,
              lastname,
              email,
              password,
              trainerof,
              identity,
            };
          } else if (organizationname) {
            user = {
              firstname,
              lastname,
              email,
              password,
              organizationname,
              contact,
              identity,
            };
          } else {
            user = { firstname, lastname, email, password, identity };
          }
          console.log("USer from handle otp", user);
          console.log(process.env.NEXT_PUBLIC_FRONTEND);

          const res = await fetch(`/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": `${process.env.NEXT_PUBLIC_FRONTEND}`,
            },
            body: JSON.stringify(user),
          });

          const data = await res.json();
          console.log("Signup Data:", data);
          setIsLoading(false);
          if (data.success) {
            setOTP("");
            setIsLogin(true);
            setShowPopup(false);
            setConfet(true); // Set the state to true
            setTimeout(() => {
              setConfet(false); // Reset the state to false after 3 seconds
            }, 5000);
            setIsOpenp(true);
            setMsg(
              "Welcome to iLearnings, and thank you for joining us. We're thrilled to have you as part of our growing community."
            );
          } else {
            setIsOpen(true);
            setMsg(
              "It looks like an account with this email address is already registered. If you’re trying to log in, please click the button below."
            );
          }
        } else {
          setIsOpen(true);
          setMsg(
            "The OTP (One-Time Password) you entered does not match our records. Please verify the OTP and try again."
          );
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setIsLoading(false);
      alert("An error occurred. Please check your credentials.");
    }
    setSpinner(false);
  };

  const authLogin = async () => {
    console.log("running login party");
    setSpinner(true);
    const user = { email, password, identity };
    console.log("from to frontend ", process.env.NEXT_PUBLIC_FRONTEND);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
      },
      body: JSON.stringify(user), // <-- fix: send the user object directly
    });

    const data = await res.json();
    console.log("Login Data:", data);

    setIsLoading(false);
    if (data.success) {
      console.log("login status before:", login);
      set_User_info(data.user._id);
      setAllowProfile(true);
      login_Credential("1");

      if (identity === "blogger") router.push("/Blog");
      else router.push("/Profile");
    } else {
      setIsOpen(true);
      setMsg(
        "We couldn’t find an account associated with this email address. Please register to create a new account and get started."
      );
    }
    setSpinner(false);
  };

  const handleotp = async (e) => {
    e.preventDefault();

    if (role === undefined || role === null) {
      setIsOpen(true);
      setMsg("Please select a role to proceed:");
      return;
    }

    if (identity == "recruiter") {
      console.log("running emial check");

      const domain = email.split("@")[1];
      console.log(domain);

      if (domain && publicEmailDomains.includes(domain)) {
        setIsOpen(true);
        setMsg(
          "Please use your organization email address. Public email domains (e.g., Gmail, Yahoo) are not allowed."
        );
        return;
      }
    }
    if (password.length < 8) {
      setIsOpen(true);
      setMsg(
        "Your password must be at least 8 characters long. Please ensure it meets this requirement and try again."
      );
      return;
    }
    if (isLogin) {
      console.log("Running handle otp");
      authLogin();
    } else {
      setShowPopup(true);
      setSpinner(true);
      const authOTP = Math.floor(100000 + Math.random() * 900000);
      setAuth(authOTP);
      console.log("OTP verification in progress", authOTP, email);
      const userdata = { authOTP, email };
      const res = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify(userdata),
      });

      const data = await res.json();
      console.log("data", data.success);
      setIsOpenp(true);
      setMsg(
        "We’ve sent an OTP (One-Time Password) to your registered email address. Please check your inbox, including the spam or junk folder, if you don’t see it in your main inbox."
      );
      setSpinner(false);
    }
  };

  useEffect(
    () => {
      console.log("Updated user_ID:", user_ID);
      if (user_ID) {
        router.push("/Profile");
      }
    },
    [user_ID],
    login
  );

  const handleSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();

    if (step === "1") {
      try {
        const authOTP = Math.floor(100000 + Math.random() * 900000);
        setAuth(authOTP);
        const userdata = { identity, email, authOTP };
        console.log("from the frontend", identity, email, authOTP);

        const res = await fetch("/api/forgetpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${process.env.NEXT_PUBLIC_FRONTEND}`,
          },
          body: JSON.stringify(userdata),
        });
        const data = await res.json();
        console.log(data.success);
        if (!data.success) {
          setIsOpen(true);
          setMsg(
            "It seems like the account associated with the provided details does not exist in our system. Please check your information and try again."
          );
          setforgetPasswordPopupButton("Send OTP");
        } else {
          setforgetPasswordPopupButton("Verify OTP");
          setStep("2");
          setPassword("");
        }
      } catch (error) {
        console.log("went wrong!!");
      }
      setSpinner(false);
    } else if (step === "2") {
      console.log(otp, auth);

      if (otp == auth) {
        setSpinner(false);
        setforgetPasswordPopupButton("Set Password");

        setStep("3");
      } else {
        setIsOpen(true);
        setMsg(
          "The OTP (One-Time Password) you entered does not match our records. Please verify the OTP and try again."
        );
        setforgetPasswordPopupButton("Verify OTP");
      }
    } else if (step === "3") {
      if (password.length < 8) {
        setIsOpen(true);
        setMsg(
          "The password you entered does not meet our requirements. Please ensure your password is at least 8 characters long. For added security, we recommend including a mix of uppercase letters, lowercase letters, numbers, and special characters"
        );
        setPassword("");
        setforgetPasswordPopupButton("Set Password");
        return;
      } else {
        const user = { email, password, identity };
        const res = await fetch("/api/resetpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${process.env.NEXT_PUBLIC_FRONTEND}`,
          },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        console.log(data.success);
        if (!data.success) {
          setIsOpen(true);
          setMsg(
            "We’re sorry, but we’re currently unable to process your password reset request. Please try again after some time."
          );
          setforgetPasswordPopupButton("Send OTP");
        } else {
          setSpinner(false);
          setIsOpenp(true);
          setMsg("Your password has been successfully changed.");
          setEmail("");
          setforgetPasswordPopupButton("Set OTP");
          setPassword("");
          setStep("1");
          setrole("");
          setforgetpasswordPopup(false);
        }
      }
    }
  };
  return (
    <>
      {confet && <Confetti />}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex justify-center items-center py-28">
        <div className="flex   rounded-lg justify-between items-center w-[90%] max-w-[1200px] bg-slate-700 border border-gray-700 shadow-2xl md:bg-opacity-50 md:backdrop-blur-md md:p-6  text-white">
          {/* Form Section */}
          <section className="w-full md:w-[45%] bg-gray-100 rounded-xl p-6 shadow-lg">
            {tagline == "1" && (
              <div className="text-black space-y-1 md:space-y-2 mx-5">
                <h1 className="text-xl font-semibold">Create your profile</h1>
                <p className="text-xs md:text-sm">
                  Search & apply to freelance and fulltime opportunities
                </p>
              </div>
            )}
            {tagline == "2" && (
              <div className="text-black space-y-1 md:space-y-2 mx-5">
                <h1 className="text-xl font-semibold">Create your profile</h1>
                <p className="text-xs md:text-sm">To hire skilled candidates</p>
              </div>
            )}
            <form
              onSubmit={handleotp}
              className="space-y-2 mx-2 text-gray-500 bg-gray-100 rounded-xl p-3"
            >
              <select
                value={role}
                onChange={(e) => {
                  rename(e.target.value);
                  setrole(e.target.value);
                }} // Update the role on selection
                className="border my-2 text-gray-500 border-gray-300 rounded-md px-2 py-2 w-full"
              >
                <option value="">Select a role</option>
                {/* <option value="blogger">blogger</option> */}
                <option value="candidate">Candidate</option>
                {/* <option value="trainer">Trainer</option> */}
                <option value="recruiter">Employer</option>
                <option value="referral">Referral</option>
              </select>
              {blogger && (
                <div className="space-y-2">
                  {!isLogin && (
                    <>
                      {" "}
                      <input
                        className="border border-gray-300 rounded-md px-2 py-2 w-full"
                        required
                        placeholder="Full Name"
                        type="text"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                      />
                    </>
                  )}

                  <input
                    className="border border-gray-300 text-gray-500 rounded-md px-2 py-2 w-full"
                    required
                    placeholder={placeholder}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />

                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder="Password"
                    type="password"
                    value={password}
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                </div>
              )}

              {!isLogin && !blogger && (
                <div className="flex gap-x-2">
                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder="First Name"
                    type="text"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder="Last Name"
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />
                </div>
              )}

              {!blogger && (
                <>
                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder={placeholder}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                  <br />
                </>
              )}

              {recruiter && !isLogin && !candidate && (
                <>
                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder="Contact number"
                    type="number"
                    value={contact}
                    maxLength={10}
                    onChange={(e) => setContact(e.target.value.slice(0, 10))}
                  />
                  <br />
                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder="Organization name"
                    type="text"
                    value={organizationname}
                    onChange={(e) => setOrganizationname(e.target.value)}
                  />
                  <br />
                </>
              )}

              {trainer && !isLogin && !candidate && (
                <>
                  <label className="text-gray-400 border-gray-300 px-1 py-1 rounded-md">
                    Trainer of
                  </label>
                  <select
                    onChange={(e) => setTrainerOf(e.target.value)}
                    className="text-gray-400 border-2 ml-1 border-gray-300 px-1 py-1 rounded-md"
                    required
                    value={trainerof}
                  >
                    <option value="">Select a role</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="full-stack">Full stack development</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="python">Python</option>
                  </select>
                </>
              )}

              {!blogger && (
                <>
                  <div className="flex items-center gap-x-2 md:gap-x-5">
                    <input
                      className="border border-gray-300 rounded-md px-2 py-2 w-full"
                      required
                      placeholder="Password"
                      type={showPasscode ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPasscode ? (
                      <FaRegEye
                        onClick={() => setShowpasscode(false)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setShowpasscode(true)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  <br />
                </>
              )}

              {!isLogin && (
                <input
                  className="border border-gray-300 rounded-md px-2 py-2 w-full"
                  required
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}

              <br />
              {!isLogin && password !== confirmPassword && (
                <h1 className="text-red-500 text-center text-xs">
                  Passwords do not match!
                </h1>
              )}

              {isLogin && (
                <h1 className="text-xs text-center text-gray-500">
                  Can&apos;t remember your password?{" "}
                  <a
                    onClick={() => setforgetpasswordPopup(true)}
                    className="cursor-pointer text-red-700 font-semibold underline underline-offset-1"
                  >
                    {" "}
                    Click here
                  </a>
                </h1>
              )}

              <button
                type="submit"
                className="px-2 py-1 text-white rounded-md flex items-center bg-gradient-to-r from-blue-600 to-blue-900 mx-auto"
                disabled={spinner} // Disable the button when loading
              >
                {spinner ? (
                  <ClipLoader size={20} className="mx-5" color="#ffffff" />
                ) : !isLogin ? (
                  "Register"
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-xs md:text-sm text-center capitalize text-gray-600">
                {isLogin ? "Create an account ->" : "Already a User?"}{" "}
                <a
                  href="#"
                  onClick={change}
                  className="text-green-600 hover:underline hover:underline-offset-2 font-semibold"
                >
                  {isLogin ? "Register" : "Login"}
                </a>
              </p>
            </form>
          </section>

          {/* Swiper Section */}
          <section className="hidden md:block w-[45%]">
            <Swiper
              className="mySwiper rounded-3xl shadow-lg"
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              modules={[Autoplay]}
            >
              <SwiperSlide className="flex justify-center">
                <img
                  className="w-full rounded-xl"
                  src="/Login/1.jpg"
                  alt="login_carousel"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center">
                <img
                  className="w-full rounded-xl"
                  src="/Login/2.jpg"
                  alt="login_carousel"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center">
                <img
                  className="w-full rounded-xl"
                  src="/Login/3.jpg"
                  alt="login_carousel"
                />
              </SwiperSlide>
            </Swiper>
          </section>
        </div>
      </div>

      {ShowPopup && !isLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-lg p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full overflow-hidden">
            <section className="w-full py-10 text-black md:w-[100%] bg-gray-300">
              <div className="flex items-center justify-end  mx-5">
                <RxCross2
                  className="bg-gray-400 rounded-sm"
                  onClick={() => setShowPopup(false)}
                />
              </div>

              <form onSubmit={getInputData} className="space-y-4 mx-10 mt-10">
                <input
                  type="number"
                  name="otp"
                  placeholder="Check your mail for 6-digit code"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.slice(0, 6))} // Limit input to 6 characters
                  required
                  maxLength={6}
                />

                <p className="text-[10px] text-center text-indigo-700">
                  If you haven&apos;t received it&sbquo; please check your spam
                  folder.
                </p>

                {/* <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded-md text-white ${
                    otp.length === 6
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={otp.length < 6}
                >
                  Verify OTP
                </button> */}

                <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded-md text-white ${
                    otp.length === 6
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={otp.length < 6}
                >
                  {spinner ? (
                    <ClipLoader size={20} className="mx-5" color="#ffffff" />
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      {forgetpasswordPopup && isLogin && (
        <div className="fixed inset-0 bg-black backdrop-blur-xl bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`bg-white rounded-lg shadow-xl max-w-xl w-full overflow-hidden transition-transform duration-500 ease-in-out transform ${
              forgetpasswordPopup
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          >
            <section className="w-full py-4 text-black md:w-[100%] bg-gray-300">
              <div className="flex items-center justify-between mx-5">
                <h1 className="font-semibold">Set up a new Password</h1>
                <RxCross2
                  className="bg-gray-400 rounded-sm"
                  onClick={() => setforgetpasswordPopup(false)}
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 mx-10 mt-10">
                <select
                  value={role}
                  required
                  onChange={(e) => {
                    rename(e.target.value);
                    setrole(e.target.value);
                  }}
                  className="border my-2 border-gray-300 rounded-md px-2 py-2 w-full"
                >
                  <option value="">Select a role</option>
                  <option value="candidate">Candidate</option>
                  <option value="recruiter">Employer</option>
                  <option value="referral">Referral</option>
                </select>

                {step === "1" && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                )}

                {step === "2" && (
                  <input
                    type="number"
                    name="otp"
                    placeholder="Check your mail for a 6-digit code"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value.slice(0, 6))} // Limit input to 6 characters
                    required
                    maxLength={6}
                  />
                )}

                {step === "3" && (
                  <input
                    className="border border-gray-300 rounded-md px-2 py-2 w-full"
                    required
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-md text-white bg-blue-600"
                >
                  {spinner ? (
                    <ClipLoader size={20} className="mx-5" color="#ffffff" />
                  ) : (
                    forgetpasswordpopupbutton
                  )}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      <Goodpopup isOpen={isOpenP} message={msg} onClose={handleClose} />
      <ErrorPopup isOpen={isOpen} message={msg} onClose={handleClose} />
    </>
  );
};

export default Page;
