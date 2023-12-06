import {PrimitiveAtom} from 'jotai';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React, {useState, memo, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/core';
import useBookmark_ from '../../../../../hooks/useBookmark_';
import {AnnouncementNavigationProps} from '../../../../../navigators/AnnouncementStackNavigator';
import {ArticleItemType} from '../../../../../types/announcement.type';
import {announcementFullName} from '../../../../../configs/announcement';

type ArticleItemComponentProps = {
  bookmarkAtom: PrimitiveAtom<boolean>;
  showCategoryName: boolean;
  articleItem: ArticleItemType;
};

const ArticleItem = ({
  bookmarkAtom,
  articleItem,
  showCategoryName,
}: ArticleItemComponentProps) => {
  const {bookmarkCount, date, department, id, title, origin} = articleItem;
  const [isPending, setIsPending] = useState(false);
  const {isBookmarked, setBookmarkOn, setBookmarkOff} = useBookmark_(
    id,
    bookmarkAtom,
  );

  const isInitiallyBookmarked = useMemo(() => isBookmarked, []);

  const bookmarkCountOffset = (() => {
    if (isInitiallyBookmarked === isBookmarked) return 0;
    if (!isInitiallyBookmarked && isBookmarked) return 1;
    if (isInitiallyBookmarked && !isBookmarked) return -1;

    return 99999;
  })();

  const navigation = useNavigation<AnnouncementNavigationProps>();

  const onPressBookmarkToggle = isBookmarked
    ? async () => {
        await setBookmarkOff();
      }
    : async () => {
        await setBookmarkOn();
      };

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
      <S.BookmarkContainer
        onPress={!isPending ? onPressBookmarkToggle : () => {}}>
        <Icon
          width={24}
          height={24}
          name="bookmark"
          color={isBookmarked ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={(bookmarkCount + bookmarkCountOffset).toString()}
          color={isBookmarked ? 'primaryBrand' : 'grey60'}
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

export default memo(ArticleItem);
