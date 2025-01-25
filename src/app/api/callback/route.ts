import { NextResponse } from 'next/server';
import appConfig from 'config/config.json';
import { SpotifyService } from 'services/spotify/spotify.service';

const COOKIES = appConfig.api.spotify.cookies;
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url || '');
  const code = searchParams.get('code');
  const spotifyService = new SpotifyService('');

  if (!code) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
  }

  console.log('code: ', code);

  try {
    const response = await spotifyService.authorize(code);
    console.log('@#@@ response: ', response);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    const { access_token, refresh_token, expires_in } = response.data;

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
