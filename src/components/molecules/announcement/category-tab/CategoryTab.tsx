import styled from '@emotion/native';
import React from 'react';
import {useAtom} from 'jotai';
import {categoryTabNumAtom} from '../../../../atoms/announcement';
import {
  articleCategoryAbbreviatedNameList,
  articleCategoryFullNameList,
} from '../../../../constants/article-category-name';
import {ALL_CATEGORY_NUMBERS} from '../../../../types/announcement.type';
import TabBtn from './TabBtn';

/** 앱 메인페이지의 공지사항 Card 부분 / 공지사항 메인페이지에서에서 사용하는 카테고리 선택 컴포넌트 */
const CategoryTab = () => {
  const [selectedCategoryTabNum, selectCategoryTabNum] =
    useAtom(categoryTabNumAtom);

  return (
    <S.Root>
      {ALL_CATEGORY_NUMBERS.map(tabNum => (
        <TabBtn
          tabNum={tabNum}
          isSelected={tabNum === selectedCategoryTabNum}
          key={articleCategoryFullNameList[tabNum]}
          selectCategoryTabNum={selectCategoryTabNum}
          label={articleCategoryAbbreviatedNameList[tabNum]}
        />
      ))}
    </S.Root>
  );
};

export default CategoryTab;

const S = {
  Root: styled.View`
    flex-direction: row;
    width: 100%;
  `,
};