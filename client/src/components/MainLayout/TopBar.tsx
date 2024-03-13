"use client";
import Icons from "@/icons";
import useChatStore from "@/zustand/useChatStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const TopBar = () => {
  const { pid } = useChatStore();
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width?: number;
    height?: number;
    title: string;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    title: "",
  });
  const buttonRefs = React.useRef<HTMLButtonElement[] | null[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (buttonRefs.current.length === 0) return;

    if (pathname === "/artificium") {
      return setPosition({
        x: buttonRefs.current[0]?.offsetLeft || 0,
        y: buttonRefs.current[0]?.offsetTop || 0,
        width: buttonRefs.current[0]?.clientWidth || 0,
        height: buttonRefs.current[0]?.clientHeight || 0,
        title: "Artificium",
      });
    }

    if (pathname === "/chat") {
      return setPosition({
        x: buttonRefs.current[1]?.offsetLeft || 0,
        y: buttonRefs.current[1]?.offsetTop || 0,
        width: buttonRefs.current[1]?.clientWidth || 0,
        height: buttonRefs.current[1]?.clientHeight || 0,
        title: "Chat",
      });
    }

    if (pathname === "/library") {
      return setPosition({
        x: buttonRefs.current[2]?.offsetLeft || 0,
        y: buttonRefs.current[2]?.offsetTop || 0,
        width: buttonRefs.current[2]?.clientWidth || 0,
        height: buttonRefs.current[2]?.clientHeight || 0,
        title: "Library",
      });
    }

    setPosition({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      title: "",
    });
  }, [pathname, buttonRefs]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    title: string
  ) => {
    setPosition({
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop,
      width: e.currentTarget.clientWidth,
      height: e.currentTarget.clientHeight,
      title: title || "",
    });
  };

  return (
    <div className="w-full flex flex-col bg-nobbleBlack-800 rounded-20">
      <div className="flex items-start justify-between h-auto w-full p-24 border-b border-[#131619]">
        <div className="flex flex-col gap-1">
          {/* Project Name */}
          <span className="font-bold text-20">Orbital Oddysey</span>

          {/* Project Descriptiom */}
          <span className="text-14 font-medium text-nobbleBlack-300">
            Marketing Campaign for a new TV series Launch
          </span>
        </div>
      </div>

      <div className="px-24 flex items-center gap-24 relative">
        {/* Bottom bar */}
        <div
          style={{
            display: position.title ? "block" : "none",
            position: "absolute",
            left: position.x,
            top: "calc(100% - 4px)",
            width: position.width,
            height: "4px",
            backgroundColor: "#B6F09C",
            zIndex: 10,
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            transition: "all 0.3s",
          }}
        />

        <Link className="py-6 px-2" href={`/artificium?pid=${pid}`}>
          <button
            ref={(ref) => (buttonRefs.current[0] = ref)}
            onClick={(e) => handleClick(e, "Artificium")}
            className="flex gap-12"
          >
            <Icons name="logo" width={20} heigh={20} color="#B6F09C" />

            <span className="text-nobbleBlack-100 text-14 font-semibold">
              Artificium
            </span>
          </button>
        </Link>

        <Link className="py-6 px-2" href={`/chat?pid=${pid}`}>
          <button
            ref={(ref) => (buttonRefs.current[1] = ref)}
            onClick={(e) => handleClick(e, "Chat")}
            className="flex gap-12"
          >
            <Icons name="logo" width={20} heigh={20} color="#B6F09C" />

            <span className="text-nobbleBlack-100 text-14 font-semibold">
              Chat
            </span>
          </button>
        </Link>

        <Link className="py-6 px-2" href={`/library?pid=${pid}`}>
          <button
            ref={(ref) => (buttonRefs.current[2] = ref)}
            onClick={(e) => handleClick(e, "Library")}
            className="flex gap-12"
          >
            <Icons name="logo" width={20} heigh={20} color="#B6F09C" />

            <span className="text-nobbleBlack-100 text-14 font-semibold">
              Library
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
