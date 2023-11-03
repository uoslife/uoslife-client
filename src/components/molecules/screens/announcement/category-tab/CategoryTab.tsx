import styled from '@emotion/native';
import React from 'react';
import {useAtom} from 'jotai';
import {
  AnnouncmentCategoryOriginType,
  categoryStatusAtom,
} from '../../../../../atoms/announcement';
import TabButton from './TabButton';

const CategoryTab = () => {
  const [categoryStatus, setCategoryStatus] = useAtom(categoryStatusAtom);
  const handlePressCategoryTabButton = (
    origin: AnnouncmentCategoryOriginType,
  ) => {
    setCategoryStatus(prev => {
      return prev.map(item =>
        origin === item.origin
          ? {...item, isSelected: true}
          : {...item, isSelected: false},
      );
    });
  };

  return (
    <S.Container>
      {categoryStatus.map(item => {
        return (
          <TabButton
            key={item.origin}
            label={item.name}
            isSelected={item.isSelected}
            onPress={() => handlePressCategoryTabButton(item.origin)}
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
