import {useNavigation} from '@react-navigation/native';
import URLS from '../../../../../configs/urls';
import WebViewWithHeader from '../../../../../components/molecules/webView/WebViewWthHeader';
import {ServiceAgreementStackNavigation} from '../../../../../types/serviceAgreement.type';

const PrivacyandPoliciesScreen = () => {
  const navigation = useNavigation<ServiceAgreementStackNavigation>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.PRIVACY_AND_POLICIES}
      label="개인정보 처리방침"
    />
  );
};

export default PrivacyandPoliciesScreen;
