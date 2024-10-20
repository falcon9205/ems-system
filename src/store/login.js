import { create } from "zustand";
const useLogin = create((set)=>({
  login : "0",
  setLoginCredential: (value) =>
    set(() => ({
      login: value,
    })),
}))

// import { create } from "zustand";

// const useLogin = create((set) => ({
//   login: "0",  // Corrected the syntax here
//   login_Credential: (value) =>
//     set(() => ({
//       login: value,
//     })),
// }));

export default useLogin; // Don't forget to export the useLogin hook

//  const useLogin = create((set) => ({
//   login: "0",

//   // Function to update login state
//   login_Credential: (value) =>
//     set(() => ({
//       login: value,
//     })),

//   identity: "Admin", // Initial state

//   // Function to update identity state
//   rename: (value) =>
//     set(() => ({
//       identity: value,
//     })),

//   user_ID: null,

//   // Function to set user ID
//   set_User_info: (id) =>
//     set(() => ({
//       user_ID: id,
//     })),
// }));
// export default useLogin
// import { create } from 'zustand'

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

// export default useStore;