import React from 'react';
import {Pressable} from 'react-native';

import styled from '@emotion/native';

import {Icon, Txt, colors} from '@uoslife/design-system';
import HeaderProps from './Header.type';

const Header = ({label, onPressBackButton, children}: HeaderProps) => {
  return (
    <S.headerContainter>
      <Pressable onPress={onPressBackButton}>
        <Icon name="backArrow" width={24} height={24} color="grey130" />
      </Pressable>
      {!!label && <Txt label={label} color="grey190" typograph="titleLarge" />}
      {children}
    </S.headerContainter>
  );
};

export default Header;

const S = {
  headerContainter: styled.View`
    width: 100%;
    padding: 12px 20px 12px 16px;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    border-bottom-width: 1px;
    border-color: ${colors.grey40};
    border-style: solid;
  `,
};
