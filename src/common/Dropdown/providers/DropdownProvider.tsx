import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DropdownContextType } from '../type';

const DropdownContext = createContext<DropdownContextType>();
const DropdownProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};
const useDropdownContext = () => useContext(DropdownContext);

export { useDropdownContext, DropdownProvider };
