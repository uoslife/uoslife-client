import {Txt} from '@uoslife/design-system';
import ArticleList from '../article-list/ArticleList';
import styled from '@emotion/native';
import {useEffect, useState, useRef} from 'react';
import {ArticleListType} from '../../../../types/announcement.type';
import AnnouncementAPI from '../../../../api/services/util/announcement/announcementAPI';
import Spinner from '../../../spinner/Spinner';

const SearchResultNotFound = () => {
  return (
    <S.SearchResultNotFoundRoot>
      <Txt
        label={'검색 결과가 없어요.'}
        color={'grey90'}
        typograph={'bodyMedium'}
      />
    </S.SearchResultNotFoundRoot>
  );
};

// 페이지네이션 설정
const ELEMENTS_PER_PAGE = 10;

// TODO: pending state 추가, 해당 상태에 보여줄 컴포넌트 띄우기
const SearchResultView = ({searchWord}: {searchWord: string}) => {
  const [isPending, setIsPending] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState<ArticleListType>([]);
  const [page, setPage] = useState(0);

  const loadNewArticles = async () => {
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
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    loadNewArticles();
  }, []);

  const isInitiallyPending = searchedArticles.length === 0 && isPending;
  const isLoadedArticleListEmpty = searchedArticles.length === 0 && !isPending;

  return (
    <>
      {isInitiallyPending ? (
        <Spinner />
      ) : isLoadedArticleListEmpty ? (
        <SearchResultNotFound />
      ) : (
        <ArticleList
          ListFooterComponent={isPending ? <Spinner /> : <></>}
          ref={null}
          onEndReached={loadNewArticles}
          articles={searchedArticles}
        />
      )}
    </>
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
