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
import Skeleton from '../components/molecules/common/skeleton/Skeleton';
import AnimatePress from '../components/animations/pressable_icon/AnimatePress';

const {width} = Dimensions.get('window');

const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 134;

const BANNER_1_LINK =
  'https://absorbing-macaw-e6c.notion.site/488291a8200d4030bb9a3395323b7481?pvs=74';
const BANNER_2_LINK = 'uoslife://libraryRecap';

const MAIN_AUTOPLAY_INTERVAL_TIME = 4500;

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
        <S.MypageButton>
          <AnimatePress
            onPress={() => navigation.navigate('Mypage')}
            variant="scale_up">
            <Icon name="person" width={24} height={24} color="white" />
          </AnimatePress>
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
            {uri: BANNER_1, link: BANNER_1_LINK, id: 0},
            {uri: BANNER_2, link: BANNER_2_LINK, id: 1},
          ]}
          indicator="TOPRIGHT"
          logEventName="banner"
          autoPlayIntervalTime={MAIN_AUTOPLAY_INTERVAL_TIME}
        />
        <MainServiceBox
          label="오늘의 학식"
          iconName="cafeteria"
          iconColor="primaryDarker">
          <Suspense fallback={<Skeleton variant="card" />}>
            <CafeteriaContents />
          </Suspense>
        </MainServiceBox>
        <MainServiceBox
          label="도서관"
          iconName="library"
          iconColor="primaryDarker">
          <Suspense fallback={<Skeleton variant="card" />}>
            <LibraryContents />
          </Suspense>
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
