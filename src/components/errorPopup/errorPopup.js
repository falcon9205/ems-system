
"use client";
import React from "react";
const Page = ({ isOpen, message, onClose }) => {
 

  return (
    <>
     
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[95%] space-y-6 relative">
            {/* Close Button */}
            

            <div className="text-center">
              <h2 className=" text-2xl font-bold text-red-500 border-2 bg-red-100 border-red-300 rounded-md">Alert Message</h2>
              <p className="text-black bg-gray-100 rounded-md mt-3">
                {message}
              </p>
            </div>
            <button  onClick={onClose} className="flex mx-auto justify-center bg-red-600 px-2 rounded-md text-white">Okay!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
