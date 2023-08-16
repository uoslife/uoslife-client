import React from 'react';
import {Pressable, Text} from 'react-native';

import styled from '@emotion/native';

import HeaderProps from './Header.type';
import {Txt, colors} from '@uoslife/design-system';

const Header = ({label, onPressButton}: HeaderProps) => {
  return (
    <S.headerContainter>
      <Pressable onPress={onPressButton} style={{padding: 10}}>
        {/* TODO: 이후 Icon button으로 교체 */}
        <S.backButton source={require('../../assets/images/backButton.png')} />
      </Pressable>
      <Txt label={label} color={'grey190'} typograph="titleLarge" />
    </S.headerContainter>
  );
};

export default Header;

const S = {
  headerContainter: styled.View`
    width: 100%;
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border-bottom-width: 1px;
    border-color: ${colors.grey40};
    border-style: solid;
  `,
  backButton: styled.Image`
    padding: 8px 16px;
    width: 16px;
    height: 32px;
  `,
};
