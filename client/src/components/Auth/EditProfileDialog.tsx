"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CogIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/zustand/useAuthStore";
import axios from "axios";
import { turkishToEnglish } from "@/lib/utils";

function EditProfileDialog() {
  const { user, logout, login, supabase } = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token) {
      axios
        .post("/api/auth", {
          token: token.split("=")[1],
        })
        .then((res) => {
          if (res.data.action === "redirect") {
            logout();
          } else {
            login(res.data);
          }
        })
        .finally(() => setLoading(false));
    }

    setLoading(false);
  };

  const uploadFile = async (file: File) => {
    setLoading(true);
    const random_name = Math.random().toString(36).substring(7);
    const upload = await supabase.storage
      .from("avatars")
      .upload(
        `${turkishToEnglish(user.firstName).replace(
          " ",
          "_"
        )}_${turkishToEnglish(user.lastName).replace(" ", "_")}/${random_name}`,
        file
      );

    /*
      upload type
      {
        path: string:
        id: string:
        fullPath: string:
    }
      */

    if (upload.error) {
      setLoading(false);
      return;
    }

    setProfilePhoto(
      `https://slevyapzeslflvibhaub.supabase.co/storage/v1/object/public/${upload.data.fullPath}`
    );
    setLoading(false);
  };

  const fileInputClicked = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setProfilePhoto(user.profilePhoto);
    }
  }, [user]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full ml-auto bg-transparent border-none"
        >
          <CogIcon width={24} height={24} color="#686B6E" strokeWidth={1.5} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            disabled={loading}
            type="file"
            id="fileInput"
            className="hidden"
            onChange={async (e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                await uploadFile(file);
              }
            }}
          />
          <div
            onClick={fileInputClicked}
            style={{
              backgroundImage: `url(${profilePhoto})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-disabled={loading}
            className="w-[64px] h-[64px] object-cover rounded-20 mx-auto cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
          />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First name
            </Label>
            <Input
              disabled={loading}
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last name
            </Label>
            <Input
              disabled={loading}
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              disabled={loading}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            {/* firstName, lastName, email veya profilePhoto orjinal data yani user'daki hallerinden farkli ise disabled false */}
            <Button
              disabled={
                firstName === user?.firstName &&
                lastName === user?.lastName &&
                email === user?.email &&
                profilePhoto === user?.profilePhoto &&
                !loading
              }
              onClick={async () => {
                setLoading(true);
                await supabase
                  .from("User")
                  .update({
                    firstName,
                    lastName,
                    email,
                    profilePhoto,
                  })
                  .eq("id", user.id)
                  .then(() => getUser());
                setLoading(false);
              }}
              type="submit"
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;
