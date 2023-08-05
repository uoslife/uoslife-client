import {TextInputProps, KeyboardTypeOptions} from 'react-native';

export type RoundTextInputProps = TextInputProps & {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string, target?: string) => void;
  placeholder?: string;
  status?: 'default' | 'error' | 'success';
  value?: string;
  children?: React.ReactNode;
};

export default RoundTextInputProps;
