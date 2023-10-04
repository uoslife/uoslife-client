import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View} from 'react-native';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
} from './AnnouncementMainScreen';
import {getUploadTimeString} from '../../utils/handle-date';
import {AnnouncementStackParamList} from '../../navigators/AnnouncementStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

type AnnouncementDetailScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementDetail'
>;

const DetailScreenBookmarkToggle = ({
  bookmarkByMe,
  bookmarkCnt,
}: Pick<Article, 'bookmarkByMe' | 'bookmarkCnt'>) => {
  // TODO: 북마크 Toggle API 호출 지정 필요
  const onToggleBookmark = () => {};

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
  category,
  uploadTime,
}: Article) => (
  <S.AnnouncementDetailContent>
    <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
      <S.DetailTopWrapper>
        <Txt label={title} color={'black'} typograph={'titleLarge'} />
        <S.CategoryAndDateAndBookmarkContainer>
          <Txt
            label={`${category} | ${getUploadTimeString(uploadTime)}`}
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
    params: {id, category},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<Article>();
  // TODO: API 호출 관련 상태관리 로직 custom hook으로 추상화 필요
  const [isPending, setIsPending] = useState<boolean>(false);

  // TODO: 더미데이터 -> 실제 API 호출로 변경 필요
  useEffect(() => {
    setIsPending(true);

    const found = ANNOUNCEMENT_ARTICLE_DUMMY_DATA.find(
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
      <Header label={category} onPressBackButton={handleGoBack} />
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
