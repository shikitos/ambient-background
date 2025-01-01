'use client';
import styles from './page.module.css';
import { SearchBar } from 'components/SearchBar';
import { Background } from 'components/Background';

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar />
      <Background />
    </main>
  );
}
