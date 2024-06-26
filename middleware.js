import { NextResponse } from "next/server";
import toast from "react-hot-toast";

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

  let token = request.cookies.get("token") || "";
  let role = request.cookies.get("role") || "";

  if (isPrivatePath && !token) {
    toast.error("Login to access these resources");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminPath && !token) {
    toast.error("Login to access");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminPath && token) {
    if (role.value === "teacher") {
      if (
        path === "/dashboad" ||
        path === "/dashboard/user-detail/:path*" ||
        path === "/dashboard/contact"
      ) {
        toast.error("Unauthorized");
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
        toast.error("Unauthorized");
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
