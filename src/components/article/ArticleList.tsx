import React from 'react';
import ArticleItem from './ArticleItem';
import styled from '@emotion/native';

// 임시타입이라 따로 빼놓지는 않겠습니다
type MenuName = '일반' | '학사' | '채용' | '창업';

type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;

  menu: MenuName;

  category: string; // XX과
  uploadTime: Date;
  id: string;
};

const ArticleList = ({articles}: {articles: Article[]}) => {
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
