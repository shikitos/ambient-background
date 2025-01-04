import { NextRequest, NextResponse } from 'next/server';
import config from 'config/config.json';

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url));

  response.cookies.set(config.api.cookies.spotify.access_token, '', {
    maxAge: 0,
    path: '/'
  });
  response.cookies.set(config.api.cookies.spotify.refresh_token, '', {
    maxAge: 0,
    path: '/'
  });

  return response;
}
