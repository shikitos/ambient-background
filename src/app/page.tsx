import { cookies } from 'next/headers';
import { SpotifyAuth } from '../components/SpotifyAuth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const spotifyCookies = cookieStore.get('access_token')?.value;

  if (spotifyCookies) redirect('/home');
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
