import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View} from 'react-native';
import {getUploadTimeString} from '../../utils/handle-date';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AnnouncementDetailScreenProps} from '../../navigators/AnnouncementStackNavigator';
import {
  ArticleDetailType,
  ArticleItemType,
} from '../../types/announcement.type';
import {ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP} from '../../atoms/announcement';

const DetailScreenBookmarkToggle = ({
  bookmarkCount,
}: Pick<ArticleDetailType, 'bookmarkCount'>) => {
  // TODO: 북마크 Toggle API 호출 지정 필요
  const onToggleBookmark = () => {};

  const bookmarkedByMe = false;

  return (
    <S.BookmarkToggleContainer onPress={onToggleBookmark}>
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
    </S.BookmarkToggleContainer>
  );
};

const AnnouncementDetailContent = ({
  title,
  bookmarkCount,
  date,
  department,
  description,
  files,
  id,
  origin,
  url,
  viewCount,
  writer, // attachments,
  // body,
} // bookmarkByMe,
// bookmarkCnt,
// uploadTime,
// categoryId,
: ArticleDetailType) => (
  <S.AnnouncementDetailContent>
    <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
      <S.DetailTopWrapper>
        <Txt label={title} color={'black'} typograph={'titleLarge'} />
        <S.CategoryAndDateAndBookmarkContainer>
          <Txt
            label={`${
              ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP[origin].fullName
            } | ${getUploadTimeString(date)}`}
            color={'grey90'}
            typograph={'bodySmall'}
          />
          <DetailScreenBookmarkToggle bookmarkCount={bookmarkCount} />
        </S.CategoryAndDateAndBookmarkContainer>
      </S.DetailTopWrapper>
    </View>
    {files.length != 0 && (
      <S.AttachmentList>
        {files.map((fileItem, i) => (
          <S.AttachmentItem key={i}>
            <Icon
              height={18}
              width={18}
              name={'download'}
              color={'primaryBrand'}
              key={i}
            />
            <Txt
              label={`${i + 1}. ${fileItem}`}
              color={'grey130'}
              typograph={'bodyMedium'}
            />
          </S.AttachmentItem>
        ))}
      </S.AttachmentList>
    )}
    {/* TODO: label 제대로 넣기 */}
    <Txt
      label={'호로로로롤ㄹ로ㅗㄹ로'}
      color={'grey190'}
      typograph={'bodyLarge'}
    />
  </S.AnnouncementDetailContent>
);

const AnnouncementDetailScreen = ({
  route: {
    params: {id},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<ArticleDetailType>();
  // TODO: API 호출 관련 상태관리 로직 custom hook 추상화 이용
  const [isPending, setIsPending] = useState<boolean>(false);

  // TODO: 실 API 호출 코드 작성
  useEffect(() => {}, []);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <S.ScreenContainer style={{paddingTop: insets.top}}>
        <Header
          label={
            '와라라라라라라이'
            // TODO: 라벨 바르게 넣기
            // ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP[article?.origin]
            //   .fullName
          }
          onPressBackButton={handleGoBack}
        />
        {!isPending && article ? (
          <AnnouncementDetailContent {...article} />
        ) : (
          <View>{/* TODO: 이곳에 보여줄 컴포넌트 작성 필요 */}</View>
        )}
      </S.ScreenContainer>
    </>
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
