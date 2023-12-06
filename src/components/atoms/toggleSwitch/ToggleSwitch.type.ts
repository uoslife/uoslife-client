import {PressableProps} from 'react-native';

export type ToggleSwitchProps = {
  isOn?: boolean;
  onToggle?: PressableProps['onPress'];
  disable?: boolean;
};

export default ToggleSwitchProps;
