import React from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import Header from '../../components/header/Header';
import NavigationList from '../../components/navigations/navigationList/NavigationList';
import {MypageAppInformationNavigationProp} from '../../navigators/MyPageStackNavigator';

const MypageAppInformationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MypageAppInformationNavigationProp>();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{paddingTop: insets.top}}>
      <Header label={'앱 정보'} onPressBackButton={handleGoBack} />
      <S.Container>
        <NavigationList
          label="이용약관 및 정책"
          onPress={() => navigation.navigate('Mypage_ToSandPolicies')}
        />
        <NavigationList
          label="개인정보 처리방침"
          onPress={() => navigation.navigate('Mypage_privacyPolicies')}
        />
        <NavigationList
          label="광고 및 마케팅 수신 동의"
          onPress={() => navigation.navigate('Mypage_advertisingandMarketing')}
        />
        <NavigationList
          label="현재 앱 버전"
          onPress={() => navigation.navigate('Mypage_ToSandPolicies')}
          pressLabel={DeviceInfo.getVersion()}
          isPressIconShown={false}
        />
      </S.Container>
    </View>
  );
};
const S = {
  Container: styled.View`
    width: 100%;
    padding: 0 16px;
  `,
};

export default MypageAppInformationScreen;
