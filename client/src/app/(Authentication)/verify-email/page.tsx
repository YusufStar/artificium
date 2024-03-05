"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  const [error, setError] = React.useState<string | null>(null);
  const token = useSearchParams()?.get("token");

  React.useEffect(() => {

      fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then(async (res) => {
        if (res.ok) {
          setError(null);
        } else {
          const data = await res.json();
          setError(data.message);
        }
      }).catch((e) => {
        console.log(e)
        setError(e.message);
      });
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-nobbleBlack-600 p-8 rounded-lg shadow-lg text-white border flex flex-col items-center">
        {error ? (
          <>
            <h1 className="text-3xl font-semibold mb-4">Bir hata oluştu</h1>
            <p className="max-w-md text-center text-red-500 ">{error}</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-4">Email Doğrulandı</h1>
            <p className="mb-4 max-w-md text-center">
              Hesabınız başarıyla doğrulandı. Artık giriş yapabilir ve platformu
              kullanmaya başlayabilirsiniz.
            </p>

            <Button>
              <Link href="/login">😎 Giriş Yap 😎</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
