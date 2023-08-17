import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ArticleItem from './ArticleItem';
import styled from '@emotion/native';

// 임시타입이라 따로 빼놓지는 않겠습니다
type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  category: string; // XX과
  uploadTime: Date;
};

const ArticleList = ({articles}: {articles: Article[]}) => {
  return (
    <S.listContainer>
      {articles.map(article => (
        <ArticleItem article={article} />
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
