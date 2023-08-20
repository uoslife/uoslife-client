import React, {Dispatch, useEffect, useState} from 'react';
import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {StepTypeTemp} from '../AnnouncementTempScreen';
import {
  Article,
  ArticleCategoryTapState,
} from '../AnnouncementMainScreenContainer';
import ArticleList from '../../../components/article/ArticleList';
import {Input, Txt} from '@uoslife/design-system';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';

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

const AnnouncementSearchResultScreencontainer = ({
  setStep,
}: {
  setStep: Dispatch<StepTypeTemp>;
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useState<ArticleCategoryTapState>({
    list: ['일반', '학사', '채용', '창업'],
    selected: '일반',
  });

  const [searchWord, setSearchWord] = useState<string>('검색어');

  const onChangeSearchWord = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text} = e.nativeEvent;
    setSearchWord(text);

    setArticles(
      DUMMY_DATA.filter(
        item => item.title.includes(text) || item.body?.includes(text),
      ),
    );
  };

  useEffect(() => {
    try {
      setArticles(DUMMY_DATA.filter(article => article.bookmarkByMe));
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 디자인 확정시 반영 필요
  return (
    <S.screenWrapper>
      <Header label={'검색창'} />
      <Input value={searchWord} onChangeInput={onChangeSearchWord} />
      <S.categoryTapAndContents>
        {articles.length === 0 ? (
          <Txt
            color={'black'}
            label={'자신이 북마크한 공지사항을 확인할 수 있어요'}
            typograph={'bodyLarge'}
          />
        ) : (
          <ArticleList articles={articles} showCategory />
        )}
      </S.categoryTapAndContents>
    </S.screenWrapper>
  );
};

export default AnnouncementSearchResultScreencontainer;

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
  decriptionContainer: styled.View`
    display: flex;
    flex-direction: row;
  `,
};
