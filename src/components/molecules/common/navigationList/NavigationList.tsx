import React from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import NavigationListProps from './NavigationList.type';

const NavigationList = ({
  label,
  pressLabel,
  pressLabelColor,
  isPressIconShown = true,
  onPress,
}: NavigationListProps) => {
  return (
    <S.Container onPress={onPress}>
      <Txt label={label} color="grey190" typograph="bodyLarge" />
      <S.RightWrapper>
        {pressLabel && (
          <Txt
            label={pressLabel}
            color={pressLabelColor ?? 'grey130'}
            typograph="bodyMedium"
          />
        )}
        {isPressIconShown && (
          <Icon name="forwardArrow" width={24} height={24} color="grey130" />
        )}
      </S.RightWrapper>
    </S.Container>
  );
};

export default NavigationList;

const S = {
  Container: styled.Pressable`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 4px 12px 8px;
  `,
  RightWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
};
