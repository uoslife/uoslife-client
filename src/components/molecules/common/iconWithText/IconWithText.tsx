import styled from '@emotion/native';
import {Icon, IconsNameType, Txt, colorsType} from '@uoslife/design-system';
import React from 'react';
import {PressableProps} from 'react-native';

type Props = {
  iconName: IconsNameType;
  text: string;
  color?: colorsType;
  isClick?: boolean;
} & PressableProps;

const IconWithText = ({iconName, color, text, isClick, ...props}: Props) => {
  return (
    <S.Wrapper {...props}>
      <Icon
        name={iconName}
        width={24}
        height={24}
        color={isClick ? 'primaryBrand' : 'grey90' ?? color}
      />
      <Txt
        label={text}
        color={isClick ? 'primaryBrand' : 'grey60' ?? color}
        typograph="labelLarge"
      />
    </S.Wrapper>
  );
};

export default IconWithText;

const S = {
  Wrapper: styled.Pressable`
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  `,
};
