import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {Txt} from '@uoslife/design-system';
import ArticleList from '../../components/molecules/announcement/article-list/ArticleList';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArticleListType} from '../../types/announcement.type';

const NoBookmarkFound = () => (
  <S.NoBookmarkFoundContainer>
    <Txt
      color={'black'}
      label={'자신이 북마크한 공지사항을 확인할 수 있어요'}
      typograph={'bodyMedium'}
    />
  </S.NoBookmarkFoundContainer>
);

const AnnouncementBookmarkBoxScreen = () => {
  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<ArticleListType>([]);
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  // TODO: API 부착
  useEffect(() => {}, []);

  return (
    <S.ScreenContainer style={{paddingTop: insets.top}}>
      <Header label="북마크함" onPressBackButton={handleGoBack} />
      <S.BookmarkListContainer>
        {articles.length === 0 ? (
          <NoBookmarkFound />
        ) : (
          <ArticleList onEndReached={() => {}} articles={articles} />
        )}
      </S.BookmarkListContainer>
    </S.ScreenContainer>
  );
};

export default AnnouncementBookmarkBoxScreen;

const S = {
  ScreenContainer: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  BookmarkListContainer: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
  NoBookmarkFoundContainer: styled.View`
    padding-top: 48px;
    align-items: center;
  `,
};