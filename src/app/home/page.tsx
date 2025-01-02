import styles from './page.module.css';
import { SearchBar } from 'common/SearchBar';
import { Background } from 'common/Background';
import { User } from 'components/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const spotifyCookies = cookieStore.get('access_token')?.value;

  if (!spotifyCookies) redirect('/');
  return (
    <main className={styles.main}>
      <User />
      <SearchBar />
      <Background />
    </main>
  );
}
