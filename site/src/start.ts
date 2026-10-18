import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Canonicalize the public hostname for portable Cloudflare SSR and Lovable builds.
// Do not redirect staging hosts; they must remain testable before changing DNS.
const canonicalMiddleware = createMiddleware().server(({ request, next }) => {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  if (hostname !== "lavaner.ee" && hostname !== "www.lavaner.ee") return next();
  const requestedProto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  let pathname = url.pathname;
  while (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  if (hostname !== "lavaner.ee" || requestedProto === "http" || pathname !== url.pathname) {
    return Response.redirect(`https://lavaner.ee${pathname}${url.search}`, 301);
  }
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [canonicalMiddleware, errorMiddleware],
}));