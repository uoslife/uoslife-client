import {ReactNode} from 'react';

export type CardProps = {
  title: string;
  caption?: string;
  children: ReactNode;
};

export default CardProps;
