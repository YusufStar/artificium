import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req, event) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      
      // Kullanıcı varsa ve organizasyon bilgisi yoksa sadece create ve join sayfalarına yönlendir
      if (!decoded.organization && (req.url !== "/organization/create" && req.url !== "/organization/join")) {
        return NextResponse.redirect("/organization/join");
      }
      
      // Kullanıcı varsa ve organizasyon bilgisi varsa herhangi bir yönlendirme yapma
      if (decoded.organization) {
        return NextResponse.next();
      }
    } catch (error) {
      // Token geçersizse veya hatalıysa login sayfasına yönlendir
      return NextResponse.redirect("/login");
    }
  } else {
    // Token yoksa sadece login ve register sayfalarına erişime izin ver
    if (req.url !== "/login" && req.url !== "/register" && req.url !== "/verify-email") {
      return NextResponse.redirect("/login");
    }
  }
}
