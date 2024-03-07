import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="w-[19.5rem] h-full bg-nobbleBlack-800 rounded-20 flex flex-col p-[0.5rem]">
      <div className="flex w-full h-fit p-24 items-center gap-[1rem]">
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
            <span className="font-semibold">
                Intellisys
            </span>

            {/* Organization member length */}
            <span className="text-stemGreen-500 text-14 font-medium">
                12 members
            </span>
        </div>

        <ChevronDown width={20} height={20} color="#686B6E" className="ml-auto" strokeWidth={3}/>
      </div>
    </div>
  );
};

export default Sidebar;
