import styled from '@emotion/native';
import React from 'react';

interface BgProps {
  onPress: () => void;
  zIndex: number;
  bgDark: boolean;
}

const Background = ({onPress, zIndex = 5, bgDark}: BgProps) => {
  return <S.background bgDark={bgDark} zIndex={zIndex} onPress={onPress} />;
};

export default Background;

interface StyledBgProps {
  zIndex: number;
  bgDark: boolean;
}

const S = {
  background: styled.Pressable<StyledBgProps>`
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${({bgDark}) =>
      bgDark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0)'};
    z-index: ${({zIndex}) => zIndex};
  `,
};
