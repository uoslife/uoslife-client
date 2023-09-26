// 공지사항 페이지에서 상단(헤더 아래)에 쓰는 메뉴 탭 컴포넌트

import styled from '@emotion/native';
import React from 'react';
import {Txt, colors} from '@uoslife/design-system';
import {
  ArticleCategoryName,
  AnnouncementCategoryState,
} from '../../screens/announcement/AnnouncementMainScreen';

type TabBtnProps = {
  isSelected: boolean;
  selectedBottomColor: string;
};

const CategoryTab = ({
  categoryTabProps,
  selectCategory,
}: {
  categoryTabProps: AnnouncementCategoryState;
  selectCategory: (categoryName: ArticleCategoryName) => void;
}) => {
  return (
    <S.TabContainer>
      {categoryTabProps.map(item => (
        <S.TabBtn
          key={item.name}
          isSelected={item.isSelected}
          selectedBottomColor={colors.primaryBrand}
          onPress={() => {
            selectCategory(item.name);
          }}>
          <Txt
            typograph={'bodyMedium'}
            label={item.name.slice(0, 2)}
            color={item.isSelected ? 'primaryBrand' : 'black'}
          />
        </S.TabBtn>
      ))}
    </S.TabContainer>
  );
};

export default CategoryTab;

const S = {
  TabContainer: styled.View`
    flex-direction: row;
    width: 100%;
  `,
  TabBtn: styled.Pressable<TabBtnProps>`
    height: 48px;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({isSelected, selectedBottomColor}) =>
      isSelected &&
      `
      padding: 14px 0;
      border-bottom-width: 2px; 
      border-bottom-color: ${selectedBottomColor};
      `}
  `,
};
