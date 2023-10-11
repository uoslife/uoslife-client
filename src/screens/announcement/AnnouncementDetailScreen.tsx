import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View} from 'react-native';
import {getUploadTimeString} from '../../utils/handle-date';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Article} from '../../types/announcement.type';
import {ANNOUNCEMENT_LIST_MOCK_DATA} from '../../mock/announcement.mock';
import {AnnouncementDetailScreenProps} from '../../navigators/AnnouncementStackNavigator';
import {ANNOUNCEMENT_CATEGORY_MAP} from '../../atoms/announcement';

const DetailScreenBookmarkToggle = ({
  bookmarkByMe,
  bookmarkCnt,
}: Pick<Article, 'bookmarkByMe' | 'bookmarkCnt'>) => {
  // TODO: 북마크 Toggle API 호출 지정 필요
  const onToggleBookmark = () => {};

  /* TODO: 이미 만들어져 있는 IconWithText를 사용할 수 있는지 확인 */

  return (
    <S.BookmarkToggleContainer onPress={onToggleBookmark}>
      <Icon
        name={'bookmark'}
        color={bookmarkByMe ? 'primaryBrand' : 'grey90'}
        height={24}
        width={24}
      />
      <Txt
        color={bookmarkByMe ? 'primaryBrand' : 'grey90'}
        label={`${bookmarkCnt}`}
        typograph={'titleSmall'}
      />
    </S.BookmarkToggleContainer>
  );
};

const AnnouncementDetailContent = ({
  title,
  attachments,
  body,
  bookmarkByMe,
  bookmarkCnt,
  uploadTime,
  categoryId,
}: Article) => (
  <S.AnnouncementDetailContent>
    <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
      <S.DetailTopWrapper>
        <Txt label={title} color={'black'} typograph={'titleLarge'} />
        <S.CategoryAndDateAndBookmarkContainer>
          <Txt
            label={`${
              ANNOUNCEMENT_CATEGORY_MAP[categoryId].fullName
            } | ${getUploadTimeString(uploadTime)}`}
            color={'grey90'}
            typograph={'bodySmall'}
          />
          <DetailScreenBookmarkToggle
            bookmarkByMe={bookmarkByMe}
            bookmarkCnt={bookmarkCnt}
          />
        </S.CategoryAndDateAndBookmarkContainer>
      </S.DetailTopWrapper>
    </View>
    {attachments.length !== 0 && (
      <S.AttachmentList>
        {attachments.map((item, i) => (
          <S.AttachmentItem key={item}>
            <Icon
              height={18}
              width={18}
              name={'download'}
              color={'primaryBrand'}
              key={i}
            />
            <Txt
              label={`${i + 1}. ${item}`}
              color={'grey130'}
              typograph={'bodyMedium'}
            />
          </S.AttachmentItem>
        ))}
      </S.AttachmentList>
    )}
    <Txt label={body} color={'grey190'} typograph={'bodyLarge'} />
  </S.AnnouncementDetailContent>
);

const AnnouncementDetailScreen = ({
  route: {
    params: {id, categoryId},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<Article>();
  // TODO: API 호출 관련 상태관리 로직 custom hook 추상화 이용
  const [isPending, setIsPending] = useState<boolean>(false);

  // TODO: 실 API 호출로 변경
  useEffect(() => {
    setIsPending(true);

    const found = ANNOUNCEMENT_LIST_MOCK_DATA.find(
      article => article.id === id,
    );

    if (found) setArticle(found);

    setIsPending(false);
  }, []);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.ScreenContainer style={{paddingTop: insets.top}}>
      <Header
        label={ANNOUNCEMENT_CATEGORY_MAP[categoryId].fullName}
        onPressBackButton={handleGoBack}
      />
      {!isPending && article ? (
        <AnnouncementDetailContent {...article} />
      ) : (
        <View>{/* TODO: 이곳에 보여줄 컴포넌트 작성 필요 */}</View>
      )}
    </S.ScreenContainer>
  );
};

export default AnnouncementDetailScreen;

const S = {
  ScreenContainer: styled.ScrollView`
    width: 100%;
    height: 100%;
  `,
  AnnouncementDetailContent: styled.View`
    display: flex;
    gap: 24px;

    padding: 0px 16px;
  `,
  DetailTopWrapper: styled.View`
    padding: 12px 0;

    border-bottom: 1px ${colors.black};
    border-color: ${colors.black};
  `,
  CategoryAndDateAndBookmarkContainer: styled.View`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    margin-top: 8px;
  `,
  BookmarkToggleContainer: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 6px 12px 6px 8px;
    border-radius: 10px;

    border: 1px ${colors.grey40};
  `,
  AttachmentList: styled.View`
    gap: 4px;
  `,
  AttachmentItem: styled.View`
    display: flex;
    gap: 6px;
    flex-direction: row;
    align-items: center;

    border-radius: 10px;
    border: 1px ${colors.grey40};

    padding: 8px 16px;
  `,
};
