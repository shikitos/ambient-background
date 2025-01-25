'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DropdownContextType } from '../type';

const InitialContext: DropdownContextType = {
  isOpen: false,
  setIsOpen: () => {}
};

const DropdownContext = createContext<DropdownContextType>(InitialContext);
const DropdownProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};
const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};

export { useDropdownContext, DropdownProvider };
