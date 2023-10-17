import {Txt} from '@uoslife/design-system';
import ArticleList from '../article-list/ArticleList';
import styled from '@emotion/native';
import {useEffect, useState} from 'react';
import {ArticleListType} from '../../../../types/announcement.type';
import AnnouncementAPI from '../../../../api/services/util/announcement/announcementAPI';

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

// TODO: Lazy Loading과 페이지네이션
// TODO: pending state 추가, 해당 상태에 보여줄 컴포넌트 띄우기
const SearchResultView = ({searchWord}: {searchWord: string}) => {
  const [searchedArticles, setSearchedArticles] = useState<ArticleListType>([]);

  useEffect(() => {
    (async () => {
      const res = await AnnouncementAPI.searchAnnoucements({
        keyword: searchWord,
        page: 0,
        size: 10,
      });

      setSearchedArticles(res.content);
    })();
  }, []);

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
