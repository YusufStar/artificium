"use client";
import { useProject } from "@/lib/api";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setSupabase } = useAuthStore();
  const { socket, setSocket, pid, projects } = useChatStore();
  const [currentProject, setCurrentProject] = useState<any>({});

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user && pid && projects.length > 0) {
      useProject(pid, false).then((data: any[]) => {
        setCurrentProject(data.filter((project) => project.id === pid)[0]);
      });
    }
  }, [pid, user, projects]);

  useEffect(() => {
    if (socket && user && currentProject?.Artificium?.id) {
      socket.emit("join-room", currentProject?.Artificium?.room, user?.id);
    }
  }, [currentProject]);

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
