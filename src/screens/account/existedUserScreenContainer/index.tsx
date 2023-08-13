import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {AccountStatusType, accountStatusAtom} from '..';

import SetNicknameScreen from '../common/SetNicknameScreen';

const ExistedUserScreenContainer = () => {
  const accountStatus = useAtomValue(accountStatusAtom);
  const handleExistedUserScreen = (accountStatus: AccountStatusType) => {
    switch (accountStatus.stepStatus.step) {
      case 0:
        return; // 아이디 선택 페이지
      case 1:
        return <SetNicknameScreen />;
      default:
        return; // 아이디 선택 페이지
    }
  };
  return <View>{handleExistedUserScreen(accountStatus)}</View>;
};

export default ExistedUserScreenContainer;
