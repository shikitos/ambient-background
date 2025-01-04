import { Dispatch, SetStateAction } from 'react';

export type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
