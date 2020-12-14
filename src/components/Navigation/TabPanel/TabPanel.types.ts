import { ReactNode } from 'react';

export interface Tab {
  content: ReactNode;
}

export interface Props {
  children: ReactNode;
  tabs: Tab[];
}
