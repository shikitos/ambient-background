import { SpotifyAuth } from '../components/SpotifyAuth';

export default async function Page() {
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
      <SpotifyAuth />
    </div>
  );
}
