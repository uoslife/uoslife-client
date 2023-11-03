import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {getUploadTimeString} from '../../../../utils/handle-date';
import {AnnouncementNavigationProps} from '../../../../navigators/AnnouncementStackNavigator';
import {ArticleItemType} from '../../../../types/announcement.type';
import {announcementFullName} from '../../../../configs/announcement';

type ArticleItemProps = {
  showCategoryName: boolean;
  articleItem: ArticleItemType;
};

const ArticleItem = ({articleItem, showCategoryName}: ArticleItemProps) => {
  const {bookmarkCount, date, department, id, title, origin} = articleItem;

  // TODO: API를 통해 받아오도록 수정
  const bookmarkedByMe = false;

  const navigation = useNavigation<AnnouncementNavigationProps>();

  // TODO: bookmark toggle 구현
  const onPressBookmark = () => {};

  // TODO: API 호출시의 형식이 예상과 다름 -> 기획팀에 전달 후 삭제
  // const processedUploadTimeString = getUploadTimeString(date);

  return (
    <S.Root>
      <S.DescriptionContainer
        onPress={() => {
          navigation.navigate('AnnouncementDetail', {id, origin: 'FA1'});
        }}>
        {showCategoryName && (
          <Txt
            color="primaryBrand"
            label={announcementFullName[origin]}
            typograph="labelMedium"
          />
        )}
        <Txt color="grey190" typograph="bodyMedium" label={title} />
        {/* <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${processedUploadTimeString}`}
        /> */}
        <Txt
          color="grey90"
          typograph="labelSmall"
          label={`${department} | ${date}`}
        />
      </S.DescriptionContainer>
      <S.BookmarkContainer onPress={onPressBookmark}>
        <Icon
          width={24}
          height={24}
          name="bookmark"
          color={bookmarkedByMe ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={bookmarkCount.toString()}
          color={bookmarkedByMe ? 'primaryBrand' : 'grey60'}
          typograph="labelSmall"
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
