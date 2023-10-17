import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {getUploadTimeString} from '../../../../utils/handle-date';
import {useNavigation} from '@react-navigation/core';
import {AnnouncementNavigationProps} from '../../../../navigators/AnnouncementStackNavigator';
import {ArticleItemType} from '../../../../types/announcement.type';
import {announcementFullName} from '../../../../configs/announcement';

type ArticleItemProps = {
  articleItem: ArticleItemType;
};

const ArticleItem = ({articleItem}: ArticleItemProps) => {
  const {bookmarkCount, date, department, id, title, origin} = articleItem;

  // TODO: API를 통해 받아오도록 수정
  const bookmarkedByMe = false;

  const navigation = useNavigation<AnnouncementNavigationProps>();

  // bookmark toggle
  const onPressBookmark = () => {};

  // TODO: API 호출시 string 형식이 달라서 바뀜 -> 나중에 기획에 맞는지 확인 후 삭제
  // const processedUploadTimeString = getUploadTimeString(date);

  return (
    <S.Root>
      <S.DescriptionContainer
        onPress={() => {
          navigation.navigate('AnnouncementDetail', {id, origin: 'FA1'});
        }}>
        {origin && (
          <Txt
            color={'primaryBrand'}
            label={announcementFullName[origin]}
            typograph={'labelMedium'}
          />
        )}
        <Txt color={'grey190'} typograph={'bodyMedium'} label={title} />
        {/* <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${processedUploadTimeString}`}
        /> */}
        <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${date}`}
        />
      </S.DescriptionContainer>
      <S.BookmarkContainer onPress={onPressBookmark}>
        <Icon
          width={24}
          height={24}
          name={'bookmark'}
          color={bookmarkedByMe ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={bookmarkCount.toString()}
          color={bookmarkedByMe ? 'primaryBrand' : 'grey60'}
          typograph={'labelSmall'}
        />
      </S.BookmarkContainer>
    </S.Root>
  );
};

const S = {
  Root: styled.View`
    padding: 8px 16px;

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
};

export default ArticleItem;
