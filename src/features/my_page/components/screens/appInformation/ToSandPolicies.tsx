import {useNavigation} from '@react-navigation/native';
import URLS from '../../../../../configs/urls';
import WebViewWithHeader from '../../../../../components/molecules/webView/WebViewWthHeader';
import {MypageAppInformationNavigationProp} from '../../../navigators/types/mypage_app_information';

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<MypageAppInformationNavigationProp>();

  return (
    <WebViewWithHeader
      navigation={navigation}
      url={URLS.APP_INFORMATION.TO_SAND_POLICIES}
      label="이용약관 및 정책"
    />
  );
};

export default ToSandPoliciesScreen;
