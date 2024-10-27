"use client";
import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Page = () => {
  const login = useLogin((state) => state.login);
  const user_id = useLogin((state) => state.user_id);
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  const fetchTask = async () => {
    try {
      const res = await fetch("/api/task", {
        method: "GET", // or GET if you're just fetching data
        headers: {
          "Content-Type": "application/json",
        }, // Remove this if it's not needed for a GET request
      });

      const data = await res.json();

      console.log("Fetched data:", data.All_Task); // Log the fetched data
      console.log("userid ", user_id);

      // Map and set the employee data
      setTasks(
        data.All_Task.filter(
          (user) => user.emp_id === user_id && user.status === false
        )
      );
      // Filter users based on the condition
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setstatus = async (id, status) => {
    try {
      const details = tasks.find((task) => task._id === id);
      const res = await fetch("/api/task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }), // Pass taskId and status in the body
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Status Updated!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide, // Ensure the slide transition is working
        });
        // Fetch the latest tasks after successfully updating the task status

        const formData = new FormData();
        // Add each field from your object to formData
        for (const key in details) {
          formData.append(key, details[key]);
        }

        // Web3form requires your form ID; replace 'YOUR_FORM_ID' with your actual ID
        formData.append("access_key", process.env.NEXT_PUBLIC_web3form);

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();

          if (result.success) {
            console.log("Data sent successfully:", result);
          } else {
            console.log("Failed to send data:", result.message);
          }
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("Failed to update task status:");
      }
      fetchTask();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(() => {
    if (login === "0") router.push("/");
    console.log("tasks data", tasks);
    fetchTask();
  }, [login]);

  return (
    <>
      <div className="bg-black h-full">
      <nav className="bg-teal-950 w-[98%] mt-1 md:mt-0 rounded-md md:rounded-none md:w-[100%] mx-auto h-14   flex justify-between px-[2%] md:px-[1%]  items-center">
          <img
            src="./logo.png"
            className="h-10 md:h-10 flex  bg-black rounded-sm px-5"
            alt="logo"
          />
          <div className="flex md:gap-x-4 gap-x-1">
            <h1 className="text-white hidden md:block border-white bg-yellow-600 px-2  md:px-2 md:py-1 rounded-sm text-sm md:text-lg">
              Employee Dashboard
            </h1>
            <button
              onClick={() => setLoginCredential("0")}
              className="text-white bg-red-600  hover:bg-red-700 px-2  md:px-2 md:py-1 rounded-sm text-xl md:text-lg"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 mx-2 md:mx-10 py-5 md:py-10 gap-y-3">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 space-y-2"
            >
              <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2">
                Task Assigned by: {task.Assign_by}
              </h3>
              <p className="text-sm text-gray-500">
                <strong>Task Title:</strong> {task.task_title}
              </p>
              <p className="text-sm  text-red-600">
                <strong className="text-gray-500">Deadline:</strong>{" "}
                {task.deadline}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Description:</strong> {task.description}
              </p>

              <div className="flex gap-x-2 md:gap-x-3">
                <button
                  onClick={() => setstatus(task._id, true)}
                  className="bg-green-500 text-xs md:text-sm text-white rounded-lg px-2 py-1"
                >
                  Done
                </button>
                <button className="bg-red-500 text-xs md:text-sm text-white rounded-lg px-2 py-1">
                  Not done
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Page;
