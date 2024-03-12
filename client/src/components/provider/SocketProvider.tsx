"use client";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect } from "react";
import { Socket, io } from "socket.io-client";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setSupabase } = useAuthStore();
  const { socket, setSocket, pid } = useChatStore();

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET as string);
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

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_KEY as string
    );

    setSupabase(supabase);
  }, []);

  return children;
};

export default SocketProvider;
