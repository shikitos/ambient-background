import { getImageByName } from 'lib';
import { useStore } from 'store';
import { FormEvent, useRef, useState } from 'react';

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setBackground } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const value = (e.currentTarget[0] as HTMLInputElement).value;
      if (!value) return;
      const { photos } = await getImageByName(value);
      const randomIndex = Math.floor(Math.random() * photos.length);
      setBackground(photos[randomIndex].src.original);
      if (!inputRef.current) return;
      setIsFocused(false);
      inputRef.current.blur();
      inputRef.current.value = '';
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return {
    onSubmit,
    isLoading,
    isFocused,
    setIsFocused,
    inputRef
  };
};
