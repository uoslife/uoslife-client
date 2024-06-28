import React from 'react';
import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

interface FilterButtonProps {
  text: string;
  onPress?: () => void;
  isSelected: boolean;
}

const FilterButton = ({text, onPress, isSelected}: FilterButtonProps) => {
  const renderButton = () => {
    switch (text) {
      case 'ALL':
        return <Txt label="모두" color="black" typograph="labelLarge" />;
      case 'NOTIFICATION':
        return <Txt label="알림" color="black" typograph="labelLarge" />;
      case 'IN_PROGRESS':
        return <Txt label="진행 중" color="black" typograph="labelLarge" />;
      case 'ON_FILTER':
        return <Icon name="filter" width={18} height={18} color="grey190" />;
      default:
        return <Txt label={text} color="black" typograph="labelLarge" />;
    }
  };

  return (
    <AnimatePress variant="scale_up_3" onPress={onPress}>
      <S.Container isSelected={isSelected}>{renderButton()}</S.Container>
    </AnimatePress>
  );
};

export default FilterButton;

interface ContainerProps {
  isSelected: boolean;
}

const S = {
  Container: styled.View<ContainerProps>`
    flex-direction: row;
    align-self: flex-start;
    padding: 6px 9px;
    align-items: center;
    gap: 4px;
    border-radius: 12px;
    border-width: 1px;
    border-color: ${({isSelected}) =>
      isSelected ? colors.primaryBrand : colors.grey40};
    background-color: ${colors.white};
  `,
};
