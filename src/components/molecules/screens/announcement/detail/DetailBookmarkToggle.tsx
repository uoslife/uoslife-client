import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {BookmarkInfo} from '../../../../../hooks/useBookmark';

const DetailBookmarkToggle = ({
  bookmarkCount,
  bookmarked,
  onPressBookmarkToggle,
}: BookmarkInfo & {
  onPressBookmarkToggle: () => {};
}) => {
  return (
    <S.BookmarkToggleContainer onPress={onPressBookmarkToggle}>
      <Icon
        name="bookmark"
        color={bookmarked ? 'primaryBrand' : 'grey90'}
        height={24}
        width={24}
      />
      <Txt
        color={bookmarked ? 'primaryBrand' : 'grey90'}
        label={`${bookmarkCount}`}
        typograph="titleSmall"
      />
    </S.BookmarkToggleContainer>
  );
};

const S = {
  BookmarkToggleContainer: styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 6px 12px 6px 8px;
    border-radius: 10px;

    border: 1px ${colors.grey40};
  `,
};

export default DetailBookmarkToggle;
