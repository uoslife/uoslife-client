import React from 'react';
import Header from '../../components/header/Header';
import NavigationList from '../../components/navigations/navigationList/NavigationList';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {MypageAppInformationScreenRouteProp} from '../../navigators/MyPageStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';

type NavigationListType = {
  label: string;
  navigate:
    | 'Mypage_ToSandPolicies'
    | 'Mypage_privacyPolicies'
    | 'Mypage_advertisingandMarketingConsent';
};

const MypageAppInformationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MypageAppInformationScreenRouteProp>();

  const APP_INFORMATION_LIST: NavigationListType[] = [
    {
      label: '이용약관 및 정책',
      navigate: 'Mypage_ToSandPolicies',
    },
    {
      label: '개인정보 처리방침',
      navigate: 'Mypage_privacyPolicies',
    },
    {
      label: '광고 및 마케팅 수신 동의',
      navigate: 'Mypage_advertisingandMarketingConsent',
    },
  ];

  return (
    <View style={{paddingTop: insets.top}}>
      <Header label={'앱 정보'} />
      <S.Container>
        {APP_INFORMATION_LIST.map((item, index) => (
          <NavigationList
            key={index}
            label={item.label}
            onPress={() => navigation.navigate(item.navigate)}
          />
        ))}
      </S.Container>
    </View>
  );
};
const S = {
  Container: styled.View`
    display: flex;
    padding: 0 16px;
  `,
};

export default MypageAppInformationScreen;
