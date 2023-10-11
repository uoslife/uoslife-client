import styled from '@emotion/native';
import React from 'react';
import {useAtom} from 'jotai';
import {
  ANNOUNCEMENT_CATEGORY_ID_LIST,
  ANNOUNCEMENT_CATEGORY_MAP,
  selectedCategoryIdAtom,
} from '../../../../atoms/announcement';
import TabButton from './TabButton';

/** 앱 메인페이지의 공지사항 Card 부분 / 공지사항 메인페이지에서에서 사용하는 카테고리 선택 컴포넌트 */
const CategoryTab = () => {
  const [selectedCategoryId, selectCategoryId] = useAtom(
    selectedCategoryIdAtom,
  );

  return (
    <S.Root>
      {ANNOUNCEMENT_CATEGORY_ID_LIST.map(id => {
        return (
          <TabButton
            key={id}
            isSelected={selectedCategoryId === id}
            label={ANNOUNCEMENT_CATEGORY_MAP[id].abbreviatedName}
            categoryId={id}
            selectCategoryId={selectCategoryId}
          />
        );
      })}
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
