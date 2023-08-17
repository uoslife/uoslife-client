import React, {useState, useEffect} from 'react';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {Input} from '@uoslife/design-system';
import ArticleList from '../../../components/article/ArticleList';
import MenuTab from '../../../components/menu-tab/MenuTab';

// 임시타입이라 따로 빼놓지는 않겠습니다
type Article = {
  bookmarkCnt: number;
  bookmarkByMe: boolean;
  title: string;
  category: string; // XX과
  uploadTime: Date;
};

const NoticeMainScreen = () => {
  // 페이지네이션 적용해야하나??
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // 임시
    try {
      const DUMMY_DATA: Article[] = new Array(15);

      for (let i = 0; i < 15; i++)
        DUMMY_DATA.push({
          bookmarkCnt: i % 5,
          category: `category${i}`,
          title: `title${i}`,
          uploadTime: new Date(),
          bookmarkByMe: !!(i % 5) && !!(i % 2),
        });

      setArticles(DUMMY_DATA);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <S.screenWrapper>
      <Header label="공지사항" />
      <S.inputContainer>
        {/* 디자인에 맞는 input으로 수정 필요!! */}
        <Input placeholder="몰?루" />
      </S.inputContainer>
      <S.menuTapAndContents>
        <S.menuTabContainer>
          <MenuTab />
        </S.menuTabContainer>
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
  menuTabContainer: styled.View``,
  menuBtnContainer: styled.View``,
  contents: styled.View`
    width: 100%;
  `,
};
