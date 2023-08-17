import React from 'react';
import {Image, View} from 'react-native';

// 임시타입이라 따로 빼놓지는 않겠습니다
type Article = {
  bookmarked: boolean;
  title: string;
  category: string; // XX과
  uploadTime: Date;
};

const ArticleItem = ({article}: {article: Article}) => {
  const BookmarkToggleOn = (
    <Image source={require('../../assets/images/bookmark_toggle_on.png')} />
  );
  const BookmarkToggleOff = (
    <Image
      source={require('../../assets/images/bookmark_toggle_off.png.png')}
    />
  );

  return <View></View>;
};

export default ArticleItem;
