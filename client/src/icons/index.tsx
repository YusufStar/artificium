"use client";
import React from "react";
import Logo from "./Logo";

type Props = {
  width?: number;
  heigh?: number;
  color?: string;
  name: "logo";
  className?: string;
};

const IconsData = {
  logo: Logo,
};

const Icons = ({ color, heigh, width, name, className }: Props) => {
  const Icon = IconsData[name];

  return (
    <Icon color={color} heigh={heigh} width={width} className={className} />
  );
};

export default Icons;
