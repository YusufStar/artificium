"use client";
import React from "react";
import Logo from "./Logo";

type Props = {
  width?: number;
  heigh?: number;
  color?: number;
  name: "logo";
};

const IconsData = {
  logo: Logo,
};

const Icons = ({ color, heigh, width, name }: Props) => {
  return React.createElement(IconsData[name], { color, heigh, width });
};

export default Icons;
