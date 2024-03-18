"use client";
import useAuthStore from "@/zustand/useAuthStore";
import React from "react";

const Artificium = () => {
  const { user } = useAuthStore();

  return <div>Artificium</div>;
};

export default Artificium;
