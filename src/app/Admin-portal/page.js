"use client";
import React, { useState } from "react";

const Page = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [state, setState] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement form submission logic here (e.g., API calls)
    console.log("Task Title:", taskTitle);
    console.log("State:", state);
    console.log("Deadline:", deadline);
  };
  return (
    <>
      <div className="bg-black h-full pt-1">
        <nav className="bg-teal-950 w-full h-14 rounded-full flex justify-between px-[2%] md:px-[1%]  items-center">
          <h1 className="text-white hidden md:block bg-yellow-600 px-2 py-2 md:px-2 md:py-1 rounded-full md:text-lg">
            Admin Dashboard
          </h1>
          <img src="./logo.png" className="h-10 md:h-10 flex mx-auto bg-black rounded-full px-5" alt="logo"/>
          <button className="text-white bg-red-600 hover:bg-red-700 px-2 py-2 md:px-2 md:py-1 rounded-full md:text-lg">
            Logout
          </button>
        </nav>

        <section className="md:flex w-full  justify-between py-10 px-[5%]">
          <form onSubmit={handleSubmit} className="space-y-6 md:w-1/2">
            {/* Select State */}
            <div>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select an Employee
                </option>
                <option value="todo">To-Do</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
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
              Create Task
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
          <div className="bg-gray-500 py-10 text-center md:text-4xl space-y-3 rounded-xl w-full">
            <h1 className="font-semibold text-gray-950">
              Total Assigned Tasks
            </h1>
            <h1 className="font-bold text-white">27</h1>
            <button className="text-sm bg-black text-white hover:text-gray-400 rounded-md px-2 py-1">
              Show Task
            </button>
          </div>
          <div className="bg-gray-500  py-10 text-center md:text-4xl space-y-3 rounded-xl w-full">
            <h1 className="font-semibold text-gray-950">Task Status</h1>

            <button className="text-sm bg-black text-white hover:text-gray-400 rounded-md px-2 py-1">
              Show Status
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
