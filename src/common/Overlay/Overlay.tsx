'use client';

import { memo, useRef, useEffect, useState } from 'react';
import styles from './Overlay.module.scss';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';

type Props = {
  isVisible: boolean;
};

export const Overlay = memo(function Overlay({ isVisible }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames={{
        enter: styles.overlay__enter,
        enterActive: styles.overlay__enterActive,
        enterDone: styles.overlay__enterDone,
        exit: styles.overlay__exit,
        exitActive: styles.overlay__exitActive,
        exitDone: styles.overlay__exitDone
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={styles.overlay} />
    </CSSTransition>,
    document.body
  );
});
