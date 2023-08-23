import styled from '@emotion/native';
import {Icon, IconsNameType, Txt, colorsType} from '@uoslife/design-system';
import React from 'react';

type Props = {
  iconName: IconsNameType;
  iconColor: colorsType;
  text: string;
  isClick: boolean;
};

const IconWithText = ({iconName, iconColor, text, isClick}: Props) => {
  return (
    <S.Wrapper>
      <Icon name={iconName} width={24} height={24} color={iconColor} />
      <Txt
        label={text}
        color={isClick ? 'primaryBrand' : 'grey160'}
        typograph={'caption'}
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
