import { memo, useRef } from 'react';
import styles from './Overlay.module.scss';
import { CSSTransition } from 'react-transition-group';

type Props = {
  isVisible: boolean;
};

export const Overlay = memo(function Overlay({ isVisible }: Props) {
  const nodeRef = useRef(null);

  return (
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
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className={styles.overlay} />
    </CSSTransition>
  );
});
