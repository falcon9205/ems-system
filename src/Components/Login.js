"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";



const Login = () => {
  // State variables for email and password
  const router = useRouter()
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your login logic here
    console.log("Name",name);
    console.log("Designation",designation);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log(isAdmin);
    
    if(isAdmin)
        router.push("/Admin-portal")
    else
      router.push("/Employee-portal")

    setName("")
    setDesignation("")
    setEmail("")
    setPassword("")
  };

  useEffect(()=>{
    console.log(isAdmin);
    
  },[isAdmin])

  return (
    <>
      <div
        className={`bg-black h-screen flex items-center justify-center`}
      >
        <section className="w-[95%] md:w-1/2 space-y-5 bg-teal-950 py-5 md:h-[80%] rounded-xl">
          <img src="./logo.png" className="h-16 flex mx-auto bg-black rounded-full px-5" alt="logo"/>
          {/* <h1 className="text-gray-400 text-center text-2xl font-bold">
            Login to the Portal
          </h1> */}
          <p className="text-center text-gray-300 text-xs">
            Login as <a onClick={()=> setIsAdmin(!isAdmin)} className="text-yellow-500 cursor-pointer">{isAdmin? "Employee ":"Admin "}</a>
          </p>

          <form
            className="bg-teal-800 px-5 py-5 w-[90%] md: mx-auto rounded-xl"
            onSubmit={handleSubmit}
          >
            {isLogin && (
              <>
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your Full name"
                    value={name} // Bind value to state
                    onChange={(e) => setName(e.target.value)} // Update state on change
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your Designation"
                    value={designation} // Bind value to state
                    onChange={(e) => setDesignation(e.target.value)} // Update state on change
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
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>

            <div className="mb-3 flex text-white gap-x-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword?"text":"password"}
                name="password"
                required
                placeholder="Enter your password"
                value={password} // Bind value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
              {showPassword ? <FaEye  onClick={()=>setShowPassword(!showPassword)} className="mt-3 cursor-pointer text-gray-300 text-xl"/> : <FaRegEyeSlash  onClick={()=>setShowPassword(!showPassword)} className="mt-3 cursor-pointer text-gray-300 text-xl"/>}
            </div>

            <div className="w-full">
             <button 
                className="bg-black py-1 hover:text-black flex mx-auto hover:bg-white border border-black text-white px-2 rounded-md md:text-lg"
                type="submit"
              >
                {!isLogin ? "Login" : "Register Now"}
              </button>
            </div>
            <p className="text-center text-gray-300 text-xs my-2">
              New to the platform?{" "}
              <a onClick={()=> setIsLogin(!isLogin)} className="text-yellow-500 cursor-pointer">{!isLogin ? "Register Now" : "Login"}</a>
            </p>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
