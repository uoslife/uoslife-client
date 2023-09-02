import {View, Text} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {Alert} from 'react-native';
import {Icon, Txt} from '@uoslife/design-system';
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

const AnnouncementSearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [histories, setHistories] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  // articles === null일때 ? 검색창이 열리고, 히스토리가 보임 : 검색 결과가 보임
  const [articles, setArticles] = useState<null | Article[]>(null);
  const inputRef = useRef<TextInput>(null);

  // API: 히스토리 블러오기 기능 붙이기
  useEffect(() => {
    const DUMMY_HISTORY = [];
    for (let i = 0; i < 5; i++) {
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

  return (
    <View style={{paddingTop: insets.top}}>
      <Header label={'a'} />
      <S.searchInputRow>
        <View style={{padding: 4}}>
          <Icon color="grey150" height={24} width={24} name={'backArrow'} />
        </View>
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
      </S.searchInputRow>
      {!!articles ? (
        <ArticleList articles={articles} showCategory />
      ) : (
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
      )}
    </View>
  );
};

export default AnnouncementSearchScreen;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;

    z-index: 10;
  `,
  searchInputRow: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  `,
  rowReversed: styled.View`
    width: 100%;

    display: flex;
    flex-direction: row-reverse;
  `,
  eraseAllTxtWrapper: styled.Pressable`
    padding: 10px 20px;
  `,
};
