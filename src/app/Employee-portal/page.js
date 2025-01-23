"use client";
import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Page = () => {
  const login = useLogin((state) => state.login);
  const user_id = useLogin((state) => state.user_id);
  const set_User_id = useLogin((state) => state.set_User_id);
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [taskButton, setTaskButton] = useState("Done");
  const [reason, setReason] = useState(""); // New state for the reason
  const [showReasonInput, setShowReasonInput] = useState(false); // State to control showing the reason input field

  const fetchTask = async () => {
    try {
      const res = await fetch("/api/task", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTasks(data.filter((user) => user.emp_id === user_id && user.status === false && (!user.reason || user.reason === "") ));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setstatus = async (id, status) => {
    setTaskButton("Updating...");
    try {
      const details = tasks.find((task) => task._id === id);
      const res = await fetch("/api/task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status,reason }),
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
          transition: Slide,
        });
        setTaskButton("Done");

        const formData = new FormData();
        for (const key in details) {
          formData.append(key, details[key]);
        }
        formData.append("access_key", process.env.NEXT_PUBLIC_web3form);

        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        fetchTask();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setLoginCredential("0");
        set_User_id(null);
        toast.success("Logout Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const identity = Cookies.get("identity");

    if (id && token && identity) {
      setLoginCredential("1");
      set_User_id(id);
      fetchTask();
    } else {
      router.push("/");
    }
  }, [login]);

  useEffect(() => {
    if (login === "0") {
      router.push("/");
    } else if (Cookies.get("identity") === "Employee") {
      router.push("/Employee-portal");
    }
  }, [login, router]);

  const handleNotDoneClick = (taskId) => {
    setShowReasonInput(true); // Show the reason input field
    setReason(""); // Reset reason text when a new task is clicked
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmitReason = async (taskId) => {
    // Here you would handle submitting the reason along with the task status update
    console.log("Reason submitted for task:", taskId, reason);
    setShowReasonInput(false);
    setReason("");
  };

  return (
    <>
      <div className="bg-black h-full">
        <nav className="bg-teal-950 w-[98%] mt-1 md:mt-0 rounded-md md:rounded-none md:w-[100%] mx-auto h-14 flex justify-between px-[2%] md:px-[1%] items-center">
        <img
            src="./logo.png"
            className="h-10 md:h-10 flex  rounded-full p-1"
            alt="logo"
          />
          <div className="flex md:gap-x-4 gap-x-1">
            <h1 className="text-white hidden md:block border-white bg-yellow-600 px-2 md:px-2 md:py-1 rounded-sm text-sm md:text-lg">
              Employee Dashboard
            </h1>
            <button
              onClick={logoutUser}
              className="text-white bg-red-600 hover:bg-red-700 px-2 md:px-2 md:py-1 rounded-sm text-xl md:text-lg"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 mx-2 md:mx-10 py-5 md:py-10 gap-y-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 space-y-2">
              <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2">Task Assigned by: {task.Assign_by}</h3>
              <p className="text-sm text-gray-500">
                <strong>Task Title:</strong> {task.task_title}
              </p>
              <p className="text-sm text-red-600">
                <strong className="text-gray-500">Deadline:</strong> {task.deadline}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Description:</strong> {task.description}
              </p>

              <div className="flex gap-x-2 md:gap-x-3">
                <button
                  onClick={() => setstatus(task._id, true)}
                  className="bg-green-500 text-xs md:text-sm text-white rounded-lg px-2 py-1"
                >
                  {taskButton}
                </button>
                <button
                  onClick={() => handleNotDoneClick(task._id)}
                  className="bg-red-500 text-xs md:text-sm text-white rounded-lg px-2 py-1"
                >
                  Not done
                </button>
              </div>

              {showReasonInput && (
                <div className="mt-2">
                  <textarea
                    value={reason}
                    onChange={handleReasonChange}
                    placeholder="Please provide a reason"
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                  <button
                    onClick={() => setstatus(task._id, false)}
                    className="bg-blue-500 text-white mt-2 p-2 rounded"
                  >
                    Submit Reason
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Page;
