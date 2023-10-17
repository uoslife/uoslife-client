import {Txt} from '@uoslife/design-system';
import ArticleList from '../article-list/ArticleList';
import styled from '@emotion/native';
import {useEffect, useState} from 'react';
import {ArticleListType} from '../../../../types/announcement.type';

// AnnouncementSearchScreen에서 searchWordEnteringView === false일 때의 컴포넌트
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

const SearchResultView = ({searchWord}: {searchWord: string}) => {
  const [searchedArticles, setSearchedArticles] = useState<ArticleListType>([]);

  useEffect(() => {}, []);

  return (
    <>
      {searchedArticles.length === 0 ? (
        <SearchResultNotFound />
      ) : (
        <ArticleList onEndReached={() => {}} articles={searchedArticles} />
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
