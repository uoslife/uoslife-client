import React, {useState, useRef} from 'react';
import styled from '@emotion/native';
import SearchInput from '../../components/forms/searchInput/SearchInput';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
} from './AnnouncementMainScreen';
import Header from '../../components/header/Header';
import {TextInput} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AnnouncementNavigationProps,
  AnnouncementStackParamList,
} from '../../navigators/AnnouncementStackNavigator';
import InSearching from '../../components/molecules/announcement/search/InSearching';
import SearchResult from '../../components/molecules/announcement/search/SearchResult';

export type AnnouncementSearchScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementSearch'
>;

const AnnouncementSearchScreen = ({
  route: {
    params: {initialSearchWord},
  },
}: AnnouncementSearchScreenProps) => {
  const insets = useSafeAreaInsets();
  const [searchWordEntering, setSearchWordEntering] = useState<boolean>(
    // 초기 검색어가 빈 문자열: 검색어 입력 페이지 진입
    !initialSearchWord,
  );
  const [searchWord, setSearchWord] = useState<string>(initialSearchWord);
  const [articles, setArticles] = useState<Article[]>(
    ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  );
  const inputRef = useRef<TextInput>(null);

  const navigation = useNavigation<AnnouncementNavigationProps>();

  // TODO: 더미 데이터 -> 실 API 호출로 변경
  const executeSearch = (searchWordParam: string) => {
    setSearchWord(searchWordParam);

    try {
      const filtered = ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
        item =>
          item.title.includes(searchWord) || item.body?.includes(searchWord),
      );
      console.log(filtered);

      setArticles(
        ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
          item =>
            item.title.includes(searchWord) || item.body?.includes(searchWord),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressBackButton = () => {
    if (searchWordEntering) {
      setSearchWordEntering(false);
      setSearchWord(initialSearchWord);
    } else {
      handleGoBack();
    }
  };

  const searchInputProps: React.ComponentProps<typeof SearchInput> = {
    inputRef,
    placeholder: '검색어를 입력해주세요.',
    onFocus: () => {
      setSearchWordEntering(true);
    },
    onChangeText: text => {
      setSearchWord(text);
      setArticles([]);
    },
    onSubmitEditing: () => {
      executeSearch(searchWord);
    },
    onPressClear: () => {
      setSearchWord('');
      inputRef.current!.focus();
    },
    value: searchWord,
  };

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header onPressBackButton={handlePressBackButton}>
        <SearchInput {...searchInputProps} />
      </Header>
      {searchWordEntering ? (
        <InSearching />
      ) : (
        <SearchResult articles={articles} />
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
