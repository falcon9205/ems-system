//we are using zustand as a state management tool
import { create } from "zustand";

export const tags = create((set) => ({
  tagline: "1",

  setTagline: (value) =>
    set(() => ({
      tagline : value,
    })),

  
}));
