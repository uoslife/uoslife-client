import React, {useState, useRef, useEffect} from 'react';
import styled from '@emotion/native';
import {TextInput} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AnnouncementNavigationProps,
  AnnouncementStackParamList,
} from '../../navigators/AnnouncementStackNavigator';
import SearchWordEnteringView from '../../components/molecules/announcement/search/SearchWordEnteringView';
import SearchInput from '../../components/forms/searchInput/SearchInput';
import Header from '../../components/header/Header';
import SearchResultView from '../../components/molecules/announcement/search/SearchResultView';

export type AnnouncementSearchScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementSearch'
>;

// 검색어 입력(searchWordEntering === true) / 검색 결과 두 상태로 구분(searchWordEntering === false)
// 해당 컴포넌트에서 관리하는 state: searchWordEntering, searchWord, articles
const AnnouncementSearchScreen = ({
  route: {
    params: {initialSearchWord},
  },
}: AnnouncementSearchScreenProps) => {
  const [searchWordEntering, setSearchWordEntering] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>(initialSearchWord);

  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AnnouncementNavigationProps>();

  const navigateToNewSearchScreen = (searchWord: string) => {
    // 1. 입력된 검색어로 새로운 검색 결과 screen stack 생성
    navigation.push('AnnouncementSearch', {
      initialSearchWord: searchWord,
    });
    // 2. 새로운 screen stack에서 뒤로가기를 눌렀을 때, 이전의 검색결과 페이지를 보여줘야 함
    setTimeout(() => {
      setSearchWordEntering(false);
    }, 300);
  };

  const searchInputProps: React.ComponentProps<typeof SearchInput> = {
    inputRef,
    placeholder: '검색어를 입력해주세요.',
    onFocus: () => {
      setSearchWordEntering(true);
      // setTimeout(() => {
      inputRef.current!.focus();
      // }, 100);
    },
    onChangeText: text => {
      setSearchWord(text);
    },
    onSubmitEditing: () => {
      navigateToNewSearchScreen(searchWord);
    },
    onPressClear: () => {
      setSearchWord('');
      setSearchWordEntering(true);
      inputRef.current!.focus();
    },
    value: searchWord,
  };

  const onPressBackButton = () => {
    searchWordEntering ? setSearchWordEntering(false) : navigation.goBack();
  };

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header onPressBackButton={onPressBackButton}>
        <SearchInput {...searchInputProps} />
      </Header>
      {searchWordEntering ? (
        <SearchWordEnteringView
          navigateToNewSearchScreen={navigateToNewSearchScreen}
        />
      ) : (
        <SearchResultView searchWord={initialSearchWord} />
      )}
    </S.Root>
  );
};

export default AnnouncementSearchScreen;

const S = {
  Root: styled.View`
    width: 100%;
    height: 100%;
  `,
};
