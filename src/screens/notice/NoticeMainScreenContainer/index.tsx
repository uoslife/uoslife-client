import React, {useState, useEffect, Dispatch} from 'react';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {Input} from '@uoslife/design-system';
import ArticleList from '../../../components/article/ArticleList';
import MenuTab from '../../../components/menu-tab/MenuTab';

type ArticleMenuName = '일반' | '학사' | '채용' | '창업';
type StepTypeTemp = 'main' | 'detail' | 'bookmark';

// MenuTap 컴포넌트로 넘겨줄것
type ArticleMenuTapProps = {
  list: ArticleMenuName[];
  selected: ArticleMenuName;
};

type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  menu: ArticleMenuName;
  category: string; // XX과
  uploadTime: Date;
  id: string;
};

const NoticeMainScreen = ({setStep}: {setStep: Dispatch<StepTypeTemp>}) => {
  // 나중에 페이지네이션 적용해야하나?? 일단은 1차원배열로 둠
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleMenuTapProps, setArticleMenuTapProps] =
    useState<ArticleMenuTapProps>({
      list: ['일반', '학사', '채용', '창업'],
      selected: '일반',
    });

  const selectMenu = (menuName: string) => {
    setArticleMenuTapProps({
      ...articleMenuTapProps,
      selected: menuName as ArticleMenuName,
    });
  };

  useEffect(() => {
    // 임시: 나중에 글 불러오는 API로 교체
    try {
      const DUMMY_DATA: Article[] = new Array();

      // 더미 만들어주는 코드 <- 나중에 삭제 예정
      for (let i = 0; i < 15; i++)
        DUMMY_DATA.push({
          bookmarkCnt: i % 5,
          category: `category${i}`,
          title: `titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle${i}`,
          uploadTime: new Date(),
          bookmarkByMe: !!(i % 5) && !!(i % 2),
          id: `id${i}`,
          menu:
            i % 4 === 0
              ? '일반'
              : i % 4 === 1
              ? '학사'
              : i % 4 === 2
              ? '채용'
              : '창업',
        });

      setArticles(
        DUMMY_DATA.filter(
          article => article.menu === articleMenuTapProps.selected,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }, [articleMenuTapProps]);

  return (
    <S.screenWrapper>
      <Header label="공지사항" />
      <S.inputContainer>
        {/* 디자인에 맞는 input으로 수정 필요!! */}
        <Input placeholder="몰?루" />
      </S.inputContainer>
      <S.menuTapAndContents>
        <MenuTab menuTapProps={articleMenuTapProps} selectMenu={selectMenu} />
        <S.contents>
          <ArticleList articles={articles} />
        </S.contents>
      </S.menuTapAndContents>
    </S.screenWrapper>
  );
};

export default NoticeMainScreen;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  inputContainer: styled.View`
    padding: 14px 16px;
  `,
  menuTapAndContents: styled.View`
    width: 100%;
    display: flex;
    gap: 4px;
  `,
  contents: styled.View`
    width: 100%;
  `,
};
