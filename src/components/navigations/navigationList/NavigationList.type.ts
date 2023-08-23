import {PressableProps} from 'react-native';

type NavigationListProps = PressableProps & {
  label?: string;
  onPress?: () => void;
  hasBorder?: boolean;
  navigationButton?: React.ReactNode;
  children?: React.ReactNode;
};

export default NavigationListProps;
