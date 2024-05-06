import {Linking, View} from 'react-native';
import {Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {ArticleDetailType} from '../../../../../types/announcement.type';
import {AnnouncementFullNameEnum} from '../../../../../configs/announcement';
import AnnouncementFileList from './AnnouncementFileList';
import AnnouncementHTML from './AnnouncementHTML';
import useBookmark from '../../../../../hooks/useBookmark';
import DetailBookmarkToggle from './DetailBookmarkToggle';
import AnimatePress from '../../../../animations/pressable_icon/AnimatePress';

const AnnouncementDetailScreenContent = ({
  title,
  bookmarkCount,
  date,
  description,
  files,
  origin,
  url,
  id,
  isBookmarked,
}: ArticleDetailType) => {
  const openOriginalUrl = () => {
    Linking.openURL(url);
  };

  const {bookmarkCountCurrent, isBookmarkedCurrent, onPressBookmarkToggle} =
    useBookmark(id, {
      bookmarkCount,
      isBookmarked,
    });

  return (
    <S.Root>
      <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
        <S.TopWrapper>
          <Txt label={title} color="black" typograph="titleLarge" />
          <S.CategoryAndDateAndBookmarkContainer>
            <Txt
              label={`${AnnouncementFullNameEnum[origin]} | ${date}`}
              color="grey90"
              typograph="bodySmall"
            />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <AnimatePress variant="scale_up_2" onPress={openOriginalUrl}>
                <S.GoToOriginUrl>
                  <Txt
                    color="grey90"
                    label="원본 글 보기"
                    typograph="bodyLarge"
                  />
                </S.GoToOriginUrl>
              </AnimatePress>
              <DetailBookmarkToggle
                isBookmarked={isBookmarkedCurrent}
                bookmarkCount={bookmarkCountCurrent}
                onPressBookmarkToggle={onPressBookmarkToggle}
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
  GoToOriginUrl: styled.View`
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
