import React from 'react';
import {useNavigation} from '@react-navigation/native';
import WebViewWithHeader from '../../../components/webView/WebViewWthHeader';
import URLS from '../../../configs/urls';
import {ServiceAgreementStackNavigation} from '../../../types/serviceAgreement.type';

const PrivacyandPoliciesScreen = () => {
  const navigation = useNavigation<ServiceAgreementStackNavigation>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.PRIVACY_AND_POLICIES}
      label={'개인정보 처리방침'}
    />
  );
};

export default PrivacyandPoliciesScreen;
