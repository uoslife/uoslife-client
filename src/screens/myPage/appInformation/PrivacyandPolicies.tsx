import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import WebViewWithHeader from '../../../components/webView/WebViewWthHeader';
import URLS from '../../../configs/urls';

type PrivacyPoliciesStackNavigation = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_privacyPolicies'
>;

const PrivacyandPoliciesScreen = () => {
  const navigation = useNavigation<PrivacyPoliciesStackNavigation>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.PRIVACY_AND_POLICIES}
      label={'개인정보 처리방침'}
    />
  );
};

export default PrivacyandPoliciesScreen;