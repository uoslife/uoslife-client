import {ViewProps} from 'react-native';

export type HeaderProps = {
  label?: string;
  onPressBackButton?: () => void;
  children?: React.ReactNode;
  isDisableBackButton?: boolean;
} & ViewProps;

export default HeaderProps;
