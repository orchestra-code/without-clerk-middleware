import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/organizations/:path*",
    "/(api|trpc)(.*)"
  ],
};

export function middleware(req) {
  const url = req.nextUrl;
  console.log(`app route is ${url}`)

  const { pathname } = req.nextUrl;

  const hostname = req.headers.get("host");

  let currentHost = hostname
  .toLowerCase()
  .replace(`.localhost:3000`, "")
  .toLowerCase();

  // rewrites for app pages
  if (!pathname.startsWith("/api")) {
    if (currentHost === "app") {
      // handle users who aren't authenticated
      console.log(`app route is ${url.pathname}`)

      url.pathname = `/app${url.pathname}`;

    } else {
      url.pathname = `/www${url.pathname}`;

    }

    return NextResponse.rewrite(url);
  }
}