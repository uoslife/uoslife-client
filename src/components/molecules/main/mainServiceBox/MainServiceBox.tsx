import React from 'react';
import styled from '@emotion/native';

import {Icon, Txt} from '@uoslife/design-system';
import {CardLayout} from '../..';

import MainServiceBoxType from './MainServiceBox.type';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {RootNavigationProps} from '../../../../navigators/RootStackNavigator';

const MainServiceBox = ({
  label,
  iconName,
  iconColor,
  children,
}: MainServiceBoxType) => {
  const navigation = useNavigation<RootNavigationProps>();
  const handleMoreButton = () => {
    switch (iconName) {
      case 'library':
        navigation.navigate('Library');
        break;
      case 'cafeteria':
        navigation.navigate('Cafeteria');
        break;
      case 'campaign':
        navigation.navigate('Announcement');
        break;
      default:
        break;
    }
  };
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <S.TitleWrapper>
          <Icon name={iconName} width={15} height={16} color={iconColor} />
          <Txt
            label={label}
            color={'primaryDarker'}
            typograph={'titleMedium'}
          />
        </S.TitleWrapper>
        <S.MoreButton onPress={handleMoreButton}>
          <Txt label={'더보기'} color={'grey90'} typograph={'labelMedium'} />
          <Icon name={'forwardArrow'} width={10} height={10} color={'grey90'} />
        </S.MoreButton>
      </S.TopWrapper>
      {children}
    </S.Wrapper>
  );
};
export default MainServiceBox;

const S = {
  Wrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  TopWrapper: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 12px;
  `,
  TitleWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  MoreButton: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
};
