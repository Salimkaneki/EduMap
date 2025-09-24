import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware executed for:', request.nextUrl.pathname);

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/admin'];

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  console.log('Is protected route:', isProtectedRoute);

  if (isProtectedRoute) {
    // Check for admin token in cookies
    const adminToken = request.cookies.get('admin_token')?.value;
    console.log('Admin token present:', !!adminToken);

    if (!adminToken) {
      console.log('Redirecting to sign-in');
      // Redirect to sign-in page
      const signInUrl = new URL('/auth/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }

    // Optionally, you can validate the token here by making a request to your API
    // For now, just check if token exists
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
