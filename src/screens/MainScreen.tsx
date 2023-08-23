import styled, {css} from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import React from 'react';

import {Platform, NativeModules, StatusBar, View} from 'react-native';
import {
  AnnounceContents,
  Banner,
  BottomNavigation,
  CafeteriaContents,
  CardLayout,
  LibraryContents,
  MainServiceBox,
} from '../components/molecules';

const MainScreen = () => {
  const {StatusBarManager} = NativeModules;
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'android'
      ? StatusBar.currentHeight
      : StatusBarManager.HEIGHT;
  return (
    <>
      <S.MainContainer style={{paddingTop: STATUS_BAR_HEIGHT}}>
        <S.MainWaveBg source={require('../assets/images/main_wave_bg.png')} />
        <S.MainWrapper>
          <S.MypageButton>
            <Icon name={'person'} width={24} height={24} color={'white'} />
          </S.MypageButton>
          <View
            style={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin-top: 40px;
              padding-left: 16px;
            `}>
            <View>
              <Txt
                label={`${'시대인'} 님`}
                color={'white'}
                typograph={'headlineMedium'}
              />
              <Txt
                label={'환영합니다'}
                color={'white'}
                typograph={'headlineMedium'}
              />
            </View>
            <Txt
              label={'OO아 힘을 내, 파이팅 넌 할 수 있어!'}
              color={'white'}
              typograph={'headlineSmall'}
            />
          </View>
          <Banner />
          <MainServiceBox
            label={'오늘의 학식'}
            iconName={'cafeteria'}
            iconColor={'primaryDarker'}>
            <CafeteriaContents />
          </MainServiceBox>
          <MainServiceBox
            label={'도서관'}
            iconName={'library'}
            iconColor={'primaryDarker'}>
            <LibraryContents />
          </MainServiceBox>
          <MainServiceBox
            label={'공지사항'}
            iconName={'campaign'}
            iconColor={'primaryDarker'}>
            <AnnounceContents />
          </MainServiceBox>
        </S.MainWrapper>
      </S.MainContainer>
      <BottomNavigation />
    </>
  );
};

export default MainScreen;

const S = {
  MainContainer: styled.ScrollView`
    position: relative;
  `,
  MainWaveBg: styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  `,
  MainWrapper: styled.View`
    position: relative;
    margin: 0 16px;
    margin-bottom: 132px;
    display: flex;
    flex-direction: column;
    gap: 48px;
  `,

  MypageButton: styled.Pressable`
    position: absolute;
    top: 16px;
    right: 0;
  `,
};
