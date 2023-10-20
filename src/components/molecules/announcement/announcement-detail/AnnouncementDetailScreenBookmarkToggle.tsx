import {Icon, Txt, colors} from '@uoslife/design-system';
import {ArticleDetailType} from '../../../../types/announcement.type';
import {Alert} from 'react-native';
import styled from '@emotion/native';

const AnnouncementDetailScreenBookmarkToggle = ({
  bookmarkCount,
}: Pick<ArticleDetailType, 'bookmarkCount'>) => {
  // TODO: 북마크 Toggle API 호출 지정 필요
  const onToggleBookmark = () => {
    Alert.alert('북마크 기능은 아직 개발이 완료되지 않았습니다.');
  };

  const bookmarkedByMe = false;

  return (
    <S.Root onPress={onToggleBookmark}>
      <Icon
        name={'bookmark'}
        color={bookmarkedByMe ? 'primaryBrand' : 'grey90'}
        height={24}
        width={24}
      />
      <Txt
        color={bookmarkedByMe ? 'primaryBrand' : 'grey90'}
        label={`${bookmarkCount}`}
        typograph={'titleSmall'}
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
