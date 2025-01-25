import { PropsWithChildren } from 'react';
import styles from './layout.module.scss';
import { Background } from 'common';
import { User } from 'components/User';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className={styles.header}>
        <User />
      </header>
      <main className={styles.main}>
        {children}
        <Background />
      </main>
    </>
  );
}
