'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { fetchUserProfile } from 'lib';
import styles from './User.module.scss';
import config from 'config/config.json';
import { Dropdown } from 'common';
import { DropdownItems } from './constants';

type User = {
  username: string;
  avatar: string;
}
export const User = () => {
  const [user, setUser] = useState<User | null>(
    null
  );

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      const accessToken = getCookie(config.api.cookies.spotify.access_token);
      console.log('getUserData', accessToken);
      if (!accessToken) return;
      const userData = await fetchUserProfile(accessToken as string);
      setUser(userData);
    };

    getUserData();
  }, []);

  if (!user) return null;
  return (
    <Dropdown items={DropdownItems}>
      <figure className={styles.figure}>
        <Image
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          width={35}
          height={35}
          className={styles.figure__image}
        />
        <figcaption className={styles.figure__username}>
          {user.username}
        </figcaption>
      </figure>
    </Dropdown>
  );
};
