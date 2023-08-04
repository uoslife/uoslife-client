import {TextInputProps, KeyboardTypeOptions} from 'react-native';

export type RoundInputProps = TextInputProps & {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string, target?: string) => void;
  placeholder?: string;
  status?: 'default' | 'error' | 'success';
  value?: string;
  children?: React.ReactNode;
};

export default RoundInputProps;
