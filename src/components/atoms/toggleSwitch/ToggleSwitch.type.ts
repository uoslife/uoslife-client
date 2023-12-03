import {PressableProps} from 'react-native';

export type ToggleSwitchProps = {
  isOn?: boolean;
  onToggle?: PressableProps['onPress'];
};

export default ToggleSwitchProps;
