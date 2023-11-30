import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/core';
import BookmarkAPI from '../../../../../api/services/util/bookmark/bookmarkAPI';
import useBookmark from '../../../../../hooks/useBookmark';
import {AnnouncementNavigationProps} from '../../../../../navigators/AnnouncementStackNavigator';
import {ArticleItemType} from '../../../../../types/announcement.type';
import {announcementFullName} from '../../../../../configs/announcement';

type ArticleItemComponentProps = {
  showCategoryName: boolean;
  articleItem: ArticleItemType;
};

const ArticleItem = ({
  articleItem,
  showCategoryName,
}: ArticleItemComponentProps) => {
  const {bookmarkCount, date, department, id, title, origin, isBookmarkedByMe} =
    articleItem;
  const [isPending, setIsPending] = useState(false);

  // TODO: "이 component level에서 관리하는 게 맞는가"에 대해 다시 고민해보기
  // 클라이언트 측에서 어떻게 보여질지 결정하는 부분(API 호출 시 변동되기에 state로 저장)
  const [bookmarkCountOnClient, setBookmarkCountOnClient] =
    useState(bookmarkCount);
  const [isBookmarkedByMeOnClient, setIsBookmarkedByMeOnClient] =
    useState(isBookmarkedByMe);

  const {saveBookmarkOnLocal} = useBookmark();

  const navigation = useNavigation<AnnouncementNavigationProps>();

  const onPressBookmarkToggle = async () => {
    setIsPending(true);

    if (isBookmarkedByMeOnClient) {
      try {
        setIsBookmarkedByMeOnClient(prev => !prev);
        setBookmarkCountOnClient(prev => prev - 1);

        const result = await BookmarkAPI.cancelBookmark({
          announcementId: articleItem.id,
        });
        saveBookmarkOnLocal(result.bookmarkInformation);
      } catch (error) {
        const {code} = error as any;
        // 이미 삭제되어 있는 상태도 아닌, Unexpected Error
        if (code !== 'B01') {
          setIsBookmarkedByMeOnClient(prev => !prev);
          setBookmarkCountOnClient(prev => prev + 1);
        }
      }
    } else {
      try {
        setIsBookmarkedByMeOnClient(prev => !prev);
        setBookmarkCountOnClient(prev => prev + 1);

        const result = await BookmarkAPI.postBookmark({
          announcementId: articleItem.id,
        });
        saveBookmarkOnLocal(result.bookmarkInformation);
      } catch (error) {
        const {code} = error as any;
        // 이미 등록되어 있는 상태도 아닌, Unexpected Error
        if (code !== 'B01') {
          setIsBookmarkedByMeOnClient(prev => !prev);
          setBookmarkCountOnClient(prev => prev - 1);
        }
      }
    }
    setIsPending(false);
  };

  // TODO: API 호출시의 형식이 예상과 다름 -> 기획팀에 전달 후 삭제
  // const processedUploadTimeString = getUploadTimeString(date);

  return (
    <S.Root>
      <S.DescriptionContainer
        onPress={() => {
          navigation.navigate('AnnouncementDetail', {id, origin: 'FA1'});
        }}>
        {showCategoryName && (
          <Txt
            color="primaryBrand"
            label={announcementFullName[origin]}
            typograph="labelMedium"
          />
        )}
        <Txt color="grey190" typograph="bodyMedium" label={title} />
        {/* <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${processedUploadTimeString}`}
        /> */}
        <Txt
          color="grey90"
          typograph="labelSmall"
          label={`${department} | ${date}`}
        />
      </S.DescriptionContainer>
      <S.BookmarkContainer
        onPress={!isPending ? onPressBookmarkToggle : () => {}}>
        <Icon
          width={24}
          height={24}
          name="bookmark"
          color={isBookmarkedByMeOnClient ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={bookmarkCountOnClient.toString()}
          color={isBookmarkedByMeOnClient ? 'primaryBrand' : 'grey60'}
          typograph="labelSmall"
        />
      </S.BookmarkContainer>
    </S.Root>
  );
};

const S = {
  Root: styled.View`
    padding: 8px 16px;

    width: 100%;

    display: flex;
    flex-direction: row;

    align-items: center;
  `,
  DescriptionContainer: styled.Pressable`
    flex: 1;

    display: flex;
    gap: 4px;
  `,
  BookmarkContainer: styled.Pressable`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 60px;
  `,
};

export default memo(ArticleItem);
