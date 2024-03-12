"use client";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import { ChevronDown, Search, Square, Triangle } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import EditProfileDialog from "../Auth/EditProfileDialog";
import NavigationButton from "../ui/navigation-button";
import { useSearchParams } from "next/navigation";

const Sidebar = () => {
  const { user } = useAuthStore();
  const { pid, setPid } = useChatStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    setPid(searchParams?.get("pid"));
  }, [searchParams]);

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
          <span className="font-semibold text-14 2xl:text-16">Intellisys</span>

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

      <div className="py-24 px-2 flex flex-col gap-24 border-b border-[#131619]">
        <span className="text-12 font-semibold text-nobbleBlack-400">
          GENERAL
        </span>

        <div className="flex flex-col gap-2">
          <NavigationButton path="/search" label="Search" icon={Search} />
          <NavigationButton path="/billing" label="Billing" icon={Search} />
        </div>
      </div>

      <div className="py-24 px-2 flex flex-col gap-24 border-b border-[#131619]">
        <span className="text-12 font-semibold text-nobbleBlack-400">
          PROJECTS
        </span>

        <div className="flex flex-col gap-2">
          <NavigationButton
            secondary
            path="/?pid=1"
            label="Orbital Oddysey"
            color="#B6F09C"
            icon={Square}
            active={pid === "1"}
          />
          <NavigationButton
            secondary
            path="/?pid=2"
            label="Digital Product Launch"
            color="#D0302F"
            icon={Triangle}
            active={pid === "2"}
          />
        </div>
      </div>

      {/* Sidebar user info section */}
      <div className="flex w-full h-fit p-16 mt-auto items-center gap-[1rem] glass-fill rounded-16 border-t border-glassStroke">
        <div
          style={{
            backgroundImage: `url(${user?.profilePhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[48px] h-[48px] object-cover rounded-20 cursor-pointer"
        />

        <div className="flex flex-col text-14 2xl:text-16 gap-[0.25rem]">
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
