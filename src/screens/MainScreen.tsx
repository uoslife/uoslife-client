import styled, {css} from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import React from 'react';

import {
  Platform,
  NativeModules,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const Banner = () => {
  return (
    <TouchableOpacity
      style={css`
        width: 100%;
        height: 148px;
        border-radius: 24px;
      `}>
      <Image source={require('../assets/images/banner_sample_img.png')} />
    </TouchableOpacity>
  );
};

const CardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <View
      style={css`
        padding: 20px;
        border-radius: 20px;
        border: 1px solid ${colors.grey};
        background: #fff;
      `}>
      {children}
    </View>
  );
};

const MainServiceBox = ({label}: {label: string}) => {
  return (
    <View
      style={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}>
      <Txt label={label} color={'primaryStrong'} typograph={'body1'} />
      <CardLayout>
        <></>
      </CardLayout>
    </View>
  );
};

const MainScreen = () => {
  const {StatusBarManager} = NativeModules;
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'android'
      ? StatusBar.currentHeight
      : StatusBarManager.HEIGHT;
  return (
    <S.mainContainer style={{paddingTop: STATUS_BAR_HEIGHT}}>
      <S.mainWaveBg source={require('../assets/images/main_wave_bg.png')} />
      <S.mainWrapper>
        <S.topWrapper>
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
                label={`${'시대생'} 님`}
                color={'white'}
                typograph={'headline1'}
              />
              <Txt
                label={'환영합니다'}
                color={'white'}
                typograph={'headline1'}
              />
            </View>
            <Txt
              label={'OO아 힘을 내, 파이팅 넌 할 수 있어'}
              color={'white'}
              typograph={'label1'}
            />
          </View>
          <Banner />
        </S.topWrapper>
        <S.bottomWrapper>
          <MainServiceBox label={'오늘의 학식'}></MainServiceBox>
        </S.bottomWrapper>
      </S.mainWrapper>
    </S.mainContainer>
  );
};

export default MainScreen;

const S = {
  mainContainer: styled.ScrollView`
    position: relative;
  `,
  mainWaveBg: styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  `,
  mainWrapper: styled.ScrollView`
    margin: 0 16px;
  `,
  topWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 32px;
  `,
  bottomWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 48px;
  `,
};
