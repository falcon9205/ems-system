"use client";
import useLogin from "@/store/login";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify"; // Added Slide import
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS for the toast
import { FaWindowClose } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState();
  const [description, setDescription] = useState("");
  const [emp_Data, setEmp_Data] = useState([]);
  const [emp_Email, setEmp_Email] = useState("");
  const [taskButton,setTaskButton] = useState("Assign Task")
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const setLoginCredential = useLogin((state) => state.setLoginCredential);
  const set_User_id = useLogin((state) => state.set_User_id);
  const login = useLogin((state) => state.login);
  const user_id = useLogin((state) => state.user_id);
  
  const [toggle, settoggle] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowpopup] = useState(false);
  const [showTaskpopup, setShowTaskPopup] = useState(false);
  
 

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      if (!description || description.trim() === "") {
        toast.error("Please Provide Description!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide, // Ensure the slide transition is working
        });
        // Stop form submission
      } else {
        setTaskButton("Assigning...")
        const selectedEmployeeData = emp_Data.find(
          (emp) => emp.fullName === selectedEmployee
        );

        // Retrieve emp_id and email if employee exists
        const emp_id = selectedEmployeeData?._id;
        const email = selectedEmployeeData?.email;


        // const email = emp_Data.find(emp => emp.id === _id)?.email;

        const task = {
          email,
          Assign_by: user_id,
          task_title: taskTitle,
          deadline,
          description,
          emp_name: selectedEmployee,
          emp_id,
        };
        const res = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        const data = await res.json();
        toast.success("Task Assigned !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide, // Ensure the slide transition is working
        });

        setTaskButton("Assign Task")
        setTaskTitle(""); 
        setDeadline("");
        setDescription("");
        fetchTask()
        settoggle(!toggle);
      }
    } catch (error) {}
  };

  const fetchTask = async () => {
    try {
      
      
      const res = await fetch("/api/task", {
        method: "GET", // or GET if you're just fetching data
        headers: {
          "Content-Type": "application/json",
        }, // Remove this if it's not needed for a GET request
      });

      const data = await res.json();
      console.log("Fetched datatask:", data); // Log the fetched data
      console.log("userid ", user_id);

      // Map and set the employee data
      console.log("running fetch task again for fetching ...");
      console.log("userid from fetch",user_id);
      setTasks(
        data.filter((user) => user.Assign_by === user_id) // Filter users based on the condition
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logoutUser = async()=>{
    console.log("Running logout function");
    const res = await fetch("/api/logout", {
      method: "POST", // or GET if you're just fetching data
      headers: {
        "Content-Type": "application/json",
      }, // Remove this if it's not needed for a GET request
    });

    const data = await res.json();
    console.log("data of cookies ");
    if(data.success){
      toast.success("Logout Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Slide, // Ensure the slide transition is working
      });
        setLoginCredential("0")
        set_User_id(null)
    }
    
  }

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("/api/login", {
          method: "GET", // or GET if you're just fetching data
          headers: {
            "Content-Type": "application/json",
          }, // Remove this if it's not needed for a GET request
        });

        const data = await res.json();
        console.log("Fetched data:", data); // Log the fetched data

        // Map and set the employee data
        setEmp_Data(
          data.Users_Data.map((user) => ({
            fullName: user.fullName,
            _id: user._id,
            email: user.email,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchdata();
  }, []);

  useEffect(()=>{
    console.log("Login status",login);
    
    if(login!=="0")
    {
      const identity = Cookies.get('identity')
      if(identity == "Admin")
        router.push("/Admin-portal")
      
    }
    else{
      router.push("/")
    }
  },[login])
  
  useEffect(()=>{
    const token = Cookies.get('token');
    const id = Cookies.get('id')
    const identity = Cookies.get('identity')
    console.log(" cookies from frontend ", token,id,identity);
    if(id && token && identity)
    {
      setLoginCredential("1");
      set_User_id(id)
      fetchTask()
    }

    if (login === "0"){
      router.push("/");
    }
    
  },[login, emp_Data, toggle])
  return (
    <>
      <div className="bg-black h-full ">
        <nav className="bg-teal-950 w-[98%] mt-1 rounded-md md:w-[100%] mx-auto h-14   flex justify-between px-[2%] md:px-[1%]  items-center">
          <img
            src="./logo.png"
            className="h-10 md:h-10 flex  rounded-full p-1"
            alt="logo"
          />
          <div className="flex md:gap-x-4 gap-x-1">
            <h1 className="text-white hidden md:block border-white  px-2  md:px-2 md:py-1 rounded-sm text-sm md:text-lg">
              Admin Dashboard
            </h1>
            <button
              onClick={() => logoutUser()}
              className="text-white bg-red-600  hover:bg-red-700 px-2  md:px-2 md:py-1 rounded-sm text-xl md:text-lg"
            >
              Logout
            </button>
          </div>
        </nav>

        <section className="md:flex w-full   justify-between py-10 px-[5%]">
          <form onSubmit={handleSubmit} className="space-y-6 md:w-1/2">
            {/* Select State */}
            <div>
              <select
                id="emp_name"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-4 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select an Employee
                </option>
                {/* Dynamically generate options using map */}
                {emp_Data.map((user) => (
                  <option key={user._id} value={user.fullName}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Task Title */}
            <div>
              <input
                type="text"
                id="taskTitle"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Deadline */}
            <div className="flex gap-x-2 items-center">
              <label htmlFor="deadline" className="block text-gray-300 mb-2">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className=" block md:hidden">
              <textarea
                id="description"
                placeholder="Add a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="7"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-800 hover:bg-teal-900 text-white py-2 rounded-lg"
            >
              {taskButton}
            </button>
          </form>
          <div className="w-[30%] hidden md:block">
            <textarea
              id="description"
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="7"
            />
          </div>
        </section>

        <section className="md:flex md:justify-between mx-[5%] gap-x-5 space-y-5 pb-10">
          <div className="bg-gradient-to-r from-pink-600 to-blue-700 assigndiv py-10 text-center md:text-4xl space-y-3 rounded-xl w-full">
            <h1 className="font-semibold text-gray-950">
              Total Assigned Tasks
            </h1>
            <h1 className="font-bold text-white">{tasks.length}</h1>
            <button
              onClick={() => setShowpopup(true)}
              className="text-sm bg-black text-white hover:text-gray-400 rounded-md px-2 py-1"
            >
              Show Task
            </button>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-orange-700 statusdiv  py-10 text-center md:text-4xl space-y-3 rounded-xl w-full">
            <h1 className="font-semibold text-gray-950">Task Status</h1>

            <button
              onClick={() => setShowTaskPopup(true)}
              className="text-sm bg-black text-white hover:text-gray-400 rounded-md px-2 py-1"
            >
              Show Status
            </button>
          </div>
        </section>
      </div>

      {showPopup && (
        <>
          <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
              {/* Popup Header with Close Button */}
              <div className="flex justify-between mx-4 mt-1 sticky top-0 bg-white z-10">
                <h1 className="text-sm md:text-lg font-semibold">
                  Task Assign
                </h1>
                <FaWindowClose
                  className="md:text-xl text-gray-400 cursor-pointer"
                  onClick={() => setShowpopup(false)}
                />
              </div>

              {/* Scrollable Content */}
              <div className="my-5 max-h-[70vh] overflow-y-auto px-1">
                <table className="w-[100%] mx-auto">
                  <thead>
                    <tr>
                      {/* <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                        Employee ID
                      </th> */}
                      <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                        Employee Name
                      </th>
                      <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                        Task Title
                      </th>
                      <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                        Description
                      </th>

                      <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                        Deadline
                      </th>
                    </tr>
                  </thead>
                  <tbody className="md:text-sm border">
                    {tasks.map((task) => (
                      <tr key={task._id}>
                       {/* commits */}
                        <td className="border text-[8px] md:text-sm text-center">
                          {task.emp_name}
                        </td>
                        <td className="border text-[8px] md:text-sm text-center">
                          {task.task_title}
                        </td>
                        <td className="border text-[8px] md:text-sm text-center">
                          {task.description}
                        </td>

                        <td className="border text-[8px] md:text-sm text-center text-red-500">
                          {new Date(task.deadline).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

{showTaskpopup && (
  <>
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
        {/* Popup Header with Close Button */}
        <div className="flex justify-between mx-4 mt-1 sticky top-0 bg-white z-10">
          <h1 className="text-sm md:text-lg font-semibold">Task Status</h1>
          <FaWindowClose
            className="md:text-xl text-gray-400 cursor-pointer"
            onClick={() => setShowTaskPopup(false)}
          />
        </div>

        {/* Scrollable Content */}
        <div className="my-5 max-h-[70vh] overflow-y-auto px-4">
          <table className="w-[100%] mx-auto">
            <thead>
              <tr>
                <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                  Employee Name
                </th>
                <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                  Task Title
                </th>
                <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                  Status
                </th>
                <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                  Deadline
                </th>
                <th className="text-[8px] md:text-sm border border-gray-300 text-center mx-2">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="md:text-sm border">
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="border text-[8px] md:text-sm text-center">
                    {task.emp_name}
                  </td>
                  <td className="border text-[8px] md:text-sm text-center">
                    {task.task_title}
                  </td>
                  <td className="border text-[8px] md:text-sm text-center">
                    {task.status ? (
                      <TiTick className="text-green-600 mx-auto" />
                    ) : (
                      <IoMdClose className="text-red-600 mx-auto" />
                    )}
                  </td>
                  <td className="border text-[8px] md:text-sm text-center text-red-500">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  {/* Conditionally render Reason if status is false */}
                  <td className="border text-[8px] md:text-sm text-center text-gray-600">
                    {task.status === false
                      ? task.reason
                        ? task.reason
                        : ""
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
)}


      <ToastContainer />
    </>
  );
};

export default Page;
// native