import styled from '@emotion/native';
import {colors} from '@uoslife/design-system';
import React from 'react';

type Props = {currentImageLocation: number};

const OnboardingSlideGuide = ({currentImageLocation}: Props) => {
  const switchIsEnabledStatus = (order: number) =>
    currentImageLocation === order;
  return (
    <S.Wrapper>
      <S.Dot isEnabled={switchIsEnabledStatus(0)} />
      <S.Dot isEnabled={switchIsEnabledStatus(1)} />
      <S.Dot isEnabled={switchIsEnabledStatus(2)} />
    </S.Wrapper>
  );
};

export default OnboardingSlideGuide;

const S = {
  Wrapper: styled.View`
    display: flex;
    flex-direction: row;
    gap: 20px;
  `,
  Dot: styled.View<{isEnabled: boolean}>`
    width: 12px;
    height: 12px;
    border-radius: 50px;
    background-color: ${({isEnabled}) =>
      isEnabled ? colors.primaryBrand : colors.primaryLighterAlt};
  `,
};
