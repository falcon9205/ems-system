"use client"
import Script from 'next/script'
import Razorpay from 'razorpay'
import React, { useState } from 'react'

const page = () => {
    const [amount , setamount] = useState()
    const [isProcessing,setIsProcessing] = useState(false)

    const handlePayment = async()=>{
        setIsProcessing(true)
        try {
            const res = await fetch("/api/create-order", {
                method: "POST"
              });
           const data = await res.json()
           const options = {
             key : process.env.NEXT_PUBLIC_RAZORPAY_ID,
             amount : amount*100,
             currency : "INR",
             name :"ilearnings",
             description : "testing razorpay transaction",
             order_id : data.orderId,
             handler : function (res){
                console.log("payment successfull",res);
                
             },
             prefill: {
                name : "john doe",
                email : "data@gmail.com",
                contact : "99999999999",
             },
             theme : {
                color : "#3399cc"
             },
           }
const rzp1 = new window.Razorpay(options);
rzp1.open()
        } catch (error) {
            console.error("payment failed",error)
        }
        finally{
            setIsProcessing(false)
        }
    }
  return (
    <>
         <div className='py-44 text-white'>
            <Script src='https://checkout.razorpay.com/v1/checkout.js'/>
            <h1>Payment Page</h1>
            <p>Amount to be paid {amount}</p>
            <button
            onClick={handlePayment}
            disabled= {isProcessing}
            >
           {isProcessing ? "Processing...":"Pay Now"}
            </button>
         </div>
    </>
  )
}

export default page
