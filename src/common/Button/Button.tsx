import { concatClassNames as cn } from 'lib';
import { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import { ButtonVariants } from './types';
import { Spinner } from 'common/Spinner';
import { SpinnerVariants } from 'common/Spinner/types';

type Custom = Partial<{
  disabled: boolean;
  variant: ButtonVariants;
  isLoading: boolean;
  loadingText: string;
}>;
type Props = PropsWithChildren<Custom & HTMLAttributes<HTMLButtonElement>>;

export const Button = ({
  children,
  variant = ButtonVariants.Primary,
  isLoading = false,
  loadingText = 'Loading...',
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={cn(styles.button, variant, props.className)}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? (
        <span className={styles.loading}>
          <Spinner variant={SpinnerVariants.Light} /> {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
