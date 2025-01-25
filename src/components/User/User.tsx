'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import styles from './User.module.scss';
import config from 'config/config.json';
import { Dropdown } from 'common';
import { DropdownItems } from './constants';
import { SpotifyService } from 'services/spotify/spotify.service';
import { SpotifyUserProfile } from 'services/spotify/spotify.types';
import { UserSkeleton } from './UserSkeleton';

export const User = () => {
  const [user, setUser] = useState<SpotifyUserProfile | null>(null);

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      const accessToken = getCookie(config.api.spotify.cookies.access_token);
      console.log('getUserData', accessToken);
      if (!accessToken) return;
      const userData = await new SpotifyService(
        accessToken as string
      ).getProfile();
      if (!userData.success) return;
      setUser(userData.data);
    };

    getUserData();
  }, []);

  if (!user) return <UserSkeleton />;
  return (
    <Dropdown items={DropdownItems}>
      <figure className={styles.figure}>
        <Image
          src={user.images[0].url}
          alt={`${user.display_name}'s avatar`}
          width={35}
          height={35}
          className={styles.figure__image}
        />
        <figcaption className={styles.figure__username}>
          {user.display_name}
        </figcaption>
      </figure>
    </Dropdown>
  );
};
