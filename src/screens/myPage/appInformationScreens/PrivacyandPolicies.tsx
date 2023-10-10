import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import WebViewWithHeader from '../../../components/webView/WebViewWthHeader';

type PrivacyPoliciesStackNavigation = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_privacyPoliciesWebView'
>;

const PrivacyandPoliciesScreen = () => {
  const navigation = useNavigation<PrivacyPoliciesStackNavigation>();
  const route = useRoute();

  return (
    <WebViewWithHeader
      navigation={navigation}
      route={route}
      label={'개인정보 처리방침'}
    />
  );
};

export default PrivacyandPoliciesScreen;
