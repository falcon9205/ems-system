// components/LocomotiveScrollWrapper.js
"use client"
import React, { useRef, useEffect } from "react";
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';


const LocomotiveScrollWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      containerRef={containerRef}
      watch={[]}
    >
      <div data-scroll-container ref={containerRef}>
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
};

export default LocomotiveScrollWrapper;
