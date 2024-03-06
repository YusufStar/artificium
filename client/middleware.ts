import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  if (token) {
    const tokenValue = token.split("=")[1];
    const decoded = jwt.verify(tokenValue, "k9vBAARKs53K3gD7itZPLmo3SmFHczEz");

    if ((req.url === "/login" || req.url === "/register") && decoded) {
      return NextResponse.redirect("/");
    }

    if (req.url === "/" && !decoded) {
      return NextResponse.redirect("/login");
    }
  } else {
    if (req.url !== "/") {
      if (
        req.url !== "/login" &&
        req.url !== "/register" &&
        req.url !== "/verify-email"
      ) {
        return NextResponse.redirect("/login");
      } else {
        return NextResponse.next();
      }
    }
  }
}
