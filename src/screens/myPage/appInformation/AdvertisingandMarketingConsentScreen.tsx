import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import WebViewWithHeader from '../../../components/webView/WebViewWthHeader';
import URLS from '../../../configs/urls';

type AdvertisingandMarketingConsentNavigationStack = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_advertisingandMarketing'
>;

const ToSandPoliciesScreen = () => {
  const navigation =
    useNavigation<AdvertisingandMarketingConsentNavigationStack>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.ADVERTISING_AND_MARKETING_CONSENT}
      label="광고 및 마케팅 수신 동의"
    />
  );
};

export default ToSandPoliciesScreen;
