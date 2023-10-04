import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewComponent from '../../../components/webView/WebViewComponent';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type PrivacyPoliciesStackNavigation = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_privacyPoliciesWebView'
>;

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<PrivacyPoliciesStackNavigation>();
  const route = useRoute();

  return (
    <WebViewComponent
      navigation={navigation}
      route={route}
      label={'개인정보 처리방침'}
    />
  );
};

export default ToSandPoliciesScreen;
