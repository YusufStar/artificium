"use client";
import Icons from "@/icons";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

const LoadingContainer = ({ setLoading }: { setLoading: any }) => {
  const [loadingBar, setLoadingBar] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (loadingBar < 30) {
        // Örneğin, %30'a kadar hızlı ilerlet
        setLoadingBar((prev) => prev + 2); // Hızlı ilerleme
      } else if (loadingBar < 100) {
        // Daha sonra yavaşlat
        setLoadingBar((prev) => prev + 0.5); // Yavaş ilerleme
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // loadingBar'ın 100'den fazla olmasını engellemek için kontrol ekleyelim
  const loadingPercentage = loadingBar > 100 ? 100 : loadingBar;

  useEffect(() => {
    if (loadingPercentage === 100) {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  }, [loadingPercentage]);

  return (
    <div className="bg-nobbleBlack-600 h-screen flex items-center justify-center flex-col gap-6">
      <Icons name="logo" heigh={64} width={64} className="animate-pulse" />

      <div className="w-full max-w-xs h-2 border-2 rounded-full inline-block">
        <div
          className={twMerge(
            "h-full trans-width-200 w-full from-[#82DBF7] transition-[width] bg-gradient-to-tr to-[#B6F09C] rounded-full",
            loadingPercentage === 100 && "animate-pulse"
          )}
          style={{
            width: `${loadingPercentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default LoadingContainer;
