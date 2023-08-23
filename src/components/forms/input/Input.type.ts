import {TextInputProps, KeyboardTypeOptions} from 'react-native';

export type InputProps = TextInputProps & {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string, target?: string) => void;
  onPress?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  label?: string;
  status?: 'default' | 'error' | 'success';
  statusMessage?: string;
  value?: string;
  children?: React.ReactNode;
};

export default InputProps;
