import { concatClassNames as cn } from 'lib';
import styles from './Spinner.module.scss';
import { SpinnerVariants } from './types';

type Props = {
  variant?: SpinnerVariants;
  className?: string;
};

export const Spinner = ({ variant, className }: Props) => {
  return (
    <div
      className={cn(styles.spinner, variant && styles[variant], className)}
    />
  );
};
