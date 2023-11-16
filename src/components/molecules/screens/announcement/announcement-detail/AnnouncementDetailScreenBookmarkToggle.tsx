import {Icon, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {ArticleDetailType} from '../../../../../types/announcement.type';

const AnnouncementDetailScreenBookmarkToggle = ({
  bookmarkCount,
  isBookmarkedByMe,
  onPressBookmarkToggle,
}: Pick<ArticleDetailType, 'bookmarkCount' | 'isBookmarkedByMe'> & {
  onPressBookmarkToggle: () => void;
}) => {
  return (
    <S.Root onPress={onPressBookmarkToggle}>
      <Icon
        name="bookmark"
        color={isBookmarkedByMe ? 'primaryBrand' : 'grey90'}
        height={24}
        width={24}
      />
      <Txt
        color={isBookmarkedByMe ? 'primaryBrand' : 'grey90'}
        label={`${bookmarkCount}`}
        typograph="titleSmall"
      />
    </S.Root>
  );
};

const S = {
  Root: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 6px 12px 6px 8px;
    border-radius: 10px;

    border: 1px ${colors.grey40};
  `,
};

export default AnnouncementDetailScreenBookmarkToggle;
