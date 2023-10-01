import React from 'react';
import ArticleItem from './ArticleItem';
import styled from '@emotion/native';
import {Article} from '../../../../screens/announcement/AnnouncementMainScreen';

type ArticleListProps = {
  articles: Article[];
  showCategory?: true;
};

const ArticleList = ({articles, showCategory}: ArticleListProps) => {
  return (
    <S.ListContainer>
      {articles.map(article => (
        <ArticleItem
          article={article}
          key={article.id}
          showCategory={showCategory}
        />
      ))}
    </S.ListContainer>
  );
};

export default ArticleList;

const S = {
  ListContainer: styled.View`
    width: 100%;
  `,
};
