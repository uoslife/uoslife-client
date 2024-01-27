import styled from '@emotion/native';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Button, colors, Txt} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

import {RootNavigationProps} from '../navigators/RootStackNavigator';
import URLS from '../configs/urls';
import {UtilAPI} from '../api/services';
import useInterval from '../hooks/useInterval';
import useUserState from '../hooks/useUserState';
import setUserInformationMessage from '../utils/setUserInformationMessage';

const DEVICE_HEIGHT = Dimensions.get('screen').height;
const STUDENT_ID_CONTENT_HEIGHT = 20 + 652; // 상단 상태표시 메뉴바(inset.top) 높이 + 학생증의 각 콘텐츠 요소를 합친 높이
const DEVICE_HEIGHT_WITHOUT_GUIDE_HEIGHT = DEVICE_HEIGHT - 136;

const PortalUnauthorizedComponent = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const handleNavigatePortalAuthenticate = async () => {
    return navigation.navigate('StudentId_PortalAuthentication');
  };

  return (
    <S.portalUnauthorizedScreen
      style={{
        height: DEVICE_HEIGHT_WITHOUT_GUIDE_HEIGHT,
      }}>
      <View style={{alignItems: 'center'}}>
        <S.uoslifeBrandLogo
          resizeMode="contain"
          source={require('../assets/images/uoslifeBrandLogo.png')}
        />
      </View>
      <View style={{gap: 8, alignItems: 'center'}}>
        <Txt
          label="등록된 모바일학생증이 없습니다."
          color="grey190"
          typograph="titleLarge"
        />
        <View style={{alignItems: 'center'}}>
          <Txt
            label="포털 연동 후 시대생에서"
            color="grey190"
            typograph="bodyLarge"
          />
          <Txt
            label="모바일 학생증을 사용해보세요."
            color="grey190"
            typograph="bodyLarge"
          />
        </View>
      </View>
      <Button
        label="포털 계정 연동하기"
        isFullWidth
        onPress={handleNavigatePortalAuthenticate}
      />
    </S.portalUnauthorizedScreen>
  );
};

const StudentIdComponent = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [qrCode, setQrCode] = useState('');

  const {user} = useUserState();

  const openPayco = async () => {
    const isPaycoInstalled = await Linking.canOpenURL(
      URLS.PAYCO.PAYCO_PAYMENT!,
    );

    return Linking.openURL(
      isPaycoInstalled ? URLS.PAYCO.PAYCO_PAYMENT! : URLS.PAYCO.PAYCO_INSTALL!,
    );
  };

  // const openPayco = async () => {
  //   const isPaycoInstalled = await Linking.canOpenURL(
  //     URLS.PAYCO.PAYCO_PAYMENT!,
  //   );
  //
  //   return Linking.openURL(
  //     isPaycoInstalled ? URLS.PAYCO.PAYCO_PAYMENT! : URLS.PAYCO.PAYCO_INSTALL!,
  //   );
  // };

  // const [currentTime, setCurrentTime] = useState('');
  // const getCurrentTime = () => {
  //   const today = new Date();
  //   const hours = `0${today.getHours()}`.slice(-2);
  //   const minutes = `0${today.getMinutes()}`.slice(-2);
  //   const seconds = `0${today.getSeconds()}`.slice(-2);
  //   const timeString = `${hours}:${minutes}:${seconds}`;
  //   setCurrentTime(timeString);
  // };

  // useInterval({
  //   onInterval: getCurrentTime,
  //   delay: 1000,
  // });

  // const [qrCode, setQrCode] = useState('');

  // const getStudentIdQrCode = async () => {
  //   const res = await UtilAPI.getStudentId({});
  //   setQrCode(res.data);
  // };

  // useInterval({
  //   onInterval: getStudentIdQrCode,
  //   delay: 1000 * 10,
  // });

  return (
    <ScrollView bounces={false}>
      <S.studentIdScreen deviceHeight={DEVICE_HEIGHT}>
        {/* <S.qrWrapper> */}
        {/* {qrCode ? ( */}
        {/*  <QRCode */}
        {/*    value={qrCode} */}
        {/*    logoSize={30} */}
        {/*    size={140} */}
        {/*    logoBackgroundColor="transparent" */}
        {/*  /> */}
        {/* ) : ( */}
        {/*  <ActivityIndicator /> */}
        {/* )} */}
        {/* <Txt label={currentTime} color="grey190" typograph="titleMedium" /> */}
        {/* </S.qrWrapper> */}
        {/* <S.paycoWrapper> */}
        {/*  <S.paycoButton onPress={openPayco}> */}
        {/*    <Txt label="PAYCO" color="red" typograph="titleSmall" /> */}
        {/*    <Txt label=" 바로가기" color="grey190" typograph="bodyLarge" /> */}
        {/*  </S.paycoButton> */}
        {/* </S.paycoWrapper> */}
        <View style={Style.boxShadow}>
          <S.studentInformationWrapper>
            <S.uoslifeLogoWrapper>
              <S.uoslifeBrandLogo
                style={Style.imageScale}
                source={require('../assets/images/uoslifeBrandLogo.png')}
              />
            </S.uoslifeLogoWrapper>
            <S.iroomaeCharacterImageWrapper>
              <S.iroomaeCharacterImage
                source={require('../assets/images/iroomae_character.png')}
              />
            </S.iroomaeCharacterImageWrapper>
            <S.infoContainer>
              <View style={{gap: 16}}>
                <View style={{gap: 4}}>
                  <Txt
                    label={setUserInformationMessage(user?.name)}
                    color="grey190"
                    typograph="headlineMedium"
                  />
                  <Txt
                    label={setUserInformationMessage(user?.studentId)}
                    color="grey190"
                    typograph="titleMedium"
                  />
                </View>
                <S.uosLogoImage
                  source={require('../assets/images/uos_logo_grey.png')}
                />
              </View>
              <View style={{gap: 8}}>
                <View>
                  <Txt
                    label="소속대학"
                    color="grey130"
                    typograph="bodyMedium"
                  />
                  <Txt
                    label={setUserInformationMessage(user?.collegeName)}
                    color="grey190"
                    typograph="bodyLarge"
                  />
                </View>
                <View>
                  <Txt
                    label="소속학과"
                    color="grey130"
                    typograph="bodyMedium"
                  />

                  <Txt
                    label={setUserInformationMessage(user?.departmentName)}
                    color="grey190"
                    typograph="bodyLarge"
                  />
                </View>
              </View>
            </S.infoContainer>
          </S.studentInformationWrapper>
        </View>
        <S.cautionWrapper>
          <Txt
            label="위의 정보는 신분 증명을 위한 목적으로 사용할 수 없습니다."
            color="grey90"
            typograph="caption"
          />
        </S.cautionWrapper>
      </S.studentIdScreen>
    </ScrollView>
  );
};

const StudentIdScreen = () => {
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(false);
  const insets = useSafeAreaInsets();

  const {user} = useUserState();

  useEffect(() => {
    const {isVerified} = user || {};
    setIsPortalAuthenticated(isVerified ?? false);
  }, [user]);

  return (
    <View style={{paddingTop: insets.top}}>
      {isPortalAuthenticated ? (
        <StudentIdComponent />
      ) : (
        <PortalUnauthorizedComponent />
      )}
    </View>
  );
};

export default StudentIdScreen;

const S = {
  // 공통 사용
  uoslifeBrandLogo: styled.Image`
    width: 328px;
    height: 158px;
  `,
  // 포탈 미인증 시, 화면
  portalUnauthorizedScreen: styled.View`
    gap: 24px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 16px 0 16px;
    justify-content: center;
  `,
  // 포탈 인증 시, 화면
  studentIdScreen: styled.View<{deviceHeight: number}>`
    gap: 24px;
    padding: ${({deviceHeight}) =>
      `120px 16px ${
        deviceHeight > STUDENT_ID_CONTENT_HEIGHT ? 0 : '120px'
      } 16px`};
    flex: 1;
  `,
  qrWrapper: styled.View`
    gap: 8px;
    align-items: center;
  `,
  paycoWrapper: styled.View`
    align-items: center;
    margin-bottom: 12px;
  `,
  paycoButton: styled.TouchableOpacity`
    padding: 12px 24px;
    border: 1px solid ${colors.grey190};
    border-radius: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  studentInformationWrapper: styled.View`
    position: relative;
    width: 98%;
    overflow: hidden;
    padding: 20px 26px;
    gap: 20px;
  `,
  uoslifeLogoWrapper: styled.View`
    position: absolute;
    top: 0;
    left: 0;
  `,
  iroomaeCharacterImageWrapper: styled.View`
    border: 1.25px solid ${colors.grey60};
    padding: 12.5px;
    background-color: ${colors.white};
    width: 100px;
  `,
  iroomaeCharacterImage: styled.Image`
    width: 75px;
    height: 100px;
  `,
  infoContainer: styled.View`
    flex-direction: row;
    gap: 24px;
  `,
  uosLogoImage: styled.Image`
    width: 30px;
    height: 15px;
  `,
  cautionWrapper: styled.View`
    align-items: center;
  `,
};

// 이모션으로 구현 불가능한 네이티브 스타일링
const Style = StyleSheet.create({
  boxShadow: {
    backgroundColor: 'white',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  imageScale: {
    transform: [{scale: 1.35}],
  },
});
