import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from 'react-native';
import Header from '../common/header/Header';
import CustomWebView, {CustomWebviewProps} from './CustomWebView';
import {MypageAppInformationNavigationProp} from '../../../features/my_page/navigators/types/mypage_app_information';

type WebviewWithHeaderProps = CustomWebviewProps & {
  navigation: MypageAppInformationNavigationProp;
  label: string;
};

const WebViewWithHeader = ({
  navigation,
  label,
  url,
}: WebviewWithHeaderProps) => {
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <Header label={label} onPressBackButton={handleGoBack} />
      <CustomWebView url={url} />
    </View>
  );
};

export default WebViewWithHeader;
