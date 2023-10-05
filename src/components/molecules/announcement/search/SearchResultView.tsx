import {Txt} from '@uoslife/design-system';
import ArticleList from '../article/ArticleList';
import styled from '@emotion/native';
import {useEffect, useState} from 'react';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
} from '../../../../screens/announcement/AnnouncementMainScreen';

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
  const [searchedArticles, setSearchedArticles] = useState<Article[]>([]);

  const searchReq = async () => {
    try {
      const data = ANNOUNCEMENT_ARTICLE_DUMMY_DATA.filter(
        article =>
          article.title.includes(searchWord) ||
          article.body.includes(searchWord),
      );

      setSearchedArticles(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchReq();
  }, []);

  return (
    <>
      {searchedArticles.length === 0 ? (
        <SearchResultNotFound />
      ) : (
        <ArticleList articles={searchedArticles} showCategory />
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
