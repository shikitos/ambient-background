import { useDropdown } from '../lib';
import { Transition } from 'react-transition-group';
import styles from '../Dropdown.module.scss';
import { useRef } from 'react';

type Props = {
  items: { label: string; onClick: () => void }[];
};

export const Menu = ({ items }: Props) => {
  const { isOpen, closeDropdown } = useDropdown();
  const nodeRef = useRef(null);

  return (
    <Transition
      in={isOpen}
      timeout={300}
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <ul ref={nodeRef} className={`${styles.menu} ${styles[state]}`}>
          {items.map((item, index) => (
            <li key={index} className={styles['menu-item']}>
              <button
                className={styles['menu-item__button']}
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
      )}
    </Transition>
  );
};
