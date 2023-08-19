import React from 'react';
import ArticleItem from './ArticleItem';
import styled from '@emotion/native';
import {Article} from '../../screens/announcement/AnnouncementMainScreenContainer';

type ArticleListProps = {
  articles: Article[];
  showCategory?: true;
};
const ArticleList = ({articles, showCategory}: ArticleListProps) => {
  return (
    <S.listContainer>
      {articles.map(article => (
        <ArticleItem article={article} key={article.id} />
      ))}
    </S.listContainer>
  );
};

export default ArticleList;

const S = {
  listContainer: styled.View`
    width: 100%;
  `,
};
