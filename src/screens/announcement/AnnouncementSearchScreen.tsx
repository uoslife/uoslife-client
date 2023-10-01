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

type SearchScreenState = 'IN-SEARCHING' | 'SEARCH-RESULT';

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
  const [mode, setMode] = useState<SearchScreenState>(
    // 초기 검색어가 빈 문자열: 검색페이지 최초 진입
    !initialSearchWord ? 'IN-SEARCHING' : 'SEARCH-RESULT',
  );
  const [searchWord, setSearchWord] = useState<string>(initialSearchWord);
  const [articles, setArticles] = useState<Article[]>(
    ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  );
  const inputRef = useRef<TextInput>(null);

  const navigation = useNavigation<AnnouncementNavigationProps>();

  // TODO: 검색 API 붙이기
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
    switch (mode) {
      case 'IN-SEARCHING':
        setMode('SEARCH-RESULT');
        setSearchWord(initialSearchWord);
        break;
      case 'SEARCH-RESULT':
        handleGoBack();
        break;
    }
  };

  const navigateToNewSearchScreen = (searchWord: string) => {
    navigation.push('AnnouncementSearch', {
      initialSearchWord: searchWord,
    });
  };

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header onPressBackButton={handlePressBackButton}>
        <SearchInput
          inputRef={inputRef}
          placeholder={'검색어를 입력해주세요.'}
          onFocus={() => {
            setMode('IN-SEARCHING');
          }}
          onPressClear={() => {
            setSearchWord('');
            inputRef.current!.focus();
          }}
          onChangeText={text => {
            setSearchWord(text);
            setArticles([]);
            inputRef.current!.focus();
          }}
          onSubmitEditing={() => {
            navigateToNewSearchScreen(searchWord);
          }}
          value={searchWord}
        />
      </Header>
      {/* 피드백 후 삭제: 삼항 연산자를 배제하고 싶어서 이렇게 작성해 보았습니다. */}
      {/* 오히려 가독성을 해친다고 판단된다면 삼항 연산자로 바꿔 놓겠습니다. */}
      {(() => {
        switch (mode) {
          case 'IN-SEARCHING':
            return <InSearching />;
          case 'SEARCH-RESULT':
            return <SearchResult articles={articles} />;
        }
      })()}
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
