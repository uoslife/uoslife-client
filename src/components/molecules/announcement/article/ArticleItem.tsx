import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React from 'react';
import {getUploadTimeString} from '../../../../utils/handle-date';
import {useNavigation} from '@react-navigation/core';
import {AnnouncementNavigationProps} from '../../../../navigators/AnnouncementStackNavigator';
import {Article} from '../../../../types/announcement.type';

type ArticleItemProps = {
  article: Article;
  showCategory?: true;
};

const ArticleItem = ({article, showCategory}: ArticleItemProps) => {
  const {
    bookmarkCnt,
    department,
    title,
    uploadTime,
    bookmarkByMe,
    categoryId,
    id,
  } = article;

  const navigation = useNavigation<AnnouncementNavigationProps>();

  //  bookmark toggle
  const onPressBookmark = () => {};

  const processedUploadTimeString = getUploadTimeString(uploadTime);

  return (
    <S.Root>
      <S.DescriptionContainer
        onPress={() => {
          navigation.navigate('AnnouncementDetail', {id, categoryId});
        }}>
        {showCategory && (
          <Txt
            color={'primaryBrand'}
            label={categoryId}
            typograph={'labelMedium'}
          />
        )}
        <Txt color={'grey190'} typograph={'bodyMedium'} label={title} />
        <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${processedUploadTimeString}`}
        />
      </S.DescriptionContainer>
      <S.BookmarkContainer onPress={onPressBookmark}>
        <Icon
          width={24}
          height={24}
          name={'bookmark'}
          color={bookmarkByMe ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={bookmarkCnt.toString()}
          color={bookmarkByMe ? 'primaryBrand' : 'grey60'}
          typograph={'labelSmall'}
        />
      </S.BookmarkContainer>
    </S.Root>
  );
};

const S = {
  Root: styled.View`
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    padding-top: 8px;

    width: 100%;

    display: flex;
    flex-direction: row;

    align-items: center;
  `,
  DescriptionContainer: styled.Pressable`
    flex: 1;

    display: flex;
    gap: 4px;
  `,
  BookmarkContainer: styled.Pressable`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
  textContainer: styled.View``,
};

export default ArticleItem;
