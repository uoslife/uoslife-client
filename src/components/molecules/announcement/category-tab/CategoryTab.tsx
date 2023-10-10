// 공지사항 페이지에서 상단(헤더 아래)에 쓰는 메뉴 탭 컴포넌트

import styled from '@emotion/native';
import React from 'react';
import {Txt, colors} from '@uoslife/design-system';
import {useAtom} from 'jotai';
import {categoryTabNumAtom} from '../../../../atoms/announcement';
import {
  articleCategoryAbbreviatedNameList,
  articleCategoryFullNameList,
} from '../../../../constants/article-category-name';
import {ArticleCategoryNum} from '../../../../types/announcement.type';

type TabBtnProps = {
  isSelected: boolean;
  label: string;
  tabNum: ArticleCategoryNum;
  selectCategoryTabNum: (num: ArticleCategoryNum) => void;
};

const TabBtn = ({
  isSelected,
  label,
  selectCategoryTabNum,
  tabNum,
}: TabBtnProps) => {
  const onPressTabBtn = () => selectCategoryTabNum(tabNum);

  return (
    <S.TabBtnContainer isSelected={isSelected} onPress={onPressTabBtn}>
      <Txt
        typograph={'bodyMedium'}
        label={label}
        color={isSelected ? 'primaryBrand' : 'black'}
      />
    </S.TabBtnContainer>
  );
};

const CategoryTab = () => {
  const [selectedCategoryTabNum, selectCategoryTabNum] =
    useAtom(categoryTabNumAtom);

  const null4Array = new Array(4).fill(null);

  return (
    <S.TabContainer>
      {null4Array.map((_, i) => (
        <TabBtn
          tabNum={i as ArticleCategoryNum}
          isSelected={i === selectedCategoryTabNum}
          key={articleCategoryFullNameList[i]}
          selectCategoryTabNum={selectCategoryTabNum}
          label={articleCategoryAbbreviatedNameList[i]}
        />
      ))}
    </S.TabContainer>
  );
};

export default CategoryTab;

type StyledTabBtnContainerProps = {
  isSelected: boolean;
};

const S = {
  TabContainer: styled.View`
    flex-direction: row;
    width: 100%;
  `,
  TabBtnContainer: styled.Pressable<StyledTabBtnContainerProps>`
    height: 48px;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({isSelected}) =>
      isSelected &&
      `
      padding: 14px 0;
      border-bottom-width: 2px; 
      border-bottom-color: ${colors.primaryBrand};
      `}
  `,
};
