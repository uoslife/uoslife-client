import React, {useEffect, useState} from 'react';
import {Txt} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ArticleItemType} from '../../types/announcement.type';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import ArticleList from '../../components/molecules/screens/announcement/article-list/ArticleList';
import Header from '../../components/molecules/common/header/Header';
import Spinner from '../../components/atoms/spinner/Spinner';
import BookmarkAPI from '../../api/services/util/bookmark/bookmarkAPI';
import LoadingFailed from '../../components/molecules/screens/announcement/LoadingFailed/LoadingFailed';

const NoBookmarkFound = () => (
  <S.NoBookmarkFoundContainer>
    <Txt
      color="black"
      label="자신이 북마크한 공지사항을 확인할 수 있어요"
      typograph="bodyMedium"
    />
  </S.NoBookmarkFoundContainer>
);

const BookmarkResult = ({
  isEmpty,
  isLoading,
  articles,
  onRefresh,
}: {
  isEmpty: boolean;
  isLoading: boolean;
  articles: ArticleItemType[];
  onRefresh: () => void;
}) => {
  return isEmpty ? (
    <NoBookmarkFound />
  ) : (
    <ArticleList
      onRefresh={onRefresh}
      refreshing={false}
      ListFooterComponent={isLoading ? <Spinner /> : null}
      articles={articles}
      onEndReached={() => {}}
    />
  );
};

const AnnouncementBookmarkBoxScreen = () => {
  const insets = useSafeAreaInsets();
  const [articles, setArticles] = useState<ArticleItemType[]>([]);
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // TODO: 요청에 페이지네이션 적용(현재는 경우에 따라 불필요한 통신량이 추가로 생김)
  useEffect(() => {
    if (articles.length === 0) {
      (async () => {
        setIsLoading(true);

        try {
          // TODO: 해당 endpoint 통합 후 클라이언트 코드에서도 대응
          const {bookmarkInformation} =
            await BookmarkAPI.getBookmarkedArticles();
          if (!bookmarkInformation) {
            throw new Error();
          }

          const loadedArticles = await AnnouncementAPI.getAnnouncementByIdList({
            idList: bookmarkInformation,
          });

          setArticles(loadedArticles);
        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      })();
    }
  }, [articles.length, setIsLoading, setIsError]);

  const onRefresh = () => {
    setIsError(false);
    setArticles([]);
  };

  if (isError)
    return (
      <S.Root style={{paddingTop: insets.top}}>
        <Header label="북마크함" onPressBackButton={handleGoBack} />
        <LoadingFailed onRefresh={onRefresh} />
      </S.Root>
    );

  if (isLoading)
    return (
      <S.Root style={{paddingTop: insets.top}}>
        <Header label="북마크함" onPressBackButton={handleGoBack} />
        <Spinner />
      </S.Root>
    );

  return (
    <S.Root style={{paddingTop: insets.top}}>
      <Header label="북마크함" onPressBackButton={handleGoBack} />
      {isLoading ? (
        <Spinner />
      ) : (
        <BookmarkResult
          onRefresh={onRefresh}
          isEmpty={articles.length === 0}
          isLoading={isLoading}
          articles={articles}
        />
      )}
    </S.Root>
  );
};

export default AnnouncementBookmarkBoxScreen;

const S = {
  Root: styled.View`
    width: 100%;
    height: 100%;
  `,
  NoBookmarkFoundContainer: styled.View`
    padding-top: 48px;
    align-items: center;
  `,
};
