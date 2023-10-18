import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {DevSettings, View} from 'react-native';
import {useSetAtom} from 'jotai';
import {
  accountFlowInitStatus,
  accountFlowStatusAtom,
} from '../../../atoms/account';

const REDIRECT_TO_MAIN_TIME = 3 * 1000;

const useAutoRedirect = (time: number) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      DevSettings.reload();
    }, time);
    return () => clearInterval(timeout);
  }, []);
};

const AccountFinishInfoScreen = () => {
  const setAccontFlowStatus = useSetAtom(accountFlowStatusAtom);
  setAccontFlowStatus(accountFlowInitStatus);
  useAutoRedirect(REDIRECT_TO_MAIN_TIME);
  return (
    <View style={{paddingTop: 400, alignItems: 'center'}}>
      <Txt label={'로그인 완료!'} color={'black'} typograph={'bodySmall'} />
    </View>
  );
};

export default AccountFinishInfoScreen;
