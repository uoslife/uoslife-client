import React from 'react';
import {View, Button} from 'react-native';

import {useSetAtom} from 'jotai';
import {accountFlowStatusAtom} from '../../atoms/account';

const AccountMainScreen = () => {
  const setAccountStatus = useSetAtom(accountFlowStatusAtom);
  const handleClickAccountButton = () => {
    setAccountStatus(prev => {
      return {...prev, baseStatus: 'ONPROGRESS'};
    });
  };
  return (
    <View>
      <Button title={'로그인 / 회원가입'} onPress={handleClickAccountButton} />
    </View>
  );
};

export default AccountMainScreen;
