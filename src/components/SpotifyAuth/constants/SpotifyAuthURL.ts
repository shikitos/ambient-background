const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

export const SPOTIFY_AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}` as const;
