"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "@/zustand/useAuthStore";

const OrganizationCreate = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handlejoin = async () => {
    setLoading(true);
    axios
      .post("/api/organization/create", {
        token: (token as string).split("=")[1],
        name,
      })
      .then((res) => {
        if (res.data.action === "error") {
          setLoading(false);
          toast.error(res.data.message);
        } else {
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user && user.organization) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div>
      <Input
        disabled={loading}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button disabled={loading} onClick={handlejoin}>
        Create
      </Button>
    </div>
  );
};

export default OrganizationCreate;
