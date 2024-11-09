import { create } from "zustand";
const useLogin = create((set)=>({
  login : "0",

  setLoginCredential: (value) =>
    set(() => ({
      login: value,
    })),

  user_id : "",
  
  set_User_id: (value) =>
    set(() => ({
      user_id: value,
    })), 
}))



export default useLogin;