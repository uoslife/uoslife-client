import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebViewScreen from '../../WebViewScreen';
import {MyPageAppInformationStackParamList} from '../../../navigators/MyPageStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

const ToSandPoliciesScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<MyPageAppInformationStackParamList>>();
  const route = useRoute();

  return <WebViewScreen navigation={navigation} route={route} />;
};

export default ToSandPoliciesScreen;
