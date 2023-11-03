import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import WebViewWithHeader from '../../../components/molecules/webView/WebViewWthHeader';
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
      label="개인정보 처리방침"
    />
  );
};

export default PrivacyandPoliciesScreen;
