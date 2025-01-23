"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [delay, setDelay] = useState(9000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setDelay((prevDelay) => prevDelay + 50000);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [showPopup, delay]);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-400 text-gray-800 px-2 rounded-sm  focus:outline-none font-bold"
              aria-label="Close Popup"
            >
              ✕
            </button>

            {/* Left Side of Popup */}
            <Link href="https://us06web.zoom.us/meeting/register/6M09Fm_5R_yRDBX_uXdANg#/registration" target="_blank" rel="noopener"><img src="/poster.png" alt="poster_image"/></Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
