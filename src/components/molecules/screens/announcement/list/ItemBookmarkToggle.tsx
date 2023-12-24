import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import {BookmarkInfo} from '../../../../../hooks/useBookmark';

const ItemBookmarkToggle = ({
  bookmarkCount,
  isBookmarked,
  onPressBookmarkToggle,
}: BookmarkInfo & {
  onPressBookmarkToggle: () => {};
}) => {
  return (
    <S.BookmarkToggleContainer onPress={onPressBookmarkToggle}>
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
  );
};

export default ItemBookmarkToggle;

const S = {
  BookmarkToggleContainer: styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
};
