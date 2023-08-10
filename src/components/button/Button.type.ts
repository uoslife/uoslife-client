import {TouchableOpacityProps} from 'react-native';

export type BtnProps = {
  label?: string;
  height?: number;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  children?: React.ReactNode;
  type?: 'primary' | 'default';
} & TouchableOpacityProps;
