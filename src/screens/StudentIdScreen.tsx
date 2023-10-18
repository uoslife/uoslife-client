import styled from '@emotion/native';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Button, colors, Txt} from '@uoslife/design-system';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {StudentIdNavigationProp} from '../navigators/StudentIdStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import URLS from '../configs/urls';
import QRCode from 'react-native-qrcode-svg';
import {UtilAPI} from '../api/services';

const PortalUnauthorizedComponent = () => {
  const navigation = useNavigation<StudentIdNavigationProp>();

  const handleNavigatePortalAuthenticate = async () => {
    return navigation.navigate('StudentId_portalAuthentication');
  };

  return (
    <S.portalUnauthorizedScreen>
      <S.uoslifeBrandLogo
        source={require('../assets/images/uoslifeBrandLogo.png')}
      />
      <View style={{gap: 8, alignItems: 'center'}}>
        <Txt
          label={'등록된 모바일학생증이 없습니다.'}
          color={'grey190'}
          typograph={'titleLarge'}
        />
        <View style={{gap: 0, alignItems: 'center'}}>
          <Txt
            label={'포털 연동 후 시대생에서'}
            color={'grey190'}
            typograph={'bodyLarge'}
          />
          <Txt
            label={'모바일 학생증을 사용해보세요.'}
            color={'grey190'}
            typograph={'bodyLarge'}
          />
        </View>
      </View>
      <Button
        label={'포털 계정 연동하기'}
        isFullWidth={true}
        onPress={handleNavigatePortalAuthenticate}
      />
    </S.portalUnauthorizedScreen>
  );
};

const StudentIdComponent = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [qrCode, setQrCode] = useState('');

  const openPayco = async () => {
    const isPaycoInstalled = await Linking.canOpenURL(
      URLS.PAYCO.PAYCO_PAYMENT!,
    );

    return Linking.openURL(
      isPaycoInstalled ? URLS.PAYCO.PAYCO_PAYMENT! : URLS.PAYCO.PAYCO_INSTALL!,
    );
  };

  const getCurrentTime = () => {
    let today = new Date();
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;

    setCurrentTime(timeString);
  };

  const getStudentIdQrCode = async () => {
    const res = await UtilAPI.getStudentIdQr({});
    setQrCode(res.data);
  };

  useEffect(() => {
    getStudentIdQrCode();
  }, [qrCode, setQrCode]);

  useEffect(() => {
    let getCurrentTimeInterval = setInterval(getCurrentTime);

    return () => {
      clearInterval(getCurrentTimeInterval);
    };
  }, [currentTime, setCurrentTime]);

  return (
    <ScrollView>
      <S.studentIdScreen>
        <View style={{gap: 24}}>
          <S.qrWrapper>
            {qrCode ? (
              <QRCode
                value={qrCode}
                logoSize={30}
                logoBackgroundColor="transparent"
              />
            ) : (
              <ActivityIndicator />
            )}
            <Txt
              label={currentTime}
              color={'grey190'}
              typograph={'titleMedium'}
            />
          </S.qrWrapper>
          <S.paycoButton onPress={openPayco}>
            <Txt label={'PAYCO'} color={'red'} typograph={'titleSmall'} />
            <Txt
              label={' 바로가기'}
              color={'grey190'}
              typograph={'bodyLarge'}
            />
          </S.paycoButton>
        </View>
        <View style={Style.boxShadow}>
          <S.studentInformationWrapper>
            <S.uoslifeLogoWrapper>
              <S.uoslifeBrandLogo
                source={require('../assets/images/uoslifeBrandLogo.png')}
                style={Style.imageScale}
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
                    label={'한유민'}
                    color={'grey190'}
                    typograph={'headlineMedium'}
                  />
                  <Txt
                    label={'2022280085'}
                    color={'grey190'}
                    typograph={'titleMedium'}
                  />
                </View>
                <S.uosLogoImage
                  source={require('../assets/images/uos_logo_grey.png')}
                />
              </View>
              <View style={{gap: 8}}>
                <View>
                  <Txt
                    label={'소속대학'}
                    color={'grey130'}
                    typograph={'bodyMedium'}
                  />
                  <Txt
                    label={'정경대학'}
                    color={'grey190'}
                    typograph={'bodyLarge'}
                  />
                </View>
                <View>
                  <Txt
                    label={'소속학과'}
                    color={'grey130'}
                    typograph={'bodyMedium'}
                  />

                  <Txt
                    label={'전기전자컴퓨터공학부'}
                    color={'grey190'}
                    typograph={'bodyLarge'}
                  />
                </View>
              </View>
            </S.infoContainer>
          </S.studentInformationWrapper>
        </View>
        <Txt
          label={'위의 정보는 신분 증명을 위한 목적으로 사용할 수 없습니다.'}
          color={'grey90'}
          typograph={'caption'}
        />
      </S.studentIdScreen>
    </ScrollView>
  );
};

const StudentIdScreen = () => {
  const [isPortalAuthenticated, setIsPortalAuthenticated] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setIsPortalAuthenticated(true);
    // api 또는 전역에서 학생증 인증 여부 확인
  }, []);

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
  screenContainer: styled.ScrollView`
    flex: 1;
  `,
  portalUnauthorizedScreen: styled.View`
    flex: 1;
    gap: 24px;
    padding: 160px 16px 0 16px;
  `,
  uoslifeBrandLogo: styled.Image`
    width: 100%;
    height: 25%;
  `,
  studentIdScreen: styled.View`
    flex: 1;
    gap: 32px;
    padding: 40px 16px 0 16px;
    align-items: center;
    margin-bottom: 125px;
  `,
  qrWrapper: styled.View`
    gap: 8px;
    align-items: center;
  `,
  qrImage: styled.Image`
    width: 140px;
    height: 140px;
  `,
  paycoButton: styled.TouchableOpacity`
    padding: 12px 24px;
    border: 1px solid ${colors.grey190};
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
    top: -30%;
    left: -57%;
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
};

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
    transform: [{scale: 0.68}],
  },
});
