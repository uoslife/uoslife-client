import styled from '@emotion/native';
import React from 'react';
import {useAtom} from 'jotai';
import {
  AnnouncmentCategoryOriginType,
  categoryStatusAtom,
} from '../../../../../store/announcement';
import TabButton from './TabButton';

const CategoryTab = ({
  tabPressAdditionalAction,
}: {
  tabPressAdditionalAction?: (origin?: AnnouncmentCategoryOriginType) => void;
}) => {
  const [categoryStatus, setCategoryStatus] = useAtom(categoryStatusAtom);

  const changeCategory = (origin: AnnouncmentCategoryOriginType) => {
    setCategoryStatus(prev => {
      return prev.map(item =>
        origin === item.origin
          ? {...item, isSelected: true}
          : {...item, isSelected: false},
      );
    });
  };

  const handlePressTab = (origin: AnnouncmentCategoryOriginType) => {
    changeCategory(origin);
    tabPressAdditionalAction?.(origin);
  };

  return (
    <S.Container>
      {categoryStatus.map(item => {
        return (
          <TabButton
            key={item.origin}
            label={item.name}
            isSelected={item.isSelected}
            onPress={() => handlePressTab(item.origin)}
          />
        );
      })}
    </S.Container>
  );
};

export default CategoryTab;

const S = {
  Container: styled.View`
    flex-direction: row;
    width: 100%;
  `,
};
