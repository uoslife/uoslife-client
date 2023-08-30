import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View, Text} from 'react-native';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
} from '../AnnouncementMainScreen';
import {getUploadTimeString} from '../../../utils/handle-date';
import IconWithText from '../../../components/molecules/iconWithText/IconWithText';

const AnnouncementDetailScreen = () => {
  const [article, setArticle] = useState<Article>();

  // article 불러오는 API 달기
  useEffect(() => {
    try {
      const found = ANNOUNCEMENT_ARTICLE_DUMMY_DATA.find(
        article => article.id === 'id1',
      );

      setArticle(found);
    } catch (err) {}
  }, []);

  // API 달기
  const onPressBookmark = () => {};

  const Bookmark = ({article}: {article: Article}) => (
    <S.bookmarkContainer onPress={onPressBookmark}>
      <IconWithText
        color={article.bookmarkByMe ? 'grey90' : 'primaryBrand'}
        flexDirection="row"
        isClick
        iconName={'bookmark'}
        text={`${article.bookmarkCnt}`}
      />
    </S.bookmarkContainer>
  );

  return !!article ? (
    <S.screenWrapper>
      <Header label={article.category} />
      <S.detailTopWrapper>
        <Txt label={article.title} color="black" typograph="titleLarge" />
        <S.categoryAndDateAndBookmarkWrapper>
          <Txt
            label={`${article.category} | ${getUploadTimeString(
              article!.uploadTime!,
            )}`}
            color="grey90"
            typograph="bodySmall"
          />
          <Bookmark article={article} />
        </S.categoryAndDateAndBookmarkWrapper>
      </S.detailTopWrapper>
      <S.divider />
      {article?.attachments && (
        <S.attachmentsContainer>
          {article.attachments.map((item, i) => (
            <S.attachmentItem>
              {/* 아이콘 교체 필요 */}
              <Icon
                height={18}
                width={18}
                name={'backArrow'}
                color={'primaryBrand'}
                key={i}
              />
              <Txt
                label={`${i + 1}. ${item}`}
                color={'primaryBrand'}
                typograph="bodyMedium"
              />
            </S.attachmentItem>
          ))}
        </S.attachmentsContainer>
      )}
      <S.articleBody>
        <Txt label={article.body!} color="grey190" typograph="bodyLarge" />
      </S.articleBody>
    </S.screenWrapper>
  ) : (
    <View>
      <Text>로딩스피너?</Text>
    </View>
  );
};

export default AnnouncementDetailScreen;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    background: #fff; // 수정 필요
  `,
  detailTopWrapper: styled.View`
    padding: 12px 16px;
    border-bottom: 1px;
    border-color: ${() => colors.grey150};
  `,
  categoryAndDateAndBookmarkWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 8px;
  `,
  bookmarkContainer: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-contents: center;

    padding: 6px 2px 6px 2px;
    border-radius: 10px;

    border: 1px ${() => colors.grey40};
  `,
  attachmentsContainer: styled.View`
    padding: 24px 16px;

    display: flex;
    gap: 4px;
  `,
  attachmentItem: styled.View`
    display: flex;
    gap: 2px;
    flex-direction: row;
    align-items: center;

    border-radius: 10px;
    border: 1px ${() => colors.grey40};

    padding: 8px 16px;
  `,
  articleBody: styled.View`
    padding: 0px 16px;
  `,
  divider: styled.View`
    width: 100%;
    height: 1px;
    margin: 0px 16px;
    background: ${() => colors.grey20};
  `,
};
