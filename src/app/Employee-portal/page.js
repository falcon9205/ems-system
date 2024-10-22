"use client"
import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";

const Page = () => {
  const login = useLogin((state) => state.login);
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const router = useRouter()
  const [tasks,setTasks] = useState([])
 
  useEffect(()=>{
    const fetchTask = async()=>{
      try {
        const res = await fetch("/api/task", {
          method: "GET", // or GET if you're just fetching data
          headers: {
            "Content-Type": "application/json",
          } // Remove this if it's not needed for a GET request
        });
  
        const data = await res.json();
        console.log("Fetched data:", data); // Log the fetched data
        console.log("userid ",user_id);
        
        // Map and set the employee data
       setTasks(
    data.All_Task
      .filter((user) => user.emp_id === user_id) // Filter users based on the condition
  );
  
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
        
      }
      fetchTask()
  })
  useEffect(()=>{
   if(login === "0")
      router.push("/")

  },[login])
  const handleSubmit = () => {};
  return (
    <>
      <div className="bg-black h-full pt-1">
        <nav className="bg-teal-950   w-full h-14 rounded-full flex justify-between px-[2%] md:px-[1%]  items-center">
          <h1 className="text-white hidden md:block text-xs bg-yellow-600 px-2 py-2 md:px-2 md:py-1 rounded-full md:text-lg">
            Employee Dashboard
          </h1>
          <img src="./logo.png" className="h-10 md:h-10 flex mx-auto bg-black rounded-full px-5" alt="logo"/>
          <button onClick={()=>setLoginCredential("0")} className="text-white  bg-red-600 hover:bg-red-700 px-2 py-2 md:px-2 md:py-1 rounded-full md:text-lg">
            Logout
          </button>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 mx-2 md:mx-10 py-5 md:py-10 gap-y-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Task Assigned by: {task.Assignby}
              </h3>
              <p className="text-sm text-gray-500">
                <strong>Task Title:</strong> {task.TaskTile}
              </p>
              <p className="text-sm  text-red-600">
                <strong className="text-gray-500">Deadline:</strong>{" "}
                {task.Deadline}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Description:</strong> {task.Description}
              </p>
              
              <div className="flex gap-x-2 md:gap-x-5 ">
                 <MdCancelPresentation className="text-2xl md:text-4xl bg-gray-300 text-red-700 rounded-md px-1 py-1"/>
                 <IoMdCheckboxOutline className="text-2xl md:text-4xl bg-gray-300 text-green-500 rounded-md px-1 py-1"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
