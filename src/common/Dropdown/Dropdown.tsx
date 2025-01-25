'use client';

import { DropdownProvider } from './providers';
import { PropsWithChildren } from 'react';
import { Menu, Trigger } from './components';
import styles from './Dropdown.module.scss';

type Item = {
  label: string;
  onClick: () => void;
};

type Props = PropsWithChildren<{
  items: Item[];
}>;

export const Dropdown = ({ items, children }: Props) => (
  <DropdownProvider>
    <div className={styles.container}>
      <Trigger>{children}</Trigger>
      <Menu items={items} />
    </div>
  </DropdownProvider>
);
