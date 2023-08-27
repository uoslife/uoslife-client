import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import styled from '@emotion/native';
import NavigationListProps from './NavigationList.type';

const NavigationList = ({
  label,
  onPress,
  navigationButton, // TODO: type 수정필요
  children,
}: NavigationListProps) => {
  return (
    <S.navigateContainer>
      <S.navigateContent>
        <Text>{label}</Text>
        <Pressable onPress={onPress}>
          {navigationButton ?? (
            <S.arrowButtonImage
              source={require('../../../assets/images/backButton.png')}
            />
          )}
        </Pressable>
      </S.navigateContent>
      {children}
    </S.navigateContainer>
  );
};

export default NavigationList;

const S = {
  navigateContent: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  arrowButtonImage: styled.Image`
    width: 9px;
    height: 14px;
    transform: rotate(180deg);
  `,
  navigateContainer: styled.View`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 24px;
    padding-bottom: 10px;
  `,
};
