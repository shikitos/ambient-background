import { useEffect } from 'react';
import { useDropdownContext } from '../providers';

export const useDropdown = () => {
  const { isOpen, setIsOpen } = useDropdownContext();

  useEffect(() => {
    function checkIfClickedOutside() {
      if (isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen };
};
