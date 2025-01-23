import { DropdownProvider } from './providers';
import { PropsWithChildren } from 'react';
import { Content } from './Content';

type Item = {
  label: string;
  onClick: () => void;
};

type Props = PropsWithChildren<{
  items: Item[];
}>;

export const Dropdown = (props: Props) => {
  return (
    <DropdownProvider>
      <Content {...props} />
    </DropdownProvider>
  );
};
