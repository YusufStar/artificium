"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  const token = useSearchParams()?.get("token");

  React.useEffect(() => {
    if (token) {
      console.log("token", token);
    }
  }, [token]);
  
  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
