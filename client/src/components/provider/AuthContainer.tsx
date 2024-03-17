"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LoadingContainer from "../ui/Loading";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<true | false>(true);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user, login, logout } = useAuthStore();

  const getUser = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      try {
        const response = await axios.post("/api/auth", {
          token: token.split("=")[1],
        });

        const { data } = response;

        if (data.action === "success") {
          if (!user) {
            toast.success(data.message);
          }
          login(data.user);
        }

        if (data.action === "error") {
          toast.error(data.message);
          replace(data.url);
        }

        if (data.action === "redirect") {
          replace(data.url);
        }

        if (data.action === "auth") {
          logout();
          if (pathname !== "/login" && pathname !== "/register") {
            replace("/login");
          }
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (
        pathname !== "/login" &&
        pathname !== "/register" &&
        pathname !== "/verify-email" &&
        pathname !== "/forgot-password" &&
        pathname !== "/reset-password" &&
        !user
      ) {
        replace("/login");
      }
    }
  };

  useEffect(() => {
    getUser();

    /*
      const interval = setInterval(getUser, 60000);

      return () => clearInterval(interval);
    */
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
      {loading ? <LoadingContainer setLoading={setLoading} /> : children}
    </>
  );
};

export default AuthContainer;
