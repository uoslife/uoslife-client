import styled from '@emotion/native';
import React from 'react';
import {useAtom} from 'jotai';
import {
  ANNOUNCEMENT_CATEGORY_ORIGIN_LIST,
  ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP,
  selectedCategoryOriginAtom,
} from '../../../../atoms/announcement';
import TabButton from './TabButton';
/** 앱 메인페이지의 공지사항 Card 부분 / 공지사항 메인페이지에서에서 사용하는 카테고리 선택 컴포넌트 */
const CategoryTab = () => {
  const [selectedCategoryOrigin, selectCategoryOrigin] = useAtom(
    selectedCategoryOriginAtom,
  );

  return (
    <S.Root>
      {ANNOUNCEMENT_CATEGORY_ORIGIN_LIST.map(origin => {
        return (
          <TabButton
            key={origin}
            isSelected={selectedCategoryOrigin === origin}
            label={
              ANNOUNCEMENT_CATEGORY_ORIGIN_TO_NAME_VIEW_MAP[origin]
                .abbreviatedName
            }
            selectCategoryOrigin={selectCategoryOrigin}
            origin={origin}
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
