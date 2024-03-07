import Sidebar from "@/components/MainLayout/Sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex gap-12 p-12">
      <Sidebar />

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default MainLayout;
