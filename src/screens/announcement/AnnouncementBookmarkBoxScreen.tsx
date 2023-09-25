import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Header from '../../components/header/Header';
import {Txt} from '@uoslife/design-system';
import ArticleList from '../../components/molecules/announcement/article/ArticleList';
import styled from '@emotion/native';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
  ArticleCategoryTapState,
} from './AnnouncementMainScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const AnnouncementBookmarkBoxScreen = () => {
  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<Article[]>([]);
  useState<ArticleCategoryTapState>({
    list: ['일반공지', '학사공지', '채용공고', '창업공지'],
    selected: '일반공지',
  });

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    try {
      // 내가 북마크한 글만
      setArticles(
        ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(article => article.bookmarkByMe),
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <S.screenWrapper style={{paddingTop: insets.top}}>
      <Header label="북마크함" onPressBackButton={handleGoBack} />
      <S.categoryTapAndContents>
        {articles.length === 0 ? (
          <View style={{paddingTop: 48, display: 'flex', alignItems: 'center'}}>
            <Txt
              color={'black'}
              label={'자신이 북마크한 공지사항을 확인할 수 있어요'}
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

export default AnnouncementBookmarkBoxScreen;
const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  categoryTapAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
  decriptionContainer: styled.View`
    display: flex;
    flex-direction: row;
  `,
};
