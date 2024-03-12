"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import LoadingContainer from "../ui/Loading";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<true | false>(true);
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user, login, logout } = useAuthStore();
  const router = useRouter();

  const getUser = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      axios
        .post("/api/auth", {
          token: token.split("=")[1],
        })
        .then((res) => {
          if (res.data?.action === "redirect") {
            logout();
            router.push(res.data?.url);
          } else {
            login(res.data);
          }
        })
        .catch((err) => {
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
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    getUser()

    // 1 dakikada bir veriyi güncelle
    const interval = setInterval(getUser, 60000);

    // Temizlik işlemi
    return () => clearInterval(interval);
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
