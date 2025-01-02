'use client';

import { Button } from 'common';
import { memo, useState } from 'react';
import { SPOTIFY_AUTH_URL } from './constants';
import { useRouter } from 'next/navigation';

export const SpotifyAuth = memo(function SpotifyAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push(SPOTIFY_AUTH_URL);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Button onClick={handleClick} isLoading={loading}>
        Login with Spotify
      </Button>
    </div>
  );
});
