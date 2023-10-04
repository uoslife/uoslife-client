import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewScreen from '../../WebViewScreen';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type ToSandPoliciesStackNavigation = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_ToSandPoliciesWebView'
>;

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<ToSandPoliciesStackNavigation>();
  const route = useRoute();

  return (
    <WebViewScreen
      navigation={navigation}
      route={route}
      label={'이용약관 및 정책'}
    />
  );
};

export default ToSandPoliciesScreen;
