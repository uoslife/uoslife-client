import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSetAtom} from 'jotai';
import {
  accountFlowInitStatus,
  accountFlowStatusAtom,
} from '../../../atoms/account';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../../navigators/RootStackNavigator';

const REDIRECT_TO_MAIN_TIME = 3 * 1000;

const useAutoRedirect = (time: number, callback: () => void) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, time);
    return () => clearInterval(timeout);
  }, []);
};

const AccountFinishInfoScreen = () => {
  const setAccontFlowStatus = useSetAtom(accountFlowStatusAtom);
  const navigation = useNavigation<RootNavigationProps>();

  const useAutoRedirectCallback = () => {
    navigation.navigate('Main');
    setAccontFlowStatus(accountFlowInitStatus);
  };

  useAutoRedirect(REDIRECT_TO_MAIN_TIME, useAutoRedirectCallback);

  return (
    <View style={{paddingTop: 400, alignItems: 'center'}}>
      <Txt label={'로그인 완료!'} color={'black'} typograph={'bodySmall'} />
    </View>
  );
};

export default AccountFinishInfoScreen;
