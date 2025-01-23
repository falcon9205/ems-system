
"use client";
import React from "react";
const Page = ({ isOpen, message, onClose }) => {
 

  return (
    <>
     
      {isOpen && (
        <div className="fixed backdrop-blur-sm  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[95%] space-y-6 relative">
            {/* Close Button */}
            

            <div className="text-center">
              <h2 className=" text-2xl font-bold text-green-500 border-2 bg-green-100 border-green-300 rounded-md">Success</h2>
              <p className="text-black font-semi bg-gray-100 rounded-md mt-3">
                {message}
              </p>
            </div>
            <button  onClick={onClose} className="flex mx-auto justify-center bg-green-600 px-2 rounded-md text-white">Okay!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
