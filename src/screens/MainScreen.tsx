import styled, {css} from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import React from 'react';

import {View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  AnnounceContents,
  CafeteriaContents,
  LibraryContents,
  MainServiceBox,
} from '../components/molecules';
import Carousel from '../components/molecules/carousel/Carousel';
import {RootNavigationProps} from '../navigators/RootStackNavigator';

const {width} = Dimensions.get('window');

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  return (
    <>
      <S.MainContainer>
        <View
          style={{height: insets.top, backgroundColor: colors.primaryBrand}}
        />
        <View>
          <S.MainWaveBg source={require('../assets/images/main_wave_bg.png')} />
        </View>
        <S.MainWrapper>
          <S.MypageButton onPress={() => navigation.navigate('MyPage')}>
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
              <S.WelcomeMessage>
                <Txt
                  label={'환영합니다'}
                  color={'white'}
                  typograph={'headlineMedium'}
                />
                <Icon name={'uoslife'} width={20} height={6} color={'white'} />
              </S.WelcomeMessage>
            </View>
            <Txt
              label={'OO아 힘을 내, 파이팅 넌 할 수 있어!'}
              color={'white'}
              typograph={'headlineSmall'}
            />
          </View>
          <Carousel
            imageWidth={width - 32}
            imageHeight={148}
            imageUrls={[{uri: ''}, {uri: ''}]}
            indicator="TOPRIGHT"
          />
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
  WelcomeMessage: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,
  MypageButton: styled.Pressable`
    position: absolute;
    top: 16px;
    right: 0;
  `,
};
