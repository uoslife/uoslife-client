import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React from 'react';
import {Image, Text} from 'react-native';
import {Article} from '../../../../screens/announcement/AnnouncementMainScreen';
import {getUploadTimeString} from '../../../../utils/handle-date';
import {useNavigation} from '@react-navigation/core';
import {
  AnnouncementNavigationProps,
  AnnouncementStackParamList,
} from '../../../../navigators/AnnouncementStackNavigator';

type ArticleItemProps = {
  article: Article;
  showCategory?: true;
};

const ArticleItem = ({article, showCategory}: ArticleItemProps) => {
  const {bookmarkCnt, department, title, uploadTime, bookmarkByMe, category} =
    article;

  const navigation = useNavigation<AnnouncementNavigationProps>();

  //  bookmark toggle
  const onPressBookmark = () => {};

  const processedUploadTimeString = getUploadTimeString(uploadTime);

  return (
    <S.articleItemWrapper>
      <S.description
        onPress={() => {
          navigation.navigate('AnnouncementDetail', {id: article.id});
        }}>
        {showCategory && (
          <Txt
            color={'primaryBrand'}
            label={category}
            typograph={'labelMedium'}
          />
        )}
        <Txt color={'grey190'} typograph={'bodyMedium'} label={title} />
        <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${processedUploadTimeString}`}
        />
      </S.description>
      <S.bookmarkContainer onPress={onPressBookmark}>
        <Icon
          width={24}
          height={24}
          name={'bookmark'}
          color={bookmarkByMe ? 'primaryBrand' : 'grey60'}
        />
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
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
  textContainer: styled.View``,
};

export default ArticleItem;
