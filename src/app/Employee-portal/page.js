"use client"
import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";

const Page = () => {
  const login = useLogin((state) => state.login);
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const router = useRouter()
  const tasks = [
    {
      Assignby: "Rahul",
      TaskTile: "Loader",
      Deadline: "23/10/2024",
      Description:
        "Implement a full-time loader Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets contain",
    },
    {
      Assignby: "Prakash",
      TaskTile: "Loader",
      Deadline: "28/10/2024",
      Description: "Implement a fulling time loader",
    },
    {
      Assignby: "Rahul",
      TaskTile: "Loader",
      Deadline: "23/10/2024",
      Description: "Implement a full-time loader",
    },
    {
      Assignby: "Prakash",
      TaskTile: "Loader",
      Deadline: "28/10/2024",
      Description: "Implement a fulling time loader",
    },
  ];
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
