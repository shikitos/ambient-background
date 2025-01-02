import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('Received request:', req.method, req.url);
  const { searchParams } = new URL(req.url || '');
  const code = searchParams.get('code');

  if (!code) {
    console.log('Missing authorization code');
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    );
  }

  try {
    console.log('Exchanging authorization code for tokens');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
      })
    });

    if (!response.ok) {
      console.error('Failed to exchange authorization code:', response);
      throw new Error('Failed to exchange authorization code');
    }

    const data = await response.json();
    const { access_token, refresh_token, expires_in } = data;

    console.log('Successfully exchanged authorization code for tokens');

    console.log(`Redirecting to ${process.env.NEXT_PUBLIC_BASE_URL}/home`);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/home`, {
      headers: {
        'Set-Cookie': [
          `access_token=${access_token}; SameSite=Strict;  Secure; Max-Age=${expires_in}`,
          `refresh_token=${refresh_token}; SameSite=Strict; Secure`
        ].join(', ')
      }
    });
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    return NextResponse.json(
      { error: 'Failed to exchange authorization code' },
      { status: 500 }
    );
  }
}
