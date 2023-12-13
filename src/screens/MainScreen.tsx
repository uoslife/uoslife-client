import styled, {css} from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import React, {Suspense} from 'react';

import {View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Carousel from '../components/molecules/common/carousel/Carousel';
import {RootNavigationProps} from '../navigators/RootStackNavigator';
import {
  MainServiceBox,
  CafeteriaContents,
  LibraryContents,
  AnnounceContents,
} from '../components/molecules/screens/main';
import useUserState from '../hooks/useUserState';
import {BANNER_1, BANNER_2} from '../assets/images';

const {width} = Dimensions.get('window');

const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 84;

const BANNER_1_LINK =
  'https://even-maize-68a.notion.site/55eb7b449c9b461c8ba1c3a01a6209e1';
const BANNER_2_LINK =
  'https://danthe00813.notion.site/danthe00813/d1776073f61248b6b719ec62bf9a57fd';

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();

  const {user} = useUserState();

  const {id, nickname} = user || {};

  return (
    <S.MainContainer bounces={false}>
      <View
        style={{
          height: insets.top + 20,
          backgroundColor: colors.primaryBrand,
        }}
      />
      <View>
        <S.MainWaveBg source={require('../assets/images/main_wave_bg.png')} />
      </View>
      <S.MainWrapper>
        <S.MypageButton onPress={() => navigation.navigate('MyPage')}>
          <Icon name="person" width={24} height={24} color="white" />
        </S.MypageButton>
        <View
          style={css`
            gap: 4px;
            margin-top: 20px;
            padding-left: 16px;
          `}>
          <S.WaveInfoWrapper>
            <Txt
              label={`${id}번째 파동`}
              color="primaryUi"
              typograph="labelSmall"
              style={{textAlign: 'center'}}
            />
          </S.WaveInfoWrapper>
          <View>
            <Txt
              label={`${nickname} 님`}
              color="white"
              typograph="headlineMedium"
            />
            <S.WelcomeMessage>
              <Txt label="환영해요" color="white" typograph="headlineMedium" />
              <Icon name="uoslife" width={20} height={6} color="white" />
            </S.WelcomeMessage>
          </View>
          <Txt
            label="파동이 되어 새로운 물결을 만들어가요"
            color="white"
            typograph="headlineSmall"
          />
        </View>
        <Carousel
          imageWidth={BANNER_WIDTH}
          imageHeight={BANNER_HEIGHT}
          carouselData={[
            {uri: BANNER_1, link: BANNER_1_LINK},
            {uri: BANNER_2, link: BANNER_2_LINK},
          ]}
          indicator="TOPRIGHT"
        />
        <MainServiceBox
          label="오늘의 학식"
          iconName="cafeteria"
          iconColor="primaryDarker">
          <Suspense fallback={<View />}>
            <CafeteriaContents />
          </Suspense>
        </MainServiceBox>
        <MainServiceBox
          label="도서관"
          iconName="library"
          iconColor="primaryDarker">
          <LibraryContents />
        </MainServiceBox>
        <MainServiceBox
          label="공지사항"
          iconName="campaign"
          iconColor="primaryDarker">
          <AnnounceContents />
        </MainServiceBox>
      </S.MainWrapper>
    </S.MainContainer>
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
    height: 223px;
  `,
  MainWrapper: styled.View`
    position: relative;
    margin: 0 16px;
    margin-bottom: 132px;
    display: flex;
    flex-direction: column;
    gap: 48px;
  `,
  WelcomeMessage: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,
  WaveInfoWrapper: styled.View`
    padding: 4px 8px;
    align-self: flex-start;
    border-radius: 16px;
    background-color: ${colors.primaryLighter};
  `,
  MypageButton: styled.Pressable`
    position: absolute;
    top: -6px;
    right: 0;
  `,
};
