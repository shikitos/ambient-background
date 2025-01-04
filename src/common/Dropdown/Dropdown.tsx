import { CSSTransition } from 'react-transition-group';
import { DropdownProvider } from './providers';
import { useDropdown } from './lib';

type Item = {};

type Props = {};

export const Dropdown = () => {
  const { isOpen } = useDropdown();

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="dropdown">
      <DropdownProvider>
        <div>Dropdown</div>
      </DropdownProvider>
    </CSSTransition>
  );
};
