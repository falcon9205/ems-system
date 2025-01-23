//we are using zustand as a state management tool
import { create } from "zustand";

export const useLogin = create((set) => ({
  login : "0",
  
  login_Credential : (value)=>set(()=>({
    
    login: value
  
  })),

  
  identity: "", // Initial state

  rename: (value) => set(() => ({
      
     identity: value 
     
    })), // State update function
  
 user_ID : null,
 set_User_info : (id)=>set(()=>({
    user_ID : id
 })),
 
 profile : false,

 profile_setup : (value)=>set(()=>({
   profile : value
 })),

 AllowProfile : false,
 setAllowProfile : (value=>set(()=>({
  AllowProfile : value
 })))

}));
