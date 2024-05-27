import {useNavigation} from '@react-navigation/native';
import URLS from '../../../../../configs/urls';
import WebViewWithHeader from '../../../../../components/molecules/webView/WebViewWthHeader';
import {MypageAppInformationNavigationProp} from '../../../navigators/types/mypage_app_information';

const PrivacyandPoliciesScreen = () => {
  const navigation = useNavigation<MypageAppInformationNavigationProp>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.PRIVACY_AND_POLICIES}
      label="개인정보 처리방침"
    />
  );
};

export default PrivacyandPoliciesScreen;
