import {TextInputProps} from 'react-native';

export type SearchInputProps = TextInputProps & {
  onChangeText?: (value: string) => void;
  onPress?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  status?: 'default' | 'error' | 'success';
  value?: string;
  children?: React.ReactNode;
};

export default SearchInputProps;
