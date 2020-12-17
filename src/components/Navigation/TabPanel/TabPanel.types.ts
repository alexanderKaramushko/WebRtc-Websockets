import { ReactNode } from 'react';

export interface Tab {
  content: ReactNode;
}

export interface Props {
  children: ReactNode;
  height?: string;
  tabs: Tab[];
}
