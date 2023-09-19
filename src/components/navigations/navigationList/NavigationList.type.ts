import {PressableProps} from 'react-native';

type NavigationListProps = PressableProps & {
  label?: string;
  onPress?: () => void;
  width?: number;
  height?: number;
  navigationButton?: React.ReactNode;
  children?: React.ReactNode;
};

export default NavigationListProps;
