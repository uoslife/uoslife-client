import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {AnnouncementNavigationProps} from '../../../../navigators/AnnouncementStackNavigator';
import {ArticleItemType} from '../../../../types/announcement.type';
import {announcementFullName} from '../../../../configs/announcement';
import BookmarkAPI from '../../../../api/services/util/bookmark/bookmarkAPI';
import useBookmarkOnLocal from '../../../../hooks/useBookmarkOnLocal';

type ArticleItemProps = {
  showCategoryName: boolean;
  isBookmarkedByMe: boolean;
  articleItem: ArticleItemType;
};

const ArticleItem = ({
  articleItem,
  showCategoryName,
  isBookmarkedByMe,
}: ArticleItemProps) => {
  const {bookmarkCount, date, department, id, title, origin} = articleItem;
  const [isBookmarkedByMeState, setIsBookmarkedState] =
    useState(isBookmarkedByMe);
  const [isPending, setIsPending] = useState(false);

  const {saveBookmarkOnLocal} = useBookmarkOnLocal();

  const navigation = useNavigation<AnnouncementNavigationProps>();

  const onPressBookmarkToggle = async () => {
    setIsBookmarkedState(prev => !prev);
    setIsPending(true);

    try {
      let result;

      if (isBookmarkedByMe) {
        result = await BookmarkAPI.cancelBookmark({
          announcementId: articleItem.id,
        });
      } else {
        result = await BookmarkAPI.postBookmark({
          announcementId: articleItem.id,
        });
      }

      saveBookmarkOnLocal(result.bookmarkInformation);
    } catch (error) {
      // 요청 실패시 원상복구
      setIsBookmarkedState(prev => prev);
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
            color={'primaryBrand'}
            label={announcementFullName[origin]}
            typograph={'labelMedium'}
          />
        )}
        <Txt color={'grey190'} typograph={'bodyMedium'} label={title} />
        {/* <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${processedUploadTimeString}`}
        /> */}
        <Txt
          color={'grey90'}
          typograph={'labelSmall'}
          label={`${department} | ${date}`}
        />
      </S.DescriptionContainer>
      <S.BookmarkContainer onPress={onPressBookmarkToggle}>
        <Icon
          width={24}
          height={24}
          name="bookmark"
          color={isBookmarkedByMe ? 'primaryBrand' : 'grey60'}
        />
        <Txt
          label={bookmarkCount.toString()}
          color={isBookmarkedByMe ? 'primaryBrand' : 'grey60'}
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

export default ArticleItem;
