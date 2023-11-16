import {Linking, View} from 'react-native';
import {Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useState} from 'react';
import {ArticleDetailType} from '../../../../../types/announcement.type';
import AnnouncementDetailScreenBookmarkToggle from './AnnouncementDetailScreenBookmarkToggle';
import {announcementFullName} from '../../../../../configs/announcement';
import AnnouncementFileList from './AnnouncementFileList';
import AnnouncementHTML from './AnnouncementHTML';
import useBookmarkOnLocal from '../../../../../hooks/useBookmarkOnLocal';
import BookmarkAPI from '../../../../../api/services/util/bookmark/bookmarkAPI';

const AnnouncementDetailScreenContent = ({
  title,
  bookmarkCount,
  date,
  description,
  files,
  origin,
  url,
  isBookmarkedByMe,
  id,
}: ArticleDetailType) => {
  const GoToOriginUrl = () => {
    Linking.openURL(url);
  };

  // TODO: "해당 state를 이 component level에서 관리하는 게 맞는가"에 대해 다시 고민해보기
  // 클라이언트 측에서 어떻게 보여질지 결정하는 부분(API 호출 시 변동되기에 state로 저장)
  const [bookmarkCountOnClient, setBookmarkCountOnClient] =
    useState<number>(bookmarkCount);
  const [isBookmarkedByMeOnClient, setIsBookmarkedByMeOnClient] =
    useState<boolean>(isBookmarkedByMe);

  const {saveBookmarkOnLocal, getBookmarkIdList} = useBookmarkOnLocal();

  const onPressBookmarkToggle = async () => {
    if (isBookmarkedByMeOnClient) {
      try {
        setIsBookmarkedByMeOnClient(prev => !prev);
        setBookmarkCountOnClient(prev => prev - 1);

        const result = await BookmarkAPI.cancelBookmark({
          announcementId: id,
        });
        saveBookmarkOnLocal(result.bookmarkInformation);
      } catch (error) {
        const {code} = error as any;
        // 이미 삭제되어 있는 상태도 아닌, Unexpected Error
        if (code === 'B01') {
          console.log('B01');

          return;
        }

        setIsBookmarkedByMeOnClient(prev => !prev);
        setBookmarkCountOnClient(prev => prev + 1);
      }
    } else {
      try {
        setIsBookmarkedByMeOnClient(prev => !prev);
        setBookmarkCountOnClient(prev => prev + 1);

        const result = await BookmarkAPI.postBookmark({
          announcementId: id,
        });
        saveBookmarkOnLocal(result.bookmarkInformation);
      } catch (error) {
        const {code} = error as any;
        // 이미 등록되어 있는 상태도 아닌, Unexpected Error
        if (code === 'B01') {
          console.log('B01');

          return;
        }

        setIsBookmarkedByMeOnClient(prev => !prev);
        setBookmarkCountOnClient(prev => prev - 1);
      }
    }
  };

  return (
    <S.Root>
      <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
        <S.TopWrapper>
          <Txt label={title} color="black" typograph="titleLarge" />
          <S.CategoryAndDateAndBookmarkContainer>
            <Txt
              label={`${announcementFullName[origin]} | ${date}`}
              color="grey90"
              typograph="bodySmall"
            />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <S.GoToOriginUrl onPress={GoToOriginUrl}>
                <Txt
                  color="grey90"
                  label="원본 글 보기"
                  typograph="bodyLarge"
                />
              </S.GoToOriginUrl>
              <AnnouncementDetailScreenBookmarkToggle
                isBookmarkedByMe={isBookmarkedByMeOnClient}
                bookmarkCount={bookmarkCountOnClient}
                {...{onPressBookmarkToggle}}
              />
            </View>
          </S.CategoryAndDateAndBookmarkContainer>
        </S.TopWrapper>
      </View>
      <AnnouncementFileList files={files} />
      <AnnouncementHTML description={description} />
    </S.Root>
  );
};

export default AnnouncementDetailScreenContent;

const S = {
  Root: styled.View`
    display: flex;
    gap: 24px;
    padding: 0px 16px;
  `,
  TopWrapper: styled.View`
    padding: 12px 0;

    border-bottom: 1px ${colors.black};
    border-color: ${colors.black};
  `,
  GoToOriginUrl: styled.TouchableOpacity`
    align-items: center;
    justify-content: center;

    padding: 6px 12px 6px 12px;
    border-radius: 10px;

    border: 1px ${colors.grey40};
  `,
  CategoryAndDateAndBookmarkContainer: styled.View`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    margin-top: 8px;
  `,
};
