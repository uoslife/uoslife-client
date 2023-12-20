import {RefreshControl} from 'react-native-gesture-handler';
import {Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useCallback, useEffect, useState} from 'react';
import {ArticleItemType} from '../../../../../types/announcement.type';
import ArticleList from '../list/ArticleList';
import AnnouncementAPI from '../../../../../api/services/util/announcement/announcementAPI';
import Spinner from '../../../../atoms/spinner/Spinner';
import LoadingFailed from '../LoadingFailed/LoadingFailed';

const SearchResultNotFound = ({onRefresh}: {onRefresh: () => void}) => {
  const refreshControl = (
    <RefreshControl
      onRefresh={onRefresh}
      colors={[colors.primaryBrand, colors.primaryBrand]}
      refreshing={false}
    />
  );

  return (
    <S.NotFoundContainer refreshControl={refreshControl}>
      <S.NotFoundInner>
        <Txt
          label="검색 결과가 없어요."
          color="grey90"
          typograph="bodyMedium"
        />
      </S.NotFoundInner>
    </S.NotFoundContainer>
  );
};

const ELEMENTS_PER_PAGE = 10;

const SearchResultView = ({searchWord}: {searchWord: string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState<ArticleItemType[]>(
    [],
  );
  const [page, setPage] = useState(0);

  const loadNewArticles = useCallback(async () => {
    setIsLoading(true);

    try {
      const params = {
        title: searchWord,
        page,
        size: ELEMENTS_PER_PAGE,
      };
      const res = await AnnouncementAPI.searchAnnoucementsOptionally(params);
      const loadedArticles = res.content;

      setPage(prev => prev + 1);
      setSearchedArticles([...searchedArticles, ...loadedArticles]);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [page, searchWord, searchedArticles]);

  const onRefresh = () => {
    setSearchedArticles([]);
    setPage(0);
    setIsError(false);
  };

  useEffect(() => {
    if (page === 0) loadNewArticles();
  }, [page, loadNewArticles]);

  const isInitiallyLoading = searchedArticles.length === 0 && isLoading;
  const isLoadedArticleListEmpty = searchedArticles.length === 0 && !isLoading;

  if (isError) return <LoadingFailed onRefresh={onRefresh} />;

  if (isInitiallyLoading) return <Spinner />;

  if (isLoadedArticleListEmpty)
    return <SearchResultNotFound onRefresh={onRefresh} />;

  return (
    <ArticleList
      ListFooterComponent={isLoading ? <Spinner /> : null}
      ref={null}
      onEndReached={loadNewArticles}
      articles={searchedArticles}
    />
  );
};

const S = {
  NotFoundContainer: styled.ScrollView`
    padding: 48px 0;
  `,
  NotFoundInner: styled.View`
    align-items: center;
  `,
};

export default SearchResultView;
