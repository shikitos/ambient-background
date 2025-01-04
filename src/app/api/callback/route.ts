import { NextResponse } from 'next/server';
import appConfig from 'config/config.json';

const COOKIES = appConfig.api.cookies.spotify;
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url || '');
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
      })
    });

    if (!response.ok) throw new Error('Failed to exchange authorization code');

    const { access_token, refresh_token, expires_in } = await response.json();

    const responseWithCookies = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/success`
    );
    responseWithCookies.cookies.set(COOKIES.access_token, access_token, {
      sameSite: 'strict',
      maxAge: expires_in
    });
    responseWithCookies.cookies.set(COOKIES.refresh_token, refresh_token, {
      sameSite: 'strict'
    });

    return responseWithCookies;
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
  }
}
