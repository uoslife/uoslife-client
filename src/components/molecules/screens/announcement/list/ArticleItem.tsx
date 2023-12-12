import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/core';
import useBookmark from '../../../../../hooks/useBookmark';
import {AnnouncementNavigationProps} from '../../../../../navigators/AnnouncementStackNavigator';
import {ArticleItemType} from '../../../../../types/announcement.type';
import {announcementFullName} from '../../../../../configs/announcement';
import ItemBookmarkToggle from './ItemBookmarkToggle';

type ArticleItemComponentProps = {
  showCategoryName: boolean;
  articleItem: ArticleItemType;
};

const ArticleItem = ({
  articleItem,
  showCategoryName,
}: ArticleItemComponentProps) => {
  const {date, department, id, title, origin, bookmarkCount, bookmarked} =
    articleItem;
  const {bookmarkCountCurrent, bookmarkedCurrent, onPressBookmarkToggle} =
    useBookmark(id, {
      bookmarkCount,
      bookmarked,
    });
  const navigation = useNavigation<AnnouncementNavigationProps>();

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
        <Txt
          color="grey90"
          typograph="labelSmall"
          label={`${department} | ${date}`}
        />
      </S.DescriptionContainer>
      <ItemBookmarkToggle
        bookmarkCount={bookmarkCountCurrent}
        bookmarked={bookmarkedCurrent}
        onPressBookmarkToggle={onPressBookmarkToggle}
      />
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
  DescriptionContainer: styled.TouchableOpacity`
    flex: 1;

    display: flex;
    gap: 4px;
  `,
  BookmarkToggleContainer: styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
};

export default memo(ArticleItem);
