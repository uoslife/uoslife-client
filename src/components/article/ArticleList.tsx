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

const ArticleList = () => {
  // 페이지네이션 적용해야하나??
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // 임시
    try {
      const DUMMY_DATA: Article[] = new Array(15);

      for (let i = 0; i < 15; i++)
        DUMMY_DATA.push({
          bookmarkCnt: i % 5,
          category: `category${i}`,
          title: `title${i}`,
          uploadTime: new Date(),
          bookmarkByMe: !!(i % 5) && !!(i % 2),
        });

      setArticles(DUMMY_DATA);
    } catch (err) {
      console.log(err);
    }
  }, []);

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
