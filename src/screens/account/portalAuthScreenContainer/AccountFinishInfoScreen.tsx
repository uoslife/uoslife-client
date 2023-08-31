import {Txt} from '@uoslife/design-system';
import React, {useEffect} from 'react';
import {View} from 'react-native';

const REDIRECT_TO_MAIN_TIME = 3 * 1000;

const AccountFinishInfoScreen = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: 로그인관련 추가되면 넘어가도록 구현
    }, REDIRECT_TO_MAIN_TIME);
    return clearInterval(interval);
  });
  return (
    <View>
      <Txt label={'로그인 완료!'} color={'grey40'} typograph={'bodySmall'} />
    </View>
  );
};

export default AccountFinishInfoScreen;
