import React, {useState} from 'react';
import {View} from 'react-native';
import ArticleItem from './ArticleItem';

// 임시타입이라 따로 빼놓지는 않겠습니다
type Article = {
  bookmarked: boolean;
  title: string;
  category: string; // XX과
  uploadTime: Date;
};

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  // 임시
  try {
    const DUMMY_DATA: Article[] = new Array(15).map((item, i) => ({
      bookmarked: i % 3 == 0,
      category: `category${i}`,
      title: `title${i}`,
      uploadTime: new Date(),
    }));

    setArticles(DUMMY_DATA);
  } catch (err) {
    console.log(err);
  }

  return (
    <View>
      {articles.map(article => (
        <ArticleItem article={article} />
      ))}
    </View>
  );
};

export default ArticleList;
