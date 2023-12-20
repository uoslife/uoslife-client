import styled from '@emotion/native';
import {FlatList} from 'react-native-gesture-handler';
import {forwardRef, useCallback, useEffect, useState} from 'react';
import {ArticleItemType} from '../../../../../types/announcement.type';
import ArticleList from '../list/ArticleList';
import Spinner from '../../../../atoms/spinner/Spinner';
import {
  AnnouncementOriginNameType,
  GetAnnouncementsParams,
} from '../../../../../api/services/util/announcement/announcementAPI.type';
import AnnouncementAPI from '../../../../../api/services/util/announcement/announcementAPI';
import LoadingFailed from '../LoadingFailed/LoadingFailed';

const ELEMENTS_PER_PAGE = 10;

const MainArticleList = forwardRef<
  FlatList,
  {
    origin: AnnouncementOriginNameType;
  }
>(({origin}, ref) => {
  const [articles, setArticles] = useState<ArticleItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onRefresh = () => {
    setIsError(false);
    setArticles([]);
  };

  const loadNewArticles = useCallback(async () => {
    setIsLoading(true);

    try {
      const currentPageNum = Math.ceil(articles.length / ELEMENTS_PER_PAGE);
      const apiParams: GetAnnouncementsParams = {
        origin,
        page: currentPageNum,
        size: ELEMENTS_PER_PAGE,
      };

      const res = await AnnouncementAPI.getAnnouncements(apiParams);

      const loadedArticles = res.content;

      setArticles(prev => [...prev, ...loadedArticles]);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [setArticles, articles.length, origin]);

  const onEndReached = useCallback(() => {
    if (articles.length === 0) return;
    if (isLoading) return;

    loadNewArticles();
  }, [isLoading, loadNewArticles, articles.length]);

  useEffect(() => {
    // 첫 로드
    if (articles.length === 0) loadNewArticles();
  }, [articles.length, loadNewArticles]);

  const isInitiallyLoading = articles.length === 0;

  if (isError)
    return (
      <S.Root>
        <LoadingFailed onRefresh={onRefresh} />
      </S.Root>
    );

  if (isInitiallyLoading)
    return (
      <S.Root>
        <Spinner />
      </S.Root>
    );

  return (
    <S.Root>
      <ArticleList
        key={origin}
        ListFooterComponent={isLoading ? <Spinner /> : null}
        ref={ref}
        showCategoryName={false}
        articles={articles}
        onEndReached={onEndReached}
      />
    </S.Root>
  );
});

export default MainArticleList;

const S = {
  Root: styled.View`
    height: 100%;
  `,
};
