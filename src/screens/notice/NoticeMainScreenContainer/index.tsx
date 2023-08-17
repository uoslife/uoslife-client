import React, {useState} from 'react';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {Input} from '@uoslife/design-system';
import ArticleList from '../../../components/article/ArticleList';
import MenuTab from '../../../components/menu-tab/MenuTab';

const NoticeMainScreen = () => {
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
          <ArticleList />
        </S.contents>
      </S.menuTapAndContents>
    </S.screenWrapper>
  );
};

export default NoticeMainScreen;

const S = {
  screenWrapper: styled.ScrollView`
    height: 100%;
    display: flex;
  `,
  inputContainer: styled.View`
    padding: 14px 16px;
  `,
  menuTapAndContents: styled.View`
    display: flex;
    gap: 4px;
  `,
  menuTabContainer: styled.View``,
  menuBtnContainer: styled.View``,
  contents: styled.View``,
};
