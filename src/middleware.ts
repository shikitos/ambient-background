import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import appConfig from 'config/config.json';

const protectedRoutes = ['/home'];
const TOKEN = appConfig.api.cookies.spotify.access_token;
export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.pathname;
  const currentUrl = request.url;

  if (nextUrl.startsWith('/_next') || nextUrl === '/favicon.ico') {
    return NextResponse.next();
  }
  const spotifyToken = request.cookies.get(TOKEN);
  console.log(`spotifyToken: "${spotifyToken}"`);
  if (currentUrl === '/' && spotifyToken) {
    console.log('Redirecting to /home');
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.startsWith(route)
  );
  if (isProtectedRoute && !spotifyToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home']
};
