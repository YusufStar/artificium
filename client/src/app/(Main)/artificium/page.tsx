"use client";
import Message from "@/components/ui/Message";
import MessageInput from "@/components/ui/MessageInput";
import { useMessages, useProject } from "@/lib/api";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VList, VListHandle } from "virtua";

const Artificium = () => {
  const { user } = useAuthStore();
  const { pid, projects, socket } = useChatStore();
  const virtualRef = React.useRef<VListHandle | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [currentProject, setCurrentProject] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (virtualRef.current) {
      virtualRef.current.scrollToIndex(messages.length - 1, {
        align: "end",
        smooth: true,
      });
    }
  }, [messages, virtualRef]);

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
    const securityRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (securityRegex.test(message)) {
      setLoading(false);
      setMessage("");
      toast.error("Your message contains a script tag, please remove it.");
      return;
    }

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
      <VList reverse ref={virtualRef} className="flex flex-1 flex-col gap-16">
        {messages.map((msg) => (
          <Message className="my-8" key={msg.id} message={msg} />
        ))}
      </VList>

      <MessageInput
        setValue={setMessage}
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
