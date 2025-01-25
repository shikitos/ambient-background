import { PropsWithChildren } from 'react';
import { useDropdown } from '../lib';
import styles from '../Dropdown.module.scss';

type Props = PropsWithChildren;

export const Trigger = ({ children }: Props) => {
  const { toggleDropdown } = useDropdown();
  return (
    <div className={styles.trigger} onClick={toggleDropdown}>
      {children}
    </div>
  );
};
