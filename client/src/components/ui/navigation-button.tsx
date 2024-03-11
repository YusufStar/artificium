import { cn, isActivePath } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  label: string;
  icon?: LucideIcon;
  path: string;
  secondary?: boolean;
  color?: string;
  active?: boolean;
};

const NavigationButton = (props: Props) => {
  const pathname = usePathname() as string;

  return (
    <Link
      className={cn(
        "border-t rounded-8 p-14 gap-16 flex items-center transition-all duration-200 ease-in-out",
        isActivePath(pathname, props.path)
          ? "bg-[#131619] border-glassStroke"
          : props.secondary && props.active
          ? "bg-[#131619] glass-fill"
          : "bg-nobbleBlack-800 border-t-nobbleBlack-800"
      )}
      href={props.path}
    >
      {props.icon && (
        <props.icon
          color={props.color ? props.color : "#686B6E"}
          className="w-[1.25rem] h-[1.25rem] drop-shadow-icon"
        />
      )}
      <span className="font-semibold text-14 text-nobbleBlack-100">
        {props.label}
      </span>
    </Link>
  );
};

export default NavigationButton;
