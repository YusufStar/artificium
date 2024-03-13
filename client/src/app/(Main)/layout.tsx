"use client";
import Sidebar from "@/components/MainLayout/Sidebar";
import TopBar from "@/components/MainLayout/TopBar";
import SocketProvider from "@/components/provider/SocketProvider";
import { usePathname } from "next/navigation";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <SocketProvider>
      <div className="h-screen w-full flex gap-12 p-12">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {pathname === "/billing" || pathname === "/search" ? null : (
            <TopBar />
          )}

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </SocketProvider>
  );
};

export default MainLayout;
