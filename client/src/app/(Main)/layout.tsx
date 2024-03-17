"use client";
import Sidebar from "@/components/MainLayout/Sidebar";
import TopBar from "@/components/MainLayout/TopBar";
import SocketProvider from "@/components/provider/SocketProvider";
import useAuthStore from "@/zustand/useAuthStore";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    console.log(user?.organization)
    if (!user?.organization) {
      router.replace("/organization/create");
    }
  }, [user]);

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
