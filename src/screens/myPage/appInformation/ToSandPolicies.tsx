import React from 'react';
import {useNavigation} from '@react-navigation/native';
import WebViewWithHeader from '../../../components/molecules/webView/WebViewWthHeader';
import URLS from '../../../configs/urls';
import {ServiceAgreementStackNavigation} from '../../../types/serviceAgreement.type';

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<ServiceAgreementStackNavigation>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.TO_SAND_POLICIES}
      label="이용약관 및 정책"
    />
  );
};

export default ToSandPoliciesScreen;
