'use client';

import { concatClassNames as cn } from 'lib';
import { useSearch } from './libs';
import styles from './SearchBar.module.scss';
import { SpinnerVariants } from 'components/Spinner/types';
import { Overlay, Spinner } from 'components';

export const SearchBar = () => {
  const { onSubmit, isLoading, isFocused, setIsFocused, inputRef } =
    useSearch();

  return (
    <section className={styles.container}>
      <form
        onSubmit={onSubmit}
        className={cn(styles.form, isLoading && styles.loading)}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for the image..."
          className={styles.form__bar}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className={styles.form__button}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner variant={SpinnerVariants.Light} /> Loading...
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
      <Overlay isVisible={isFocused || isLoading} />
    </section>
  );
};
