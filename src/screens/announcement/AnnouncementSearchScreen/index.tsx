import {View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {Alert} from 'react-native';
import {Txt} from '@uoslife/design-system';
import SearchInput from '../../../components/forms/searchInput/SearchInput';
import HistoryList from '../../../components/molecules/announcement/HistoryList';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
} from '../AnnouncementMainScreen';
import ArticleList from '../../../components/molecules/announcement/article/ArticleList';
import Header from '../../../components/header/Header';
import {TextInput} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SearchHistoryProps = {
  histories: string[];
  executeSearch: (searchWordParam: string) => void;
};

const AnnouncementSearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [histories, setHistories] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  // articles === null일때 ? 검색창이 열리고, 히스토리가 보임 : 검색 결과가 보임
  const [articles, setArticles] = useState<null | Article[]>(null);
  const inputRef = useRef<TextInput>(null);
  const [hasSearchResults, setHasSearchResults] = useState(true);

  // API: 히스토리 블러오기 기능 붙이기
  useEffect(() => {
    const DUMMY_HISTORY = [];
    // TODO: 검색 결과가 없을 경우, hasSearchResults state 활용하여 return으로 분기 처리해주기.
    for (let i = 0; i < 10; i++) {
      DUMMY_HISTORY.push(`히스토리 ${i}`);
      DUMMY_HISTORY.push(`${i}`);
    }
    setHistories(DUMMY_HISTORY);
  }, []);

  // API: 검색 수행하기
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

  const NoSearchedHistoryResults = () => (
    <S.searchHistoryResultNotFound>
      <Txt
        label={'검색 결과가 없어요.'}
        color={'grey90'}
        typograph={'bodyMedium'}
      />
    </S.searchHistoryResultNotFound>
  );

  const IsSearchedHistoryResult = ({
    histories,
    executeSearch,
  }: SearchHistoryProps) => (
    <>
      <S.rowReversed>
        <S.eraseAllTxtWrapper
          onPress={() => {
            Alert.alert('API를 달아주셔야 제대로 지워집니다?');
            setHistories([]);
          }}>
          <Txt
            color={'grey90'}
            label={'모두 지우기'}
            typograph={'bodyMedium'}
          />
        </S.eraseAllTxtWrapper>
      </S.rowReversed>
      <HistoryList executeSearch={executeSearch} histories={histories} />
    </>
  );

  const HistoryResult = () =>
    hasSearchResults ? (
      <IsSearchedHistoryResult
        histories={histories}
        executeSearch={executeSearch}
      />
    ) : (
      <NoSearchedHistoryResults />
    );

  return (
    <View style={{paddingTop: insets.top}}>
      <Header>
        {/* Focus가 사라져야 될 때 사라지지 않는 이슈 있음 */}
        <SearchInput
          inputRef={inputRef}
          placeholder={'검색어를 입력해주세요.'}
          onFocus={() => {
            setArticles(null);
          }}
          onPressClear={() => {
            setSearchWord('');
            inputRef.current!.focus();
          }}
          onChangeText={text => {
            setSearchWord(text);
            setArticles(null);
            inputRef.current!.focus();
          }}
          onSubmitEditing={() => {
            executeSearch(searchWord);
          }}
          value={searchWord}
        />
      </Header>

      {!!articles ? (
        <ArticleList articles={articles} showCategory />
      ) : (
        HistoryResult()
      )}
    </View>
  );
};

export default AnnouncementSearchScreen;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;

    z-index: 10;
  `,
  searchInputRow: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 16px;
  `,
  rowReversed: styled.View`
    width: 100%;

    flex-direction: row-reverse;
  `,
  eraseAllTxtWrapper: styled.Pressable`
    padding: 10px 20px;
  `,
  searchHistoryResultNotFound: styled.View`
    padding: 48px 0;
    justify-content: center;
    align-items: center;
  `,
};
