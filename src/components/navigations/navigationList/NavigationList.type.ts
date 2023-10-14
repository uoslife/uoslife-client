import {colorsType} from '@uoslife/design-system';
import {PressableProps} from 'react-native';

type NavigationListProps = PressableProps & {
  label: string;
  pressLabel?: string;
  pressLabelColor?: colorsType;
  isPressIconShown?: boolean;
  onPress?: () => void;
};

export default NavigationListProps;
