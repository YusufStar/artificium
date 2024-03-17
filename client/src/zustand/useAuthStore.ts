"use client";
import axios from "axios";
import { create } from "zustand";

interface AuthState {
  user: any;
  supabase: any;
  setSupabase: (supabase: any) => void;
  login: (user: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
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
