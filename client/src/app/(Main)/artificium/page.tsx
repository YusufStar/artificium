"use client";
import useAuthStore from "@/zustand/useAuthStore";
import React from "react";

const Artificium = () => {
  const { user } = useAuthStore();

  console.log(user);

  return <div>Artificium</div>;
};

export default Artificium;
