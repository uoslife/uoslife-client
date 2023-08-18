import React from 'react';
import {View, Button} from 'react-native';

import {useSetAtom} from 'jotai';
import {accountStatusAtom} from '.';

const AccountMainScreen = () => {
  const setAccountStatus = useSetAtom(accountStatusAtom);
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
