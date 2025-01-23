"use client";

import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Slide } from "react-toastify"; // Added Slide import
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS for the toast
import { RxCross2 } from "react-icons/rx";

const Login = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [auth,setAuth] = useState("")
  const login = useLogin((state) => state.login);
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const user_id = useLogin((state) => state.user_id);
  const set_User_id = useLogin((state) => state.set_User_id);
 
  if(process.env.NODE_ENV !== "development")
    {
      // console.log("running in production");
      
      console.log = () =>{};
      console.debug = () => {};
      console.info = ()=>{};
      console.warn =  ()=>{};
      console.error = ()=>{};
    }
    else{
      console.log("running in development");
      
    }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit called");
    console.log(otp,auth);
    
    if (otp == auth) {
      console.log("calling if");
        try {
          const user = { fullName, designation, email, password, isAdmin };
          console.log(fullName,email,designation,password,isAdmin)

          const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          const data = await res.json();

          if (res.ok) {
            toast.success("Register Successful!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide, // Ensure the slide transition is working
            });

            // if (!isAdmin) router.push("/Employee-portal");
            // else router.push("/Admin-portal");
            setShowPopup(false)
            console.log("Signup complete", data);
            setFullName("");
            setDesignation("");
            setEmail("");
            setPassword("");
            setIsLogin(false); // Set back to login mode after registration
          } else {
            console.error("Signup error:", data);
            toast.success(" Error signup Credentials!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
              transition: Slide, // Ensure the slide transition is working
            });
          }
        } catch (error) {
          console.error("Error during signup:", error);
        } finally {
          setLoader(false);
        }
      
    } 
  };

  const authLogin = async()=>{
      
      
      try {
        const user = { email, password, isAdmin };
       
        
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        

        if (res.ok) {
          console.log("Cookie created!");
          toast.success("Login Successful!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Slide, // Ensure the slide transition is working
          });
          
          set_User_id(data.user._id);
          console.log("data",data);
          setLoginCredential("1");
          if (!isAdmin) router.push("/Employee-portal");
          else router.push("/Admin-portal");

          setEmail("");
          setPassword("");
        } else {
         
          toast.error("Error Login Credentials!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Slide, // Ensure the slide transition is working
          });
        }
      } catch (error) {
        console.error("Error during Login:", error);
      } finally {
        setLoader(false);
      }

    }
  

  const handleotp = async (e) => {
    e.preventDefault();
    
    
    
    if(!isLogin){
       authLogin()
    }
     else{
      setShowPopup(true)
      const authOTP = Math.floor(100000 + Math.random() * 900000);
      setAuth(authOTP)
    console.log("OTP verification in progress", authOTP, email);
    const userdata = { authOTP, email };
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    const data = await res.json();
    console.log("data", data.success);
    if (data.success) {
    } else {
    }
  }

    // Add any OTP verification logic here.
  };

  return (
    <>
      <div className="bg-black h-screen flex items-center justify-center">
        <section className="w-[95%] md:w-1/2 space-y-5 bg-teal-950 py-5 md:h-[80%] rounded-xl">
          <img
            src="/logo.png"
            className="h-16 mx-auto rounded-full p-1 "
            alt="logo"
          />
          <p className="text-center text-gray-300 text-sm">
            {isLogin ? "Register as " : "Login as "}
            <span
              onClick={() => setIsAdmin((prev) => !prev)}
              className="text-yellow-500 cursor-pointer"
            >
              {isAdmin ? "Admin" : "Employee"}
            </span>
          </p>

          <form
            className="bg-teal-800 px-5 py-5 w-[90%] mx-auto rounded-xl"
            onSubmit={handleotp}
          >
            {isLogin && (
              <>
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="designation"
                    type="text"
                    name="designation"
                    required
                    placeholder="Enter your Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 flex items-center text-white gap-x-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="cursor-pointer text-gray-300 text-xl"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="cursor-pointer text-gray-300 text-xl"
                />
              )}
            </div>

            <div className="w-full">
              <button
                className="bg-black py-1 hover:text-black flex mx-auto hover:bg-white border border-black text-white px-2 rounded-md md:text-lg"
                type="submit"
              >
                {loader ? "Loading..." : !isLogin ? "Login" : "Register Now"}
              </button>
            </div>

            <p className="text-center text-gray-300 text-sm my-2">
              {isLogin ? "Existing User " : "New to the platform? "}
              <span
                onClick={() => setIsLogin((prev) => !prev)}
                className="text-yellow-500 cursor-pointer"
              >
                {isLogin ? "Login" : "Register Now"}
              </span>
            </p>
          </form>
        </section>
      </div>

      {showPopup && isLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">

            <section className="w-full py-10 text-white md:w-[100%] h-full bg-teal-950">
              
              <div className="flex items-center justify-between mx-5">
                <h1 className="text-xl">Verify Yourself</h1>
                <RxCross2 onClick={() => setShowPopup(false)} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-10 mx-10 md:mx-20">
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
                   <p className="text-[10px] text-center text-gray-400">If you haven&apos;t received it&sbquo; please check your spam folder.</p>
                <button
                  type="submit"
                  className={`w-full py-2 px-4 rounded-md text-white ${
                    otp.length === 6
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={otp.length < 6}
                >
                  Verify Otp
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Login;
