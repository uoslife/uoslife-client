import React from 'react';
import {Text} from 'react-native';

import styled from '@emotion/native';

import HeaderProps from './Header.type';

const Header = ({label}: HeaderProps) => {
  return (
    <S.headerContainter>
      <S.backButton source={require('../../assets/images/backButton.png')} />
      <Text>{label}</Text>
    </S.headerContainter>
  );
};

export default Header;

const S = {
  headerContainter: styled.View`
    width: 100%;
    height: 70px;
    padding: 12px 20px;
    padding-top: 32px;
    display: flex;
    flex-direction: row;
    gap: 17px;
    border-bottom-width: 1px;
    border-color: black;
    border-style: solid;
  `,
  backButton: styled.Image`
    width: 29px;
    height: 17px;
  `,
  button: styled.View`
    border-radius: 16px;
    background: #d0d0d0;
    padding: 4px 10px;
    font-size: 10px;
  `,
};
