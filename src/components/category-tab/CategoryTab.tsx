// 공지사항 페이지에서 상단(헤더 아래)에 쓰는 메뉴 탭 컴포넌트

import styled from '@emotion/native';
import React from 'react';
import {Txt, colors} from '@uoslife/design-system';
import {
  ArticleCategoryName,
  ArticleCategoryTapState,
} from '../../screens/announcement/AnnouncementMainScreen';

type TapBtnProps = {
  isSelected: boolean;
  selectedBottomColor: string;
};

const CategoryTab = ({
  categoryTabProps,
  selectCategory,
}: {
  categoryTabProps: ArticleCategoryTapState;
  selectCategory: (categoryName: ArticleCategoryName) => void;
}) => {
  const {list, selected} = categoryTabProps;

  return (
    <S.tapWrapper>
      {list.map(item => (
        <S.tapBtn
          key={item}
          isSelected={item === selected}
          selectedBottomColor={colors.primaryBrand}
          onPress={() => {
            selectCategory(item);
          }}>
          <Txt
            typograph={'bodyMedium'}
            label={item.slice(0, 2)}
            color={item === selected ? 'primaryBrand' : 'black'}
          />
        </S.tapBtn>
      ))}
    </S.tapWrapper>
  );
};

export default CategoryTab;

const S = {
  tapWrapper: styled.View`
    flex-direction: row;
    width: 100%;
  `,
  tapBtn: styled.Pressable<TapBtnProps>`
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
