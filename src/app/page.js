"use client"
import React, { useEffect } from "react"

import Home from "@/components/Home/Home.js"
import Clicks from "@/components/countClick/clicks"
const Page = () => {
  if(process.env.NODE_ENV !== "development")
  {
    // console.log("running in production");
    
    console.log = () =>{};
    console.debug = () => {};
    console.info = ()=>{};
    console.warn =  ()=>{};
    console.error = ()=>{};
  }
  else{
    console.log("running in development");
    
  }

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
    <>
    <Home/>
    <Clicks/>
     
    </>
  )
}

export default Page
