"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from "next/navigation";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<"first" | true | false>(false);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user, login } = useAuthStore();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      axios
        .post("/api/auth", {
          token: token.split("=")[1],
        })
        .then((res) => {
          setLoading(false);
          login(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      if (pathname !== "/login" && pathname !== "/register" && !user) {
        replace("/login");
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading === "first") {
    return <div>Loading...</div>;
  } else {
    return <>{children}</>;
  }
};

export default AuthContainer;
