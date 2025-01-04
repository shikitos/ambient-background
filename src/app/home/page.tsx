import styles from './page.module.css';
import { SearchBar } from 'common/SearchBar';
import { Background } from 'common/Background';
import { User } from 'components/User';

export default async function Home() {
  return (
    <main className={styles.main}>
      <User />
      <SearchBar />
      <Background />
    </main>
  );
}
