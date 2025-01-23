const { NextResponse } = require("next/server");
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id : process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret : process.env.NEXT_PUBLIC_RAZORPAY_SECRET
})

export async function POST (req){
  
    
   try {
    console.log("route.js raozr");
       const order = await razorpay.orders.create({
        amount : 99*100,
        currency : "INR",
        receipt : "receipt_"+Math.random().toString(36).substring(7),
       })

       return NextResponse.json({orderId:order.id},{status:200})
   } catch (error) {
     console.log(error);
     return NextResponse.json({error:"error"},{status:500})     
   }
}