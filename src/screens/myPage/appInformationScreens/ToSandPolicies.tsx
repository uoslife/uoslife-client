import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import WebViewWithHeader from '../../../components/webView/WebViewWthHeader';

type ToSandPoliciesStackNavigation = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_ToSandPoliciesWebView'
>;

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<ToSandPoliciesStackNavigation>();
  const route = useRoute();

  return (
    <WebViewWithHeader
      navigation={navigation}
      route={route}
      label={'이용약관 및 정책'}
    />
  );
};

export default ToSandPoliciesScreen;
