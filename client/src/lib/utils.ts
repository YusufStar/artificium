import { type ClassValue, clsx } from "clsx";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActivePath(path: string, pathname: string) {
  return path === pathname;
}

export function turkishToEnglish(str: string) {
  const turkishChars = "ÇçĞğİıÖöŞşÜü";
  const englishChars = "CcGgIiOoSsUu";

  return str.replace(
    /[ÇçĞğİıÖöŞşÜü]/g,
    (match) => englishChars[turkishChars.indexOf(match)]
  );
}
