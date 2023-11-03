import {Txt} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useEffect, useState, useRef} from 'react';
import ArticleList from '../article-list/ArticleList';
import {ArticleListType} from '../../../../types/announcement.type';
import AnnouncementAPI from '../../../../api/services/util/announcement/announcementAPI';

const SearchResultNotFound = () => {
  return (
    <S.SearchResultNotFoundRoot>
      <Txt label="검색 결과가 없어요." color="grey90" typograph="bodyMedium" />
    </S.SearchResultNotFoundRoot>
  );
};

// 페이지네이션 설정
const ELEMENTS_PER_PAGE = 10;

// TODO: pending state 추가, 해당 상태에 보여줄 컴포넌트 띄우기
const SearchResultView = ({searchWord}: {searchWord: string}) => {
  const [searchedArticles, setSearchedArticles] = useState<ArticleListType>([]);
  const [page, setPage] = useState(0);

  const loadNewArticles = async () => {
    const params = {
      keyword: searchWord,
      page,
      size: ELEMENTS_PER_PAGE,
    };
    const res = await AnnouncementAPI.searchAnnoucements(params);
    const loadedArticles = res.content;

    setPage(prev => prev + 1);
    setSearchedArticles([...searchedArticles, ...loadedArticles]);
  };

  useEffect(() => {
    loadNewArticles();
  }, []);

  return (
    <>
      {searchedArticles.length === 0 ? (
        <SearchResultNotFound />
      ) : (
        <ArticleList
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
