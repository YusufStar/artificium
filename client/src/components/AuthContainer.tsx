"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<"first" | true | false>("first");
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
      if (
        pathname !== "/login" &&
        pathname !== "/register" &&
        pathname !== "/verify-email" &&
        !user
      ) {
        replace("/login");
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "12px",
            fontSmooth: "always",
            fontWeight: "500",
            fontSize: "14px",
            color: "#fff",
            background: "#333",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
          error: {
            iconTheme: {
              primary: "#FF4842",
              secondary: "#0C1132",
            },
          },
          success: {
            iconTheme: {
              primary: "#B6F09C",
              secondary: "#0C1132",
            },
          },
        }}
      />
      {loading === "first" ? (
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8">Loading...</h1>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );

  if (loading === "first") {
    return;
  } else {
    return <>{children}</>;
  }
};

export default AuthContainer;
