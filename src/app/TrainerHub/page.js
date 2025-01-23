"use client"
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
const Page = () => {
   const [data,setData] = useState([])
   const fetchdata = async()=>{
    console.log("running ");
    const res = await fetch(`/api/trainer_profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Data coming from db:", data.trainerProfiles);
      setData(data.trainerProfiles)
   }
   useEffect(()=>{
    
    fetchdata()
   },[])

  return (
    <>
     <div className='my-20'>
        <h1 className='font-bold text-center text-2xl md:text-5xl mb-10'>Our Trainers</h1>
        <section className='grid grid-cols-1 gap-y-5 md:grid-cols-3 gap-x-2 md:mx-10'>
          {data.map((trainer)=>(
            <div key={trainer._id} className='bg-gray-100 border space-y-4 text-center justify-center mx-auto px-10 rounded-lg py-5'>
                <img className='md:h-44 md:w-44 h-44 w-44  rounded-full mx-auto object-cover' src={trainer.imageUrl} alt='trainer_image'/>
                 <h1 className='text-lg md:text-xl font-bold'>{trainer.fullname}</h1>
                 <h1 className='text-xs font-semibold md:text-sm bg-gray-300 rounded-full py-1'>{trainer.AreaOfExpertise}</h1>
                 <h1 className='text-xs font-semibold pb-2 md:text-sm'>Experience : {trainer.experience}</h1>
                <Link href="/Contact"> <button className='bg-gradient-to-r from-blue-500 to-blue-800 hover:text-gray-300 text-gray-100 rounded-md px-2 py-1'>Get Trainer</button></Link>
            </div>
          
          ))}  </section>
     </div>
    </>
  )
}

export default Page
