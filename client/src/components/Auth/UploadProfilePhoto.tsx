"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/zustand/useAuthStore";
import { ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

function UploadProfilePhoto() {
  const { user } = useAuthStore();
  const supabase = createClient(
    "https://slevyapzeslflvibhaub.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZXZ5YXB6ZXNsZmx2aWJoYXViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTMwODk3NywiZXhwIjoyMDI0ODg0OTc3fQ.iSEd5hJ46VGKLHQxZRvK2qJ6HF_PlLujml1ivTgMoyA"
  );

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const uploadFile = async (file: File) => {
    const random_name = Math.random().toString(36).substring(7);
    const upload = await supabase.storage
      .from("avatars")
      .upload(`${user.firstName}_${user.lastName}/${random_name}`, file);

    /*
      upload type
      {
        path: string:
        id: string:
        fullPath: string:
    }
      */

    if (upload.error) {
      setError(upload.error.message);
      return;
    }

    await supabase
      .from("User")
      .update({
        profilePhoto: `https://slevyapzeslflvibhaub.supabase.co/storage/v1/object/public/${upload.data.fullPath}`,
      })
      .eq("id", user.id);

      location.reload()
  };

  const fileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      setError("Only one image is allowed");
      return;
    }
    if (files.length === 0) {
      setError("No file is uploaded");
      return;
    }

    await uploadFile(files[0]);

    setDragging(false);
  };

  const fileInputClicked = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {user?.profilePhoto === "" ? (
          <div className="w-min h-min mb-2 rounded-full mx-auto flex items-center p-16 justify-center border hover:bg-nobbleBlack-800 transition-all duration-200 cursor-pointer">
            <ImageIcon
              width={24}
              height={24}
              color="#686B6E"
              strokeWidth={1.5}
            />
          </div>
        ) : (
          <div className="w-fit h-fit mb-2 rounded-full mx-auto flex items-center p-16 justify-center border hover:bg-nobbleBlack-800 transition-all duration-200 cursor-pointer">
            <img
              src={user?.profilePhoto}
              alt={user?.firstName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="profile"
              className="w-[48px] h-[48px] object-cover rounded-20 mx-auto"
            />
          ) : (
            <div
              className="w-full h-32 border-dashed border-2 border-nobbleGray-100 rounded-lg flex items-center justify-center cursor-pointer"
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              onClick={fileInputClicked}
            >
              <input
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
              <div className="flex flex-col items-center gap-2">
                <ImageIcon width={24} height={24} color="#686B6E" />
                <p className="text-nobbleGray-600 text-xs font-semibold">
                  Drag and drop your photo here
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadProfilePhoto;
