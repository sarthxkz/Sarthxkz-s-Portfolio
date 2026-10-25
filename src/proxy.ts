import { NextResponse, type NextRequest } from "next/server";
import { caseStudies } from "@/content/projects";

const slugs = new Set(caseStudies.map((p) => p.slug));

// Unknown case-study slugs get a real 404 status. With Cache Components the page
// shell starts streaming before the page can call notFound(), which would leave
// the status at 200, so the check happens here, before rendering.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  // Files in public/work (screenshots, marks) share the /work prefix: pass them through.
  if (slug && !slug.includes(".") && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/work/:slug",
};
