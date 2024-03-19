"use client";
import { useMessages, useProject } from "@/lib/api";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Artificium = () => {
  const { user } = useAuthStore();
  const { pid, projects, socket } = useChatStore();
  const params = useSearchParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [currentProject, setCurrentProject] = useState<any>({});

  useEffect(() => {
    if (!user) return;
    const room = projects.find((p) => p.id === pid)?.room;

    if (params?.get("pid")) {
      useMessages(params?.get("pid") as string, setMessages);
    }

    useMessages(room as string, setMessages);
  }, [params, projects, pid, user]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", async (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (user && pid && projects.length > 0) {
      useProject(pid, false).then((data: any[]) => {
        setCurrentProject(data.filter((project) => project.id === pid)[0]);
      });
    }
  }, [pid, user, projects]);

  const handleSendMessage = async () => {
    try {
      const { data } = await axios.post("/api/message", {
        content: message,
        artificiumId: currentProject.artificiumId,
        userId: user?.id,
      });
      if (data) {
        socket?.emit("send-message", pid, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {messages.map((message, index) => {
        return (
          <div key={index} className="flex flex-col">
            <p>{message.content}</p>
            <p>{message.author?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Artificium;
