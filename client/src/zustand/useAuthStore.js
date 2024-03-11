import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  pid: null,
  setPid: (pid) => set({ pid }),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;