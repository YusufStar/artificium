"use client";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import React, { useEffect } from "react";
import { Socket, io } from "socket.io-client";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { socket, setSocket, pid } = useChatStore();

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", pid, user?.id);
    }
  }, [pid]);

  return children;
};

export default SocketProvider;
