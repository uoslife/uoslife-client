import styled from '@emotion/native';
import React, {Dispatch, useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import {Txt} from '@uoslife/design-system';
import {Image, View, Text} from 'react-native';
import {StepTypeTemp} from '../NoticeTempScreen';
import {Article} from '../NoticeMainScreenContainer';
import {getUploadTimeString} from '../../../utils/handle-date';

const NoticeDetailScreenContainer = ({
  setStep,
}: {
  setStep: Dispatch<StepTypeTemp>;
}) => {
  const [article, setArticle] = useState<Article>();

  // article 불러오는 API 달기
  useEffect(() => {
    try {
      const DUMMY_ARTICLE: Article = {
        bookmarkByMe: false,
        bookmarkCnt: 13456789,
        id: '으아아아악',
        menu: '일반',
        title:
          '서울시립대학교 모듈형 교육과정 운영 시행세칙 일부개정(안) 사전예고(기간연장)',
        category: '교무과',
        body: ``,
        uploadTime: new Date(),
      };

      setArticle(DUMMY_ARTICLE);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const BookmarkToggleOn = () => (
    <Image source={require('../../../assets/images/bookmark_toggle_on.png')} />
  );
  const BookmarkToggleOff = () => (
    <Image source={require('../../../assets/images/bookmark_toggle_off.png')} />
  );

  // API 달기
  const onPressBookmark = () => {};
  const processedUploadTimeString = getUploadTimeString(article!.uploadTime!);

  // 디자인 확정시 padding, typography(아무거나막해놈) 등 반영 필요
  return !!article ? (
    <S.screenWrapper>
      <Header label={`${article.menu}공지`} />
      <S.detailTopWrapper>
        <Txt label={article.title} color="black" typograph="bodyLarge" />
        <S.categoryAndDateAndBookmarkWrapper>
          {/* date handler 완성되면 바꾸기 */}
          <Txt
            label={`${article.category} | ${processedUploadTimeString}`}
            color="grey60"
            typograph="bodySmall"
          />
          <S.bookmarkContainer onPress={onPressBookmark}>
            {article.bookmarkByMe ? (
              <BookmarkToggleOn />
            ) : (
              <BookmarkToggleOff />
            )}
            <Txt
              label={`${article.bookmarkCnt}`}
              color="grey130"
              typograph="bodySmall"
            />
          </S.bookmarkContainer>
        </S.categoryAndDateAndBookmarkWrapper>
      </S.detailTopWrapper>
      <Txt label={article.body!} color="black" typograph="bodySmall" />
    </S.screenWrapper>
  ) : (
    <View>
      <Text>로딩스피너?</Text>
    </View>
  );
};

export default NoticeDetailScreenContainer;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  detailTopWrapper: styled.View``,
  categoryAndDateAndBookmarkWrapper: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  bookmarkContainer: styled.Pressable`
    display: flex;
    align-items: center;
    justify-contents: center;
    width: 48px;
    height: 60px;
  `,
};
