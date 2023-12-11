import {Txt} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useCallback, useEffect, useState} from 'react';
import {ArticleItemType} from '../../../../../types/announcement.type';
import ArticleList from '../article-list/ArticleList';
import AnnouncementAPI from '../../../../../api/services/util/announcement/announcementAPI';
import Spinner from '../../../../atoms/spinner/Spinner';

const SearchResultNotFound = () => {
  return (
    <S.SearchResultNotFoundRoot>
      <Txt label="검색 결과가 없어요." color="grey90" typograph="bodyMedium" />
    </S.SearchResultNotFoundRoot>
  );
};

// 페이지네이션 설정
const ELEMENTS_PER_PAGE = 10;

const SearchResultView = ({searchWord}: {searchWord: string}) => {
  const [isPending, setIsPending] = useState(true);
  const [searchedArticles, setSearchedArticles] = useState<ArticleItemType[]>(
    [],
  );
  const [page, setPage] = useState(0);

  const loadNewArticles = useCallback(async () => {
    try {
      setIsPending(true);

      const params = {
        keyword: searchWord,
        page,
        size: ELEMENTS_PER_PAGE,
      };
      const res = await AnnouncementAPI.searchAnnoucements(params);
      const loadedArticles = res.content;

      setPage(prev => prev + 1);
      setSearchedArticles([...searchedArticles, ...loadedArticles]);
    } catch (error) {
      // TODO: console.log 삭제, 에러 시 보여줄 UI 작성
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }, [page, searchWord, searchedArticles]);

  const onRefreshList = () => {
    setSearchedArticles([]);
    setPage(0);
  };

  useEffect(() => {
    if (page === 0) loadNewArticles();
  }, [page, loadNewArticles]);

  const isInitiallyPending = searchedArticles.length === 0 && isPending;
  const isLoadedArticleListEmpty = searchedArticles.length === 0 && !isPending;

  if (isInitiallyPending) return <Spinner />;
  return isLoadedArticleListEmpty ? (
    <SearchResultNotFound />
  ) : (
    <ArticleList
      refreshing={false}
      onRefresh={onRefreshList}
      ListFooterComponent={isPending ? <Spinner /> : null}
      ref={null}
      onEndReached={loadNewArticles}
      articles={searchedArticles}
    />
  );
};

const S = {
  SearchResultNotFoundRoot: styled.View`
    padding: 48px 0;
    justify-content: center;
    align-items: center;
  `,
};

export default SearchResultView;
