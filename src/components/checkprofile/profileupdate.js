import { useLogin } from '@/store/login'
import React, { useEffect } from 'react'
import Cookies from "js-cookie";

const profileupdate = () => {
    const { identity, user_ID, profile, profile_setup } = useLogin((state) => ({
        identity: state.identity,
        user_ID: state.user_ID,
        profile: state.profile,
        profile_setup: state.profile_setup,
      }));

     useEffect(() => {
        
        
        fetchprofile()
      }, [identity, user_ID, profile]); 

      const fetchprofile = async()=>{
        try {
          if (identity === "candidate") {
            const res = await fetch(`/api/candidate_profile?user_ID=${user_ID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
              },
            });
  
            // Check if the response is OK (status in the range 200-299)
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
  
            const data = await res.json();
            console.log("Data coming from db:", data.candidateProfile);
  
            profile_setup(true)
          } else if (identity === "trainer") {
            const res = await fetch(`/api/trainer_profile?user_ID=${user_ID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
              },
            });
  
            // Check if the response is OK (status in the range 200-299)
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
  
            const data = await res.json();
            console.log("Data coming from db:", data);
  
            profile_setup(true)
          } else if (identity === "recruiter") {
            const res = await fetch(`/api/recuiter_profile?user_ID=${user_ID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
              },
            });
  
            // Check if the response is OK (status in the range 200-299)
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
  
            const data = await res.json();
            console.log("Data coming from db:", data);
  
            profile_setup(true)
          } else if (identity === "referral") {
            const res = await fetch(`/api/referral_profile?user_ID=${user_ID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": process.env.NEXT_PUBLIC_FRONTEND,
              },
            });
  
            // Check if the response is OK (status in the range 200-299)
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            profile_setup(true)
  
            
          }
        } catch (error) {
          setIsOpen(true);
          setMsg(
            "Welcome to iLearnings! To get started, please create your profile by providing the following details:"
          );
          // You can set a loading state or an error message here if needed
        }
      }

  return (
    <>
    </>
  )
}

export default profileupdate
