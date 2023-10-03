import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewScreen from '../../WebViewScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';

const PrivacyPoliciesScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<MyPageAppInformationStackParamList>>();
  const route = useRoute();

  return <WebViewScreen navigation={navigation} route={route} />;
};

export default PrivacyPoliciesScreen;
