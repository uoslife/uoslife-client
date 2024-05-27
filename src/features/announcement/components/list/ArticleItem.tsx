import styled from '@emotion/native';
import {Txt} from '@uoslife/design-system';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/core';
import useBookmark from '../../hooks/useBookmark';
import {ArticleItemType} from '../../types/announcement.type';
import {AnnouncementFullNameEnum} from '../../constants/announcement';
import ItemBookmarkToggle from './ItemBookmarkToggle';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';
import {RootNavigationProps} from '../../../../navigators/types/rootStack';

type ArticleItemComponentProps = {
  showCategoryName: boolean;
  articleItem: ArticleItemType;
};

const ArticleItem = ({
  articleItem,
  showCategoryName,
}: ArticleItemComponentProps) => {
  const {date, department, id, title, origin, bookmarkCount, isBookmarked} =
    articleItem;
  const {bookmarkCountCurrent, isBookmarkedCurrent, onPressBookmarkToggle} =
    useBookmark(id, {
      bookmarkCount,
      isBookmarked,
    });
  const navigation = useNavigation<RootNavigationProps>();

  return (
    <S.Root>
      <S.DescriptionContainer>
        <AnimatePress
          variant="scale_down"
          onPress={() => {
            navigation.navigate('announcement_detail', {id, origin});
          }}>
          {showCategoryName && (
            <Txt
              color="primaryBrand"
              label={AnnouncementFullNameEnum[origin]}
              typograph="labelMedium"
            />
          )}
          <Txt color="grey190" typograph="bodyMedium" label={title} />
          <Txt
            color="grey90"
            typograph="labelSmall"
            label={`${department} | ${date}`}
          />
        </AnimatePress>
      </S.DescriptionContainer>
      <ItemBookmarkToggle
        bookmarkCount={bookmarkCountCurrent}
        isBookmarked={isBookmarkedCurrent}
        onPressBookmarkToggle={onPressBookmarkToggle}
      />
    </S.Root>
  );
};

const S = {
  Root: styled.View`
    padding: 8px 16px;
    width: 100%;
    flex-direction: row;
  `,
  DescriptionContainer: styled.View`
    flex: 1;
    gap: 4px;
  `,
  BookmarkToggleContainer: styled.Pressable`
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
};

export default memo(ArticleItem);
