import { concatClassNames } from 'lib';
import styles from './Skeleton.module.scss';

type SkeletonProps = {
  className?: string;
  variant?: 'rect' | 'circle';
};

export const Skeleton = ({ className, variant = 'rect' }: SkeletonProps) => {
  return (
    <div
      className={concatClassNames(styles.skeleton, styles[variant], className)}
    />
  );
};
