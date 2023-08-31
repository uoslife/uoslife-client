import {TextInputProps} from 'react-native';

export type SearchInputProps = TextInputProps & {
  inputRef?: React.MutableRefObject<any>;
  onChangeText?: (value: string) => void;
  onFocus?: () => void;
  onPressClear?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  status?: 'default' | 'error' | 'success';
  value?: string;
  children?: React.ReactNode;
};

export default SearchInputProps;
