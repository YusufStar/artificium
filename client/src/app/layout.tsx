import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthContainer from "@/components/provider/AuthContainer";

export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext", "cyrillic-ext"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-nobbleBlack-100 text-white font-sans antialiased",
          fontSans.className
        )}
      >
        <AuthContainer>{children}</AuthContainer>
      </body>
    </html>
  );
}
