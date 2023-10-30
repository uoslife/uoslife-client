import React from 'react';
import {useNavigation} from '@react-navigation/native';
import WebViewWithHeader from '../../../components/webView/WebViewWthHeader';
import URLS from '../../../configs/urls';

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.TO_SAND_POLICIES}
      label={'이용약관 및 정책'}
    />
  );
};

export default ToSandPoliciesScreen;
