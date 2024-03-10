"use client";
import useAuthStore from "@/zustand/useAuthStore";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import EditProfileDialog from "../Auth/EditProfileDialog";

type Props = {};

const Sidebar = (props: Props) => {
  const { user } = useAuthStore();

  return (
    <div className="w-[19.5rem] h-full bg-nobbleBlack-800 rounded-20 flex flex-col p-[0.5rem]">
      {/* Sidebar organization info section */}
      <div className="flex w-full h-fit p-24 items-center gap-[1rem] border-b border-[#131619]">
        <Image
          src="/static_images/Avatar.png"
          alt=""
          width={48}
          height={48}
          quality={100}
          className="rounded-20"
        />

        <div className="flex flex-col gap-[0.25rem]">
          {/* Organization Name */}
          <span className="font-semibold">Intellisys</span>

          {/* Organization member length */}
          <span className="text-stemGreen-500 text-12 font-medium">
            12 members
          </span>
        </div>

        <ChevronDown
          width={16}
          height={16}
          color="#686B6E"
          className="ml-auto"
          strokeWidth={3}
        />
      </div>

      {/* Sidebar user info section */}
      <div className="flex w-full h-fit p-16 mt-auto items-center gap-[1rem] glass-fill rounded-16">
        <div
          style={{
            backgroundImage: `url(${user?.profilePhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[48px] h-[48px] object-cover rounded-20 cursor-pointer"
        />

        <div className="flex flex-col gap-[0.25rem]">
          {/* User Name */}
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>

          {/* Organization member length */}
          <span className="text-stemGreen-500 text-12 font-medium">
            Premium
          </span>
        </div>

        <EditProfileDialog />
      </div>
    </div>
  );
};

export default Sidebar;
