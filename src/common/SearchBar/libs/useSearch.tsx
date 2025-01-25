import { useStore } from 'store';
import { FormEvent, useRef, useState } from 'react';
import { PexelsService } from 'services/pexels';

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setBackground } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (query: string) => {
    const response = await new PexelsService().search(query);
    if (!response.success) return;
    const { photos } = response.data;
    if (photos.length <= 0) return;
    const randomIndex = Math.floor(Math.random() * photos.length);
    setBackground(photos[randomIndex].src.original);
  };

  const clearInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    setIsFocused(false);
    inputRef.current.blur();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget[0] as HTMLInputElement).value.trim();
    if (!query) return;

    setIsLoading(true);
    await handleSearch(query);
    clearInput();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    onSubmit,
    isLoading,
    isFocused,
    setIsFocused,
    inputRef
  };
};
