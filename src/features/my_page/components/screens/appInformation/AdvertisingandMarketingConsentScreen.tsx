import {useNavigation} from '@react-navigation/native';
import WebViewWithHeader from '../../../../../components/molecules/webView/WebViewWthHeader';
import {ServiceAgreementStackNavigation} from '../../../../../types/serviceAgreement.type';
import URLS from '../../../../../configs/urls';

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<ServiceAgreementStackNavigation>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.ADVERTISING_AND_MARKETING_CONSENT}
      label="광고 및 마케팅 수신 동의"
    />
  );
};

export default ToSandPoliciesScreen;
