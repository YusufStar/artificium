import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthContainer from "@/components/AuthContainer";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
          fontSans.variable
        )}
      >
        <AuthContainer>{children}</AuthContainer>
      </body>
    </html>
  );
}
