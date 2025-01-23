'use client';

import { useEffect } from 'react';
import { useDropdownContext } from '../providers';

export const useDropdown = () => {
  const { isOpen, setIsOpen } = useDropdownContext();

  const toggleDropdown = () => {
    console.log('here');
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    function checkIfClickedOutside() {
      if (!isOpen) return;
      setIsOpen(false);
    }

    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isOpen, setIsOpen]);

  return { isOpen, setIsOpen, toggleDropdown, closeDropdown };
};
