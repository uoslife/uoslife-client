import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewScreen from '../../WebViewScreen';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../../components/header/Header';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PrivacyPoliciesStackNavigation = StackNavigationProp<
  MyPageAppInformationStackParamList,
  'Mypage_privacyPoliciesWebView'
>;

const ToSandPoliciesScreen = () => {
  const navigation = useNavigation<PrivacyPoliciesStackNavigation>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <WebViewScreen
      navigation={navigation}
      route={route}
      label={'개인정보 처리방침'}
    />
  );
};

const S = {
  screenContainer: styled.View`
    flex: 1;
  `,
};

export default ToSandPoliciesScreen;
