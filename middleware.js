import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    "/signup" ||
    "/qr-code" ||
    "/otp-send" ||
    "/otp-verify";

  const token = request.cookies.get("token") || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/qr-code", "/otp-send", "/otp-verify"],
};
