"use client";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/zustand/useAuthStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useAuthStore();

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen w-full flex p-24 items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome, {user?.firstName} {user?.lastName}
          <br />
          Email: {user?.email}
        </h1>
        <Button
          onClick={() => {
            toast.error('Welcome to the artificium')
            toast.success('Welcome to the hell')
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
