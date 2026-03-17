import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

// Define protected and public routes
const protectedRoutes = ['/', '/profile', '/cart', '/orders'];
const adminRoutes = ['/admin'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(r => path === r || path.startsWith(r + '/'));
  const isAdminRoute = adminRoutes.some(r => path === r || path.startsWith(r + '/'));
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // 1. Redirect unauthenticated users
  if ((isProtectedRoute || isAdminRoute) && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect authenticated users away from public routes (login/register)
  if (isPublicRoute && session?.userId) {
    if (session.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 3. Protect Admin routes from regular employees
  if (isAdminRoute && session?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\\\.png$).*)'],
};
