import {Txt} from '@uoslife/design-system';
import {Article} from '../../../../screens/announcement/AnnouncementMainScreen';
import ArticleList from '../article/ArticleList';
import styled from '@emotion/native';

type SearchResultProps = {
  articles: Article[];
};

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

const SearchResult = ({articles}: SearchResultProps) =>
  articles ? (
    <ArticleList articles={articles} showCategory />
  ) : (
    <SearchResultNotFound />
  );

const S = {
  SearchResultNotFoundRoot: styled.View`
    padding: 48px 0;
    justify-content: center;
    align-items: center;
  `,
};

export default SearchResult;
