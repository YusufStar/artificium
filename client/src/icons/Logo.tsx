import React from "react";

const Logo = ({
  color,
  heigh,
  width,
  className,
}: {
  width?: number;
  heigh?: number;
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      width={width || 34}
      height={heigh || 34}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.0838 8.6578L32.6099 27.7157C33.8235 30.1435 32.0586 33 29.345 33H23.0838M23.0838 8.6578L20.2649 3.0184C18.9197 0.327197 15.0803 0.327199 13.7351 3.01841L1.39008 27.7157C0.176548 30.1435 1.94143 33 4.65496 33H10.9162M23.0838 8.6578L17 14.7434M10.9162 33H23.0838M10.9162 33L4.83249 26.9145M23.0838 33L10.9162 20.8289M17 14.7434L32.5136 30.2615M17 14.7434L10.9162 20.8289M1.48642 30.2615L4.83249 26.9145M4.83249 26.9145L10.9162 20.8289"
        stroke="url(#paint0_linear_610_500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_610_500"
          x1="1"
          y1="33"
          x2="33"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#82DBF7" />
          <stop offset="1" stopColor="#B6F09C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
