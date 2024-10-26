"use client";

import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Slide } from "react-toastify"; // Added Slide import
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS for the toast

const Login = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useLogin((state) => state.login);
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const user_id= useLogin((state)=> state.user_id);
  const set_User_id = useLogin((state)=>state.set_User_id)
  useEffect(() => {
    console.log("login status",login);
    console.log("userid :",user_id);
    
  }, [login, isLogin,user_id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    setLoader(true);
    if (isLogin) {
      try {
        const user = { fullName, designation, email, password, isAdmin };
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        
        if (res.ok) {
          toast.success('Register Successful!', {
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

          console.log("Signup complete", data);
          setFullName("");
          setDesignation("");
          setEmail("");
          setPassword("");
          setIsLogin(false); // Set back to login mode after registration
        } else {
          console.error("Signup error:", data);
          toast.success('🦄 Error signup Credentials!', {
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
    } else {
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
        console.log("Login Data:", data.user._id);
        set_User_id(data.user._id)
        
        if (res.ok) {
          toast.success('Login Successful!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Slide, // Ensure the slide transition is working
          });
          setLoginCredential("1") 
          if (!isAdmin) router.push("/Employee-portal");
          else router.push("/Admin-portal");

          setEmail("");
          setPassword("");
        } else {
          console.error("Login error:", data);
          toast.success('🦄 Error Login Credentials!', {
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
  };

  return (
    <>
      <div className="bg-black h-screen flex items-center justify-center">
        <section className="w-[95%] md:w-1/2 space-y-5 bg-teal-950 py-5 md:h-[80%] rounded-xl">
          <img
            src="/logo.png"
            className="h-16 mx-auto bg-black rounded-full px-5"
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
            onSubmit={handleSubmit}
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
      <ToastContainer />
    </>
  );
};

export default Login;
