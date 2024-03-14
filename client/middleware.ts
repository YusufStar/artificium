import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY as string) as {
        id: string;
        email: string;
        organization: any;
      };

      // Kullanıcı varsa ve organizasyon bilgisi yoksa sadece create ve join sayfalarına yönlendir
      if (
        !decoded.organization &&
        request.url !== "/organization/create" &&
        request.url !== "/organization/join"
      ) {
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
    if (
      request.url !== "/login" &&
      request.url !== "/register" &&
      request.url !== "/verify-email"
    ) {
      return NextResponse.redirect("/login");
    }
  }
}
