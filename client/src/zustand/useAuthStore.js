"use client";
import axios from "axios";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  supabase: null,
  setSupabase: (supabase) => set({ supabase }),
  login: (user) => set({ user }),
  logout: () => {
    axios.post("/api/auth/logout");
    window.location.reload;
    set({ user: null });
  },
}));

export default useAuthStore;
