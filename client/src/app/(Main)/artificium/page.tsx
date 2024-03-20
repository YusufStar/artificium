"use client";
import Message from "@/components/ui/Message";
import MessageInput from "@/components/ui/MessageInput";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !currentProject?.Artificium?.room) return;
    setLoading(true);

    useMessages(
      currentProject?.Artificium?.room as string,
      setMessages
    ).finally(() => {
      setLoading(false);
    });
  }, [currentProject]);

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
    if (!message) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/message", {
        content: message,
        artificiumId: currentProject?.Artificium?.id,
        userId: user?.id,
      });
      if (data) {
        socket?.emit("send-message", currentProject?.Artificium?.room, data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex h-full max-w-full w-full overflow-hidden flex-col gap-12">
      <div className="flex flex-1 flex-col overflow-y-auto gap-16">
        {messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
      </div>

      <MessageInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        soundRecord={true}
        type="text"
        fileInput={true}
        placeholder="Type your message..."
        onSubmit={handleSendMessage}
        loading={loading}
        key={pid}
      />
    </div>
  );
};

export default Artificium;
