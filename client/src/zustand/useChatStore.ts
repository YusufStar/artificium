import { create } from "zustand";
import { Socket } from "socket.io-client";

interface ChatState {
  pid: string | null;
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  setPid: (pid: string) => void;
  projects: any[];
  setProjects: (projects: any[]) => void;
  room: string | null;
  setRoom: (room: string | null) => void;
}

const useChatStore = create<ChatState>()((set) => ({
  pid: null,
  socket: null,
  setSocket: (socket) => set({ socket }),
  setPid: (pid) => set({ pid }),
  projects: [],
  setProjects: (projects) => set({ projects }),
  room: null,
  setRoom: (room) => set({ room }),
}));

export default useChatStore;
