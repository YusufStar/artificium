import "@/styles/globals.css";
import AuthContainer from "@/components/provider/AuthContainer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className="min-h-screen bg-nobbleBlack-100 text-white font-sans antialiased"
      >
        <AuthContainer>{children}</AuthContainer>
      </body>
    </html>
  );
}
