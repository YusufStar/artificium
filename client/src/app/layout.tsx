import "@/styles/globals.css";
import AuthContainer from "@/components/provider/AuthContainer";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className="h-screen overflow-hidden bg-nobbleBlack-100 text-white font-sans antialiased"
      >
        <SpeedInsights />
        <Analytics />
        <AuthContainer>{children}</AuthContainer>
      </body>
    </html>
  );
}
