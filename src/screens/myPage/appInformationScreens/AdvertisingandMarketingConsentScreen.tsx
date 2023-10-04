import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewComponent from '../../../components/webView/WebViewComponent';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type AdvertisingandMarketingConsentNavigationStack = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_advertisingandMarketingConsentWebView'
>;

const ToSandPoliciesScreen = () => {
  const navigation =
    useNavigation<AdvertisingandMarketingConsentNavigationStack>();
  const route = useRoute();

  return (
    <WebViewComponent
      navigation={navigation}
      route={route}
      label={'광고 및 마케팅 수신 동의'}
    />
  );
};

export default ToSandPoliciesScreen;
