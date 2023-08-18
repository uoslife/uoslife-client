import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import React from 'react';
import {Image, View, Text} from 'react-native';

// 임시타입이라 따로 빼놓지는 않겠습니다
type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  category: string; // XX과
  uploadTime: Date;
};

const ArticleItem = ({article}: {article: Article}) => {
  const {bookmarkCnt, category, title, uploadTime, bookmarkByMe} = article;

  const BookmarkToggleOn = () => (
    <Image source={require('../../assets/images/bookmark_toggle_on.png')} />
  );
  const BookmarkToggleOff = () => (
    <Image source={require('../../assets/images/bookmark_toggle_off.png')} />
  );

  const pad = (num: number) => (num < 10 ? `0${num}` : num);
  const uploadYear = uploadTime.getFullYear();
  const uploadMonth = pad(uploadTime.getMonth());
  const uploadDay = pad(uploadTime.getDay());
  const uploadHours = pad(uploadTime.getHours());
  const uploadMinutes = pad(uploadTime.getMinutes());
  const uploadDate = pad(uploadTime.getDate());
  const processedDateString =
    uploadDate == new Date().getDate()
      ? `${uploadHours}:${uploadMinutes}`
      : `${uploadYear}.${uploadMonth}.${uploadDay}`;
  const processedCategoryAndDate = `${category} | ${processedDateString}`;

  //  bookmark toggle
  const onPressBookmark = () => {};

  // 링크 클릭시 페이지 이동
  const onPressArticleLink = () => {};

  return (
    <S.articleItemWrapper>
      <S.description onPress={onPressArticleLink}>
        <Txt color="black" typograph="bodyMedium" label={title} />
        <Txt
          color="grey90"
          typograph="labelSmall"
          label={processedCategoryAndDate}
        />
      </S.description>

      <S.bookmarkContainer onPress={onPressBookmark}>
        {bookmarkByMe ? <BookmarkToggleOn /> : <BookmarkToggleOff />}
        <Text>{bookmarkCnt}</Text>
      </S.bookmarkContainer>
    </S.articleItemWrapper>
  );
};

const S = {
  articleItemWrapper: styled.View`
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    padding-top: 8px;

    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  description: styled.Pressable`
    flex: 1;

    display: flex;
    gap: 4px;
  `,
  bookmarkContainer: styled.Pressable`
    display: flex;
    align-items: center;
    justify-contents: center;
    width: 48px;
    height: 60px;
  `,
  textContainer: styled.View``,
};

export default ArticleItem;
