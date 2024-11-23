import styled, {css} from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {Suspense} from 'react';

import {View, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {BANNER_1} from '../../../../assets/images';
import Carousel from '../../../../components/molecules/common/carousel/Carousel';
import useUserState from '../../../../hooks/useUserState';
import AnnounceContents from '../contents/AnnounceContents';
import CafeteriaContents from '../contents/CafeteriaContents';
import LibraryContents from '../contents/LibraryContents';
import MainServiceBox from '../mainServiceBox/MainServiceBox';
import Skeleton from '../../../../components/molecules/common/skeleton/Skeleton';

const {width} = Dimensions.get('window');

const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 134;

const BANNER_1_LINK =
  'https://absorbing-macaw-e6c.notion.site/488291a8200d4030bb9a3395323b7481?pvs=74';

const MAIN_AUTOPLAY_INTERVAL_TIME = 4500;

const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const {user} = useUserState();

  const {id, nickname} = user || {};

  return (
    <S.MainContainer bounces={false}>
      <View
        style={{
          height: insets.top + 20,
          backgroundColor: colors.grey20,
        }}
      />
      {/* <View>
        <S.MainWaveBg
          source={require('../../../../assets/images/main_wave_bg.png')}
        />
      </View> */}

      <S.MainWrapper>
        <View
          style={{
            marginTop: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <S.AlertIcon
            source={require('../../../../assets/images/alertIcon.png')}
          />
        </View>
        <S.NotificationWrapper>
          <Txt
            label="서비스 점검중"
            color="black"
            typograph="headlineMedium"
            style={{textAlign: 'center'}}
          />
          <Txt
            label="이용에 불편을 드려 대단히 죄송합니다."
            color="black"
            typograph="titleSmall"
            style={{textAlign: 'center', justifyContent: 'center'}}
          />
          <Txt
            label="더 나은 서비스를 위해 시대생은 잠시 쉬어가고자 합니다."
            color="black"
            typograph="bodyMedium"
            style={{
              marginTop: '50%',
              marginBottom: '5%',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          />
        </S.NotificationWrapper>
        <S.ButtonWrapper>
          <Txt
            label="자세히 보기"
            color="black"
            typograph="bodyMedium"
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        </S.ButtonWrapper>
        <S.ButtonWrapperSecond>
          <Txt
            label="시대팅 시즌5"
            color="black"
            typograph="bodyMedium"
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        </S.ButtonWrapperSecond>
        {/* <View
          style={css`
          margin-top: 6px;
          gap: 4px;
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
        </View> */}
        {/* <Carousel
          imageWidth={BANNER_WIDTH}
          imageHeight={BANNER_HEIGHT}
          carouselData={[{uri: BANNER_1, link: BANNER_1_LINK, id: 0}]}
          indicator="TOPRIGHT"
          logEventName="banner"
          autoPlayIntervalTime={MAIN_AUTOPLAY_INTERVAL_TIME}
        /> */}
        {/* <MainServiceBox
          label="오늘의 학식"
          iconName="cafeteria"
          iconColor="primaryDarker">
          <Suspense fallback={<Skeleton variant="card" />}>
            <CafeteriaContents />
          </Suspense>
        </MainServiceBox> */}
        {/* <MainServiceBox
          label="도서관"
          iconName="library"
          iconColor="primaryDarker">
          <Suspense fallback={<Skeleton variant="card" />}>
            <LibraryContents />
          </Suspense>
        </MainServiceBox> */}
        {/* <MainServiceBox
          label="공지사항"
          iconName="campaign"
          iconColor="primaryDarker">
          <AnnounceContents />
        </MainServiceBox> */}
      </S.MainWrapper>
    </S.MainContainer>
  );
};

export default MainScreen;

const S = {
  MainContainer: styled.ScrollView`
    position: relative;
    background-color: ${colors.grey20};
  `,
  MainWaveBg: styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 223px;
    background-color: ${colors.grey20};
  `,
  MainWrapper: styled.View`
    position: relative;
    margin: 0 16px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: ${colors.grey20};
  `,
  AlertIcon: styled.Image`
    position: relative;
    margin-top: 30%;
    background-color: ${colors.grey20};
    width: 100px; /* 가로 크기 */
    height: 90px; /* 세로 크기 */
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
  NotificationWrapper: styled.View`
    display: flex;
  `,
  ButtonWrapper: styled.View`
    position: relative;
    background-color: ${colors.primaryLighter};
    padding: 12px 12px;
    margin: 0 35%;
    border-radius: 24px;
  `,
  ButtonWrapperSecond: styled.View`
    position: relative;
    background-color: #f7ced4;
    padding: 12px 12px;
    margin: 0 35%;
    border-radius: 24px;
  `,
};
