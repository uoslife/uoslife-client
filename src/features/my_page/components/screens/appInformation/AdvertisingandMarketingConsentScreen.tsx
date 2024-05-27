import {useNavigation} from '@react-navigation/native';
import WebViewWithHeader from '../../../../../components/molecules/webView/WebViewWthHeader';
import URLS from '../../../../../configs/urls';
import {MypageAppInformationNavigationProp} from '../../../navigators/types/mypage_app_information';

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<MypageAppInformationNavigationProp>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.ADVERTISING_AND_MARKETING_CONSENT}
      label="광고 및 마케팅 수신 동의"
    />
  );
};

export default ToSandPoliciesScreen;
