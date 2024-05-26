import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {BookmarkInfo} from '../../hooks/useBookmark';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

const ItemBookmarkToggle = ({
  bookmarkCount,
  isBookmarked,
  onPressBookmarkToggle,
}: BookmarkInfo & {
  onPressBookmarkToggle: () => {};
}) => {
  return (
    <AnimatePress variant="scale_up" onPress={onPressBookmarkToggle}>
      <S.BookmarkToggleContainer>
        <Icon
          width={24}
          height={24}
          name="bookmark"
          color={isBookmarked ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={`${bookmarkCount}`}
          color={isBookmarked ? 'primaryBrand' : 'grey60'}
          typograph="labelSmall"
        />
      </S.BookmarkToggleContainer>
    </AnimatePress>
  );
};

export default ItemBookmarkToggle;

const S = {
  BookmarkToggleContainer: styled.View`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
};
