import Cookies from "js-cookie";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  // console.log(path);

  let isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/qr-code" ||
    path === "/otp-send" ||
    path === "/otp-verify";

  let isPrivatePath =
    path === "/profile" || path === "/courses" || path === "/course/:path*";

  // console.log(isPrivatePath);

  const isAdminPath =
    path === "/dashboard" ||
    path === "/dashboard/users" ||
    path === "/dashboard/courses" ||
    path === "/dashboard/course-detail" ||
    path === "/dashboard/user-detail/:path*" ||
    path === "/dashboard/contact";

  let token = Cookies.get("token");
  if (token) {
    token = true;
  }
  let role = Cookies.get("role");

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminPath && token) {
    if (role.value === "teacher") {
      if (
        path === "/dashboad" ||
        path === "/dashboard/user-detail/:path*" ||
        path === "/dashboard/contact"
      ) {
        return NextResponse.redirect(
          new URL("/dashboard/courses", request.url)
        );
      }
    }
    if (role === "student") {
      if (
        path === "/dashboad" ||
        path === "/dashboard/user-detail/:path*" ||
        path === "/dashboard/contact" ||
        path === "/dashboard" ||
        path === "/dashboard/users" ||
        path === "/dashboard/courses"
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/qr-code",
    "/otp-send",
    "/otp-verify",
    "/profile",
    "/courses",
    "/course/:path*",
    "/dashboard", //protect from teacher
    "/dashboard/users", //protect from student
    "/dashboard/courses", //protect from student
    "/dashboard/course-detail", //protect from student
    "/dashboard/user-detail/:path*", // protect from teacher
    "/dashboard/contact", // protect from teacher
  ],
};
