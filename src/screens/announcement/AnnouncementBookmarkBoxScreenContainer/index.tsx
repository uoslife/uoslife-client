import React, {Dispatch, useEffect, useState} from 'react';
import {View} from 'react-native';
import {StepTypeTemp} from '../AnnouncementTempScreen';
import Header from '../../../components/header/Header';
import {Input} from '@uoslife/design-system';
import ArticleList from '../../../components/article/ArticleList';
import styled from '@emotion/native';
import {
  Article,
  ArticleCategoryTapState,
} from '../AnnouncementMainScreenContainer';

const AnnouncementBookmarkBoxScreenContainer = ({
  setStep,
}: {
  setStep: Dispatch<StepTypeTemp>;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useState<ArticleCategoryTapState>({
    list: ['일반', '학사', '채용', '창업'],
    selected: '일반',
  });

  useEffect(() => {
    try {
      const DUMMY_DATA: Article[] = new Array();

      // 더미 만들어주는 코드 <- 나중에 제대로 된 API로 교체 예정
      for (let i = 0; i < 15; i++)
        DUMMY_DATA.push({
          bookmarkCnt: i % 5,
          department: `category${i}`,
          title: `titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle${i}`,
          uploadTime: new Date(),
          bookmarkByMe: !!(i % 5) && !!(i % 2),
          id: `id${i}`,
          category:
            i % 4 === 0
              ? '일반'
              : i % 4 === 1
              ? '학사'
              : i % 4 === 2
              ? '채용'
              : '창업',
        });

      // 내가 북마크한 글만
      setArticles(DUMMY_DATA.filter(article => article.bookmarkByMe));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <S.screenWrapper>
      <Header label="북마크함" />
      <S.categoryTapAndContents>
        <ArticleList articles={articles} showCategory />
      </S.categoryTapAndContents>
    </S.screenWrapper>
  );
};

export default AnnouncementBookmarkBoxScreenContainer;
const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  categoryTapAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
};
