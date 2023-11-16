import {Icon, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {ArticleDetailType} from '../../../../../types/announcement.type';

const AnnouncementDetailScreenBookmarkToggle = ({
  bookmarkCount,
}: Pick<ArticleDetailType, 'bookmarkCount'>) => {
  // TODO: 북마크 Toggle API 호출 지정 필요
  const onToggleBookmark = () => {};

  const bookmarkedByMe = false;

  return (
    <S.Root onPress={onToggleBookmark}>
      <Icon
        name="bookmark"
        color={bookmarkedByMe ? 'primaryBrand' : 'grey90'}
        height={24}
        width={24}
      />
      <Txt
        color={bookmarkedByMe ? 'primaryBrand' : 'grey90'}
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
