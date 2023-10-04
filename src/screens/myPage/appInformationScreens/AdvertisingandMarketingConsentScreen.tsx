import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewScreen from '../../WebViewScreen';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type AdvertisingandMarketingConsentNavigationStack = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_advertisingandMarketingConsentWebView'
>;

const ToSandPoliciesScreen = () => {
  const navigation =
    useNavigation<AdvertisingandMarketingConsentNavigationStack>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.screenContainer style={{paddingTop: insets.top}}>
      <Header
        label={'광고 및 마케팅 수신 동의'}
        onPressBackButton={handleGoBack}
      />
      <WebViewScreen navigation={navigation} route={route} />
    </S.screenContainer>
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
};

export default ToSandPoliciesScreen;
