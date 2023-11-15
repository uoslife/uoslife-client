import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {Txt} from '@uoslife/design-system';
import ArticleList from '../../components/molecules/announcement/article-list/ArticleList';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArticleItemType} from '../../types/announcement.type';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import useBookmarkOnLocal from '../../hooks/useBookmarkOnLocal';
import Spinner from '../../components/spinner/Spinner';

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
  const [articles, setArticles] = useState<ArticleItemType[]>([]);
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [isPending, setIsPending] = useState(true);

  const {getBookmarkIdList} = useBookmarkOnLocal();

  // TODO: 요청에 페이지네이션 적용(현재는 경우에 따라 불필요한 통신량이 추가로 생김)
  useEffect(() => {
    (async () => {
      const idList = await getBookmarkIdList();

      setIsPending(true);
      try {
        const result = await AnnouncementAPI.getAnnouncementByIdList({
          idList,
        });
        setArticles(result.map(item => ({...item, isBookmarkedByMe: true})));
      } catch (error) {}
      setIsPending(false);
    })();
  }, []);

  return (
    <S.ScreenContainer style={{paddingTop: insets.top}}>
      <Header label="북마크함" onPressBackButton={handleGoBack} />
      <S.BookmarkListContainer>
        {isPending ? (
          <Spinner />
        ) : articles.length === 0 && !isPending ? (
          <NoBookmarkFound />
        ) : (
          // TODO: 페이지네이션 적용시 onEndReached 수정
          <ArticleList
            ListFooterComponent={isPending ? <Spinner /> : <></>}
            onEndReached={() => {}}
            articles={articles}
          />
        )}
      </S.BookmarkListContainer>
    </S.ScreenContainer>
  );
};

export default AnnouncementBookmarkBoxScreen;

const S = {
  ScreenContainer: styled.View`
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
