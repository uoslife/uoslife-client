import React from 'react';
import styled from '@emotion/native';
import {Icon, Txt} from '@uoslife/design-system';
import NavigationListProps from './NavigationList.type';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

const NavigationList = ({
  label,
  pressLabel,
  pressLabelColor,
  isPressIconShown = true,
  onPress,
  labelIcon,
}: NavigationListProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.LeftViewWrapper>
        {labelIcon ? (
          <Icon name={labelIcon} color="grey190" width={24} height={24} />
        ) : null}
        <Txt label={label} color="grey190" typograph="bodyLarge" />
      </S.LeftViewWrapper>
      <S.RightWrapper>
        {pressLabel && (
          <Txt
            label={pressLabel}
            color={pressLabelColor ?? 'grey130'}
            typograph="bodyMedium"
          />
        )}
        {isPressIconShown && (
          <AnimatePress variant="scale_up" onPress={onPress}>
            <Icon name="forwardArrow" width={24} height={24} color="grey130" />
          </AnimatePress>
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
  LeftViewWrapper: styled.View`
    gap: 12px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
};
