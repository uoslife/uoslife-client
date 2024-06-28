import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useState, ComponentProps, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import Header from '../../../../components/molecules/common/header/Header';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';
import SearchInput from '../../../../components/molecules/common/forms/searchInput/SearchInput';

const AcademicCalendarSearchScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const [searchWord, setSearchWord] = useState<string>('');
  const [isSearchWordEntering, setSearchWordEntering] =
    useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const [dummy, setDummy] = useState<string>('');

  const searchInputProps: ComponentProps<typeof SearchInput> = {
    inputRef,
    placeholder: '일정을 검색하세요.',
    onFocus: () => {
      setSearchWordEntering(true);
      inputRef.current?.focus();
    },
    onChangeText: text => {
      setSearchWord(text);
    },
    onSubmitEditing: () => {
      setDummy(searchWord);
    },
    onPressClear: () => {
      setSearchWord('');
      setSearchWordEntering(true);
      inputRef.current?.focus();
    },
    value: searchWord,
  };

  return (
    <View>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label=""
        onPressBackButton={() => navigation.goBack()}>
        <SearchInput {...searchInputProps} />
      </Header>
    </View>
  );
};

export default AcademicCalendarSearchScreen;
