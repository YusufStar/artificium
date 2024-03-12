import Sidebar from "@/components/MainLayout/Sidebar";
import SocketProvider from "@/components/provider/SocketProvider";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <div className="h-screen w-full flex gap-12 p-12">
        <Sidebar />

        <div className="flex-1">{children}</div>
      </div>
    </SocketProvider>
  );
};

export default MainLayout;
