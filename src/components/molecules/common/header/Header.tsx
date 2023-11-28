import React from 'react';
import {Pressable} from 'react-native';

import styled from '@emotion/native';

import {Icon, Txt, colors} from '@uoslife/design-system';
import HeaderProps from './Header.type';

const Header = ({label, onPressBackButton, children}: HeaderProps) => {
  return (
    <S.headerContainter>
      <Pressable onPress={onPressBackButton}>
        <S.buttonArea>
          <Icon name="backArrow" width={24} height={24} color="grey130" />
        </S.buttonArea>
      </Pressable>
      {!!label && <Txt label={label} color="grey190" typograph="titleLarge" />}
      {children}
    </S.headerContainter>
  );
};

export default Header;

const S = {
  buttonArea: styled.View`
    padding: 6px;
  `,
  headerContainter: styled.View`
    width: 100%;
    padding: 8px 14px 8px 10px;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border-bottom-width: 1px;
    border-color: ${colors.grey40};
    border-style: solid;
  `,
};
