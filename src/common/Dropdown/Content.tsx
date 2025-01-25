'use client';

import { CSSTransition } from 'react-transition-group';
import { useDropdown } from './lib';
import { PropsWithChildren, useRef } from 'react';
import styles from './Dropdown.module.scss';

type Item = {
  label: string;
  onClick: () => void;
};

type Props = PropsWithChildren<{
  items: Item[];
}>;

export const Content = ({ children, items }: Props) => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const nodeRef = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.container__trigger} onClick={toggleDropdown}>
        {children}
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enter: styles.enter,
          enterActive: styles['enter-active'],
          exit: styles.exit,
          exitActive: styles['exit-active']
        }}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <ul className={styles.dropdown} ref={nodeRef}>
          {items.map((item, index) => (
            <li key={index} className={styles['dropdown-item']}>
              <button
                className={styles['dropdown-item__button']}
                onClick={() => {
                  item.onClick();
                  closeDropdown();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};
