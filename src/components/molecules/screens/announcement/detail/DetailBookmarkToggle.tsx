import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {BookmarkInfo} from '../../../../../hooks/useBookmark';
import AnimatePress from '../../../../animations/pressable_icon/AnimatePress';

const DetailBookmarkToggle = ({
  bookmarkCount,
  isBookmarked,
  onPressBookmarkToggle,
}: BookmarkInfo & {
  onPressBookmarkToggle: () => {};
}) => (
  <AnimatePress onPress={onPressBookmarkToggle} variant="scale_up">
    <S.BookmarkToggleContainer>
      <Icon
        name="bookmark"
        color={isBookmarked ? 'primaryBrand' : 'grey90'}
        height={24}
        width={24}
      />
      <Txt
        color={isBookmarked ? 'primaryBrand' : 'grey90'}
        label={`${bookmarkCount}`}
        typograph="titleSmall"
      />
    </S.BookmarkToggleContainer>
  </AnimatePress>
);

const S = {
  BookmarkToggleContainer: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 6px 12px 6px 8px;
    border-radius: 10px;

    border: 1px ${colors.grey40};
  `,
};

export default DetailBookmarkToggle;
