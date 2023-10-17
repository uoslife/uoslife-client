import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View, useWindowDimensions, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AnnouncementDetailScreenProps} from '../../navigators/AnnouncementStackNavigator';
import {ArticleDetailType} from '../../types/announcement.type';
import {announcementFullName} from '../../configs/announcement';
import AnnouncementAPI from '../../api/services/util/announcement/announcementAPI';
import {RenderHTML} from 'react-native-render-html';

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
  description,
  files,
  origin,
}: ArticleDetailType) => {
  const {width} = useWindowDimensions();
  const horizontalPadding = 16;
  const htmlContentWidth = width - horizontalPadding * 2;
  // 받아온 files를 객체를 배열로 변환
  const processedFilesData = Object.entries(files).map((fileItem, i) => ({
    name: fileItem[0],
    url: fileItem[1],
  }));

  return (
    <S.AnnouncementDetailContent>
      <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
        <S.DetailTopWrapper>
          <Txt label={title} color={'black'} typograph={'titleLarge'} />
          <S.CategoryAndDateAndBookmarkContainer>
            <Txt
              label={`${announcementFullName[origin]} | ${date}`}
              color={'grey90'}
              typograph={'bodySmall'}
            />
            <DetailScreenBookmarkToggle bookmarkCount={bookmarkCount} />
          </S.CategoryAndDateAndBookmarkContainer>
        </S.DetailTopWrapper>
      </View>
      {Object.keys(files).length !== 0 && (
        <S.AttachmentList>
          {processedFilesData.map(({name, url}, i) => (
            <S.AttachmentItem key={i}>
              <Icon
                height={18}
                width={18}
                name={'download'}
                color={'primaryBrand'}
                key={i}
              />
              <Txt
                label={`${name}`}
                color={'grey130'}
                typograph={'bodyMedium'}
              />
            </S.AttachmentItem>
          ))}
        </S.AttachmentList>
      )}
      <RenderHTML
        contentWidth={htmlContentWidth}
        source={{html: description}}
      />
    </S.AnnouncementDetailContent>
  );
};

const AnnouncementDetailScreen = ({
  route: {
    params: {id, origin},
  },
}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<ArticleDetailType>();
  // TODO: API 호출 관련 상태관리 로직 - custom hook 추상화 이용
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const loadedArticle = await AnnouncementAPI.getAnnouncementById({id});
        console.log({loadedArticle});
        setArticle(loadedArticle);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <S.ScreenContainer style={{paddingTop: insets.top}}>
        <Header
          label={announcementFullName[origin]}
          onPressBackButton={handleGoBack}
        />
        {article ? (
          <AnnouncementDetailContent {...article} />
        ) : (
          <View>
            {/* TODO: LoadingSpinner 컴포넌트 대체하기 */}
            <Text>로딩중</Text>
          </View>
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
