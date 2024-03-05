"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex p-24 items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to the Next.js Starter
        </h1>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
