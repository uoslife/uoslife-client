import React, {Dispatch, useEffect, useState} from 'react';
import {Alert, View, Pressable} from 'react-native';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
  ArticleCategoryTapState,
} from '../AnnouncementMainScreen';
import ArticleList from '../../../components/molecules/announcement/article/ArticleList';
import {Icon, Txt} from '@uoslife/design-system';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {
  AnnouncementNavigationProps,
  AnnouncementStackParamList,
} from '../../../navigators/AnnouncementStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchInput from '../../../components/forms/searchInput/SearchInput';
import {useNavigation} from '@react-navigation/native';

type AnnouncementSearchResultProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementSearchResult'
>;

// 내가 북마크한 글만
const AnnouncementSearchResultScreencontainer = ({
  route,
}: AnnouncementSearchResultProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useState<ArticleCategoryTapState>({
    list: ['일반공지', '학사공지', '채용공고', '창업공지'],
    selected: '일반공지',
  });
  const navigation = useNavigation<AnnouncementNavigationProps>();
  const searchWord = route.params.searchWord;

  useEffect(() => {
    try {
      setArticles(
        ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
          item =>
            item.title.includes(searchWord) || item.body?.includes(searchWord),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 디자인: 확정시 반영 필요
  return (
    <S.screenWrapper>
      <Header label={'검색결과'} />
      <S.searchInputRow>
        <View style={{padding: 4}}>
          <Icon color="grey150" height={24} width={24} name={'backArrow'} />
        </View>
        <Pressable
          onPress={() => {
            () => {
              navigation.navigate('AnnouncementSearchWindow', {
                prevSearchWord: searchWord,
              });
            };
          }}>
          <SearchInput
            value={searchWord}
            onPress={() => {
              navigation.navigate('AnnouncementSearchWindow', {
                prevSearchWord: searchWord,
              });
            }}
          />
        </Pressable>
      </S.searchInputRow>

      <S.categoryTapAndContents>
        {articles.length === 0 ? (
          <View style={{paddingTop: 48, display: 'flex', alignItems: 'center'}}>
            <Txt
              color={'grey150'}
              label={'검색 결과가 없어요.'}
              typograph={'bodyMedium'}
            />
          </View>
        ) : (
          <ArticleList articles={articles} showCategory />
        )}
      </S.categoryTapAndContents>
    </S.screenWrapper>
  );
};

export default AnnouncementSearchResultScreencontainer;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;

    z-index: 10;
  `,
  subScreenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;

    background-color: blue;
    z-index: 100;
  `,
  categoryTapAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
  searchInputRow: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  `,
};
