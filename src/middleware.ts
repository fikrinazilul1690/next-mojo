// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { getToken } from 'next-auth/jwt';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  // console.log(request.nextUrl.pathname)
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  if (!!token) {
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/dashboard') && token.role === 'customer') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (
      pathname.startsWith('/settings') ||
      pathname === '/my-orders' ||
      pathname === '/order'
    ) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${pathname}`, request.url)
      );
    }
  }
}

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/settings/:path*',
    '/my-orders',
    '/order',
  ],
};
