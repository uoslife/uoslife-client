import React from 'react';
import {View} from 'react-native';

import {useAtomValue} from 'jotai';
import {
  AccountFlowStatusType,
  accountFlowStatusAtom,
} from '../../../atoms/account';

import SetNicknameScreen from '../common/SetNicknameScreen';

const NewUserScreenContainer = () => {
  const accountStatus = useAtomValue(accountFlowStatusAtom);
  const handleNewUserScreen = (accountStatus: AccountFlowStatusType) => {
    switch (accountStatus.stepStatus.step) {
      case 0:
        return <SetNicknameScreen />;
      default:
        return <SetNicknameScreen />;
    }
  };
  return <View style={{flex: 1}}>{handleNewUserScreen(accountStatus)}</View>;
};

export default NewUserScreenContainer;
