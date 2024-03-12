import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  supabase: null,
  setSupabase: (supabase) => set({ supabase }),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
