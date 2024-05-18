import {IconsNameType, colorsType} from '@uoslife/design-system';
import {PressableProps} from 'react-native';

type NavigationListProps = PressableProps & {
  label: string;
  pressLabel?: string;
  pressLabelColor?: colorsType;
  isPressIconShown?: boolean;
  onPress?: () => void;
  labelIcon?: IconsNameType;
};

export default NavigationListProps;
