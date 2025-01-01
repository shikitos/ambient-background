'use client';

import { useStore } from 'store';
import Image from 'next/image';
import styles from './Background.module.scss';

export const Background = () => {
  const { background } = useStore();

  if (!background) return null;
  return (
    <Image
      className={styles.background}
      src={background}
      width={1920}
      height={1080}
      alt=""
    />
  );
};
