import {TextInputProps, KeyboardTypeOptions} from 'react-native';

export type RoundTextInputProps = TextInputProps & {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string, target?: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  status?: 'default' | 'error' | 'success';
  statusMessage?: string;
  value?: string;
  children?: React.ReactNode;
};

export default RoundTextInputProps;
